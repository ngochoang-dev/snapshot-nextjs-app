import { useState } from 'react';
import clsx from 'clsx';
import { NextPage } from 'next';
import { AiFillGithub, AiFillMail } from 'react-icons/ai';
import { Avatar, Checkbox, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react'

import styles from '../../styles/Auth.module.scss';

const Singin: NextPage = () => {
    const [showPass, setShowPass] = useState<boolean>(true);

    const handleCheck = () => {

    }

    const handleSubmit = () => {

    }

    const handleSigninGithub = async () => {
        await signIn('github', {
            callbackUrl: 'http://localhost:3000/cat',
        })
    }

    const handleSigninGoogle = async () => {
        await signIn('google', {
            callbackUrl: 'http://localhost:3000/dog',
        })
    }


    return (
        <div className={clsx(
            styles.container
        )}>
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
                        <input type="text" id='userName' name='userName' placeholder=" " autoComplete='off' />
                        <label className={clsx(styles.label)} htmlFor="userName">Name</label>
                    </div>
                    <div className={clsx(
                        styles.form_group
                    )}>
                        <input type="password" id='password' name='password' placeholder=" " autoComplete='off' />
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

export default Singin