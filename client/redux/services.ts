import axios from "axios";
import { UserInfo, DataUpload, User } from '../interfaces';

export const handleGetSnapshot = (payload: string | string[] | undefined) => {
    return axios.get(`${process.env.URL}/${payload}`)
}

export const handleSignup = (payload: UserInfo) => {
    return axios.post(`${process.env.URL}/account/signup`, payload)
}

export const handleUploadSnapshot = (payload: DataUpload) => {
    const data = JSON.stringify(payload)
    return axios.post(`${process.env.URL}/upload-image`, {
        data
    })
}

export const handleRemoveSnapshot = (payload: string) => {
    return axios.delete(`${process.env.URL}/remove?id=${payload}`)
}

export const handleUpdateInfo = (payload: User) => {
    return axios.post(`${process.env.URL}/user/update`, payload)
}

export const handleGetInfoUser = (payload: string) => {
    return axios.get(`${process.env.URL}/user/info?id=${payload}`)
}