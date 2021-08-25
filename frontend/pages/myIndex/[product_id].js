import Head from 'next/head'
import PageLayout from '../../components/PageLayout'
import PredictForm from '../../components/PredictForm'
import PrevRanking from '../../components/PrevRanking'
import ExternalLink from '../../components/ExternalLink'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Axios from 'axios'

export default function MyIndex() {
  const router = useRouter()
  const [productId, setProductId] = useState()
  const [product, setProduct] = useState([])
  const [predicts, setPredicts] = useState([])
  const [links, setLinks] = useState([])

  useEffect(() => {
    if (router.asPath !== router.route) {
        setProductId(router.query.product_id);  //製品IDを取得
    }
  }, [router]);

  useEffect(() => {
    if (productId) {
        fetchProductInfo(productId);   //製品IDから情報を取得
    }
  }, [productId]);

  function fetchProductInfo(product_id) {
    Axios.get('http://localhost:8000/product/'+product_id)
    .then(
      res => {
        setProduct(res.data)
        setLinks(res.data.links_list)
        Axios.get('http://localhost:8000/predict/'+res.data.product_id)
        .then(
          response => {
            setPredicts(response.data.predicts)
          }
        )
      }
    ).catch(err => alert(err))
  }

  /* 　表示　　*/

  return (
    <div>
      <PageLayout>
        {/* 予想投稿フォーム */}
        <PredictForm 
        product={product}
        is_login={true}/>

        <br/>
        <br/>

        {/* 事前ランキング */}
        <PrevRanking
          product={product}
          predicts={predicts}
        />
        
        <br/>
        <br/>
        <h1>{product.name}  外部リンク</h1>
        <ExternalLink
        links={links}
        />

      </PageLayout>
    </div>
  )
}