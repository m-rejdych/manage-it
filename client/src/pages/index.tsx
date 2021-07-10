import { Box, Paper, Typography, Button, useTheme } from '@material-ui/core';

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper
        css={{
          padding: theme.spacing(3),
        }}
      >
        <Typography variant="h5" paragraph>
          Create a free account and work on exciting projects with other people!
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            css={{
              marginRight: theme.spacing(2),
            }}
          >
            Register
          </Button>
          <Button variant="contained" color="secondary" size="large">
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
