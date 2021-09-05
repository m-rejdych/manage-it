import { Box, Grid, useTheme } from '@material-ui/core';

import { wrapper } from '../../store';
import { getServerSidePropsWithAutologin } from '../../util/autologin';
import ROUTES from '../../constants/routes';

import NewProjectButton from '../../components/Project/NewProjectButton';

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ height: `calc(100vh - ${theme.spacing(10)})` }}
    >
      <Grid container item xs={1} spacing={4}>
        <Grid item xs={3}>
          <NewProjectButton />
        </Grid>
        <Grid item xs={3}>
          <Box height="100%" borderRadius={2} border={`1px solid ${theme.palette.divider}`} />
        </Grid>
        <Grid item xs={3}>
          <Box height="100%" borderRadius={2} border={`1px solid ${theme.palette.divider}`} />
        </Grid>
        <Grid item xs={3}>
          <Box height="100%" borderRadius={2} border={`1px solid ${theme.palette.divider}`} />
        </Grid>
      </Grid>
      <Grid container item xs={5} spacing={4}>
        <Grid item xs={8}>
          <Box height="100%" borderRadius={2} border={`1px solid ${theme.palette.divider}`} />
        </Grid>
        <Grid item xs={4}>
          <Box height="100%" borderRadius={2} border={`1px solid ${theme.palette.divider}`} />
        </Grid>
      </Grid>
      <Grid container item xs={6} spacing={4}>
        <Grid item xs={4}>
          <Box height="100%" borderRadius={2} border={`1px solid ${theme.palette.divider}`} />
        </Grid>
        <Grid item xs={4}>
          <Box height="100%" borderRadius={2} border={`1px solid ${theme.palette.divider}`} />
        </Grid>
        <Grid item xs={4}>
          <Box height="100%" borderRadius={2} border={`1px solid ${theme.palette.divider}`} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Home;
