import Head from 'next/head'
import PageLayout from '../../../components/PageLayout'
import FinalRanking from '../../../components/FinalRanking'
import SideMenu from '../../../components/SideMenu'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Axios from 'axios'

export default function AfterRankingPage() {
  const router = useRouter()
  const [productId, setProductId] = useState()
  const [product, setProduct] = useState([])
  const [predicts, setPredicts] = useState([])

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
        Axios.get('http://localhost:8000/predict/'+res.data.product_id)
        .then(
          response => {
            setPredicts(response.data.predicts)
          }
        )
      }
    ).catch(err => alert(err))
  }
  

  return (
    <div>
      <PageLayout></PageLayout>
      <div className='row'>
        <div className='col-md-2'>
          <SideMenu></SideMenu>
        </div>
        <div className='col-md-10'>
          <h1 className='py-4'>{product.name}  人気予想ランキング</h1>
          <FinalRanking
          after={true}
          product={product}
        predicts={predicts}/>
        </div>
      </div>
    </div>
  )
}