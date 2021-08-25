from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.utils import timezone

from .models import *

import json


# すべての製品情報をカテゴリごに取得する
def get_products_with_category():

    categories = Category.objects.all()

    ret_categories = []
    for category in categories:
        ret_products = []
        products = Product.objects.filter(category=category)
        for product in products:
            array_product = {
                'product_id': product.id, 
                'name': product.name, 
                'category_id': product.category.id,
                'category_name': product.category.name,
                'release_at': product.release_at.isoformat()
            }
            ret_products.append(array_product)
        ret_categories.append({category.name: ret_products})
    
    return ret_categories

# すべての製品情報を取得する
def get_products():

    ret_products = []
    products = Product.objects.all()
    for product in products:
        array_product = {
            'product_id': product.id, 
            'name': product.name, 
            'category_id': product.category.id,
            'category_name': product.category.name,
            'release_at': product.release_at.isoformat()
        }
        ret_products.append(array_product)

    return ret_products

# IDで指定された製品情報を取得する
def get_product_by_id(product_id):

    ret_products = []
    try:
        product = Product.objects.get(id=product_id)
    except Exception as e:
        print(e)
        return []

    # リンク一覧を作る
    ret_links = []
    for link in product.link_set.all():
        array_link = {
            'content': link.linktext,
            'user_id': link.url,
        }
        ret_links.append(array_link)

    # 製品情報を返す
    ret_products = {
        'product_id': product.id, 
        'name': product.name, 
        'category_id': product.category.id,
        'category_name': product.category.name,
        'release_at': product.release_at.isoformat(),
        'links_list': ret_links,
        'links_number': product.link_set.count(),
    }

    return ret_products

def store_product(recieve_data):

    # データを登録した時刻
    current_date = timezone.now()

    # データの登録
    product = Product(
        name = recieve_data['name'],
        category_id = recieve_data['category_id'],
        release_at = recieve_data['release_at'],
        created_at = current_date,
        updated_at = current_date,
    )
    product.save()


class Product_view(View):
    # 製品一覧を取得する
    def get(self, request, *args, **kwargs):
        # productリストを生成
        products = get_products() 

        # JSON形式に整形
        send_data = {
            'products' : products
        }
        
        return HttpResponse(json.dumps(send_data), status=200)

    # 製品情報を登録する
    def post(self, request, *args, **kwargs):
        # postされたデータをJSONに変換
        recieve_data = json.loads(request.body)
        print(recieve_data)

        # 指定されたキーが存在するか確認
        if recieve_data.keys() >= {'name', 'category_id', 'release_at'}:
            status = 200
            send_data = {'message': 'success'}
        else:
            status = 500
            send_data = {'message': "KeyError: 'name', 'category_id', 'release_at' is required"}

        # postされたデータをデータベースへ登録する
        store_product(recieve_data)

        return HttpResponse(json.dumps(send_data), status=status)
        

class Product_by_id(View):
    # IDで指定された製品情報を取得する，なければ404
    def get(self, request, product_id, *args, **kwargs):
        
        send_data = get_product_by_id(product_id)
        
        if not send_data:
            return HttpResponse(status=404)

        return HttpResponse(json.dumps(send_data), status=200)

class Product_category(View):
    # 製品一覧をカテゴリごとに取得する
    def get(self, request, *args, **kwargs):
        # productリストを生成
        products = get_products_with_category() 

        # JSON形式に整形
        send_data = {
            'products' : products
        }
        
        return HttpResponse(json.dumps(send_data), status=200)