import { Paper, Popper, PopperProps, List, ListSubheader, LinearProgress } from '@mui/material';

import User from '../../types/user';
import SearchListItem from './SearchListItem';
import SearchItem from './types/SearchItem';
import SEARCH_ITEM_TYPES from './constants/searchItemTypes';

interface Props extends Omit<PopperProps, 'onSelect'> {
  showList: boolean;
  onSelect: (item: SearchItem) => void;
  users: User[] | null;
  loading: boolean;
  width?: number;
}

const SearchList: React.FC<Props> = ({
  showList,
  users,
  width,
  open,
  loading,
  onSelect,
  ...rest
}) => {
  const isEmpty = !users?.length;

  return (
    <Popper {...rest} open={open} disablePortal>
      {showList && (
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            borderRadius: '0 0 10px 10px',
            overflow: 'hidden',
            height: isEmpty && loading ? window.innerHeight * 0.2 : 'auto',
            maxHeight: isEmpty && loading ? 150 : window.innerHeight * 0.4,
            width,
          }}
        >
          {!!users?.length && (
            <List subheader={<ListSubheader>Users</ListSubheader>}>
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
          {loading && (
            <LinearProgress sx={{ position: 'absolute', left: 0, right: 0, top: 0, zIndex: 1 }} />
          )}
        </Paper>
      )}
    </Popper>
  );
};

export default SearchList;
