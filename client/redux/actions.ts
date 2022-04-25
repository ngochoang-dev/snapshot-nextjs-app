import { ActionType } from './types';
import { FetchedDataSnapshot, FetchedActionSignup } from './actions.interfaces';
import { UserInfo } from "../interfaces";

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


