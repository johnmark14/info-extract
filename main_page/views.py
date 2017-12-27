from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.

# main_page/
class HomePage(LoginRequiredMixin, TemplateView):

    template_name = 'main_page/index.html'