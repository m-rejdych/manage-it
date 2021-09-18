import { Stack, Box, Typography, Divider } from '@mui/material';

const NotFound: React.FC = () => (
  <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
    <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
      <Typography variant="h4">400</Typography>
      <Typography variant="h6">Page not found.</Typography>
    </Stack>
  </Box>
);

export default NotFound;
