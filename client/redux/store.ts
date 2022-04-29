import { createStore, applyMiddleware, Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import { AppState } from './data.interfaces';
import rootSaga from './saga';
import reducer from './reducers'

export interface SagaStore extends Store {
    sagaTask?: Task;
}

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}
export const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducer, bindMiddleware([sagaMiddleware]));

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};


export const wrapper = createWrapper<Store<AppState>>(makeStore, { debug: false });