from rest_framework import serializers

from .models import Card, CardType, Transaction


class CardTypeListingField(serializers.RelatedField):
    def to_representation(self, value):
        return ({
            'id', 'title', 'description', 'type_image'
        })


class CardSerializer(serializers.ModelSerializer):
    card_type = CardTypeListingField(read_only=True)

    class Meta:
        model = Card
        fields = ['id', 'owner', 'name', 'tier', 'card_type',
                  'description', 'base_image', 'frame_image']


class CardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardType
        fields = ['id', 'title', 'description', 'type_image']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'card',
                  'transaction_type', 'price', 'timestamp']


class UserListingField(serializers.RelatedField):
    def to_representation(self, value):
        return ({
            'id': value.id,
            'username': value.username,
            'email': value.email
        })


class CardListingField(serializers.RelatedField):
    def to_representation(self, value):
        return ({
            'id',
            'name',
            'tier',
            'card_type',
            'description',
            'base_image',
            'frame_image',
        })


class TransactionViewerSerializer(serializers.ModelSerializer):
    user = UserListingField(read_only=True)
    card = CardListingField(read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'user', 'card',
                  'transaction_type', 'price', 'timestamp']
