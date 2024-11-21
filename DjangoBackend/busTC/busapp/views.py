from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def search_bus(request):
    if request.method == 'POST':
        # Handle bus search logic
        return JsonResponse({'message': 'Bus search successful'})

@csrf_exempt
def register(request):
    if request.method == 'POST':
        # Handle user registration logic
        return JsonResponse({'message': 'User registered'})


@csrf_exempt
def login(request):
    if request.method == 'POST':
        # Handle login logic
        return JsonResponse({'message': 'User logged in'})
