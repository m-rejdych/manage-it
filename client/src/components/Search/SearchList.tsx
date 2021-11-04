import { Paper, Popper, PopperProps, List, ListSubheader } from '@mui/material';

import User from '../../types/user';
import SearchListItem from './SearchListItem';
import SearchItem from './types/SearchItem';
import SEARCH_ITEM_TYPES from './constants/searchItemTypes';

interface Props extends Omit<PopperProps, 'onSelect'> {
  showList: boolean;
  onSelect: (item: SearchItem) => void;
  users?: User[];
  width?: number;
}

const SearchList: React.FC<Props> = ({ showList, users, width, open, onSelect, ...rest }) => {
  return (
    <Popper {...rest} open={open} disablePortal>
      {showList && (
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {!!users?.length && (
            <List subheader={<ListSubheader>Users</ListSubheader>} sx={{ width }}>
              {users.map(({ id, username }) => (
                <SearchListItem
                  key={`search-list-user-${id}`}
                  id={id}
                  type={SEARCH_ITEM_TYPES.USER}
                  value={username}
                  onClick={onSelect}
                />
              ))}
            </List>
          )}
        </Paper>
      )}
    </Popper>
  );
};

export default SearchList;
