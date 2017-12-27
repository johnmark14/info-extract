from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from login_app.forms import SignUpForm

from django.contrib.auth import authenticate, login, logout

# Create your views here.

# logout/
def user_logout(request):
    logout(request)
    return redirect('login_app:user_login')

# Login Page/
def login_app(request):

    if request.method == "POST":

        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username = username, password = password)

        if user:

            if user.is_active:

                login(request,user)

                return HttpResponseRedirect(reverse('main_page:index'))
            else:
                return render(request, 'login_app/login.html')
        else:
            print("User or password are not in the database!")
            return render(request, 'login_app/login.html', {'msg':'User or password are not in the database!'})

    else:
        
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse('main_page:index'))

        user_form = SignUpForm()

        return render(request,'login_app/login.html')

# Signup Page/
def sign_up(request):

    registered = False

    if request.method == 'POST':

        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        user_form = SignUpForm(data=request.POST)

        if user_form.is_valid():

            if password1 == password2:

                user = user_form.save()

                user.set_password(password1)

                user.save()

                login(request, user)

                registered = True

                user_form = SignUpForm()

                return render(request,'login_app/signup.html', {'user_form':user_form, 'registered':registered, 'mismatch':False, 'ok':True})
            else:

                print('User password did not match!')
                return render(request,'login_app/signup.html', {'user_form':user_form, 'registered':registered, 'mismatch':True})
        else:
            print(user_form.errors)
            return render(request,'login_app/signup.html', {'user_form':user_form, 'registered':registered, 'mismatch':False})
    else:

        user_form = SignUpForm()
        return render(request,'login_app/signup.html', {'user_form':user_form, 'registered':registered, 'mismatch':False})