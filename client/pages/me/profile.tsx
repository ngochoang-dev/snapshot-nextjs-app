import type { NextPage } from 'next'
import clsx from "clsx";

import styles from './Me.module.scss';
import SideBar from '../../components/SideBar'

const Profile: NextPage = () => {
    return (
        <div className={clsx(
            styles.container
        )}>
            <SideBar />
            <div className={clsx(
                styles.wrapper
            )}>
                Profile
            </div>
        </div>
    )
}

export default Profile