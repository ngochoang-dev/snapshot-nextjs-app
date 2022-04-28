import { useState, ChangeEvent, useEffect } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { wrapper } from '../../redux/store';
import styles from './Auth.module.scss';
import Loading from '../../components/Loading'
import { UserInfo } from '../../interfaces'
import { actionSignup } from '../../redux/actions';
import { AppState } from '../../redux/data.interfaces'
import { ActionType } from '../../redux/types';

type IProps = {
    previousRoute: string
}

const Singup: NextPage<IProps> = ({ previousRoute }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isSignup = useSelector((state: AppState) => state.isSignup);
    const [showPass, setShowPass] = useState<boolean>(true);
    const [showCfPass, setShowCfPass] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<UserInfo>({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const infoSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string()
            .test('passwords-match',
                'Passwords must match',
                function (value) { return this.parent.password === value })
    })

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = async () => {
        setLoading(true);
        const inValid = await infoSchema.isValid(info, { abortEarly: false });
        const { username, password } = info
        if (!inValid) {
            setLoading(false);
            return message.error('Form invalid!')
        }
        dispatch(actionSignup({ username, password }))
    }

    useEffect(() => {
        async function autoSignin() {
            const res: any = await signIn('credentials', {
                redirect: false,
                ...info,
                callbackUrl: previousRoute ? previousRoute : '/',
            });
            if (res?.error) {
                message.error(res?.error);
            } else {
                router.push(previousRoute ? previousRoute : '/')
            }
        }
        if (isSignup) {
            autoSignin()
        }
        return () => {
            setLoading(false);
            dispatch({ type: ActionType.ACTION_SIGNUP_FAIL })
        }
    }, [isSignup,
        dispatch,
        info,
        router,
        previousRoute]);


    return (
        <div className={clsx(
            styles.container
        )}>
            <Head>
                <title>Snapshot Singup</title>
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
                        <input type="text"
                            id='username' name='username'
                            placeholder=" " autoComplete='off'
                            value={info.username}
                            onChange={handleChangeInput}
                        />
                        <label className={clsx(styles.label)} htmlFor="username">Name</label>
                    </div>
                    <div className={clsx(
                        styles.form_group,
                        styles.form_group_signup
                    )}>
                        <input
                            type={showPass ? 'password' : 'text'}
                            id='password' name='password'
                            placeholder=" " autoComplete='off'
                            value={info.password}
                            onChange={handleChangeInput}
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
                    <div className={clsx(
                        styles.form_group,
                        styles.form_group_signup
                    )}>
                        <input
                            type={showCfPass ? 'password' : 'text'}
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder=" " autoComplete='off'
                            value={info.confirmPassword}
                            onChange={handleChangeInput}
                        />
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
                    <Button type="primary" danger size='large' onClick={handleSignup}>
                        SIGN UP
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Singup;

export const getServerSideProps = wrapper.getServerSideProps(
    () => async ({ req, }): Promise<any> => {
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