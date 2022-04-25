import type { NextPage } from 'next';
import { useState, ChangeEvent, useEffect } from 'react';
import clsx from "clsx";
import { Upload, Modal, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './Me.module.scss';
import SideBar from '../../components/SideBar'

function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const UploadSnapshot: NextPage = () => {
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [previewTitle, setPreviewTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [fileList, setFileList] = useState<any>([]);
    const [disabled, setDisabled] = useState<boolean>(true);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const handleChange = ({ fileList }: { fileList: any }) => setFileList(fileList);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    const handleSubmit = () => {
        const data = fileList.map(({ name, thumbUrl }: { name: string, thumbUrl: string }) => {
            return { name: name, thumbUrl: thumbUrl }
        });

        console.log(data);


    }

    useEffect(() => {
        fileList.length > 0 && category ? setDisabled(false) : setDisabled(true);
        return () => setDisabled(false)
    }, [fileList, category])

    return (
        <div className={clsx(
            styles.container
        )}>
            <SideBar />
            <div className={clsx(
                styles.wrapper_upload
            )}>
                <div className={clsx(
                    styles.input_btn
                )}>
                    <div className={clsx(
                        styles.input
                    )}>
                        <Input placeholder="Category" bordered={false} maxLength={20} onChange={onChange} />
                    </div>
                    <div className={clsx(
                        styles.btn
                    )}>
                        <Button type="primary" disabled={disabled} onClick={handleSubmit}>Save</Button>
                    </div>
                </div>
                <div className={clsx(
                    styles.upload
                )}>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        // multiple={true}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default UploadSnapshot