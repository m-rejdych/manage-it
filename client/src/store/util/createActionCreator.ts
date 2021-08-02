import { PayloadActionCreator } from '../types/actions';

const createActionCreator =
  <T, U>(type: T): PayloadActionCreator<T, U> =>
  (payload: U) => ({
    type,
    payload,
  });

export default createActionCreator;
