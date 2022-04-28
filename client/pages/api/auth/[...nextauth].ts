import NextAuth from "next-auth";
import axios from "axios";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';


export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GIT_ID,
            clientSecret: process.env.GIT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Snapshot",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                const payload = {
                    username: credentials?.username,
                    password: credentials?.password,
                };
                try {
                    const user: any = await axios.get(`${process.env.URL}/account/signin`, {
                        data: payload
                    });
                    if (user) {
                        const { username, id } = user.data.user
                        return {
                            name: username,
                            image: 'https://joeschmoe.io/api/v1/random',
                            id: id
                        }
                    }
                } catch (error: any) {
                    throw new Error(
                        error?.response?.data?.message
                    );
                }
                return null
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/auth/signin',
    },

    callbacks: {
        async session({ session, token }) {
            console.log("user", token);

            session.id = token.sub
            return Promise.resolve(session)
        },
    },
    // debug: process.env.NODE_ENV === 'development',
    debug: false,
});