from rest_framework import serializers
from ..models import Entries

class EntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entries
        fields = ['id', 'user', 'title', 'amount', 'date', 'type', 'category', 'description']
        read_only_fields = ['user']