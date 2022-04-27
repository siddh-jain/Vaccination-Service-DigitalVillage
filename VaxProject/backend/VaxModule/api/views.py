from asyncio.windows_events import NULL
from django.shortcuts import render
from django.utils.dateparse import parse_date
import datetime
# Create your views here.

from django.http import HttpResponse

from api.models import Villager
from api.serializers import VillagerSerializer

from rest_framework.parsers import JSONParser

from rest_framework.exceptions import (
    PermissionDenied,
    ValidationError,
    NotFound,
)
from rest_framework.views import APIView

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from rest_framework import generics
import random
import string
import json

from django.views.decorators.csrf import csrf_exempt
import django.db

import base64
from django.http.response import JsonResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def list(request):
    if request.method == 'GET':
        villager = Villager.objects.all()
        print("---------", villager)
        villager_serializer = VillagerSerializer(villager, many=True)
        print(villager_serializer.data)
        return JsonResponse(villager_serializer.data, safe=False)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def find(request):
    err = {}
    if "AadharNumber" not in request.data:
        err["AadharNumber"] = ["This field is required."]
        return JsonResponse(err, safe=False)
    villager = Villager.objects.get(AadharNumber=request.data["AadharNumber"])
    print("---------", villager)
    villager_serializer = VillagerSerializer(villager, many=False)
    # print(type(villager_serializer.data["FirstDoseDate"]))
    return JsonResponse(villager_serializer.data, safe=False)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def add(request):
    data = request.data
    err = {}
    if "AadharNumber" not in request.data:
        err["AadharNumber"] = ["This field is required."]
    if "PhoneNumber" not in request.data:
        err["PhoneNumber"] = ["This field is required."]
    if "VillagerName" not in request.data:
        err["VillagerName"] = ["This field is required."]
    if "Email" not in request.data:
        err["Email"] = ["This field is required."]
    if "Gender" not in request.data:
        err["Gender"] = ["This field is required."]
    elif data["Gender"] not in ('Male', 'Female', 'Other'):
        err["Gender"] = ["Cannot be empty"]
    if err:
        return JsonResponse(err, safe=False)
    new_user = Villager(
        VillagerName=data["VillagerName"],
        TimeAdded=datetime.datetime.now(),
        AadharNumber=data["AadharNumber"],
        PhoneNumber=data["PhoneNumber"],
        Email=data["Email"],
        Gender=data["Gender"]
    )
    new_user.save()

    ser = VillagerSerializer(new_user)
    return JsonResponse(ser.data["VillagerName"] + "created", safe=False)


@api_view(["DELETE"])
@authentication_classes([])
@permission_classes([])
def delete(request):
    err = {}
    if "AadharNumber" not in request.data:
        err["AadharNumber"] = ["This field is required."]
        return JsonResponse(err, safe=False)
    Villager.objects.filter(AadharNumber=request.data["AadharNumber"]).delete()
    return JsonResponse(request.data["AadharNumber"] + " deleted", safe=False)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def edit(request):
    data = request.data
    err = {}
    if "AadharNumber" not in request.data:
        err["AadharNumber"] = ["This field is required."]
    if "PhoneNumber" not in request.data:
        err["PhoneNumber"] = ["This field is required."]
    if "Email" not in request.data:
        err["Email"] = ["This field is required."]
    if "CovidStatus" not in request.data:
        err["CovidStatus"] = ["This field is required."]
    if "Vaccination" not in request.data:
        err["Vaccination"] = ["This field is required."]
    if "FirstDoseDate" not in request.data:
        err["FirstDoseDate"] = ["This field is required."]
    if "SecondDoseDate" not in request.data:
        err["SecondDoseDate"] = ["This field is required."]
    if "BoosterDoseDate" not in request.data:
        err["BoosterDoseDate"] = ["This field is required."]
    if err:
        return JsonResponse(err, safe=False)

    t = Villager.objects.filter(AadharNumber=request.data["AadharNumber"]).update(PhoneNumber=data["PhoneNumber"],
                                                                                  Email=data["Email"],
                                                                                  CovidStatus=data["CovidStatus"],
                                                                                  Vaccination=data["Vaccination"],
                                                                                  FirstDoseDate=parse_date(
                                                                                      data["FirstDoseDate"]),
                                                                                  SecondDoseDate=parse_date(
                                                                                      data["SecondDoseDate"]),
                                                                                  BoosterDoseDate=parse_date(
                                                                                      data["BoosterDoseDate"])
                                                                                  )

    return JsonResponse(str(t) + " edited", safe=False)
