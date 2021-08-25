import RankingCard from './RankingCard'

function FinalRanking(props) {
    function MakeRanking(list) {
        list.sort(function(a, b) {
            if (a.votes < b.votes) {
                return 1;
            } else {
                return -1;
            }
        })
        return list
    }

    var ranking_list = MakeRanking(props.predicts.slice())
    var rank = 1
    if (ranking_list.length <= 0) {
        return (
            <div>
                <tr>
                   <th>投稿がありませんでした...
                </th>
                </tr>
            </div>
        )   
    } else {
        return(
            <div>
                {ranking_list.map((item) => {
                    return(
                    <RankingCard
                        rank={rank++}
                        predict={item}/>
                    )
                })
                }
            </div>
        )
    }
}

export default FinalRanking;