import Head from 'next/head'
import PageLayout from '../components/PageLayout'
import PredictForm from '../components/PredictForm' 
import PrevRanking from '../components/PrevRanking'
import ExternalLink from '../components/ExternalLink'

export default function Home() {

  // For PredictForm
  const user_id = 0
  const product_id = 0
  const is_login = true//test

  // For PrevRanking
  const item_name = 'Xperia_XZ1215'
  const ranking_list = new Array('ユーザー１', 'ユーザー２', 'ユーザー3')

  // For ExternalLink
  const sales = "https://www.youtube.com"
  const launch = "https://www.youtube.com/watch?v=WJzSBLCaKc8"

  return (
    <div>
      <PageLayout>
        <h1>予想投稿フォーム</h1>
        <PredictForm 
        user_id={user_id}
        product_id={product_id}
        is_login={is_login}/>

        <br/>
        <br/>

        <h1>{item_name}  予想ランキング</h1>
        <PrevRanking
          item_name={item_name}
          ranking_list={ranking_list}
        />

        <br/>
        <br/>
        <h1>{item_name}  外部リンク</h1>
        <ExternalLink
          sales={sales}
          launch={launch}
        />

      </PageLayout>
    </div>
  )
}
