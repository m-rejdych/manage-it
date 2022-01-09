import { useState } from 'react';
import { Paper, PaperProps, useTheme } from '@mui/material';

interface Props extends PaperProps {
  onClick?: () => void;
  disableClick?: boolean;
}

const CardBase: React.FC<Props> = ({
  onClick = () => {},
  disableClick,
  children,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const handleMouseEnter = (): void => {
    if (disableClick) return;
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    if (disableClick) return;
    setIsHovered(false);
  };

  const handleClick = (): void => {
    if (disableClick) return;
    onClick();
  };

  return (
    <Paper
      {...rest}
      sx={{
        p: theme.spacing(4),
        borderRadius: 5,
        cursor: disableClick ? 'default' : 'pointer',
        ...rest.sx,
      }}
      elevation={isHovered ? 6 : 1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </Paper>
  );
};

export default CardBase;
