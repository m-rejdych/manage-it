import { Box, Grid, Paper } from '@mui/material';

import { wrapper } from '../store';
import { getServerSidePropsWithAutologin } from '../util/autologin';
import ROUTES from '../constants/routes';
import WelcomeSection from '../components/Dashboard/WelcomeSection';
import SearchInput from '../components/Dashboard/SearchInput';
import Calendar from '../components/Calendar';

const Dashboard: React.FC = () => {
  return (
    <Box pt={3}>
      <SearchInput />
      <WelcomeSection />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={7}>
            <Calendar />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={7} sx={{ height: 300 }} />
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={7} sx={{ height: 300 }} />
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={7} sx={{ height: 300 }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Dashboard;
