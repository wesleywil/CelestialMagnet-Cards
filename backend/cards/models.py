from django.db import models
from accounts.models import User


class Card(models.Model):
    TIER_CHOICES = (
        ('bronze', 'Bronze'),
        ('silver', 'Silver'),
        ('golden', 'Golden'),
        ('black_diamond', 'Black Diamond')
    )
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100, unique=True)
    tier = models.CharField(max_length=20, choices=TIER_CHOICES)
    card_type = models.CharField(max_length=50)
    description = models.TextField()
    base_image = models.ImageField(upload_to='card_bases/')
    frame_image = models.ImageField(upload_to='card_frames/')

    def __str__(self):
        return 'Card: ' + self.name

    # def save(self, *args, **kwargs):
    #     frame_images = {
    #         'bronze': 'path_to_bronze_frame_image.png',
    #         'silver': 'path_to_silver_frame_image.png',
    #         'golden': 'path_to_golden_frame_image.png',
    #         'black_diamond': 'path_to_black_diamond_frame_image.png',
    #     }
    #     if not self.pk:  # Check if the card is being created (not updated)
    #         self.frame_image = frame_images.get(self.tier)
    #     super((Card, self).save(*args, **kwargs))


class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('purchase', 'Purchase'),
        ('trade', 'Trade')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey('Card', on_delete=models.CASCADE)
    transaction_type = models.CharField(
        max_length=20, choices=TRANSACTION_TYPES)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} - {self.card.name}"
