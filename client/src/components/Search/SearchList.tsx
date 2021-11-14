import {
  Paper,
  Popper,
  PopperProps,
  List,
  ListSubheader,
  LinearProgress,
} from '@mui/material';

import User from '../../types/user';
import Project from '../../types/project';
import SearchListItem from './SearchListItem';
import SelectData from './types/SelectData';
import ItemClickData from './types/ItemClickData';
import SEARCH_ITEM_TYPES from './constants/searchItemTypes';

interface Props extends Omit<PopperProps, 'onSelect'> {
  showList: boolean;
  onSelect: (item: SelectData) => void;
  loading: boolean;
  users?: User[] | null;
  projects?: Project[] | null;
  width?: number;
}

const SearchList: React.FC<Props> = ({
  showList,
  users,
  projects,
  width,
  open,
  loading,
  onSelect,
  ...rest
}) => {
  const isEmpty = !users?.length;

  const handleClick = ({ id, value, type }: ItemClickData): void => {
    onSelect({ item: { id, type }, value });
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
              {users.map(({ id, username }) => (
                <SearchListItem
                  key={`search-list-user-${id}`}
                  value={username}
                  onClick={handleClick.bind(this, {
                    id,
                    value: username,
                    type: SEARCH_ITEM_TYPES.USER,
                  })}
                />
              ))}
            </List>
          )}
          {!!projects?.length && (
            <List subheader={<ListSubheader>Projects</ListSubheader>}>
              {projects.map(({ id, title }) => (
                <SearchListItem
                  key={`search-list-project-${id}`}
                  value={title}
                  onClick={handleClick.bind(this, {
                    id,
                    value: title,
                    type: SEARCH_ITEM_TYPES.PROJECT,
                  })}
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
