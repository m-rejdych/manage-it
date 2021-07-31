import { Button, ButtonProps, useTheme } from '@material-ui/core';

import { PAPER } from '../../constants/styleOverrides';

const ButtonMain: React.FC<ButtonProps> = ({ children, sx, variant, ...rest }) => {
  const theme = useTheme();

  return (
    <Button
      {...rest}
      variant={variant}
      sx={{
        ...(variant ? {} : PAPER.root),
        width: '100%',
        height: '100%',
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonMain;
