import type { NextPage } from 'next';
import Head from 'next/head';
import { wrapper } from '../redux/store';
import { END } from 'redux-saga';
import styles from '../styles/Home.module.scss'
import Gallery from '../components/Gallery'
import { getSnapshot } from '../redux/actions';
import { SagaStore } from '../redux/store'



const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Snapshot</title>
        <meta name="description" content="snapshot" />
        <link rel="icon" href="/favicon.ico" />\
      </Head>
      <Gallery />
    </div>
  )
}

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }): Promise<any> => {
  store.dispatch(getSnapshot(params?.index));
  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();

});
