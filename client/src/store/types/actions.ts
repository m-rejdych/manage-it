import { Action } from 'redux';

export interface PayloadAction<T = any, U = any> extends Action<T> {
  payload: U;
}

export type PayloadAcitonCreator<T, U> = (payload: U) => PayloadAction<T, U>;
