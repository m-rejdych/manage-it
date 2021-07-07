import { Grid, makeStyles, ThemeProvider } from '@material-ui/core';

import AppBar from './AppBar';
import Theme from './Theme';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return children ? (
    <Theme>
      {({ toggleTheme }) => (
        <>
          <AppBar toggleTheme={toggleTheme} />
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              {children}
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </>
      )}
    </Theme>
  ) : null;
};

export default Layout;
