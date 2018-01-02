from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import FormView
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from main_page.forms import ClassifyForm
from main_page.models import CategoriesCount, CasualtyDamage, CautionAdvise, Donation, Other
from textblob.classifiers import NaiveBayesClassifier

# Categorization
train = [ ('I love this sandwich.', 'Positive'),
('this is an amazing place!', 'Positive'),
('I feel very good about these beers.', 'Positive'),
('this is my best work.', 'Positive'),
('what an awesome view', 'Positive'),
('I do not like this restaurant', 'Negative'),
('I am tired of this stuff.', 'Negative'),
("I can't daeal with this stuff", 'Negative'),
('he is my sworn enemy!', 'Negative'),
('my boss is horrible','Negative')]

test = [('the beer was good.', 'Positive'),
('I do not enjoy my job', 'Negative'),
("I ain't feeling dandy today", 'Negative'),
("Gary is a griend of mine", 'Positive'),
("I can't believe I'm doing this.", 'Negative')]


cl = NaiveBayesClassifier(train)

# Home/
class MainPage(LoginRequiredMixin, FormView):

    form_class      =   ClassifyForm
    template_name   =   'main_page/index.html'
    success_url     =   '/form-success/'

    def get(self, request):
        form = ClassifyForm()
        cat_count       =   CategoriesCount.objects.all()

        if self.request.is_ajax():
            data        =   {'cd'       :   cat_count[0].n_casualty_damage,
                            'ca'        :   cat_count[0].n_caution_advise,
                            'donation'  :   cat_count[0].n_donation,
                            'other'     :   cat_count[0].n_other}
            return JsonResponse(data)
        else:
            return render(request, self.template_name ,{'form':form})

        return render(request, self.template_name ,{'form':form})

    def form_invalid(self, form):
        response        =   super(MainPage, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        response        =   super(MainPage, self).form_valid(form)
        if self.request.is_ajax():
            text_to_classify        =   form.cleaned_data.get('txttext')
            text_result             =   cl.classify(text_to_classify)
            text_features           =   0.01 * len(cl.extract_features(text_to_classify).keys())
            text_accuracy           =   round(cl.accuracy(test),2)
            prob_dist               =   cl.prob_classify(text_to_classify)
            text_prob_dist          =   round(prob_dist.prob(prob_dist.max()),2)
            
            print(text_result)
            print(text_prob_dist)
            print(text_accuracy)
            print(text_features)

            data = {
                'result'        :   text_result,
                'features'      :   text_features,
                'accuracy'      :   text_accuracy,
                'prob_dist'     :   text_prob_dist
            }

            return JsonResponse(data)
        else:
            return response
    
    

    
'''
@login_required
def index(request)

        if request.method == "POST":
            form = Classify(request.POST)

            if form.is_valid():

                classify_text = form.cleaned_data.get('txttext')

                result = cl.classify(classify_text)
            
            return render(request, 'main_page/index.html', {'form_classify':form,'result':result})

        else:
            form_classify = Classify()
            return render(request, 'main_page/index.html',{'form_classify': form_classify})
        '''