import { ActionType } from "./types";
import { UserInfo, DataUpload } from "../interfaces";
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

export interface FetchedUploadSnapshot {
    type: typeof ActionType.UPLOAD_SNAPSHOT,
    payload: DataUpload
}

export interface FetchedUploadSnapshotLoading {
    type: typeof ActionType.UPLOAD_SNAPSHOT_LOADING,
}

export interface FetchedUploadSnapshotSuccess {
    type: typeof ActionType.UPLOAD_SNAPSHOT_SUCCESS,
    payload?: DataUpload
}


export interface FetchedUploadSnapshotFail {
    type: typeof ActionType.UPLOAD_SNAPSHOT_FAIL,
}

export interface FetchedRemoveSnapshot {
    type: typeof ActionType.REMOVE_SNAPSHOT,
    payload: string
}

export interface FetchedRemoveSnapshotLoading {
    type: typeof ActionType.REMOVE_SNAPSHOT_LOADING,
}

export interface FetchedRemoveSnapshotSuccess {
    type: typeof ActionType.REMOVE_SNAPSHOT_SUCCESS,
    payload: string
}

export interface FetchedRemoveSnapshotFail {
    type: typeof ActionType.REMOVE_SNAPSHOT_FAIL,
    payload: string
}


export type Action =
    FetchedDataSnapshot |
    FetchedDataSnapshotSuccess |
    FetchedActionSignupSuccess |
    FetchedActionSignupFail |
    FetchedUploadSnapshotSuccess |
    FetchedUploadSnapshotLoading |
    FetchedUploadSnapshotFail |
    FetchedRemoveSnapshotLoading |
    FetchedRemoveSnapshotSuccess |
    FetchedRemoveSnapshotFail