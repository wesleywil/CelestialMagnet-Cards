from django.urls import path
from .views import (
    CardsView,
    CardPostView,
    CardDetailsView,
    CardDetailsUpdateView,
    CardsTypeView,
    CardTypePostView,
    CardTypeDetailsView,
    CardTypeDetailsUpdateView,
    TransactionViewSet,
    TransactionDetailsViewSet,

)

app_name = "cards_apis"

urlpatterns = [
    # Cards
    path('', CardsView.as_view(), name='list_cards'),
    path('create/', CardPostView.as_view(), name='create_card'),
    path('<int:pk>/', CardDetailsView.as_view(), name='details_card'),
    path('<int:pk>', CardDetailsUpdateView.as_view(), name='update_delete_card'),
    # Card Types
    path('types/', CardsTypeView.as_view(), name='list_card_types'),
    path('types/', CardTypePostView.as_view(), name='create_card_types'),
    path('types/<int:pk>/', CardTypeDetailsView.as_view(),
         name='details_card_types'),
    path('types/<int:pk>/', CardTypeDetailsUpdateView.as_view(),
         name='update_delete_card_types'),
    # Transactions
    path('transactions/', TransactionViewSet.as_view(), name='transactions'),
    path('transactions/<int:pk>/', TransactionDetailsViewSet.as_view(),
         name='details_transactions')
]
