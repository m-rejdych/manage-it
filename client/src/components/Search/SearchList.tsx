import {
  Paper,
  Popper,
  PopperProps,
  List,
  ListSubheader,
  LinearProgress,
} from '@mui/material';

import User from '../../types/user';
import SearchListItem from './SearchListItem';
import SelectData from './types/SelectData';
import SEARCH_ITEM_TYPES from './constants/searchItemTypes';

interface Props extends Omit<PopperProps, 'onSelect'> {
  showList: boolean;
  onSelect: (item: SelectData) => void;
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

  const handleClick = ({ id, username }: User): void => {
    onSelect({ item: { id, type: SEARCH_ITEM_TYPES.USER }, value: username });
  };

  return (
    <Popper {...rest} open={open} disablePortal>
      {showList && (
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            height: isEmpty && loading ? window.innerHeight * 0.2 : 'auto',
            maxHeight: isEmpty && loading ? 150 : window.innerHeight * 0.4,
            width,
          }}
        >
          {!!users?.length && (
            <List subheader={<ListSubheader>Users</ListSubheader>}>
              {users.map((user) => (
                <SearchListItem
                  key={`search-list-user-${user.id}`}
                  value={user.username}
                  onClick={handleClick.bind(this, user)}
                />
              ))}
            </List>
          )}
          {loading && (
            <LinearProgress
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                zIndex: 1,
              }}
            />
          )}
        </Paper>
      )}
    </Popper>
  );
};

export default SearchList;
