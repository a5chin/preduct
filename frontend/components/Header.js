import Link from "next/link";

function Header() {
    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3">
            <Link href="/">
                <a className="navbar-brand">Predict</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4" aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav4">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">ログイン</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;