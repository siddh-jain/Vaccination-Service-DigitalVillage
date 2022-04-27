from statistics import mode
from django.db import models
# from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Villager(models.Model):
    GENDERS = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other')
    ]

    STATUS = [
        ('Positive', 'Positive'),
        ('Negative', 'Negative'),
        ('At Risk', 'At Risk')
    ]

    VillagerID = models.AutoField(primary_key=True, serialize=False)
    TimeAdded = models.DateTimeField(null=True, blank=True)
    VillagerName = models.CharField(max_length=500)
    AadharNumber = models.CharField(unique = True, max_length=20,blank=False)
    PhoneNumber = models.CharField(blank=True, null =True, max_length=12)
    Gender = models.CharField(max_length=10, blank=False, null=False, choices=GENDERS)
    CovidStatus = models.CharField(choices=STATUS, default='Negative', max_length=10)    
    Vaccination = models.CharField(blank =True, null =True, max_length=20)
    FirstDoseDate = models.DateField(null=True)
    SecondDoseDate= models.DateField(null=True)
    BoosterDoseDate = models.DateField(null=True)
    Email = models.EmailField(blank =True, null = True)



