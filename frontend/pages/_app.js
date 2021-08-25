import Head from "next/head";
import '../styles/globals.css'
import '../styles/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/docs.css'

function MyApp({Component, pageProps}) {
  return (
    <div>
    <Head>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
      <script src="https:/getbootstrap.com/docs/5.0/assets/js/docs.min.js"></script>
    </Head>
    <Component {...pageProps} />
    </div>
    );
  }

export default MyApp
