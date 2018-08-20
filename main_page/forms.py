from django import forms
from main_page.models import Document, ManualCategory

CATEGORY_CHOICES = [
    ('CD', 'Casualty & Damage'),
    ('CA', 'Caution & Advise'),
    ('DONATION', 'Donation'),
    ('OTHER', 'Other')
]

class ClassifyForm(forms.Form):
    txttext         =   forms.CharField(label="Enter text to classify", label_suffix="", widget=forms.TextInput(attrs={'class':'form-control', 'id':'txttext', 'placeholder':'Classify'}))

class TrainDataForm(forms.ModelForm):
    text_data       =   forms.CharField(label='Sample text:',widget=forms.TextInput(attrs={'class':'form-control','placeholder':'text'}))
    text_category   =   forms.CharField(label="Select Category", widget=forms.Select(choices=CATEGORY_CHOICES, attrs={'class':'custom-select'}))

    class Meta():
        model       =   ManualCategory
        fields      =   ('text_data', 'text_category')

class UploadForm(forms.ModelForm):
  
    document        =   forms.FileField(label="Upload file:", widget=forms.FileInput(attrs={'class':'form-control-file'}))

    class Meta():
        model       =   Document
        fields      =   ('document',)

class TextExtract(forms.Form):
    text_data       =   forms.CharField(label='Extract:',widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Keyword, Hashtags'}))
    text_number     =   forms.IntegerField(label='Number of Post:',widget=forms.NumberInput(attrs={'class':'form-control','placeholder':'Amount of post to extract'}))
