from django.shortcuts import render
from django.http.response import HttpResponse
from django.views import View
from django.utils import timezone


from .models import *

import json

# 予想一覧を取得する
def get_predicts(product_id):

    ret_predictions = []
    predictions = Prediction.objects.filter(product_id=product_id)
    for prediction in predictions:
        array_prediction = {
            'prediction_id': prediction.id, 
            'product_id': prediction.product.id, 
            'content': prediction.content, 
            'user_id': prediction.user.id,
            'user_name': prediction.user.username,
            'likes': prediction.likes,
            'votes': prediction.votes,
            'replies': prediction.reply_set.count(),
        }
        ret_predictions.append(array_prediction)

    return ret_predictions

# 予想一覧を取得する
def get_predict_by_id(product_id, predict_id):

    ret_predictions = []
    predictions = Prediction.objects.filter(id=predict_id, product_id=product_id)
    for prediction in predictions:
        ret_replies = []
        for reply in prediction.reply_set.all():
            array_reply = {
                'content': reply.content,
                'user_id': reply.user.id,
                'user_name': reply.user.username,
                'likes': reply.likes,
            }
            ret_replies.append(array_reply)

        array_prediction = {
            'prediction_id': prediction.id, 
            'product_id': prediction.product.id, 
            'content': prediction.content, 
            'user_id': prediction.user.id,
            'user_name': prediction.user.username,
            'likes': prediction.likes,
            'votes': prediction.votes,
            'replies_list': ret_replies,
            'replies_number': prediction.reply_set.count(),
        }
        ret_predictions.append(array_prediction)

    return ret_predictions

def get_predicts_ranking(product_id):
    selected_ls = get_predicts(product_id=product_id)
    sorted_ls =  sorted(selected_ls, key=lambda x: x['likes'], reverse=True)
    return sorted_ls

# 予想を追加する
def store_predict(recieve_data):

    # データを登録した時刻
    current_date = timezone.now()

    # データの登録
    prediction = Prediction(product_id=recieve_data['product_id'], content=recieve_data['content'], user_id=recieve_data['user_id'], likes=0, votes=0, created_at=current_date, updated_at=current_date)
    prediction.save()

# いいねを追加する
def store_like(recieve_data):

    prediction = Prediction.objects.get(id=recieve_data['predict_id'])
    prediction.likes += 1
    prediction.save()

# 一票追加する
def store_vote(recieve_data):

    prediction = Prediction.objects.get(id=recieve_data['predict_id'])
    prediction.votes += 1
    prediction.save()


class Predict(View):
    def get(self, request, product_id, *args, **kwargs):
        # predictリストを生成
        predicts = get_predicts(product_id=product_id) 

        # JSON形式に整形
        send_data = {
            'predicts' : predicts
        }
        
        return HttpResponse(json.dumps(send_data), status=200)


    def post(self, request, *args, **kwargs):
        # postされたデータをJSONに変換
        recieve_data = json.loads(request.body)
        print(recieve_data)

        # 指定されたキーが存在するか確認
        if recieve_data.keys() >= {'content', 'user_id', 'product_id'}:
            status = 200
            send_data = {'message': 'success'}
        else:
            status = 500
            send_data = {'message': "KeyError: 'content', 'user_id', 'product_id' is required"}

        # postされたデータをデータベースへ登録する処理
        store_predict(recieve_data)

        return HttpResponse(json.dumps(send_data), status=status)
        
class Predict_by_id(View):
    def get(self, request, product_id, predict_id, *args, **kwargs):
        # send_data = get_predict_by_id(product_id=product_id, predict_id=predict_id) 
        print(f"product_id:{product_id} predict_id:{predict_id}")
        send_data = get_predict_by_id(product_id=product_id, predict_id=predict_id)

        return HttpResponse(json.dumps(send_data), status=200)

class Predict_like(View):
    def post(self, request, *args, **kwargs):
        # postされたデータをJSONに変換
        recieve_data = json.loads(request.body)
        print(recieve_data)

        # 指定されたキーが存在するか確認
        if recieve_data.keys() >= {'like', 'predict_id', 'user_id'}:
            status = 200
            send_data = {'message': 'success'}
        else:
            status = 500
            send_data = {'message': "KeyError: 'like', 'predict_id', 'user_id' is required"}

        # postされたデータをデータベースへ登録する処理
        store_like(recieve_data)

        return HttpResponse(json.dumps(send_data), status=status)

class Predict_vote(View):
    def post(self, request, *args, **kwargs):
        # postされたデータをJSONに変換
        recieve_data = json.loads(request.body)
        print(recieve_data)

        # 指定されたキーが存在するか確認
        if recieve_data.keys() >= {'predict_id', 'user_id'}:
            status = 200
            send_data = {'message': 'success'}
        else:
            status = 500
            send_data = {'message': "KeyError: 'predict_id', 'user_id' is required"}

        store_vote(recieve_data)

        return HttpResponse(json.dumps(send_data), status=status)


class Predict_ranking(View):
    def get(self, request, product_id, *args, **kwargs):
        # predictリストを生成
        predicts = get_predicts_ranking(product_id=product_id) 

        # JSON形式に整形
        send_data = {
            'predicts' : predicts
        }
        
        return HttpResponse(json.dumps(send_data), status=200)
