from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from accounts.models import User
from PIL import Image

import os

TRANSACTION_TYPES = (
    ('sell', 'Sell'),
    ('trade', 'Trade')
)


class Card(models.Model):
    TIER_CHOICES = (
        ('bronze', 'Bronze'),
        ('silver', 'Silver'),
        ('golden', 'Golden'),
        ('black_diamond', 'Black Diamond')
    )
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    tier = models.CharField(
        max_length=20, choices=TIER_CHOICES, null=True, blank=True)
    card_type = models.ForeignKey("CardType", on_delete=models.CASCADE)
    description = models.TextField()
    base_image = models.ImageField(upload_to='card_bases/')
    frame_image = models.ImageField(
        upload_to='card_frames/', null=True, blank=True)
    tradeable_status = models.BooleanField(default=True)

    def __str__(self):
        return f"Card: {self.name} - {self.card_type.title} - {self.tier}"

    def save(self, *args, **kwargs):
        if not self.pk:  # Check if the card is being created (not updated)
            file_extension = os.path.splitext(self.base_image.name)[1]
            new_filename = f"{self.name.replace(' ', '_')}{file_extension}"

            #  Check if an image with same name exists
            existing_images = Card.objects.filter(
                base_image__contains=new_filename)

            if existing_images.exists():
                existing_image = existing_images.first()
                self.base_image = existing_image.base_image
            else:
                self.base_image.name = new_filename
            # self.base_image.name = os.path.join(new_filename)
            super().save(*args, **kwargs)
        else:
            super().save(*args, **kwargs)


class CardType(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    color = models.CharField(max_length=10, default="black")
    type_image = models.ImageField(upload_to='card_types/')

    def __str__(self):
        return "title: " + self.title

    def save(self, *args, **kwargs):
        super().save()
        image = Image.open(self.type_image.path)
        if image.height > 200 or image.height > 200:
            new_img = (200, 200)
            image.thumbnail(new_img)
            image.save(self.type_image.path)


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    owner_card = models.ForeignKey(
        'Card', related_name='owner_card', on_delete=models.CASCADE)
    desired_card = models.ForeignKey(
        'Card', related_name='desired_card', on_delete=models.CASCADE, blank=True, null=True)
    transaction_type = models.CharField(
        max_length=20, choices=TRANSACTION_TYPES)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if (self.desired_card):
            return f"{self.user.username} - {self.transaction_type} - Owner Card:{self.owner_card.name} - Desired Card: {self.desired_card.name}"
        else:
            return f"{self.user.username} - {self.transaction_type} - Owner Card:{self.owner_card.name}"


class TransactionHistory(models.Model):
    user = models.ForeignKey(
        User, related_name='history_card_seller_trader', on_delete=models.SET_NULL, blank=True, null=True)
    buyer = models.ForeignKey(
        User, related_name='history_card_buyer', on_delete=models.SET_NULL, blank=True, null=True)
    owner_card = models.ForeignKey(
        Card, related_name='history_owner_card', on_delete=models.SET_NULL, blank=True, null=True)
    desired_card = models.ForeignKey(
        Card, related_name='history_desired_card', on_delete=models.SET_NULL, blank=True, null=True)
    transaction_type = models.CharField(
        max_length=20, choices=TRANSACTION_TYPES)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if (self.desired_card):
            return f"{self.user.username} - {self.transaction_type} - Owner Card:{self.owner_card.name} - Desired Card: {self.desired_card.name}"
        else:
            return f"{self.user.username} - {self.transaction_type} - Owner Card:{self.owner_card.name}"


@receiver(pre_delete, sender=Card)
def delete_card_image(sender, instance, **kwargs):
    # Check if the instance has a picture and delete it
    if instance.base_image:
        if os.path.isfile(instance.base_image.path):
            os.remove(instance.base_image.path)


@receiver(pre_delete, sender=CardType)
def delete_cardtype_image(sender, instance, **kwargs):
    # Check if the instance has a picture and delete it
    if instance.type_image:
        if os.path.isfile(instance.type_image.path):
            os.remove(instance.type_image.path)
