import type { NextPage } from 'next';
import { useRef, ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import clsx from "clsx";
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from 'next-auth/react';
import { UserOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { CgArrowsExchange } from 'react-icons/cg';
import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    Avatar
} from 'antd';

import { wrapper } from '../../redux/store';
import styles from './Me.module.scss';
import SideBar from '../../components/SideBar';
import { User } from '../../interfaces';
import { updateInfoUser } from '../../redux/actions';
import { AppState } from '../../redux/data.interfaces';
import Loading from '../../components/Loading';

const { Option } = Select;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const Profile: NextPage = () => {
    const dispatch = useDispatch();
    const {
        age,
        email,
        gender,
        introduction,
        name,
        nickname,
        website,
        avatar: image,
    } = useSelector((state: AppState) => state.user);
    const { loading } = useSelector((state: AppState) => state);
    const inputRef = useRef<HTMLInputElement>(null);
    const { data: session } = useSession();
    const [avatar, setAvatar] = useState<string | ArrayBuffer | null>()
    const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File = (e.target.files as FileList)[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAvatar(reader.result)
        }
    }

    const onFinish = (values: User) => {
        const info = { ...values, avatar, id: session?.id };
        dispatch(updateInfoUser(info));
    };


    return (
        <div className={clsx(
            styles.container
        )}>
            <Head>
                <title>Profile</title>
                <meta name="description" content="snapshot" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {loading && <Loading loading={loading} />}
            <SideBar />
            <div className={clsx(
                styles.wrapper
            )}>
                <span className={clsx(
                    styles.avatar
                )}
                    onClick={() => inputRef?.current?.click()}
                >
                    <Avatar icon={<UserOutlined />} src={
                        image ? image : session?.user?.image
                    } size={100} />
                    <button>
                        <CgArrowsExchange className={clsx(styles.icon_change)} />
                    </button>
                    <input type="file" ref={inputRef} accept="image/*"
                        onChange={handleChangeAvatar}
                    />
                </span>
                <Form {...layout} name="nest-messages" onFinish={onFinish}
                    fields={[
                        {
                            name: ["name"],
                            value: name ? name : session?.user?.name,
                        },
                        {
                            name: ["email"],
                            value: email ? email : session?.user?.email,
                        },
                        {
                            name: ["age"],
                            value: age ? Number(age) : null,
                        },
                        {
                            name: ["gender"],
                            value: gender,
                        },
                        {
                            name: ["nickname"],
                            value: nickname,
                        },
                        {
                            name: ["website"],
                            value: website,
                        },
                        {
                            name: ["introduction"],
                            value: introduction,
                        },
                    ]}
                    validateMessages={validateMessages}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="Age"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: false,
                                message: 'Please select gender!',
                            },
                        ]}
                    >
                        <Select >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="nickname"
                        label="Nickname"
                        tooltip="What do you want others to call you?"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="website" label="Website">
                        <Input />
                    </Form.Item>
                    <Form.Item name="introduction" label="Introduction">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Profile;

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