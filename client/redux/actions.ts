import { ActionType } from './types';
import {
    FetchedDataSnapshot,
    FetchedActionSignup,
    FetchedUploadSnapshot,
    FetchedRemoveSnapshot
} from './actions.interfaces';
import { UserInfo, DataUpload } from "../interfaces";

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

export const removeSnapshot = (payload: string): FetchedRemoveSnapshot => {
    return {
        type: ActionType.REMOVE_SNAPSHOT,
        payload
    }
}

