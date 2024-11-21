

# Create your models here.
from django.db import models


class Bus(models.Model):
    bus_number = models.CharField(max_length=50)
    route = models.CharField(max_length=100)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()


class Booking(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    passenger_name = models.CharField(max_length=100)
    seat_number = models.IntegerField()
    booking_time = models.DateTimeField(auto_now_add=True)



class Post(models.Model):
    title=models.CharField(maxlength=200)
    body=models.TextField()

    def __str__(self):
        return f'Post:{self.title}'
