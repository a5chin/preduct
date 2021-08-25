from django.shortcuts import render
from django.http.response import HttpResponse
from django.views import View
from django.utils import timezone

from .models import *


import json

def get_replies(predict_id):
    ret_replies = []
    replies = Reply.objects.filter(prediction_id=predict_id)
    for reply in replies:
        array_reply = {
            'content': reply.content, 
            'user_id': reply.user.id,
            'user_name': reply.user.username,
            'likes': reply.likes,
        }
        ret_replies.append(array_reply)

    return ret_replies

def store_reply(recieve_data):
    
    # データを登録した時刻
    current_date = timezone.now()

    # データの登録
    product = Reply(
        content = recieve_data['content'],
        prediction_id = recieve_data['predict_id'],
        user_id = recieve_data['user_id'],
        likes = 0,
        created_at = current_date,
        updated_at = current_date,
    )
    product.save()

# いいねを追加する
def store_like(recieve_data):

    reply = Reply.objects.get(id=recieve_data['reply_id'])
    reply.likes += 1
    reply.save()

class Reply_view(View):
    def get(self, request, predict_id, *args, **kwargs):
        # predictリストを生成
        replys = get_replies(predict_id=predict_id) 

        # JSON形式に整形
        send_data = {
            'replys' : replys
        }
        
        return HttpResponse(json.dumps(send_data), status=200)


    def post(self, request, *args, **kwargs):
        # postされたデータをJSONに変換
        recieve_data = json.loads(request.body)
        print(recieve_data)

        # 指定されたキーが存在するか確認
        if recieve_data.keys() >= {'content', 'user_id', 'predict_id'}:
            status = 200
            send_data = {'message': 'success'}
        else:
            status = 500
            send_data = {'message': "KeyError: 'content', 'user_id', 'predict_id' is required"}

        # postされたデータをデータベースへ登録する処理
        store_reply(recieve_data)
        return HttpResponse(json.dumps(send_data), status=status)


class Reply_like(View):
    def post(self, request, *args, **kwargs):
        # postされたデータをJSONに変換
        recieve_data = json.loads(request.body)
        print(recieve_data)

        # 指定されたキーが存在するか確認
        if recieve_data.keys() >= {'like', 'reply_id', 'user_id'}:
            status = 200
            send_data = {'message': 'success'}
        else:
            status = 500
            send_data = {'message': "KeyError: 'like', 'reply_id', 'user_id' is required"}

        # postされたデータをデータベースへ登録する処理
        store_like()
        return HttpResponse(json.dumps(send_data), status=status)