from django.db import models
from django.contrib.auth.models import User

class List(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null=False, blank=False)


class Item(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    content = models.TextField(max_length=30, blank=False, null=False)
    status = models.BooleanField(default=False)