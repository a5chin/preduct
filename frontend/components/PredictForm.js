import Axios from 'axios'
import moment from 'moment'

function PredictForm(props) {

    function SendPrediction(input) {
        if (input.value === '') {
            return (
                alert('入力されていません！')
            )
        }
        var text =  input.value+'\n\n以上の内容でよろしいですか？'
        if (confirm(text)) {
            // TODO 接続確認、user_id
            Axios.post(
                "http://localhost:8000/predict/"+props.product.product_id+"/", 
                JSON.stringify({
                content : input.value,
	            user_id : 1,
	            product_id : props.product.product_id,
                })
            ).then(res => {
                alert("投稿が完了しました")
                window.location.href = "http://localhost:3000/"+props.product.product_id
                }
            ).catch(err => {
                alert("送信失敗")
                console.log(err)
                console.log("http://localhost:8000/predict/"+props.product.product_id)
                }
            )
        } else {
            // キャンセルならアラートボックスを表示
            alert("キャンセルしました");
        }
    }

    if (moment(props.product.release_at).isBefore(moment())) { 
        /* 発表後 */
        return(
            <div className="after-release pb-5">
                <h3>発表は終了しました</h3>
                <br/>
                <h3>当たった予想ランキング作成中!</h3>
                <ul>
                    <li>
                        <h5>
                        <a href={"/vote/"+props.product.product_id}>投票はこちらから</a>
                        </h5>
                    </li>
                    <li>
                        <h5>
                        <a href={"/ranking/after/"+props.product.product_id}>ランキングの確認はこちらから</a>
                        </h5>
                    </li>
                </ul>
            </div>
        )
    } else {
        /* 発表前 */
        var n = 3
        if (moment(props.product.release_at).add((-1)*n, 'days').isBefore(moment())) {
            /* 発表直前(n日前) */
            return (
                <div className="to-vote pb-5">
                    <h3 className='pb-3'>投稿を締め切りました！！</h3>
                    <h3 className='p'>{props.product.name} 発表直前につき人気予想投票開始！</h3>
                    <ul>
                    <li>
                        <h5>
                        <a href={"/vote/"+props.product.product_id}>投票はこちらから</a>
                        </h5>
                    </li>
                    <li>
                        <h5>
                        <a href={"/ranking/"+props.product.product_id}>ランキングの確認はこちらから</a>
                        </h5>
                    </li>
                    </ul>
                </div>
            )
        } else {
            /* 発表前 */
            if (props.is_login) {
                /* ログイン済み */
                return (
                    <div className="predict-form pb-5">       
                        <h3 className='pb-5'>予想投稿フォーム</h3>     
                        <form name="userPrediction">
                            <textarea 
                                name="prediction"
                                cols="50" 
                                rows="5"
                                placeholder={props.product.name+" についての予想を書こう！"}/>
                            <br/>
                            <button className="btn btn-outline-primary" type="button" 
                            onClick={()=>SendPrediction(document.userPrediction.prediction)}>
                            <img src="../images/send.png" height='30'/>
                    　      投稿　
                            </button>
                        </form>
                    </div>
                )
            } else {
                /* ログインなし */
                return (
                    <div className="to-login">
                        <h1>予想投稿フォーム</h1>
                        <h5>予想の投稿にはログインが必要です：<a href="/login">ログインはこちら</a></h5>
                    </div>
                )
            }
        }
    }
}

export default PredictForm;