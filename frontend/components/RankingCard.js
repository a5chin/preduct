function RankingCard(props){
    if (!props.after) {

        if (props.rank ==  1) {
            return(
                <div className="card">
                    <div className="card-body">
                        　
                        <img src="../images/crown_1.jpg" height='25'/>
                        <h4>第 {props.rank} 位（{props.predict.votes}票）</h4>
                        <p className="card-name">{props.predict.user_name}</p>
                        <p className="card-text">{props.predict.content}</p>
                    </div>
                </div>
            )
        } else if (props.rank == 2) {
            return(
                <div className="card">
                    <div className="card-body">
                        　<img src="../images/crown_2.jpg" height='25'/>
                        <h4>第 {props.rank} 位（{props.predict.votes}票）</h4>
                        <p className="card-name">{props.predict.user_name}</p>
                        <p className="card-text">{props.predict.content}</p>
                    </div>
                </div>
            )
        } else if (props.rank == 3) {
            return(
                <div className="card">
                    <div className="card-body">
                        　<img src="../images/crown_3.jpg" height='25'/>
                        <h4>第 {props.rank} 位（{props.predict.votes}票）</h4>
                        <p className="card-name">{props.predict.user_name}</p>
                        <p className="card-text">{props.predict.content}</p>
                    </div>
                </div>
            )

        } else {
            return(
                <div className="card">
                    <div className="card-body">
                        <h4>第{props.rank}位（{props.predict.votes}票）</h4>
                        <p className="card-name">{props.predict.user_name}</p>
                        <p className="card-text">{props.predict.content}</p>
                    </div>
                </div>
            )
        }
    } else {
        display_val = props.predict.votes + props.predict.likes
        
            if (props.rank ==  1) {
                return(
                    <div className="card">
                        <div className="card-body">
                            　<img src="../../images/crown_1.jpg" height='25'/>
                            <h4>第 {props.rank} 位（{display_val}票）</h4>
                            <p className="card-name">{props.predict.user_name}</p>
                            <p className="card-text">{props.predict.content}</p>
                        </div>
                    </div>
                )
            } else if (props.rank == 2) {
                return(
                    <div className="card">
                        <div className="card-body">
                            　<img src="../../images/crown_2.jpg" height='25'/>
                            <h4>第 {props.rank} 位（{display_val}票）</h4>
                            <p className="card-name">{props.predict.user_name}</p>
                            <p className="card-text">{props.predict.content}</p>
                        </div>
                    </div>
                )
            } else if (props.rank == 3) {
                return(
                    <div className="card">
                        <div className="card-body">
                            　<img src="../../images/crown_3.jpg" height='25'/>
                            <h4>第 {props.rank} 位（{display_val}票）</h4>
                            <p className="card-name">{props.predict.user_name}</p>
                            <p className="card-text">{props.predict.content}</p>
                        </div>
                    </div>
                )
        
            } else {
                return(
                    <div className="card">
                        <div className="card-body">
                            <h4>第{props.rank}位（{display_val}票）</h4>
                            <p className="card-name">{props.predict.user_name}</p>
                            <p className="card-text">{props.predict.content}</p>
                        </div>
                    </div>
                )
            }
        }
    }

export default RankingCard;