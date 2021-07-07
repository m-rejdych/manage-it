import { Box, Typography, Button, Paper, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';

import ROUTES from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  createButton: {
    marginRight: theme.spacing(2),
  },
  text: {
    marginBottom: theme.spacing(3),
  },
}));

const NotLoggedInitial: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();

  const handleSearch = (): void => {
    router.push(ROUTES.PROJECTS_SEARCH);
  };

  const handleCreateAccount = (): void => {
    router.push(ROUTES.REGISTER);
  };

  return (
    <Box height="100%" display="flex" alignItems="center" justifyContent="center">
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.text}>
          Create free account to take part in projects, or search to see what others are working on!
        </Typography>
        <Box display="flex">
          <Button
            color="primary"
            variant="contained"
            className={classes.createButton}
            onClick={handleCreateAccount}
          >
            Create account
          </Button>
          <Button color="secondary" variant="contained" onClick={handleSearch}>
            Search for projects
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotLoggedInitial;
