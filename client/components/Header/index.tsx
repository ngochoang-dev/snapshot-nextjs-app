import { useState } from 'react';
import clsx from 'clsx';
import type { NextPage } from 'next'
import { IoSearch } from 'react-icons/io5';
import { Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Avatar, Popover } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { signOut, useSession } from "next-auth/react";

import styles from './Header.module.scss';
import { getSnapshot } from '../../redux/actions';

const category = ["mountain", "beaches", "birds", "food", "shopping", "dog", "car"];

const Header: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (category?: string): void => {
        const value = category ? category : searchValue
        dispatch(getSnapshot(value));
        router.push(`/${value}`, undefined, { shallow: true });
        category && setSearchValue(category)
    }

    return (
        <div className={clsx(
            styles.container
        )}>
            <div className={clsx(
                styles.wrapper
            )}>
                <div className={clsx(
                    styles.logo
                )}>
                    <Link href="/mountain">
                        <a><h1>SnapShot</h1></a>
                    </Link>
                </div>
                <div className={clsx(
                    styles.wrapper_search
                )}>
                    <div className={clsx(
                        styles.search
                    )}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            onKeyDown={(e) => {
                                e.key === 'Enter' && handleSearch()
                            }}
                        />
                        <button
                            onClick={() => handleSearch()}
                        >
                            <IoSearch className={clsx(styles.icons_search)} />
                        </button>
                        <ul>
                            {
                                category.map((category, i) => {
                                    return (
                                        <li key={i}>
                                            <span
                                                onClick={() => handleSearch(category)}
                                            >{category}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={clsx(
                    styles.wrapper_options
                )}>
                    {
                        status === 'unauthenticated' && (
                            <ul>
                                <li>
                                    <Link href='/auth/signin'>
                                        <a>Sign in</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/auth/signup'>
                                        <a>Sign up</a>
                                    </Link>
                                </li>
                            </ul>
                        )
                    } {
                        status === 'authenticated' && (
                            <div className={clsx(
                                styles.wrapper_user
                            )}>
                                <Popover placement="bottomLeft" content={
                                    <div className={clsx(
                                        'wrapper_popover'
                                    )}>
                                        <ul>
                                            <li>
                                                <Link href='/me/profile'>
                                                    <a>Profile</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href='/me/upload'>
                                                    <a>Upload photo</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href='/me/snapshot'>
                                                    <a>My snapshot</a>
                                                </Link>
                                            </li>
                                        </ul>
                                        <p onClick={() => signOut()}>
                                            <LogoutOutlined />
                                            <span>Sign out</span>
                                        </p>
                                    </div>
                                } trigger="click">
                                    <Avatar icon={<UserOutlined />} src={session.user?.image} />
                                </Popover>
                                <p>{session.user?.name}</p>
                            </div>
                        )
                    }
                </div>
                <div className={clsx(
                    styles.button_change_theme
                )}>
                    <Switch
                        className={clsx(styles.switch_theme)}
                        checkedChildren="Light"
                        unCheckedChildren="Dark"
                        defaultChecked
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;
