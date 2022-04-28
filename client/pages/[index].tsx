import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
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
import Loading from '../components/Loading';


const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query: { index } } = router;
  const data = useSelector((state: AppState) => state.dataSnapshot);


  useEffect(() => {
    dispatch(getSnapshot(index));
  }, [index, dispatch]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Snapshot</title>
        <meta name="description" content="snapshot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {router.isFallback && <Loading loading={router.isFallback} />}
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

export const getStaticProps: GetStaticProps =
  wrapper.getStaticProps(store => async ({ params }): Promise<any> => {
    store.dispatch(getSnapshot(params?.index));
    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();
    return {
      props: {},
      revalidate: 10,
    }
  });
