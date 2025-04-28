from django.db import models
from django.contrib.auth.models import User


class Entry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Remove null=True
    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    category = models.CharField(max_length=255, blank=False, null=False, default='General')  # Optional category field
    type = models.CharField(
        max_length=50,
        choices=[('income', 'Income'), ('expense', 'Expense')],
        db_index=True,  # Add an index for faster queries on this field
    )
    description = models.TextField(blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['date']),  # Add an index for the `date` field
        ]
        ordering = ['-date']  # Default ordering by date (descending)

    def __str__(self):
        return f"{self.title} - {self.amount} - {self.date}"


class UserBudget(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Budget: {self.total_budget}"