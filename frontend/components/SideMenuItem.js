import Link from 'next/link'

export default function SideMenuItem(props) {
    return (
        <li className="mb-1">
            <button className="btn d-inline-flex align-items-center rounded collapsed" 
                data-bs-toggle="collapse" data-bs-target={'#category_id'+props.id}
                aria-expanded="false">{props.name}
            </button>
            <div className="collapse" id={'category_id'+props.id}>
                <ul className="list-unstyled fw-normal pb-1 small">
                    {props.products.map((item, index) => {
                        return(
                            <li key={index}>
                                <Link href={'/?product_id='+item.product_id}>
                                    <a className="d-inline-flex align-items-center rounded">{item.name}</a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </li>
    )
}