import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

export interface Item {
  id: string;
  label: string;
  onClick: () => void;
  icon?: JSX.Element;
}

const DropdownItem: React.FC<Item> = ({ label, onClick, icon }) => (
  <ListItemButton onClick={onClick} sx={{ borderRadius: 1 }}>
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    <ListItemText primaryTypographyProps={{ color: 'textSecondary', sx: { fontWeight: 700 } }}>
      {label}
    </ListItemText>
  </ListItemButton>
);

export default DropdownItem;
