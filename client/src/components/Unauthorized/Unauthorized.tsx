import type { FC } from 'react';
import { Box, Typography } from '@mui/material';

const Unauthorized: FC = () => (
  <Box height="100%" display="flex" alignItems="center" justifyContent="center">
    <Typography variant="h3">
      Sorry! You are not allowed to peek in here :(
    </Typography>
  </Box>
);

export default Unauthorized;
