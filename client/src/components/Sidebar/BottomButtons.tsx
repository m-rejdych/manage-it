import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Logout, Person, Notifications, Settings } from '@mui/icons-material';

import { logout } from '../../store/ducks/auth/actions';
import ROUTES from '../../constants/routes';

interface BottomButton {
  id: string;
  tooltip: string;
  onClick: () => void;
  icon: JSX.Element;
}

const BottomButtons: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = (): void => {
    dispatch(logout());
    router.push(ROUTES.LOGIN);
  };

  const buttons: BottomButton[] = [
    {
      id: 'notification-button',
      tooltip: 'Notifications',
      onClick: (): void => {},
      icon: <Notifications />,
    },
    {
      id: 'logout-button',
      tooltip: 'Logout',
      onClick: handleLogout,
      icon: <Logout color="error" />,
    },
  ];

  return (
    <>
      {buttons.map(({ id, tooltip, onClick, icon }, index, self) => (
        <Tooltip arrow key={id} title={tooltip} placement="right">
          <IconButton
            onClick={onClick}
            sx={{
              mb: theme.spacing(index === self.length - 1 ? 0 : 1),
            }}
            size="large"
          >
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </>
  );
};

export default BottomButtons;
