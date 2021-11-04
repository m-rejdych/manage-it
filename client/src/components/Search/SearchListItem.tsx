import { ListItemButton, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

import SearchItem, { SearchItemType } from './types/SearchItem';

interface Props {
  value: string;
  id: number;
  type: SearchItemType;
  onClick: (item: SearchItem) => void;
}

const SearchListItem: React.FC<Props> = ({ onClick, id, type, value }) => {
  const handleClick = (): void => {
    onClick({ type, id });
  };

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText>{value}</ListItemText>
    </ListItemButton>
  );
};

export default SearchListItem;
