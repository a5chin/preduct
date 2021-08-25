import Head from 'next/head'
import PageLayout from '../components/PageLayout'
import SideMenu from '../components/SideMenu'
import PredictIndex from '../components/PredictIndex'
import PredictForm from '../components/PredictForm'
import PrevRanking from '../components/PrevRanking'
import Axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function ProductPage() {
    const router = useRouter()
    const [productId, setProductId] = useState()
    const [product, setProduct] = useState([])
    const [predicts, setPredicts] = useState([])

    useEffect(() => {
        if (router.asPath !== router.route) {
            setProductId(router.query.product_id);
        }
    }, [router]);

    useEffect(() => {
        if (productId) {
            fetchProductInfo(productId);
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
            .catch(err => {
                alert('このアドレスは無効です')
                router.push('/')
            })
          }
        ).catch(err => {
            alert('このアドレスは無効です')
            router.push('/')
        })
    }

return (
    <div>
      <div>
        <PageLayout>
        </PageLayout>

        <div className='row'>
          <div className='col-md-2'>
            <SideMenu></SideMenu>
          </div>
          <div className='col-md-10'>
            <div className='row'>
              <div className='col-md-6'>
                <h1>予想する製品：{product.name}<br/></h1>
              </div>
              <div className='col-md-6 my-auto'>
              <h2>予想期限：{moment(product.release_at).format('YYYY/MM/DD h:mm')}</h2>
              </div>
            </div>
            <div className='row py-5'>
            <div className='col-md-5'>
              <PredictIndex predicts={predicts}/>
            </div>
            <div className='col-md-1'>

            </div>
            <div className='col-md-6'>
              <PredictForm 
              product={product}
              is_login={true}/>
              <PrevRanking
                product={product}
                predicts={predicts}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
