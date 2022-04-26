import type { NextPage } from 'next';
import { useEffect } from 'react';
import clsx from 'clsx'
import Image from 'next/image'
import { Row, Col, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MinusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import styles from './Gallery.module.scss';
import { AppState } from '../../redux/data.interfaces';
import { removeSnapshot } from '../../redux/actions';
import Loading from '../Loading';


const { confirm } = Modal;

const Gallery: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const { dataSnapshot: dataArr, isRemove } = useSelector((state: AppState) => state);

    const handleRemove = (id: any) => {
        dispatch(removeSnapshot(id))
    }

    function showDeleteConfirm(photoId: any) {
        confirm({
            title: 'Are you sure delete this photo?',
            icon: <ExclamationCircleOutlined />,
            content: 'This photo cannot be restored',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleRemove(photoId)
            },
        });
    }

    useEffect(() => {
        if (isRemove) {
            router.push(`/${router.query.index}`);
        }
    }, [isRemove])

    return (
        <div className={clsx(
            styles.container
        )}>
            {isRemove && <Loading loading={isRemove} />}
            <Row gutter={[20, 20]}>
                {
                    dataArr && dataArr.map(({ id, link, photoId }, i) => {
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
                                        alt={id?.toString()}
                                        width={500}
                                        height={450}
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
        </div>
    )
}

export default Gallery