from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EntriesViewSet

router = DefaultRouter()
router.register(r'entries', EntriesViewSet, basename='entries')

urlpatterns = [
    path('', include(router.urls)),
] 