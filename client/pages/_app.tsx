import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import 'antd/dist/antd.css';
import { wrapper } from '../redux/store';
import '../styles/globals.css'
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp);
