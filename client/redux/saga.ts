import { call, all, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ActionType } from './types';
import { handleGetSnapshot } from './services';
import { DataSnapshot } from './data.interfaces';

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

function* rootSaga(): Generator {
    yield all([
        takeEvery(ActionType.GET_SNAPSHOT, getSnapshot)
    ])
}

export default rootSaga;
