import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './data.interfaces';
import { Action } from './actions.interfaces';
import { ActionType } from './types';

const initState: AppState = {
    loading: false,
    dataSnapshot: [],
    isSignup: false,
    isUploadSuccess: false,
    isUploadFail: false,
    isRemove: false,
}


const reducer = (
    state = initState,
    action: Action | { type: typeof HYDRATE; payload: AppState }
) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload }
        }

        case ActionType.GET_SNAPSHOT_LOADING: {
            return { ...state, loading: true }
        }

        case ActionType.GET_SNAPSHOT_SUCCESS: {
            return { ...state, dataSnapshot: action.payload.data, loading: false }
        }

        case ActionType.GET_SNAPSHOT_FAIL: {
            return { ...state, loading: false, dataSnapshot: [] }

        }

        case ActionType.ACTION_SIGNUP_SUCCESS: {
            return { ...state, isSignup: true }
        }

        case ActionType.ACTION_SIGNUP_FAIL: {
            return { ...state, isSignup: false }
        }

        case ActionType.UPLOAD_SNAPSHOT_LOADING: {
            return {
                ...state, loading: true,
                isUploadSuccess: false,
                isUploadFail: false
            }
        }

        case ActionType.UPLOAD_SNAPSHOT_SUCCESS: {
            return {
                ...state, loading: false,
                isUploadSuccess: true,
                isUploadFail: false
            }
        }

        case ActionType.UPLOAD_SNAPSHOT_FAIL: {
            return {
                ...state, loading: false,
                isUploadSuccess: false,
                isUploadFail: true
            }
        }

        case ActionType.REMOVE_SNAPSHOT_LOADING: {
            return {
                ...state, isRemove: true, loading: true,
            }
        }

        case ActionType.REMOVE_SNAPSHOT_SUCCESS: {
            return {
                ...state, isRemove: false, loading: false,
            }
        }

        case ActionType.REMOVE_SNAPSHOT_FAIL: {
            return {
                ...state, isRemove: false, loading: false,
            }
        }

        default:
            return state
    }
}

export default reducer;