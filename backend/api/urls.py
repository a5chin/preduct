from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token

from .views import *
from .views_user import *
from .views_product import *
from .views_predict import *
from .views_reply import *
from .views_category import *


urlpatterns = [
    path('test/', Get_test.as_view(), name="test"),

    path('login/', obtain_jwt_token, name="login"),
    path('signup/', AuthRegister.as_view(), name="signup"),
    path('myinfo/', AuthInfoGetView.as_view(), name="myinfo"),

    path('category/', Category_view.as_view(), name="category"),

    path('product/', Product_view.as_view(), name="product"),
    path('product_with_category/', Product_category.as_view(), name="product"),
    path('product/<int:product_id>/', Product_by_id.as_view(), name="product"),

    path('predict/<int:product_id>/', Predict.as_view(), name="predict"),
    path('predict/<int:product_id>/<int:predict_id>/', Predict_by_id.as_view(), name="predict"),
    path('predict/like/', Predict_like.as_view(), name="predict_like"),
    path('predict/vote/', Predict_vote.as_view(), name="predict_vote"),
    path('predict/ranking/<int:product_id>/', Predict_ranking.as_view(), name="predict_ranking"),

    path('reply/<int:predict_id>/', Reply_view.as_view(), name="reply"),
    path('reply/like/', Reply_like.as_view(), name="reply_like"),

]
