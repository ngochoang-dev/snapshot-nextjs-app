import { call, all, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ActionType } from './types';
import { handleGetSnapshot, handleSignup } from './services';
import { DataSnapshot } from './data.interfaces';
import { UserInfo } from '../interfaces';

function* getSnapshot({ payload }:
    {
        type: ActionType.GET_SNAPSHOT,
        payload: string | string[] | undefined
    }) {
    try {
        const res: AxiosResponse<DataSnapshot[]> = yield call(handleGetSnapshot, payload);
        yield put({ type: ActionType.GET_SNAPSHOT_SUCCESS, payload: res.data })
    } catch (error) {
        console.log(error);
    }
}

function* actionSignup({ payload }: {
    type: ActionType.GET_SNAPSHOT,
    payload: UserInfo
}) {
    try {
        const res: AxiosResponse = yield call(handleSignup, payload)
        yield put({ type: ActionType.ACTION_SIGNUP_SUCCESS })
    } catch (error) {
        yield put({ type: ActionType.ACTION_SIGNUP_FAIL })
    }

}


function* rootSaga(): Generator {
    yield all([
        takeEvery(ActionType.GET_SNAPSHOT, getSnapshot),
        takeEvery(ActionType.ACTION_SIGNUP, actionSignup),
    ])
}

export default rootSaga;
