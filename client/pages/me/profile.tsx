import type { NextPage } from 'next'
import clsx from "clsx";
import Head from 'next/head'
import styles from './Me.module.scss';
import SideBar from '../../components/SideBar'

const Profile: NextPage = () => {
    return (
        <div className={clsx(
            styles.container
        )}>
            <Head>
                <title>Profile</title>
                <meta name="description" content="snapshot" />
                <link rel="icon" href="/favicon.ico" />\
            </Head>
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