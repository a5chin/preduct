import { useState } from "react"

function ReplyCard(props){
    const [favs, setFavs] = useState(props.reply.likes)
    const [faved, setFaved] = useState(false)

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
                <h5 className="card-title">{props.reply.user_name}</h5>
                <p className="card-text">{props.reply.content}</p>

                {faved ?
                <button className="btn btn-primary" type="button" onClick={()=>{clicked()}}><i className="bi bi-hand-thumbs-up"></i>{favs}</button>
                :
                <button className="btn btn-outline-primary" type="button" onClick={()=>{clicked()}}><i className="bi bi-hand-thumbs-up"></i>{favs}</button>
                }
            </div>
        </div>
    )
}

export default ReplyCard;