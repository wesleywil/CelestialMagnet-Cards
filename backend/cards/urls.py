from django.urls import path
from .views import (
    CardsView,
    CardPostView,
    CardDetailsView,
    CardDetailsUpdateView,
    TransactionViewSet,
    TransactionDetailsViewSet,

)

app_name = "cards_apis"

urlpatterns = [
    path('/', CardsView.as_view(), name='list_cards'),
    path('/', CardPostView.as_view(), name='create_card'),
    path('/<int:pk>/', CardDetailsView.as_view(), name='details_card'),
    path('/<int:pk>', CardDetailsUpdateView.as_view(), name='update_delete_card'),
    path('/transactions/', TransactionViewSet.as_view(), name='transactions'),
    path('/transactions/<int:pk>/', TransactionDetailsViewSet.as_view(),
         name='details_transactions')
]
