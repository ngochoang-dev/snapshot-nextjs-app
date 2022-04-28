import { useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { AiFillGithub, AiFillMail } from 'react-icons/ai';
import { Avatar, Checkbox, Button, message, } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { signIn, } from 'next-auth/react';
import * as Yup from 'yup';
import { getSession } from "next-auth/react"

import styles from './Auth.module.scss';
import { UserInfo } from '../../interfaces';
import Loading from '../../components/Loading';
import { wrapper } from '../../redux/store';

const infoSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
})

type IProps = {
    previousRoute: string
}

const Singin: NextPage<IProps> = ({ previousRoute }) => {
    const router = useRouter();
    const [showPass, setShowPass] = useState<boolean>(true);
    const [info, setInfo] = useState<UserInfo>({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleCheck = () => {

    }

    const handleSubmit = async () => {
        setLoading(true);
        const inValid = await infoSchema.isValid(info, { abortEarly: false });
        if (!inValid) {
            setLoading(false);
            return message.error('Form invalid!');
        }

        const res: any = await signIn('credentials', {
            redirect: false,
            ...info,
        });
        if (res?.error) {
            message.error(res?.error);
            setLoading(false);
        } else {
            router.replace(previousRoute ? previousRoute : '/')
        }
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    }

    const handleSigninGithub = async () => {
        setLoading(true);
        await signIn('github', {
            callbackUrl: previousRoute ? previousRoute : '/',
        })
    }

    const handleSigninGoogle = async () => {
        setLoading(true);
        await signIn('google', {
            callbackUrl: previousRoute ? previousRoute : '/',
        })
    }

    return (
        <div className={clsx(
            styles.container
        )}>
            <Head>
                <title>Snapshot Singin</title>
                <meta name="description" content="snapshot" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {loading && <Loading loading={loading} />}
            <div className={clsx(
                styles.wrapper_form
            )}>
                <div className={clsx(
                    styles.header
                )}>
                    <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                    />
                    <h3>Welcome back!</h3>
                    <p>Signin to your account</p>
                </div>
                <div className={clsx(
                    styles.form_login
                )}>
                    <div className={clsx(
                        styles.form_group
                    )}>
                        <input type="text"
                            id='username' name='username'
                            placeholder=" " autoComplete='off'
                            value={info.username}
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <label className={clsx(styles.label)} htmlFor="username">Name</label>
                    </div>
                    <div className={clsx(
                        styles.form_group
                    )}>
                        <input type={showPass ? 'password' : 'text'}
                            id='password' name='password'
                            placeholder=" " autoComplete='off'
                            value={info.password}
                            onChange={(e) => handleChangeInput(e)}
                        />
                        <label className={clsx(styles.label)} htmlFor="password">Password</label>
                        {
                            showPass ? (
                                <span onClick={() => setShowPass(!showPass)}>
                                    <EyeInvisibleOutlined />
                                </span>
                            ) : (
                                <span onClick={() => setShowPass(!showPass)}>
                                    <EyeOutlined />
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className={clsx(
                    styles.wrapper_actions
                )}>
                    <Checkbox onChange={handleCheck} defaultChecked>Remember me</Checkbox>
                    <Button type="primary" danger size='large' onClick={handleSubmit}>
                        SIGN IN
                    </Button>
                </div>
                <div className={clsx(
                    styles.wrapper_other_login
                )}>
                    <p>Connect with</p>
                    <span onClick={handleSigninGithub}>
                        <AiFillGithub className={clsx(styles.icon_media)} />
                    </span>
                    <span onClick={handleSigninGoogle}>
                        <AiFillMail className={clsx(styles.icon_media)} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Singin;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    () => async ({ req }): Promise<any> => {
        const session = await getSession({ req });
        const previousRoute = req.headers.referer ? req.headers.referer : '';

        if (session) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        return {
            props: {
                previousRoute
            }
        }
    }
);

