import clsx from 'clsx';
import type { NextPage } from 'next'
import { IoSearch } from 'react-icons/io5';
import { Switch } from 'antd';


import styles from './Header.module.scss';

const Header: NextPage = () => {
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
                    <h1>SnapShot</h1>
                </div>
                <div className={clsx(
                    styles.wrapper_search
                )}>
                    <div className={clsx(
                        styles.search
                    )}>
                        <input type="text" placeholder="Search..." />
                        <button >
                            <IoSearch className={clsx(styles.icons_search)} />
                        </button>
                    </div>
                </div>
                <div className={clsx(
                    styles.wrapper_options
                )}>
                    <ul>
                        <li>Sign in</li>
                        <li>Sign up</li>
                    </ul>
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