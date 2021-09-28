import { useRouter } from 'next/router';
import { List, ListItemButton, ListItemIcon, Tooltip, useTheme } from '@mui/material';
import { Dashboard, MenuBook, Person, Settings } from '@mui/icons-material';

type Values = '/dashboard' | '/projects' | '/profile' | '/settings';

interface Element {
  id: string;
  value: Values;
  tooltip: string;
  icon: JSX.Element;
}

const ELEMENTS: Element[] = [
  {
    id: 'nav-dashboard',
    value: '/dashboard',
    tooltip: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    id: 'nav-projects',
    value: '/projects',
    tooltip: 'Projects',
    icon: <MenuBook />,
  },
  {
    id: 'nav-profile',
    value: '/profile',
    tooltip: 'Profile',
    icon: <Person />,
  },
  {
    id: 'nav-settings',
    value: '/settings',
    tooltip: 'Settings',
    icon: <Settings />,
  },
];

const Nav: React.FC = () => {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const handleSelect = (value: Values): void => {
    push(value);
  };

  return (
    <List sx={{ width: '100%', px: theme.spacing(1), flexGrow: 1 }}>
      {ELEMENTS.map(({ id, value, icon, tooltip }) => (
        <Tooltip title={tooltip} key={id} placement="right" arrow>
          <ListItemButton
            onClick={(): void => handleSelect(value)}
            selected={pathname === value}
            sx={{ borderRadius: 3, mb: theme.spacing(1) }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>{icon}</ListItemIcon>
          </ListItemButton>
        </Tooltip>
      ))}
    </List>
  );
};

export default Nav;
