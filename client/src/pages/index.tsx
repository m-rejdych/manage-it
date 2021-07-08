import { Box, Paper, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  registerButton: {
    marginRight: theme.spacing(2),
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper className={classes.paper}>
        <Typography variant="h5" paragraph>
          Create a free account and work on exciting projects with other people!
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.registerButton}
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
