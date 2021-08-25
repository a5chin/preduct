import PredictCard from '../../components/PredictCard'
import PageLayout from '../../components/PageLayout'
import ReplyCard from '../../components/ReplyCard'
import SideMenu from '../../components/SideMenu'
import Axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function PredictPage() {
    const router = useRouter()
    const [predictId, setPredictId] = useState()
    const [productId, setProductId] = useState()
    const [predict, setPredict] = useState([])
    const [replies, setReplies] = useState([])
    const [reply,  setReply] = useState('')

    useEffect(() => {
        if (router.asPath !== router.route) {
            setPredictId(router.query.predict_id);
            setProductId(router.query.product_id);
        }
    }, [router]);

    useEffect(() => {
        if (predictId && productId) {
            fetchPredictInfo()
        }
    }, [predictId]);

    function fetchPredictInfo() {
        Axios.get('http://localhost:8000/predict/'+productId+'/'+predictId)
        .then(
            res => {
                setPredict(res.data[0])
                setReplies(res.data[0].replies_list)
            }
        ).catch(err => {
            alert('このアドレスは無効です')
            router.push('/')
        })
    }

    function postReply() {
        // TODO:200が返ってきているので、動いていそうだが、予想が増えていないのはなぜ？
        Axios.post('http://localhost:8000/reply/'+predictId+'/', {
            content: reply,
            user_id: 1,
            predict_id: predictId,
        })
        .then(
            res => {
                console.log(res)
                router.reload()
            }
        ).catch(
            err => alert(err)
        )
    }

    return (
        <div>
            <PageLayout></PageLayout>
                <div className='row'>
                    <div className='col-md-2'>
                        <SideMenu></SideMenu>
                    </div>
                    <div className='col-md-5'>
                        <h3 className='py-3'>{predict.user_name}さんの予想</h3>
                        <PredictCard predict={predict}/>

                        <h3 className='py-3'>予想に対する反応</h3>
                        {replies.map((item,index) => {
                        return(
                            <ReplyCard key={index} reply={item} />
                        )
                        })}
                    </div>
                    <div className='col-md-5'>
                        {/* リプライ投稿フォーム */}
                        <div className="card my-5">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">この予想に対するあなたの意見を投稿しよう！</label>
                                    <textarea className="form-control mb-3" id="exampleFormControlTextarea1" rows="3" value={reply} onChange={(e) => {setReply(e.target.value)}}></textarea>

                                    <button type="submit" className="btn btn-primary" onClick={() => {postReply()}}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
