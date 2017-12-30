from django import forms

class ClassifyForm(forms.Form):
    txttext = forms.CharField(label ="Enter text to classify", label_suffix="", widget=forms.TextInput(attrs={'class':'form-control', 'id':'txttext', 'placeholder':'Classify'}))