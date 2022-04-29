export interface UserInfo {
    username: string;
    password: string;
    confirmPassword?: string;
}

export interface SnapShot {
    link: string;
}
export interface DataUpload {
    uploaderId: any,
    category: string,
    data: SnapShot[]
}


export interface User {
    age: number | string,
    email: string,
    gender: string,
    introduction: string,
    name: string,
    nickname: string,
    website: string,
    avatar: any,
    image: string,
    username: string,
    id: string | unknown,
}
