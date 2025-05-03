from rest_framework import viewsets
from rest_framework.exceptions import ValidationError, PermissionDenied
from ..models import BudgetCategory
from .serializers import BudgetCategorySerializer
from rest_framework.permissions import IsAuthenticated
from user.models import CustomUser  
 
class BudgetCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetCategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.request.headers.get('username') or self.request.META.get('HTTP_USERNAME')
        if not username:
            raise PermissionDenied("Username header is required")
        
        user = CustomUser.objects.filter(username__iexact=username).first()
        if not user:
            raise PermissionDenied("User not found")
            
        return BudgetCategory.objects.filter(user=user)

    def perform_create(self, serializer):
        username = self.request.headers.get('username') or self.request.META.get('HTTP_USERNAME')
        if not username:
            raise PermissionDenied("Username header is required")
            
        user = CustomUser.objects.filter(username__iexact=username).first()
        if not user:
            raise PermissionDenied("User not found")
            
        serializer.save(user=user)