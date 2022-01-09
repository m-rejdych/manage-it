import { Fade, Box } from '@mui/material';

interface Props {
  shouldFade?: boolean;
}

const PageContainer: React.FC<Props> = ({ children, shouldFade }) => {
  const content = <Box py={4}>{children}</Box>;

  return shouldFade ? <Fade in>{content}</Fade> : content;
};

export default PageContainer;
