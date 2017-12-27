from django.conf.urls import url
from main_page import views

# NAMESPACE
app_name = 'main_page'

urlpatterns = [
    url(r'^$', views.HomePage.as_view(), name='index'),
]