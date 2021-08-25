function ExternalLink(props) {

    console.log(props.links[0])
    console.log(typeof(props.links))

    if (props.links.length <= 0) {
        return(
            <div>
                <tr>
                    <th>準備中です</th>
                </tr>
            </div>
        )
    } else {
        return (
            <div>
                {props.links.map((item) => {
                    return(
                        <div className="ex-link">
                            <ul>
                                <li>
                                {item.content}：<br/><a href={item.user_id}>{item.user_id}</a>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ExternalLink;