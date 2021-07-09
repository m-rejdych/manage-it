import { Reducer } from 'redux';
import { PaletteType } from '@material-ui/core';

import { State } from './types';
import { PayloadAction } from '../../types/actions';
import { SET_PALETTE_TYPE } from './actions';

const initialState = {
  paletteType: 'light' as PaletteType,
};

const reducer: Reducer<State, PayloadAction> = (state = initialState, { type, payload }): State => {
  switch (type) {
    case SET_PALETTE_TYPE:
      return { ...state, paletteType: payload };
    default:
      return state;
  }
};

export default reducer;
