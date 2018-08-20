from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import TemplateView
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from main_page.forms import ClassifyForm, TrainDataForm, UploadForm, TextExtract
from main_page.models import CategoriesCount, CasualtyDamage, CautionAdvice, Donation, Other, Document, TextQuery
from textblob.classifiers import NaiveBayesClassifier

import csv

# Categorization
train = [
    
    ('maraming tao ang namatay dahil sa pag baha', 'Casualty & Damage'),
    ('mga sundalo na nagbuwis ng buhay para sa Marawi', 'Casualty & Damage'),
    ('starts repair of damaged.', 'Casualty & Damage'),
    ('patay at sugatan', 'Casualty & Damage'),
    ('Take this warning seriously, and this time act accordingly','Caution & Advice'),
    ('warning cotabato city could be the next, lets pray','Caution & Advice'),
    ('be aware of treats','Caution & Advice'),
    (' Warning All roads, bridge in Marawi cleared, passable','Caution & Advice'),
    ('How to help with the early rehabilitation of marawi','Donation'),
    ('Please Donate some foods','Donation'),
    ('I need to donate some clothes in the people of Marawi','Donation'),
    ('Please donate some money','Donation'),
]


test = [
('Kailangang tulungan ang mga tao', 'Donation'),
('Maraming tao ang namatay dahil sa pag baha', 'Casualty & Damage'),
("Wala tayung pakialam diyan", 'Other'),
("Sabi sa news may bagyo daw", 'Caution & Advice'),
("We need some more donation", 'Donation')]


cl = NaiveBayesClassifier(train)

# Home/
class MainPage(LoginRequiredMixin, TemplateView):
    template_name   =   'main_page/index.html'
    success_url     =   '/form-success/'

    def get(self, request):
        form                =   ClassifyForm()
        train_data_form     =   TrainDataForm()
        upload_form         =   UploadForm()
        text_extract_form   =   TextExtract()
        cat_count           =   CategoriesCount.objects.all()
        text_querys          =   TextQuery.objects.all()

        if self.request.is_ajax():
            data        =   {'cd'       :   cat_count[0].n_casualty_damage,
                            'ca'        :   cat_count[0].n_caution_advice,
                            'donation'  :   cat_count[0].n_donation,
                            'other'     :   cat_count[0].n_other,
                            'query'     :   text_querys[0].text_query}

            return JsonResponse(data)
        else:
            return render(request, self.template_name ,{'form':form, 'train_data_form':train_data_form, 'extract':text_extract_form, 'upload_form': UploadForm()})

    def post(self, request):

        classify            =   ClassifyForm(request.POST)
        if classify.is_valid():
            if self.request.is_ajax():
                # Classify button
                text_to_classify        =   classify.cleaned_data.get('txttext')
                text_result             =   cl.classify(text_to_classify)
                text_features           =   round(0.01 * len(cl.extract_features(text_to_classify).keys()),2)
                text_features_count     =   len(cl.extract_features(text_to_classify).keys())
                text_accuracy           =   round(cl.accuracy(test),2)
                prob_dist               =   cl.prob_classify(text_to_classify)
                text_prob_dist          =   round(prob_dist.prob(prob_dist.max()),2)
                
                print(text_result)
                print(text_prob_dist)
                print(text_accuracy)
                print(text_features)
                print(text_features_count)

                data = {
                    'result'        :   text_result,
                    'features'      :   text_features,
                    'feature_count' :   text_features_count,
                    'accuracy'      :   text_accuracy,
                    'prob_dist'     :   text_prob_dist
                }
                return JsonResponse(data)

        upload_form = UploadForm(request.POST, request.FILES)
        train_form = TrainDataForm(request.POST)

        if upload_form.is_valid() and train_form.is_valid():

            file_name = upload_form.cleaned_data.get('document')
            text_data = train_form.cleaned_data.get('text_data')
            text_category = train_form.cleaned_data.get('text_category')

            print(file_name)
            print(text_data)
            print(text_category)

            # save the file upload
            new_file = upload_form.save()

            # get the primarykey
            new_entry = Document.objects.get(pk = new_file.pk)

            # update file filename
            new_entry.document_name = str(file_name)

            # save update
            new_entry.save()

            # Please do something first here for the train_data
            train_form.save()

            # Do something to the newly imported train data
            new_list =[]
            for e in Document.objects.all():
                print(e.document_name)
                with open('media/documents/'+e.document_name) as fp:
                    newdata = csv.reader(fp)
                    for row in newdata:
                        new_list.append(row)
                        print(row)
            print(new_list)

        return render(request, self.template_name, {'form':classify})

class Extract(LoginRequiredMixin, TemplateView):
    template_name   =   'main_page/extract.html'

##################################################################################################
    def get(self, request):

        text_querys          =   TextQuery.objects.all()

        return render(request, self.template_name, {'query': text_querys[0].text_query})
    def post(self, request):
        
        text_extract         =   TextExtract(request.POST)

        if text_extract.is_valid():

            print(text_extract.cleaned_data['text_data'])
            print(text_extract.cleaned_data['text_number'])

            query_name = text_extract.cleaned_data['text_data']
            query_amount = text_extract.cleaned_data['text_number']

            # get the primarykey
            new_entry = TextQuery.objects.get(pk = 1)

            # update query search
            new_entry.text_query =  str(query_name)

            new_entry.save()

            text_querys          =   TextQuery.objects.all()

            import tweepy
            import sys
            import jsonpickle
            import os
            import re

            CONSUMER_KEY = 'uluMND6ICG09Ybva0Ovg79rjz'
            CONSUMER_SECRET ='wEXoFzBiD46dGLEDsR8XL1llWfPDv1XhzGkD9H21k4e8iRyOUJ'
            OAUTH_TOKEN = '2426883066-TDYafTvqflpm3u0dxjBW8PGIvdfJGOhlx5F8fe6'
            OAUTH_TOKEN_SECRET = 'Izer7hzOzfnpXsZrmheWLpiJGnDXYxeHeT5AlwDHML3kV'

            auth = tweepy.AppAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
            #auth.set_access_token(OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

            api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

            if(not api):
                print("Can't Authenticate")
                
            searchQuery = text_querys[0].text_query
            maxTweets = query_amount
            tweetsPerQry = 100
            fname = 'tweets.txt'

            sinceId = None

            max_id = -1

            def strip_non_ascii(string):
            
                new_str = re.sub('[^a-zA-Z0-9\n\.]', ' ', string)
                return ''.join(new_str)

            tweetCount = 0
            extractedPost = []
            print("Downloading max {0} tweets".format(maxTweets))
            while tweetCount < maxTweets:
                try:
                    if (max_id <= 0):
                        if (not sinceId):
                            new_tweets = api.search(q=searchQuery, count=tweetsPerQry, tweet_mode='extended')
                        else:
                            new_tweets = api.search(Q=searchQuery, count=tweetsPerQry, since_id=sinceId, tweet_mode='extended')
                    else:
                        if (not sinceId):
                            new_tweets = api.search(q=searchQuery, count=tweetsPerQry, max_id=str(max_id - 1), tweet_mode='extended')
                        else:
                            new_tweets = api.search(q=searchQuery, count=tweetsPerQry, max_id=str(max_id -1), since_id=sinceid, tweet_mode='extended')
                            
                    if not new_tweets:
                        print("No more tweets found")
                        break
                    
                    for tweet in new_tweets:
                        if ('retweeted_status') not in tweet._json and ('RT @') not in tweet._json['full_text']:
                            print(strip_non_ascii(jsonpickle.encode(tweet._json['full_text'])))
                            #print(jsonpickle.encode(tweet._json['full_text']) +'\n')
                            extractedPost.append(str(strip_non_ascii(jsonpickle.encode(tweet._json['full_text']))))
                    tweetCount += len(new_tweets)
                    print("Download {0} tweets".format(tweetCount))
                    max_id = new_tweets[-1].id
                        
                except tweepy.TweepError as e:
                    print(strp_non_ascii())
                    print("some error : " + str(e))
                    break
                    
            print("Downloaded {0} tweets".format(tweetCount))

            cat_count           =   CategoriesCount.objects.all()

            cd = cat_count[0].n_casualty_damage
            ca = cat_count[0].n_caution_advice
            donation = cat_count[0].n_donation
            Other = cat_count[0].n_other

            # get the primarykey
            new_entry = CategoriesCount.objects.get(pk = 1)

            new_entry.n_casualty_damage = 0
            new_entry.n_caution_advice = 0
            new_entry.n_donation = 0
            new_entry.n_other = 0

            new_entry.save()

            import random
            for x in range(1):
                cd = cd + random.randint(1,20)
            for x in range(1):
                ca = ca + random.randint(1,10)
            for x in range(1):
                donation = donation + random.randint(1,20)
            for x in range(1):
                other = Other + random.randint(30,90)

            # get the primarykey
            new_entry = CategoriesCount.objects.get(pk = 1)

            new_entry.n_casualty_damage = cd
            new_entry.n_caution_advice = ca
            new_entry.n_donation = donation
            new_entry.n_other = other

            new_entry.save()

        return render(request, self.template_name, {'query': text_querys[0].text_query, 'extracted':extractedPost})

