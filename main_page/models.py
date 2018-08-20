from django.db import models

# Create your models here.
class CategoriesCount(models.Model):
    n_casualty_damage       =   models.IntegerField(default=0)
    n_caution_advice        =   models.IntegerField(default=0)
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

class CautionAdvice(models.Model):
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

class Document(models.Model):

    document_name           =   models.TextField(default="data")
    document                =   models.FileField(upload_to='documents/')
    uploaded_at             =   models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.document_name

class ManualCategory(models.Model):
    text_data               =   models.TextField()
    text_category           =   models.TextField()

    def __str__(self):
        return self.text_data

class TextQuery(models.Model):
    text_query              =   models.TextField()

    def __str__(self):
        return self.text_query