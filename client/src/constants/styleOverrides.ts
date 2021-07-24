import { blue, pink } from '@material-ui/core/colors';

export const TEXT_SECONDARY = '#6968A6';

export const DIVIDER = '#312F62';

export const PAPER = {
  root: {
    background:
      'linear-gradient(247.99deg, rgba(52, 49, 102, 0.49) 0%, rgba(41, 39, 84, 0.78) 48.89%, rgba(27, 25, 67, 0.71) 98.46%)',
    backdropFilter: 'blur(23px)',
    WebkitBackdropFilter: 'blur(23px)',
  },
  elevation1: {
    boxShadow: '0px 11px 29px rgba(23, 18, 43, 0.585739)',
  },
  elevation2: {
    boxShadow: '0px 21px 44px rgba(23, 18, 43, 0.585739)',
  },
  elevation3: {
    boxShadow: '0px 51px 69px rgba(23, 18, 43, 0.585739)',
  },
};

export const BUTTON = {
  containedPrimary: {
    background: `linear-gradient(135deg, ${blue[300]} 0%, ${blue[400]} 19.24%, ${blue[500]} 68.64%, ${blue[600]} 81.77%, ${blue[700]} 100%)`,
  },
  containedSecondary: {
    background: `linear-gradient(135deg, ${pink[300]} 0%, ${pink[400]} 19.24%, ${pink[500]} 68.64%, ${pink[600]} 81.77%, ${pink[700]} 100%)`,
  },
};

export const BODY_BACKGROUND =
  'radial-gradient(123.22% 129.67% at 100.89% -5.6%, #201D47 0%, #17153A 100%)';
