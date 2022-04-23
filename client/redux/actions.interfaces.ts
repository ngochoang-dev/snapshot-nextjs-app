import { ActionType } from "./types";

export interface FetchedDataSnapshot {
    type: typeof ActionType.GET_SNAPSHOT,
    payload: string | string[] | undefined
}

export interface FetchedDataSnapshotSuccess {
    type: typeof ActionType.GET_SNAPSHOT_SUCCESS,
    payload: any
}


export type Action =
    FetchedDataSnapshot |
    FetchedDataSnapshotSuccess