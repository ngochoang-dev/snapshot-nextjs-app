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
