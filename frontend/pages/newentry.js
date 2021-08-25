export default function Home() {
    return (
        <div className='container'>
            <div className='row'>
                <h1 className="h3 font-weight-normal">新規登録</h1>
                <form>
                    <label for="username" class="sr-only"></label>
                    <input className="form-control" id="username" type="text" name="username" placeholder="username"/>
                    <label for="password" className="sr-only"></label>
                    <input className="form-control" id="password" type="password" name="password" placeholder="password"/>
                    <input className="btn btn-outline-primary my-1" type="submit" value="Sign Up"/>
                </form>
            </div>
            <div>
                登録済みの方は<a href='./login'>こちら</a>
            </div>
        </div>
    )
  }
  