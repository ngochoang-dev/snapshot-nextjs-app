import { ActionType } from "./types";


export interface DataSnapshot {
    id?: number | null,
    link: string,
    category?: string | null
}

export interface AppState {
    loading: boolean;
    dataSnapshot: DataSnapshot[],
    isSignup: boolean
}

