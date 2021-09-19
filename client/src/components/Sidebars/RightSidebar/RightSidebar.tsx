import { Paper, useTheme } from '@mui/material';

const RightSidebar: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: `calc(20vw - ${theme.spacing(3)})`,
        borderRadius: '50px 0 0 0',
      }}
    />
  );
};

export default RightSidebar;
