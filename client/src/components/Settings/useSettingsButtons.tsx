import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Logout } from '@mui/icons-material';

import { Item } from '../Dropdown/DropdownItem';
import { logout } from '../../store/ducks/auth/actions';
import ROUTES from '../../constants/routes';

const useSettingsButtons = (): Item[] => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = (): void => {
    dispatch(logout());
    router.push(ROUTES.LOGIN);
  };

  return [
    {
      id: 'settings-logout',
      label: 'Logout',
      onClick: handleLogout,
      icon: <Logout color="white" />,
    },
  ];
};

export default useSettingsButtons;
