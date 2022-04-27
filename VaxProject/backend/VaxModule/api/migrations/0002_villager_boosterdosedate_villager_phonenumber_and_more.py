# Generated by Django 4.0.3 on 2022-04-15 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='villager',
            name='BoosterDoseDate',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='villager',
            name='PhoneNumber',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
        migrations.AlterField(
            model_name='villager',
            name='AadharNumber',
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='villager',
            name='CovidStatus',
            field=models.CharField(choices=[('+', 'Positive'), ('-', 'Negative'), ('*', 'At Risk')], default='-', max_length=1),
        ),
        migrations.AlterField(
            model_name='villager',
            name='Gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Others')], max_length=1),
        ),
        migrations.AlterField(
            model_name='villager',
            name='Vaccination',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]