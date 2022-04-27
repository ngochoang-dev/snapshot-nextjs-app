import type { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import { wrapper } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import styles from '../styles/Home.module.scss'
import Gallery from '../components/Gallery'
import { getSnapshot } from '../redux/actions';
import { SagaStore } from '../redux/store';



const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { query: { index } } = router;


  useEffect(() => {
    console.log('call');

    dispatch(getSnapshot(index));
  }, [index])


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

  console.log('actioin getServerSideProps');

  store.dispatch(getSnapshot(params?.index));
  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();
});

// export async function getStaticPaths() {

//   return {
//     paths: [
//       {
//         params: { index: 'mountain' },
//       },
//       {
//         params: { index: 'beaches' },
//       },
//       {
//         params: { index: 'birds' },
//       },
//       {
//         params: { index: 'food' },
//       },
//       {
//         params: { index: 'shopping' },
//       },
//       {
//         params: { index: 'dog' },
//       },
//       {
//         params: { index: 'car' },
//       },
//     ],
//     // paths: paths,
//     fallback: false,
//   }
// }

// export const getStaticProps = wrapper.getStaticProps(store => async ({ params }): Promise<any> => {

//   store.dispatch(getSnapshot(params?.index));
//   store.dispatch(END);
//   await (store as SagaStore).sagaTask?.toPromise();
// });
