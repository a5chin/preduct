import { useEffect } from "react"

export default function Home() {
    return (
        <div className="container h-100">
            <div className="row">
                <h1 className="h3 font-weight-normal">ログイン</h1>
                <form>
                    <label for="username" class="sr-only"></label>
                    <input className="form-control" id="username" type="text" name="username" placeholder="username"/>
                    <label for="password" className="sr-only"></label>
                    <input className="form-control" id="password" type="password" name="password" placeholder="password"/>
                    <input className="btn btn-outline-primary my-1" type="submit" value="Sign In"/>
                </form>
            </div>
            <div>
                <p>新規登録は<a href="./newentry">こちら</a></p>
            </div>
        </div>
    )
}
