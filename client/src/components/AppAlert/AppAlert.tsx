import ReactDOM from 'react-dom';
import { Box, Alert, Zoom, AlertProps, useTheme } from '@material-ui/core';

interface Props extends AlertProps {
  open: boolean;
}

const AppAlert: React.FC<Props> = ({ open, children, ...rest }) => {
  const theme = useTheme();

  return ReactDOM.createPortal(
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
    </Zoom>,
    document.body
  );
};

export default AppAlert;
