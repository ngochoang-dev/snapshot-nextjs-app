import { createStore, applyMiddleware, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import { AppState } from './data.interfaces';
import rootSaga from './saga';
import reducer from './reducers'

export interface SagaStore extends Store {
    sagaTask?: Task;
}

export const makeStore = (context: Context) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducer, applyMiddleware(sagaMiddleware));

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};


export const wrapper = createWrapper<Store<AppState>>(makeStore, { debug: true });