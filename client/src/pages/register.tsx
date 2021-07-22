import { Box, Paper, useTheme } from '@material-ui/core';

import AuthForm from '../components/AuthForm';

const Register: React.FC = () => {
  const theme = useTheme();

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper sx={{ p: theme.spacing(3), minWidth: 470 }}>
        <AuthForm />
      </Paper>
    </Box>
  );
};

export default Register;
