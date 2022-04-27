from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('villagers/', views.list, name ="list"),
    path('find/', views.find, name="find"),
    path('add/', views.add, name="add"),
    path('edit/', views.edit, name="edit"),
    path('delete/', views.delete, name="delete")
]