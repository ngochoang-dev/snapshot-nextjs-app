import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import { wrapper } from '../redux/store';
import '../styles/globals.css'
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp);
