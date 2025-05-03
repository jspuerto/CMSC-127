from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from user.models import CustomUser
from .models import Entries
from datetime import date

class EntriesAPITestCase(TestCase):
    def setUp(self):
        # Create test users
        self.user1 = CustomUser.objects.create_user(
            email='test1@example.com',
            username='testuser1',
            password='testpass123'
        )
        self.user2 = CustomUser.objects.create_user(
            email='test2@example.com',
            username='testuser2',
            password='testpass123'
        )
        
        # Create test entries
        self.entry1 = Entries.objects.create(
            user=self.user1,
            title='Test Entry 1',
            amount=100.00,
            date=date.today(),
            type='income',
            category='Salary',
            description='Test description 1'
        )
        
        self.entry2 = Entries.objects.create(
            user=self.user2,
            title='Test Entry 2',
            amount=200.00,
            date=date.today(),
            type='expense',
            category='Food',
            description='Test description 2'
        )
        
        # Set up API client
        self.client = APIClient()
        
    def test_list_entries_authenticated(self):
        """Test that authenticated users can list their entries"""
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(reverse('entries-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Should only see their own entries
        
    def test_create_entry(self):
        """Test creating a new entry"""
        self.client.force_authenticate(user=self.user1)
        data = {
            'title': 'New Entry',
            'amount': 300.00,
            'date': date.today(),
            'type': 'income',
            'category': 'Bonus',
            'description': 'New test entry'
        }
        response = self.client.post(reverse('entries-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Entries.objects.count(), 3)  # Original 2 + new 1
        
    def test_retrieve_entry(self):
        """Test retrieving a specific entry"""
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(reverse('entries-detail', args=[self.entry1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Entry 1')
        
    def test_cannot_retrieve_other_users_entry(self):
        """Test that users cannot retrieve other users' entries"""
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(reverse('entries-detail', args=[self.entry2.id]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_update_entry(self):
        """Test updating an entry"""
        self.client.force_authenticate(user=self.user1)
        data = {
            'title': 'Updated Entry',
            'amount': 150.00,
            'date': date.today(),
            'type': 'expense',
            'category': 'Updated Category',
            'description': 'Updated description'
        }
        response = self.client.put(reverse('entries-detail', args=[self.entry1.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.entry1.refresh_from_db()
        self.assertEqual(self.entry1.title, 'Updated Entry')
        
    def test_delete_entry(self):
        """Test deleting an entry"""
        self.client.force_authenticate(user=self.user1)
        response = self.client.delete(reverse('entries-detail', args=[self.entry1.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Entries.objects.count(), 1)  # Only entry2 should remain
        
    def test_cannot_delete_other_users_entry(self):
        """Test that users cannot delete other users' entries"""
        self.client.force_authenticate(user=self.user1)
        response = self.client.delete(reverse('entries-detail', args=[self.entry2.id]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Entries.objects.count(), 2)  # Both entries should still exist