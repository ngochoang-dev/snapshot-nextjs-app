import { useState } from 'react';
import clsx from 'clsx';
import { NextPage } from 'next';
import { Avatar, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


import styles from '../../styles/Auth.module.scss';

const Singup: NextPage = () => {
    const [showPass, setShowPass] = useState<boolean>(true);
    const [showCfPass, setShowCfPass] = useState<boolean>(true);


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
                    <h3>Hello there!</h3>
                    <p>Easy account creation</p>
                </div>
                <div className={clsx(
                    styles.form_login
                )}>
                    <div className={clsx(
                        styles.form_group,
                        styles.form_group_signup
                    )}>
                        <input type="text" id='userName' name='userName' placeholder=" " autoComplete='off' />
                        <label className={clsx(styles.label)} htmlFor="userName">Name</label>
                    </div>
                    <div className={clsx(
                        styles.form_group,
                        styles.form_group_signup
                    )}>
                        <input type={showPass ? 'password' : 'text'} id='password' name='password' placeholder=" " autoComplete='off' />
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
                    <div className={clsx(
                        styles.form_group,
                        styles.form_group_signup
                    )}>
                        <input type={showCfPass ? 'password' : 'text'} id='confirmPassword' name='confirmPassword' placeholder=" " autoComplete='off' />
                        <label className={clsx(styles.label)} htmlFor="confirmPassword">Confirm password</label>
                        {
                            showCfPass ? (
                                <span onClick={() => setShowCfPass(!showCfPass)}>
                                    <EyeInvisibleOutlined />
                                </span>
                            ) : (
                                <span onClick={() => setShowCfPass(!showCfPass)}>
                                    <EyeOutlined />
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className={clsx(
                    styles.wrapper_actions,
                    styles.wrapper_actions_signup
                )}>
                    <Button type="primary" danger size='large'>
                        SIGN UP
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Singup;
