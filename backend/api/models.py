from django.db import models
from django.contrib.auth.models import User

# 製品のカテゴリ
class Category(models.Model):
	name = models.CharField(max_length=128)
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()

# 製品
class Product(models.Model):
	name = models.CharField(max_length=128)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	release_at = models.DateTimeField()
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()

# リンク
class Link(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	linktext = models.CharField(max_length=2048)
	url = models.URLField()
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()

# 予想
class Prediction(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	content = models.CharField(max_length=2048)
	user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
	likes = models.IntegerField()
	votes = models.IntegerField()
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()

# スレッドの返信
class Reply(models.Model):
	content = models.CharField(max_length=2048)
	prediction = models.ForeignKey(Prediction, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
	likes = models.IntegerField()
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()


