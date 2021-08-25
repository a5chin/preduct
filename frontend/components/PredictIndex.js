import PredictCard from "./PredictCard"

function PredictIndex(props){
    const predicts = props.predicts

    return(
        <div>
            <h3 className='pb-3'>予想一覧</h3>
            {predicts.map((item,index) => {
                return(
                    <PredictCard key={index} predict={item} />
                )
            })
            }

        </div>
    )
}

export default PredictIndex;