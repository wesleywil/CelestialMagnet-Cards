from rest_framework import serializers

from .models import Card, CardType, Transaction


class CardTypeListingField(serializers.RelatedField):
    def to_representation(self, value):
        return ({
            'id': value.id, 'title': value.title, 'description': value.description, 'type_image': value.type_image.url, 'color': value.color
        })


class UserTypeListingField(serializers.RelatedField):
    def to_representation(self, value):
        return ({
            'id': value.id, 'username': value.username, 'email': value.email
        })


class CardSerializer(serializers.ModelSerializer):
    card_type = CardTypeListingField(read_only=True)
    owner = UserTypeListingField(read_only=True)

    class Meta:
        model = Card
        fields = ['id', 'owner', 'name', 'tier', 'card_type',
                  'description', 'base_image', 'frame_image', 'tradeable_status']


class CardPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = ['id', 'owner', 'name', 'tier', 'card_type',
                  'description', 'base_image', 'frame_image', 'tradeable_status']


class CardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardType
        fields = ['id', 'title', 'description', 'color', 'type_image']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'owner_card', 'desired_card',
                  'transaction_type', 'price']


class UserListingField(serializers.RelatedField):
    def to_representation(self, value):
        return ({
            'id': value.id,
            'username': value.username,
            'email': value.email
        })


class CardListingField(serializers.RelatedField):

    def to_representation(self, value):
        card_type = value.card_type
        return ({
            'id': value.id,
            'name': value.name,
            'tier': value.tier,
            'card_type': {
                'id': card_type.id,
                'title': card_type.title,
                'description': card_type.description,
                'color': card_type.color,
            },
            'description': value.description,
            'base_image': self.get_image_url(value.base_image),
            'frame_image': self.get_image_url(value.frame_image),
            'tradeable_status': value.tradeable_status,
        })

    def get_image_url(self, image_field):
        if image_field:
            try:
                return image_field.url
            except ValueError:
                return None
        return None


class TransactionViewerSerializer(serializers.ModelSerializer):
    user = UserListingField(read_only=True)
    owner_card = CardListingField(read_only=True)
    desired_card = CardListingField(read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'user', 'owner_card', 'desired_card',
                  'transaction_type', 'price', 'timestamp']
