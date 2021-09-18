import { Box, Alert, Zoom, AlertProps, Portal, useTheme } from '@mui/material';

interface Props extends AlertProps {
  open: boolean;
}

const AppAlert: React.FC<Props> = ({ open, children, ...rest }) => {
  const theme = useTheme();

  return (
    <Portal>
      <Zoom in={open}>
        <Box
          width="100%"
          mx={3}
          position="fixed"
          bottom={theme.spacing(3)}
          display="flex"
          justifyContent="center"
        >
          <Alert {...rest}>{children}</Alert>
        </Box>
      </Zoom>
    </Portal>
  );
};

export default AppAlert;
