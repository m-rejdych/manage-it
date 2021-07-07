import { Typography, Box } from '@material-ui/core';

import NotLoggedInitial from '../components/NotLoggedInitial';

const Home: React.FC = () => {
  return (
    <Box minHeight="100vh" height="100%">
      <NotLoggedInitial />
    </Box>
  );
};

export default Home;
