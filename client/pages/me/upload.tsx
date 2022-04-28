import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { useState, ChangeEvent, useEffect } from 'react';
import clsx from "clsx";
import { Upload, Input, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSession, getSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Me.module.scss';
import SideBar from '../../components/SideBar';
import { uploadSnapshot } from '../../redux/actions';
import { SnapShot } from '../../interfaces';
import { AppState } from '../../redux/data.interfaces';
import { wrapper } from '../../redux/store';


const UploadSnapshot: NextPage = () => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const { loading,
        isUploadSuccess,
        isUploadFail } = useSelector((state: AppState) => state)
    const [category, setCategory] = useState<string>("");
    const [fileList, setFileList] = useState<any>([]);
    const [disabled, setDisabled] = useState<boolean>(true);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = ({ fileList }: { fileList: any }) => setFileList(fileList);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    const handleSubmit = () => {
        const data: SnapShot[] = fileList.map(({ thumbUrl }: { name: string, thumbUrl: string }) => {
            return {
                link: thumbUrl
            }
        });
        const uploadData = {
            uploaderId: session?.id,
            category: category,
            data: data
        }
        dispatch(uploadSnapshot(uploadData));
    }

    useEffect(() => {
        fileList.length > 0 && category ? setDisabled(false) : setDisabled(true);
        return () => setDisabled(false)
    }, [fileList, category]);

    useEffect(() => {
        if (!loading) {
            setCategory("");
            setFileList([]);
        }
    }, [loading]);

    useEffect(() => {
        isUploadSuccess && message.success("Upload Successfully")
    }, [isUploadSuccess,]);

    useEffect(() => {
        isUploadFail && message.error("Upload Failed")
    }, [isUploadFail])

    useEffect(() => {
        return () => {
            setCategory("");
            setFileList([]);
        }
    }, []);


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
                styles.wrapper_upload
            )}>
                <div className={clsx(
                    styles.input
                )}>
                    <Input showCount placeholder="Category" bordered={false}
                        maxLength={20} onChange={onChange} value={category}
                        disabled={loading}
                    />
                </div>
                <div className={clsx(
                    styles.upload
                )}>
                    <Upload
                        accept="image/*"
                        listType="picture-card"
                        fileList={fileList}
                        // multiple={true}
                        beforeUpload={() => false}
                        disabled={loading}
                        onPreview={() => null}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </div>
                <div className={clsx(
                    styles.btn
                )}>
                    <Button type="primary"
                        disabled={disabled}
                        onClick={handleSubmit}
                        loading={loading}
                    >Save</Button>
                </div>
            </div>
        </div >
    )
}

export default UploadSnapshot;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    () => async ({ req }): Promise<any> => {
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
