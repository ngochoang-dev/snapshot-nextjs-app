import type { NextPage } from 'next';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './SideBar.module.scss';


const SideBar: NextPage = () => {
    return (
        <div className={clsx(
            styles.container
        )}>
            <ul>
                <li>
                    <Link href="/me/profile">
                        <a>Profile</a>
                    </Link>
                </li>
                <li>
                    <Link href="/me/upload">
                        <a>Upload Photo</a>
                    </Link>
                </li>
                <li>
                    <Link href="/me/snapshot">
                        <a>My Snapshot</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar;
