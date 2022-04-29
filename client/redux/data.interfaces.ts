
import { User } from '../interfaces';
export interface DataSnapshot {
    id?: number | null,
    link: string,
    category?: string | null,
    photoId?: string | null
}

export interface AppState {
    loading: boolean;
    dataSnapshot: DataSnapshot[],
    isSignup: boolean,
    isUploadSuccess: boolean,
    isUploadFail: boolean,
    isRemove: boolean,
    user: User
}

