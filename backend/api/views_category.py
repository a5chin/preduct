from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.utils import timezone

from .models import *

import json

def get_categories():
    ret_categories = []
    categories = Category.objects.all()
    for category in categories:
        array_category = {
            'category_id' : category.id,
            'name' : category.name,
        }
        ret_categories.append(array_category)

    return ret_categories

class Category_view(View):
    # 製品一覧を取得する
    def get(self, request, *args, **kwargs):
        # categoryリストを生成
        categories = get_categories() 

        # JSON形式に整形
        send_data = {
            'categories' : categories
        }
        
        return HttpResponse(json.dumps(send_data), status=200)