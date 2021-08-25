import { useEffect, useState } from "react"
import Link from 'next/link'
import Axios from 'axios'

function PredictCard(props){
    const [favs, setFavs] = useState()
    const [faved, setFaved] = useState(false)

    useEffect(() => {
        setFavs(props.predict.likes)
        // console.log(props.predict)
    },[props.predict.likes])

    function clicked(){
        // TODO：Likeが動かない場合は表示切り替えだけのハリボテにする
        // Axios.post('http://localhost:8000/predict/like', {
        //     like: faved,
        //     predic_id: props.predict.prediction_id,
        //     user_id: 0,
        // })
        // .then(
        //     res => {
        //         alert('正常にリクエストが送信されました')
        //         console.log(res)
        //     }
        // ).catch(
        //     err => {
        //         alert('エラーが発生しました')
        //     }
        // )

        if (faved){
            setFavs(favs-1)
            setFaved(!faved)
        } else {
            setFavs(favs+1)
            setFaved(!faved)
        }
    }

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="cart-title">{props.predict.user_name}</h5>
                <p className="card-text">{props.predict.content}</p>
                <button type="button" className="btn btn-link">
                    <Link href={"/replies/"+props.predict.prediction_id+'?product_id='+props.predict.product_id}>
                        <a>{(props.predict.replies == undefined) ? props.predict.replies_number  : props.predict.replies }件のコメント</a>
                    </Link>
                </button>

                {faved ?
                <button className="btn btn-primary" type="button" onClick={()=>{clicked()}}><i className="bi bi-hand-thumbs-up"></i>{favs}</button>
                :
                <button className="btn btn-outline-primary" type="button" onClick={()=>{clicked()}}><i className="bi bi-hand-thumbs-up"></i>{favs}</button>
                }
            </div>
        </div>
    )
}

export default PredictCard;