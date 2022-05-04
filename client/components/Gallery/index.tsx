import type { NextPage } from 'next';
import { useEffect } from 'react';
import clsx from 'clsx'
import Image from 'next/image';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import styles from './Gallery.module.scss';
import { AppState } from '../../redux/data.interfaces';
import { getSnapshot } from '../../redux/actions';
import Loading from '../Loading';


const Gallery: NextPage = () => {
    const router = useRouter();
    const { query: { index } } = router;
    const dispatch = useDispatch();
    const { dataSnapshot: dataArr,
        isRemove,
        loading } = useSelector((state: AppState) => state);


    useEffect(() => {
        if (isRemove) {
            dispatch(getSnapshot(index));
        }
    }, [isRemove, dispatch, index]);


    return (
        <div className={clsx(
            styles.container
        )}>
            {loading && <Loading loading={loading} />}
            <Row gutter={[20, 20]}>
                {
                    dataArr && dataArr.map(({ id, link }, i) => {
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
                                        placeholder="blur"
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsLC2sBwAEjgHY5r5qEQAAAABJRU5ErkJggg=='
                                    />
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default Gallery;
