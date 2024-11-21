from django.urls import path
from . import views

urlpatterns = [
    path('searchbus/', views.search_bus, name='search_bus'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
]

