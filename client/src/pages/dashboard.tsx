import { Box, Grid, Paper, Fade } from '@mui/material';

import { wrapper } from '../store';
import { getServerSidePropsWithAutologin } from '../util/autologin';
import ROUTES from '../constants/routes';
import PageContainer from '../components/PageContainer';
import WelcomeSection from '../components/Dashboard/WelcomeSection';
import SearchInput from '../components/Dashboard/SearchInput';
import Calendar from '../components/Calendar';

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      {/* <SearchInput /> */}
      <WelcomeSection />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={7} sx={{ borderRadius: 5, overflow: 'hidden' }}>
            <Calendar />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={7} sx={{ height: 300, borderRadius: 5, overflow: 'hidden' }} />
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={7} sx={{ height: 300, borderRadius: 5, overflow: 'hidden' }} />
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={7} sx={{ height: 300, borderRadius: 5, overflow: 'hidden' }} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Dashboard;
