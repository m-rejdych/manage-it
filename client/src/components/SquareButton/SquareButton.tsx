import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

interface Props extends Omit<ButtonProps, 'startIcon' | 'endIcon'> {
  Icon: React.ElementType;
}

const SquareButton: React.FC<Props> = ({ Icon, children, sx, ...rest }) => {
  const theme = useTheme();

  return (
    <Button
      {...rest}
      sx={{
        minWidth: 120,
        minHeight: 120,
        width: 120,
        height: 120,
        flexDirection: 'column',
        backgroundColor: `${grey[700]}30`,
        border: `1px solid ${theme.palette.grey[700]}`,
        ...sx,
      }}
    >
      <Icon sx={{ fontSize: 60 }} />
      {children}
    </Button>
  );
};

export default SquareButton;
