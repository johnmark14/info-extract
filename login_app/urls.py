from django.conf.urls import url
from login_app import views

# NAMESPACE
app_name = 'login_app'

urlpatterns = [
    url(r'^user_login/', views.login_app, name='user_login'),
    url(r'^user_signup/$', views.sign_up, name='user_signup'),
    url(r'^user_logout/$', views.user_logout, name='user_logout'),
]