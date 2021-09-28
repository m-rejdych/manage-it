import { Fade, Box } from '@mui/material';

const PageContainer: React.FC = ({ children }) => (
  <Fade in>
    <Box py={4}>{children}</Box>
  </Fade>
);

export default PageContainer;
