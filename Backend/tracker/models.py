from django.db import models
from django.contrib.auth.models import User

class Entries(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    type = models.CharField(max_length=50, choices=[('income', 'Income'), ('expense', 'Expense')])
    category = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
