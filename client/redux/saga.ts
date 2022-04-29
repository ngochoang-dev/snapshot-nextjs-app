import { call, all, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ActionType } from './types';
import { DataSnapshot } from './data.interfaces';
import { UserInfo, DataUpload, User } from '../interfaces';
import {
    handleGetSnapshot,
    handleSignup,
    handleUploadSnapshot,
    handleRemoveSnapshot,
    handleUpdateInfo,
    handleGetInfoUser
} from './services';

function* getSnapshot({ payload }:
    {
        type: ActionType.GET_SNAPSHOT,
        payload: string | string[] | undefined
    }) {
    try {
        yield put({ type: ActionType.GET_SNAPSHOT_LOADING })
        const res: AxiosResponse<DataSnapshot[]> = yield call(handleGetSnapshot, payload);
        yield put({ type: ActionType.GET_SNAPSHOT_SUCCESS, payload: res.data })
    } catch (error) {
        yield put({ type: ActionType.GET_SNAPSHOT_FAIL })
    }
}

function* actionSignup({ payload }: {
    type: ActionType.GET_SNAPSHOT,
    payload: UserInfo
}) {
    try {
        yield call(handleSignup, payload)
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
        yield call(handleUploadSnapshot, payload)
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
        yield call(handleRemoveSnapshot, payload)
        yield put({ type: ActionType.REMOVE_SNAPSHOT_SUCCESS })
    } catch (error) {
        yield put({ type: ActionType.REMOVE_SNAPSHOT_FAIL })
    }
}

function* updateInfoUser({ payload }: {
    type: ActionType.UPDATE_INFO_USER,
    payload: User
}) {
    try {
        yield put({ type: ActionType.UPDATE_INFO_USER_LOADING })
        const res: AxiosResponse<any> = yield call(handleUpdateInfo, payload)
        yield put({
            type: ActionType.UPDATE_INFO_USER_SUCCESS,
            payload: { ...payload, avatar: res.data.link }
        })
    } catch (error) {
        yield put({ type: ActionType.UPDATE_INFO_USER_FAIL })
    }
}

function* getInfoUser({ payload }: {
    type: ActionType.GET_INFO_USER,
    payload: string
}) {
    try {
        yield put({ type: ActionType.GET_INFO_USER_LOADING })
        const res: AxiosResponse<any> = yield call(handleGetInfoUser, payload)
        yield put({
            type: ActionType.GET_INFO_USER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({ type: ActionType.GET_INFO_USER_FAIL })
    }
}


function* rootSaga(): Generator {
    yield all([
        takeEvery(ActionType.GET_SNAPSHOT, getSnapshot),
        takeEvery(ActionType.ACTION_SIGNUP, actionSignup),
        takeEvery(ActionType.UPLOAD_SNAPSHOT, uploadSnapshot),
        takeEvery(ActionType.REMOVE_SNAPSHOT, removeSnapshot),
        takeEvery(ActionType.UPDATE_INFO_USER, updateInfoUser),
        takeEvery(ActionType.GET_INFO_USER, getInfoUser),
    ])
}

export default rootSaga;
