import { ActionType } from "./types";
import { UserInfo } from "../interfaces";
export interface FetchedDataSnapshot {
    type: typeof ActionType.GET_SNAPSHOT,
    payload: string | string[] | undefined
}

export interface FetchedDataSnapshotSuccess {
    type: typeof ActionType.GET_SNAPSHOT_SUCCESS,
    payload: any
}

export interface FetchedActionSignup {
    type: typeof ActionType.ACTION_SIGNUP,
    payload: UserInfo
}

export interface FetchedActionSignupSuccess {
    type: typeof ActionType.ACTION_SIGNUP_SUCCESS,
    payload?: UserInfo
}

export interface FetchedActionSignupFail {
    type: typeof ActionType.ACTION_SIGNUP_FAIL,
}


export type Action =
    FetchedDataSnapshot |
    FetchedDataSnapshotSuccess |
    FetchedActionSignupSuccess |
    FetchedActionSignupFail