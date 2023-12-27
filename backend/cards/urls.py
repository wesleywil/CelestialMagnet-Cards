from django.urls import path
from .views import (
    CardsView,
    CardsByNameView,
    CardUserView,
    CardPostView,
    CardDetailsView,
    CardDetailsUpdateView,
    CardsTypeView,
    CardTypePostView,
    CardTypeDetailsView,
    CardTypeDetailsUpdateView,
    TransactionListView,
    TransactionDetailsView,
    TransactionViewSet,
    TransactionDetailsViewSet,
    CardSellView,
    CardTradeView
)

app_name = "cards_apis"

urlpatterns = [
    # Cards
    path('', CardsView.as_view(), name='list_cards'),
    path('search/', CardsByNameView.as_view(), name='search_cards'),
    path('usercards/', CardUserView.as_view(), name='list_user_cards'),
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
    path('transactions/', TransactionListView.as_view(), name='transactions'),
    path('transactions/<int:pk>/', TransactionDetailsView.as_view(),
         name='details_transactions'),
    path('transactions/user/', TransactionViewSet.as_view(),
         name='user_transactions'),
    path('transactions/user/<int:pk>/', TransactionDetailsViewSet.as_view(),
         name='details_transactions'),
    # Trade & Sell
    path('sell/', CardSellView.as_view(), name='card_sell'),
    path('trade/', CardTradeView.as_view(), name='card_trade')

]
