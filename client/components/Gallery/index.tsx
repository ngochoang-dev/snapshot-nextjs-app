import type { NextPage } from 'next'
import clsx from 'clsx'
import Image from 'next/image'
import { Row, Col } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import styles from './Gallery.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/data.interfaces'


const Gallery: NextPage = () => {
    const dataArr = useSelector((state: AppState) => state.dataSnapshot);

    return (
        <div className={clsx(
            styles.container
        )}>
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
                                    />
                                    <button>
                                        <MinusCircleOutlined className={clsx(
                                            styles.icon_remove
                                        )} />
                                    </button>
                                    <button>
                                        <MinusCircleOutlined className={clsx(
                                            styles.icon_remove
                                        )} />
                                    </button>
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