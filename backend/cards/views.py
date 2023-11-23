from django.http import Http404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.auth import TokenAuthentication


from .models import Card, CardType, Transaction
from .serializers import (
    CardSerializer,
    CardTypeSerializer,
    TransactionSerializer,
    TransactionViewerSerializer
)


class CardsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        queryset = Card.objects.all().order_by('-name')
        serializer = CardSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


class CardPostView(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = (TokenAuthentication,)

    def post(self, request, format=None):
        serializer = CardSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
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
        serializer = TransactionSerializer(
            data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
