import { call, all, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ActionType } from './types';
import { DataSnapshot } from './data.interfaces';
import { UserInfo, DataUpload } from '../interfaces';
import {
    handleGetSnapshot,
    handleSignup,
    handleUploadSnapshot,
    handleRemoveSnapshot
} from './services';

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

function* uploadSnapshot({ payload }: {
    type: ActionType.UPLOAD_SNAPSHOT,
    payload: DataUpload
}) {
    try {
        yield put({ type: ActionType.UPLOAD_SNAPSHOT_LOADING })
        const res: AxiosResponse = yield call(handleUploadSnapshot, payload)
        yield put({ type: ActionType.UPLOAD_SNAPSHOT_SUCCESS })
    } catch (error) {
        yield put({ type: ActionType.UPLOAD_SNAPSHOT_FAIL })
    }
}

function* removeSnapshot({ payload }: {
    type: ActionType.REMOVE_SNAPSHOT,
    payload: string
}) {
    try {
        yield put({ type: ActionType.REMOVE_SNAPSHOT_LOADING })
        const res: AxiosResponse = yield call(handleRemoveSnapshot, payload)
        yield put({ type: ActionType.REMOVE_SNAPSHOT_SUCCESS })
    } catch (error) {
        yield put({ type: ActionType.REMOVE_SNAPSHOT_FAIL })
    }

}


function* rootSaga(): Generator {
    yield all([
        takeEvery(ActionType.GET_SNAPSHOT, getSnapshot),
        takeEvery(ActionType.ACTION_SIGNUP, actionSignup),
        takeEvery(ActionType.UPLOAD_SNAPSHOT, uploadSnapshot),
        takeEvery(ActionType.REMOVE_SNAPSHOT, removeSnapshot)
    ])
}

export default rootSaga;
