import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import clsx from "clsx";
import Head from 'next/head'
import { getSession } from 'next-auth/react';
import { Form, Input, InputNumber, Button, Select } from 'antd';

import { wrapper } from '../../redux/store';
import styles from './Me.module.scss';
import SideBar from '../../components/SideBar'
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

    const onFinish = (values: any) => {
        console.log(values);
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
            <SideBar />
            <div className={clsx(
                styles.wrapper
            )}>
                <Form {...layout} name="nest-messages" onFinish={onFinish}
                    validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'name']}
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
                        name={['user', 'email']}
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
                        name={['user', 'age']}
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
                        name={['user', 'nickname']}
                        label="Nickname"
                        tooltip="What do you want others to call you?"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'gender']}
                        label="Gender"
                        rules={[
                            {
                                required: false,
                                message: 'Please select gender!',
                            },
                        ]}
                    >
                        <Select placeholder="select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={['user', 'website']} label="Website">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
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