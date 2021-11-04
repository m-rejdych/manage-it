import { Paper, Popper, PopperProps, List, ListSubheader } from '@mui/material';

import User from '../../types/user';
import SearchListItem from './SearchListItem';

interface Props extends PopperProps {
  showList: boolean;
  users?: User[];
  width?: number;
}

const SearchList: React.FC<Props> = ({ showList, users, width, open, ...rest }) => {
  return (
    <Popper {...rest} open={open} disablePortal>
      {showList && (
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {!!users?.length && (
            <List subheader={<ListSubheader>Users</ListSubheader>} sx={{ width }}>
              {users.map(({ id, username }) => (
                <SearchListItem
                  key={`search-list-user-${id}`}
                  value={username}
                  onClick={(): void => {}}
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
