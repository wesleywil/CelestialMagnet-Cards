from django.contrib import admin
from .models import Card, CardType, Transaction

admin.site.register(Card)
admin.site.register(CardType)
admin.site.register(Transaction)
