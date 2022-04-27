# from dataclasses import field
# from pyexpat import model
# from matplotlib.pyplot import cla
from rest_framework import serializers

from api.models import Villager

class VillagerSerializer(serializers.ModelSerializer):
    class  Meta :
        model = Villager
        fields=('VillagerID', 'TimeAdded', 'VillagerName', 'AadharNumber', 'PhoneNumber', 'Gender', 'CovidStatus', 'Vaccination', 'FirstDoseDate','SecondDoseDate', 'BoosterDoseDate', 'Email')
