from django.urls import path
from .views import RegisterView, LoginView, UserList
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserList.as_view(), name='user-list'),
]