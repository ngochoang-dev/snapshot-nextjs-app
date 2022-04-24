import { ActionType } from './types';
import { FetchedDataSnapshot } from './actions.interfaces';

export const getSnapshot = (payload: string | string[] | undefined): FetchedDataSnapshot => {
    return {
        type: ActionType.GET_SNAPSHOT,
        payload
    }
}


