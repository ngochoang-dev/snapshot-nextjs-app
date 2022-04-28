import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import clsx from "clsx";
import Head from 'next/head'
import { getSession } from 'next-auth/react';

import { wrapper } from '../../redux/store';
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
                <link rel="icon" href="/favicon.ico" />
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

export default Profile;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    () => async ({ req, }): Promise<any> => {
        const session = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: '/auth/signin',
                    permanent: false,
                },
            };
        }
    }
);