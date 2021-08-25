from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.utils import timezone
from django.utils.dateparse import parse_datetime

from api.models import *

import json, pytz, random, requests

current_date = timezone.now()

def random_user():

    return User.objects.get(id=random.randint(7, 106))


def make_prediction():
    rand_text_n = ['カメラ', '画面', 'チップ', 'メモリ', '指紋認証']

    rand_text_a = ['ふつうに', '世界一', '日本一', '業界で唯一', 'いつもどおり']

    rand_text_v = ['進歩している', '進化している', '改善されている', 'そのままかわらない', '最新になっている', '丈夫になっている', '賢くなっている', 'よくなっている', 'おしゃれになっている', '高級になっている']

    rand_link = [['対談動画', 'https://www.youtube.com/watch?v=I8U6vX2fZyI'], ['レビュー動画', 'https://www.youtube.com/watch?v=xOOhIDc3_Ko'], ['発表動画', 'https://youtu.be/TxXrPAJVQiA']]
    
    rand_reply = ['いいね', '私もそう思います', 'ナイス！', '新機能が続々と搭載されていますね', 'すばらしいです', '欲しくなってきたー', 'ワクワクしますね', '絶対買う！', '予約しました！', '発表会見に行きます', 'いい！', 'そうそう，そういうこと', '欲しい機能だ', '新機能が入ってる', 'すごい', 'ほしい！', 'ワクワクするー', '買いに行こう', '予約した！！！', '発表会見楽しみだなぁ']

    num_product = 14 + 1
    num_prediction = 15 + 1
    num_reply = 200
    product_id = 12
    # user01 = User.objects.get(id=2)


    for product_id in range (13, num_product):
      print("product_id: "+str(product_id))
      for num_prediction in range(0, random.randint(10, num_prediction)):
          print("num_prediction: "+str(num_prediction))
          product = Product.objects.get(id=product_id)
          
          rand_text_s = [product.name+'の', '次の', '新たな', '次世代の', '今度発表される']

          print(rand_text_s[random.randint(0, 4)]+rand_text_n[random.randint(0, 4)]+'は'+rand_text_a[random.randint(0, 4)]+rand_text_v[random.randint(0, 9)])

          """ Prediction """
          prediction = Prediction(
            product = product,
            content = rand_text_s[random.randint(0, 4)]+rand_text_n[random.randint(0, 4)]+'は'+rand_text_a[random.randint(0, 4)]+rand_text_v[random.randint(0, 9)],
            user = random_user(),
            likes = random.randint(0, 500),
            votes = random.randint(0, 500),
            created_at = current_date,
            updated_at = current_date,
          )
          prediction.save()

          """ Links """
          link = Link(
            product = product,
            linktext = '購入ページへ移動する',
            url = 'https://network.mobile.rakuten.co.jp/',
            created_at = current_date,
            updated_at = current_date,
          )
          link.save()
          link = Link(
            product = product,
            linktext = rand_link[random.randint(0, 2)][0],
            url = rand_link[random.randint(0, 2)][1],
            created_at = current_date,
            updated_at = current_date,
          )
          link.save()

          """ Replies """
          for reply_num in range(0, random.randint(10, num_reply)):
              print("reply_num: "+str(reply_num))
              reply = Reply(
                content = rand_reply[random.randint(0, 19)],
                prediction = prediction,
                user = random_user(),
                likes = random.randint(0, 500),
                created_at = current_date,
                updated_at = current_date,
              )
              reply.save()


def make_user():

    username = ['nnmy_tky', 'atamak3760116', 'yasunori-hamano', 'katayama-nobuya', 'okukot', 'hansuke1970', 'tosie196', 'hre0711440', 'smd85', 'dkt1987', 'isoyegis', 'asaiyuuzou', 'takaaki-abe', 'huzino.naoki', 'yst-a', 'yositosi5900827', 'nmt.tkyykt.tmn', 'uokuuy1989', 'nisi1989', 'huzikawamasahiro', 'takeiti-miyasita', 'tutiya0908', 'adamay0138', 'ryuuzou', 'tukada9581', 'huzii_husami', 'miyabara2004', 'ab0930134', 'atarum1126', 'oomori7891411', 'takehisa1993', 'izumi-kanekazu', 'nagata_mituo', 'yuuitirou0724', 'shtm3260', 'gnpi196', 'kzyyzk', 'uoritiik0423', 'onodera85', 'nobuharu3099', 'sekine1985', 'snz.mrok', 'knz190knz190', 'aruutam0525', 'arumeuexample', 'hnm', 'mhr91', 'wszh85', 'sinzi8119910523', 'sumita150', 'adamis9308', 'takeda1988', 'kuniyosi_sugihara', 'ogt.kts', 'okoan', 'kny_smr', 'tosihiko1550032', 'akt.ryuk', 'eit197320190703', 'agih', 'uzakenut1970', 'katuto-saitou', 'isiduka1990', 'yosihisaakiyama', 'ier0250035', 'ksk31074', 'kzm_kzm', 'rhu0527', 'tda1970', 'syunzi_yasui', 'isoyih2500034', 'arahagus', 'ujid2004', 'adasa93anet', 'hg-knys', 'koutarou-matuoka', 'akuuy3060301', 'iky0903', 'ak.mybr19720925', 'tbn11034', 'atimotexample', 'todasakuko', 'nkn_umtru', 'ker1979', 'oan86', 'rika.noguti', 'kstyshr', 'mizokuti71', 'mtdmrdion', 'syouiti88', 'oohara-keisi', 'uoritiuok', 'mizutani7900033', 'jntru_kwmt', 'ysm_yst', 'okomot88', 'kurotasigetugu', 'toda-mariko', 'kwbt1988', 'systusers']

    URL = "http://127.0.0.1:8000/signup/"
    headers = {'Content-Type': 'application/json'}
    data = {'username': username[random.randint(0, 99)], 'password': 'password123'}
    response = requests.post(url=URL, data=json.dumps(data), headers=headers)

class Get_test(View):
    def get(self, request, *args, **kwargs):


        release_date = parse_datetime("2021-09-25 10:00:00")
        release_date = pytz.timezone("Asia/Tokyo").localize(release_date, is_dst=None)

        # Do sometiong here
        make_prediction()

        return HttpResponse('success', status=200)
