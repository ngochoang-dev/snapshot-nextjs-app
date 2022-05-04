import { ActionType } from './types';
import {
    FetchedDataSnapshot,
    FetchedActionSignup,
    FetchedUploadSnapshot,
    FetchedRemoveSnapshot,
    FetchedUpdateInfo
} from './actions.interfaces';
import { UserInfo, DataUpload, User, RemoveData } from "../interfaces";

export const getSnapshot = (payload: string | string[] | undefined): FetchedDataSnapshot => {
    return {
        type: ActionType.GET_SNAPSHOT,
        payload
    }
}

export const actionSignup = (payload: UserInfo): FetchedActionSignup => {
    return {
        type: ActionType.ACTION_SIGNUP,
        payload
    }
}

export const uploadSnapshot = (payload: DataUpload): FetchedUploadSnapshot => {
    return {
        type: ActionType.UPLOAD_SNAPSHOT,
        payload
    }
}

export const removeSnapshot = (payload: RemoveData): FetchedRemoveSnapshot => {
    return {
        type: ActionType.REMOVE_SNAPSHOT,
        payload
    }
}

export const updateInfoUser = (payload: User): FetchedUpdateInfo => {
    return {
        type: ActionType.UPDATE_INFO_USER,
        payload
    }
}

export const getInfoUser = (payload: string | unknown) => {
    return {
        type: ActionType.GET_INFO_USER,
        payload
    }
}

export const getMySnapshot = (payload: string | unknown) => {
    return {
        type: ActionType.GET_MY_SNAPSHOT,
        payload
    }
}

