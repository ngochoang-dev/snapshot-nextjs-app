import axios from "axios";
import { UserInfo } from '../interfaces';

export const handleGetSnapshot = (payload: string | string[] | undefined) => {
    return axios.get(`${process.env.URL}/${payload}`)
}

export const handleSignup = (payload: UserInfo) => {
    return axios.post(`${process.env.URL}/account/signup`, payload)
}