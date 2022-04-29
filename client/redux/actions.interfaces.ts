import { ActionType } from "./types";
import { UserInfo, DataUpload, User } from "../interfaces";
export interface FetchedDataSnapshot {
    type: typeof ActionType.GET_SNAPSHOT,
    payload: string | string[] | undefined
}

export interface FetchedDataSnapshotLoading {
    type: typeof ActionType.GET_SNAPSHOT_LOADING,
}

export interface FetchedDataSnapshotSuccess {
    type: typeof ActionType.GET_SNAPSHOT_SUCCESS,
    payload: any
}

export interface FetchedDataSnapshotFail {
    type: typeof ActionType.GET_SNAPSHOT_FAIL,
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

export interface FetchedUpdateInfo {
    type: typeof ActionType.UPDATE_INFO_USER,
    payload: User
}

export interface FetchedUpdateInfoLoading {
    type: typeof ActionType.UPDATE_INFO_USER_LOADING,
}

export interface FetchedUpdateInfoSuccess {
    type: typeof ActionType.UPDATE_INFO_USER_SUCCESS,
    payload: User
}

export interface FetchedInfoUserSuccess {
    type: typeof ActionType.GET_INFO_USER_SUCCESS,
    payload: {
        data: User
    }
}

export interface FetchedInfoUserLoading {
    type: typeof ActionType.GET_INFO_USER_LOADING,
}


export type Action =
    FetchedDataSnapshotLoading |
    FetchedDataSnapshot |
    FetchedDataSnapshotFail |
    FetchedDataSnapshotSuccess |
    FetchedActionSignupSuccess |
    FetchedActionSignupFail |
    FetchedUploadSnapshotSuccess |
    FetchedUploadSnapshotLoading |
    FetchedUploadSnapshotFail |
    FetchedRemoveSnapshotLoading |
    FetchedRemoveSnapshotSuccess |
    FetchedRemoveSnapshotFail |
    FetchedUpdateInfoSuccess |
    FetchedUpdateInfoLoading |
    FetchedInfoUserSuccess |
    FetchedInfoUserLoading