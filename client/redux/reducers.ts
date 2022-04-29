import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './data.interfaces';
import { Action } from './actions.interfaces';
import { ActionType } from './types';

const initState: AppState = {
    loading: false,
    isSignup: false,
    isUploadSuccess: false,
    isUploadFail: false,
    isRemove: false,
    user: {
        age: 0,
        email: "",
        gender: "",
        introduction: "",
        name: "",
        nickname: "",
        website: "",
        avatar: "",
        image: "",
        username: "",
        id: "",
    },
    dataSnapshot: [],
}


const reducer = (
    state = initState,
    action: Action | { type: typeof HYDRATE; payload: AppState }
) => {
    switch (action.type) {
        case HYDRATE: {
            const nextState = {
                ...state,
                ...action.payload,
            };
            if (state.user) nextState.user = state.user;
            return nextState;
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
                ...state, isRemove: false, loading: true,
            }
        }

        case ActionType.REMOVE_SNAPSHOT_SUCCESS: {
            return {
                ...state, isRemove: true, loading: false,
            }
        }

        case ActionType.REMOVE_SNAPSHOT_FAIL: {
            return {
                ...state, isRemove: false, loading: false,
            }
        }

        case ActionType.UPDATE_INFO_USER_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }

        case ActionType.UPDATE_INFO_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    ...action.payload,
                    avatar: action.payload.avatar ?
                        action.payload.avatar :
                        state.user.avatar
                }
            }
        }

        case ActionType.GET_INFO_USER_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }

        case ActionType.GET_INFO_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    ...action.payload.data,
                    avatar: action.payload.data.image,
                    name: action.payload.data.username,
                }
            }
        }

        default:
            return state
    }
}

export default reducer;