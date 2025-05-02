from django.test import TestCase
from .models import CustomUser

class CustomUserModelTest(TestCase):
    def setUp(self):
        # Create a user with a unique email
        self.user1 = CustomUser.objects.create_user(
            username="john",
            email="john@example.com",
            password="password123"
        )

    def test_duplicate_username_different_email(self):
        # Create another user with the same username but a different email
        user2 = CustomUser.objects.create_user(
            username="john",
            email="john.doe@example.com",
            password="password123"
        )
        self.assertEqual(CustomUser.objects.count(), 2)
        self.assertEqual(user2.username, "john")
        self.assertEqual(user2.email, "john.doe@example.com")

    def test_duplicate_email(self):
        # Attempt to create a user with a duplicate email
        with self.assertRaises(Exception):
            CustomUser.objects.create_user(
                username="jane",
                email="john@example.com",  # Duplicate email
                password="password123"
            )
