from django.conf import settings
from django.db import transaction as django_transaction
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.auth import TokenAuthentication
import stripe
import environ


from accounts.models import User
from .models import Card, CardType, Transaction, TransactionHistory
from .serializers import (
    CardSerializer,
    CardPostSerializer,
    CardTypeSerializer,
    TransactionHistorySerializer,
    TransactionSerializer,
    TransactionViewerSerializer
)

stripe.api_key = settings.STRIPE_SECRET_KEY

env = environ.Env()


class CardsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        queryset = Card.objects.all().order_by('card_type__title')
        serializer = CardSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


class CardsByNameView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        card_name = request.query_params.get('name')
        if card_name:
            queryset = Card.objects.filter(
                name__icontains=card_name).order_by('card_type__title')
        else:
            queryset = []
        serializer = CardSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


class CardUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        queryset = Card.objects.filter(
            owner__pk=request.user.pk).order_by('card_type__title')
        serializer = CardSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


class CardPostView(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = (TokenAuthentication,)

    def post(self, request, format=None):
        serializer = CardPostSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            card_instance = serializer.validated_data
            frame_images = {
                'bronze': 'card_frames/bronze.png',
                'silver': 'card_frames/silver.png',
                'golden': 'card_frames/golden.png',
                'black_diamond': 'card_frames/black_diamond.png',
            }
            existing_base_image = card_instance['base_image']
            for tier, image_path in frame_images.items():
                new_card = Card.objects.create(
                    name=card_instance['name'],
                    tier=tier,
                    card_type=card_instance['card_type'],
                    description=card_instance['description'],
                    base_image=existing_base_image,
                    frame_image=image_path
                )
                new_card.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CardDetailsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        try:
            return Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        card = self.get_object(pk)
        serializer = CardSerializer(card, context={"request": request})
        return Response(serializer.data)


class CardDetailsUpdateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = (TokenAuthentication)

    def get_object(self, pk):
        try:
            return Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Http404

    def put(self, request, pk, format=None):
        card = self.get_object(pk)
        serializer = CardSerializer(card, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        card = self.get_object(pk)
        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CardsTypeView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        queryset = CardType.objects.all().order_by('-title')
        serializer = CardTypeSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


class CardTypePostView(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = (TokenAuthentication,)

    def post(self, request, format=None):
        serializer = CardTypeSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CardTypeDetailsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        try:
            return CardType.objects.get(pk=pk)
        except CardType.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        cardtype = self.get_object(pk)
        serializer = CardTypeSerializer(cardtype, context={"request": request})
        return Response(serializer.data)


class CardTypeDetailsUpdateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = (TokenAuthentication)

    def get_object(self, pk):
        try:
            return CardType.objects.get(pk=pk)
        except CardType.DoesNotExist:
            return Http404

    def put(self, request, pk, format=None):
        cardtype = self.get_object(pk)
        serializer = CardTypeSerializer(cardtype, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cardtype = self.get_object(pk)
        cardtype.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TransactionListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        queryset = Transaction.objects.all().order_by('-id')
        serializer = TransactionViewerSerializer(
            queryset, many=True, context={"request": request})
        return Response(serializer.data)


class TransactionDetailsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        try:
            return Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        transaction = self.get_object(pk)
        serializer = TransactionViewerSerializer(
            transaction, context={"request": request})
        return Response(serializer.data)


class TransactionViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get(self, request, format=None):
        queryset = Transaction.objects.filter(
            user=request.user).order_by('-id')
        serializer = TransactionViewerSerializer(
            queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request, format=None):
        try:
            owner_card_id = request.data.get('owner_card')
            card = get_object_or_404(Card, pk=owner_card_id)
            if card.tradeable_status:
                serializer = TransactionSerializer(
                    data=request.data, context={"request": request})
                if serializer.is_valid():
                    with django_transaction.atomic():
                        card.tradeable_status = False
                        card.save()
                        serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "Card is not tradeable"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response({"message": "Invalid request data"}, status=status.HTTP_400_BAD_REQUEST)


class TransactionDetailsViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_object(self, pk):
        try:
            return Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        transaction = self.get_object(pk)
        serializer = TransactionViewerSerializer(
            transaction, context={"request": request})
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        transaction = self.get_object(pk)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        transaction = self.get_object(pk)
        card = get_object_or_404(Card, pk=transaction.owner_card.id)
        with django_transaction.atomic():
            card.tradeable_status = True
            card.save()
            transaction.delete()
        return Response({"message": "Transaction Successfully deleted"}, status=status.HTTP_200_OK)


class CardSellView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        transaction_id = request.data.get('transaction_id')
        logged_user_id = request.user.pk
        token = request.data.get('token')

        transaction = Transaction.objects.get(pk=transaction_id)

        # Verify if Transaction Exists
        if (transaction):
            # Calculate fee
            business_fee = 0.1 * float(transaction.price)
            amount_after_fee = float(transaction.price) - business_fee

            # Charge buyer
            try:
                transaction_data = {
                    'user': transaction.user.pk,
                    'buyer': logged_user_id,
                    'owner_card': transaction.owner_card.pk,
                    'transaction_type': transaction.transaction_type,
                    'price': transaction.price
                }
                serializer = TransactionHistorySerializer(
                    data=transaction_data, context={"request": request})
                if serializer.is_valid():
                    card = Card.objects.filter(pk=transaction.owner_card.pk).update(
                        owner=logged_user_id
                    )
                    card.save()
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # Create a charge for the full amount
                charge = stripe.Charge.create(
                    amount=int(transaction.price * 100),
                    currency="usd",
                    source=token,
                    description=f'Purchage of a Card in Celestial Magnet Card App',
                )

                # Transfer the amount after your fee to the seller stripe account
                transfer_to_seller = stripe.Transfer.create(
                    amount=int(amount_after_fee * 100),
                    currency='usd',
                    # This will be received by the seller of the card(transaction.user.stripe_id), after I udpate the User model by including the stripe id
                    destination=transaction.user.stripe_id,
                    description=f'Payment for the sold card on the platform Celestial Magenet Cards'
                )

                # Transfer fee to the business account
                transfer_fee_to_business = stripe.Transfer.create(
                    amount=int(business_fee * 100),
                    currency='usd',
                    # This should be a different account corresponding the business
                    destination=env('STRIPE_BUSINESS_ACCOUNT_ID'),
                    description=f'For for a card sold in the platform'
                )

                return Response({'message': 'Transaction successfull'})
            except stripe.CardError as e:
                return Response({'error': str(e)}, status=e.http_status)
        else:
            return Response({'message': 'This Transaction does not exist'}, status=status.HTTP_404_NOT_FOUND)


class CardTradeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        transaction_id = request.data.get('transaction_id')
        logged_user_id = request.user.pk

        try:
            transaction = Transaction.objects.get(pk=transaction_id)
        except Transaction.DoesNotExist:
            return Response({'message': 'This Transaction does not exist'}, status=status.HTTP_404_NOT_FOUND)

        try:
            desired_card_owner = Card.objects.get(
                pk=transaction.desired_card.id, owner__id=logged_user_id)
        except Card.DoesNotExist:
            return Response({'message': "You don't own the card you're trying to trade"}, status=status.HTTP_404_NOT_FOUND)

        transaction_data = {
            'user': transaction.user.pk,
            'buyer': logged_user_id,
            'owner_card': transaction.owner_card.id,
            'desired_card': transaction.desired_card.id,
            'transaction_type': transaction.transaction_type
        }

        serializer = TransactionHistorySerializer(
            data=transaction_data, context={"request": request})
        if serializer.is_valid():
            card_owner_update = {
                transaction.owner_card.id: logged_user_id,
                transaction.desired_card.id: transaction.user.id
            }
            for card_id, new_owner in card_owner_update.items():
                try:
                    card = Card.objects.get(pk=card_id)
                except Card.DoesNotExist:
                    return Response({'message': f"Card with ID {card_id} does not exist"}, status=status.HTTP_404_NOT_FOUND)

                card.owner = new_owner
                card.save()
            serializer.save()
            return Response({'message': 'Trade was done successfully'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
