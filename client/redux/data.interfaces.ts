import { ActionType } from "./types";

export interface User {
    userId: null | number,
    userName: null | string,
}

export interface DataSnapshot {
    id?: number | null,
    link: string,
    category?: string | null
}

export interface AppState {
    loading: boolean;
    dataSnapshot: DataSnapshot[],
    user: User
}

