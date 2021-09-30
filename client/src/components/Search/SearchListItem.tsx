import { ListItemButton, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

interface Props {
  value: string;
  onClick: () => void;
}

const SearchListItem: React.FC<Props> = ({ onClick, value }) => (
  <ListItemButton onClick={onClick}>
    <ListItemAvatar>
      <Avatar />
    </ListItemAvatar>
    <ListItemText>{value}</ListItemText>
  </ListItemButton>
);

export default SearchListItem;
