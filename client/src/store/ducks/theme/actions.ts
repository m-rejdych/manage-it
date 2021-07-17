import { PaletteMode } from '@material-ui/core';

import createActionCreator from '../../util/createActionCreator';

export const SET_PALETTE_TYPE = 'THEME_SET_PALETTE_TYPE';

export const setPaletteType = createActionCreator<typeof SET_PALETTE_TYPE, PaletteMode>(
  SET_PALETTE_TYPE
);
