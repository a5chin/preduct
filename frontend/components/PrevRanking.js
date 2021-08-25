import { disconnect } from "process";

function PrevRanking(props) {

    function MakeRanking(list) {
        list.sort(function(a, b) {
            if (a.likes < b.likes) {
                return 1;
            } else {
                return -1;
            }
        })
        return list
    }

    var ranking_list = MakeRanking(props.predicts.slice())

    // user name に帰るかも？
    if (ranking_list.length > 2) {
        return (
            <div className='container px-5'>
                <h3>{props.product.name}  人気予想ランキング</h3>
                <div className='row py-4'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><img src="../images/crown_1.jpg" height='30'/>1位</h5>
                            <h3 className="card-text text-center pb-4">{ranking_list[0].content}<br></br><img src="../images/like.png" height='30'/> × {ranking_list[0].likes}</h3>
                        </div>
                    </div>
                </div>
                <div className='row py-4'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><img src="../images/crown_2.jpg" height='30'/>2位(1位まであと{ranking_list[0].likes - ranking_list[1].likes})</h5>
                            <h3 className='card-text text-center pb-4'>{ranking_list[1].content}<br></br><img src="../images/like.png" height='30'/> × {ranking_list[1].likes}</h3>
                        </div>
                    </div>
                </div>
                <div className='row py-4'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><img src="../images/crown_3.jpg" height='30'/>3位(2位まであと{ranking_list[1].likes - ranking_list[2].likes})</h5>
                            <h3 className='card-text text-center pb-4'>{ranking_list[2].content}<br></br><img src="../images/like.png" height='30'/> × {ranking_list[2].likes}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (ranking_list.length == 2) {
        return (
            <div>
                <h1>{props.product.name}  人気予想ランキング</h1>
                <img src="../images/crown_1.jpg" height='30'/>
                <h3>１位：{ranking_list[0].content}
                （<img src="../images/like.png" height='30'/> × {ranking_list[0].likes}）</h3>
                <img src="../images/crown_2.jpg" height='30'/>
                <h3>２位：{ranking_list[1].content}
                （<img src="../images/like.png" height='30'/> × {ranking_list[1].likes}）</h3>
            </div>
        )        
    } else if (ranking_list.length == 1) {
        return (
            <div>
                <h1>{props.product.name}  人気予想ランキング</h1>
                <img src="../images/crown_1.jpg" height='30'/>
                <h3>１位：{ranking_list[0].content}
                （<img src="../images/like.png" height='30'/> × {ranking_list[0].likes}）</h3>
            </div>
        )    
    } else {
        return (
            <div>
                <h1>{props.product.name}  人気予想ランキング</h1>
                <tr>
                    <th>まだ投稿がありません</th>
                </tr>
            </div>
        )   
    }
}

export default PrevRanking;