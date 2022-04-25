import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './data.interfaces';
import { Action } from './actions.interfaces';
import { ActionType } from './types';

const initState: AppState = {
    loading: false,
    dataSnapshot: [],
    isSignup: false,
}


const reducer = (
    state = initState,
    action: Action | { type: typeof HYDRATE; payload: AppState }
) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload }
        }

        case ActionType.GET_SNAPSHOT_SUCCESS: {
            return { ...state, dataSnapshot: action.payload.data }
        }

        case ActionType.ACTION_SIGNUP_SUCCESS: {
            return { ...state, isSignup: true }
        }

        case ActionType.ACTION_SIGNUP_FAIL: {
            return { ...state, isSignup: false }
        }

        default:
            return state
    }
}

export default reducer;