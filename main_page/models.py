from django.db import models

# Create your models here.
class CategoriesCount(models.Model):
    n_casualty_damage       =   models.IntegerField(default=0)
    n_caution_advise        =   models.IntegerField(default=0)
    n_donation              =   models.IntegerField(default=0)
    n_other                 =   models.IntegerField(default=0)

    def __str__(self):
        return "Category Counts"

class CasualtyDamage(models.Model):
    cd_tweet                =   models.TextField()
    cd_location             =   models.TextField(blank=True,null=True)
    cd_tweet_date           =   models.DateTimeField(blank=True,null=True)

    def __str__(self):
        return "Casualty & Damage"

class CautionAdvise(models.Model):
    cd_tweet                =   models.TextField()
    cd_location             =   models.TextField(blank=True,null=True)
    cd_tweet_date           =   models.DateTimeField(blank=True,null=True)

    def __str__(self):
        return "Caution & Advise"

class Donation(models.Model):
    cd_tweet                =   models.TextField()
    cd_location             =   models.TextField(blank=True,null=True)
    cd_tweet_date           =   models.DateTimeField(blank=True,null=True)

    def __str__(self):
        return "Donation"

class Other(models.Model):
    cd_tweet                =   models.TextField()
    cd_location             =   models.TextField(blank=True,null=True)
    cd_tweet_date           =   models.DateTimeField(blank=True,null=True)

    def __str__(self):
        return "Other"
