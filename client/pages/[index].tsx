import type { NextPage } from 'next';
import { useEffect } from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { wrapper } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { Empty } from 'antd';

import styles from '../styles/Home.module.scss'
import Gallery from '../components/Gallery'
import { getSnapshot } from '../redux/actions';
import { SagaStore } from '../redux/store';
import { AppState } from '../redux/data.interfaces';


const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query: { index } } = router;
  const data = useSelector((state: AppState) => state.dataSnapshot);


  useEffect(() => {
    dispatch(getSnapshot(index));
  }, [index]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Snapshot</title>
        <meta name="description" content="snapshot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        data.length > 0 ?
          <Gallery /> :
          <div className={clsx(
            styles.empty
          )}>
            <Empty />
          </div>
      }
    </div>
  )
}

export default Home;

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }): Promise<any> => {

//   console.log('actioin getServerSideProps');

//   store.dispatch(getSnapshot(params?.index));
//   store.dispatch(END);
//   await (store as SagaStore).sagaTask?.toPromise();
// });

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { index: 'mountain' },
      },
      {
        params: { index: 'beaches' },
      },
      {
        params: { index: 'birds' },
      },
      {
        params: { index: 'food' },
      },
      {
        params: { index: 'shopping' },
      },
      {
        params: { index: 'dog' },
      },
      {
        params: { index: 'car' },
      },
    ],
    fallback: true,
  }
}

export const getStaticProps = wrapper.getStaticProps(store => async ({ params }): Promise<any> => {
  store.dispatch(getSnapshot(params?.index));
  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();
});
