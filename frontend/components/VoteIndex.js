import VoteCard from "./VoteCard"

function VoteIndex(props){
    const predicts = props.predicts
    if (predicts.length > 0) {
        return(
            <div>
                <h3>候補一覧</h3>
                    {predicts.map((item) => {
                        return(
                        <VoteCard 
                        predict={item}/>
                    )
                })
                }
            </div>
        )
    } else {
        return(
            <tr>
                <th>まだ投稿がありません</th>
             </tr>
        )   
    }
}

export default VoteIndex;