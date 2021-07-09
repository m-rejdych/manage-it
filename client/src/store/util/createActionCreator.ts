import { PayloadAcitonCreator } from '../types/actions';

const createActionCreator =
  <T, U>(type: T): PayloadAcitonCreator<T, U> =>
  (payload: U) => ({
    type,
    payload,
  });

export default createActionCreator;
