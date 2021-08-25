# How to Start Django
## Install Django
```bash
conda create -n <name> python=3.9
conda activate <name>
pip install django==3.2.6
pip install django-cors-headers==3.8.0
pip install djangorestframework==3.12.4
pip install djangorestframework-jwt==1.11.0
```


## Run Django app
```bash
cd backend/
python manage.py runserver 
```
もしポートを指定したい場合は
```bash
python manage.py runserver 127.0.0.1:8000
```
のように実行


# API document
とりあえずメモ👇  
https://strong-orchestra-e54.notion.site/pip3-Preduct-API-803f4c66cefb443ab90e8d79de5196d4

## How to use
1. Djangoのappを起動(デフォルトではたぶんhttp://127.0.0.1:8000/)
2. GETはブラウザで見られる  
例：http://127.0.0.1:8000/predict/0/ 👉 product_id=0のオブジェクトが表示されるはず
3. curlコマンドでGETもPOSTも確認できる  
例：
```bash
curl -X GET http://127.0.0.1:8000/predict/0/
```
```bash
curl -X POST -d '{"product_id": 2, "name": "Xperia", "category_id": 0, "releace_at": 300}' http://127.0.0.1:8000/product/
```