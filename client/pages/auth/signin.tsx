import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AiFillGithub, AiFillMail } from 'react-icons/ai';
import { Avatar, Checkbox, Button, message, Spin } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { signIn, useSession } from 'next-auth/react';
import * as Yup from 'yup';

import styles from './Auth.module.scss';
import { UserInfo } from '../../interfaces';

const infoSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
})

const Singin: NextPage = () => {
    const router = useRouter();
    const { status } = useSession();
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
            callbackUrl: 'http://localhost:3000',
        });
        if (res?.error) {
            message.error(res?.error);
            setLoading(false);
        } else {
            router.push('/')
            setLoading(false);
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
            callbackUrl: 'http://localhost:3000',
        })
    }

    const handleSigninGoogle = async () => {
        setLoading(true);
        await signIn('google', {
            callbackUrl: 'http://localhost:3000',
        })
    }

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/')
        }
    }, [status]);
    console.log(status);

    if (status !== "unauthenticated") {
        return null
    }





    return (
        <div className={clsx(
            styles.container
        )}>
            {loading && <div className={clsx(
                styles.overlay
            )}> <Spin spinning={loading} delay={500} size="large" /></div>}
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

