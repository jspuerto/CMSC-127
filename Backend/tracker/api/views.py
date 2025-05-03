from rest_framework import viewsets, permissions
from rest_framework.response import Response
from ..models import Entries
from .serializers import EntriesSerializer

class EntriesViewSet(viewsets.ModelViewSet):
    serializer_class = EntriesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Entries.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 