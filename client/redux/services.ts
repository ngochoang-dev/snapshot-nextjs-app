import axios from "axios";

export const handleGetSnapshot = (payload: string | string[] | undefined) => {
    return axios.get(`${process.env.URL}/${payload}`)
}