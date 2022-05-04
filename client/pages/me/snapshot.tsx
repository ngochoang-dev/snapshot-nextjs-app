import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import clsx from "clsx";
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { Row, Col, Modal, Empty } from 'antd';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { MinusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { wrapper } from '../../redux/store';
import styles from './Me.module.scss';
import SideBar from '../../components/SideBar';
import { getMySnapshot, removeSnapshot } from '../../redux/actions';
import { AppState } from '../../redux/data.interfaces';
import Loading from '../../components/Loading';

const { confirm } = Modal;


const Snapshot: NextPage = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch();

    const { dataSnapshot, isRemove, loading } = useSelector((state: AppState) => state)

    useEffect(() => {
        dispatch(getMySnapshot(session?.id));
    }, [session?.id, dispatch]);

    useEffect(() => {
        isRemove && dispatch(getMySnapshot(session?.id));
    }, [isRemove, dispatch, session?.id]);

    const showDeleteConfirm = (photoId: any) => {
        confirm({
            title: 'Are you sure delete this photo?',
            icon: <ExclamationCircleOutlined />,
            content: 'This photo cannot be restored',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(removeSnapshot({
                    photoId,
                    uploaderId: session?.id
                }))
            },
        });
    }


    return (
        <div className={clsx(
            styles.container
        )}>
            <Head>
                <title>Upload</title>
                <meta name="description" content="snapshot" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <div className={clsx(
                styles.wrapper_gallery
            )}>
                {loading && <Loading loading={loading} />}
                {
                    dataSnapshot.length > 0 ?
                        (
                            <Row gutter={[20, 20]}>
                                {
                                    dataSnapshot && dataSnapshot.map(({ id, link, photoId, category, }, i) => {
                                        return (
                                            <Col span={6} xs={12} sm={12} md={6} lg={6} key={i}>
                                                <div className={clsx(
                                                    styles.image
                                                )}>
                                                    <Image
                                                        style={{
                                                            borderRadius: 4
                                                        }}
                                                        src={link}
                                                        alt={category?.toString()}
                                                        width={500}
                                                        height={450}
                                                        placeholder="blur"
                                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsLC2sBwAEjgHY5r5qEQAAAABJRU5ErkJggg=='
                                                    />
                                                    {
                                                        session?.id === id && <button
                                                            onClick={() => showDeleteConfirm(photoId)}
                                                        >
                                                            <MinusCircleOutlined className={clsx(
                                                                styles.icon_remove
                                                            )} />
                                                        </button>
                                                    }
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        ) :
                        (
                            <div className={
                                clsx(
                                    styles.empty
                                )}>
                                <Empty />
                            </div>
                        )
                }
            </div>
        </div >
    )
}

export default Snapshot;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    () => async ({ req, }): Promise<any> => {
        const session = await getSession({ req });
        if (!session) {
            return {
                redirect: {
                    destination: '/auth/signin',
                    permanent: false,
                },
            };
        }
    }
);
