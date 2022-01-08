import { useState, useRef, useEffect } from 'react';
import {
  TextField,
  ClickAwayListener,
  TextFieldProps,
  useTheme,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import { searchUsers } from '../../services/userServices';
import { searchProjects } from '../../services/projectServices';
import useDebouncing from '../../hooks/useDebouncing';
import useSearch from '../../hooks/useSearch';
import User from '../../types/user';
import Project from '../../types/project';
import SearchList from './SearchList';
import SearchItem from './types/SearchItem';
import SelectData from './types/SelectData';
import SEARCH_ITEM_TYPES from './constants/searchItemTypes';
import { SearchItemType } from './types/SearchItem';

interface Props extends Omit<TextFieldProps, 'onSelect'> {
  onSelect: (item: SearchItem | null) => void;
  useActiveState?: boolean;
  withIcon?: boolean;
  clearAfterSelect?: boolean;
  projectIdFilter?: number;
  search: SearchItemType[];
}

const SearchInput: React.FC<Props> = ({
  onSelect,
  useActiveState,
  fullWidth,
  withIcon,
  clearAfterSelect,
  projectIdFilter,
  search,
  ...rest
}) => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [showList, setShowList] = useState(false);
  const [width, setWidth] = useState<undefined | number>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const debounce = useDebouncing();
  const {
    handleSearch: handleSearchUsers,
    values: usersValues,
    error: usersError,
    loading: usersLoading,
  } = useSearch<User[]>((value: string) =>
    searchUsers({ value, projectId: projectIdFilter }),
  );
  const {
    handleSearch: handleSearchProjects,
    values: projectsValues,
    error: projectsError,
    loading: projectsLoading,
  } = useSearch<Project[]>(searchProjects);

  const isListEmpty = !usersValues?.length && !projectsValues?.length;
  const isLoading = usersLoading || projectsLoading;
  const isError = usersError || projectsError;

  useEffect(() => {
    const calculateWidth = (): void => {
      setWidth(inputRef.current?.offsetWidth);
    };

    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  const resetTimeout = (): void => {
    if (!timeoutRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const handleOpenSearch = (): void => {
    if (isActive) return;

    resetTimeout();

    setIsActive(true);
    const timeout = setTimeout(() => {
      setShowList(true);
      setWidth(inputRef.current?.offsetWidth);
      timeoutRef.current = null;
    }, 200);

    timeoutRef.current = timeout;
  };

  const handleHideSearch = (): void => {
    if (!isActive) return;

    resetTimeout();

    setShowList(false);
    setIsActive(false);
    setWidth(undefined);
  };

  const handleSearchItems = (newValue: string): void => {
    debounce(500, (): void => {
      if (search.includes(SEARCH_ITEM_TYPES.USER)) handleSearchUsers(newValue);
      if (search.includes(SEARCH_ITEM_TYPES.PROJECT))
        handleSearchProjects(newValue);
    });
  };

  const handleSelect = ({ item, value: selectValue }: SelectData): void => {
    onSelect(item);
    setValue(selectValue);
    setIsSelected(true);
    handleSearchItems(selectValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue =
      isSelected && clearAfterSelect
        ? e.target.value.slice(-1)
        : e.target.value;
    setValue(newValue);

    handleSearchItems(newValue);

    if (!isSelected) return;
    setIsSelected(false);

    if (clearAfterSelect) onSelect(null);
  };

  return (
    <>
      <SearchList
        open={isActive}
        showList={showList && (!isListEmpty || isLoading)}
        anchorEl={inputRef.current}
        placement="bottom"
        users={usersValues}
        projects={projectsValues}
        width={width && width - 16}
        onSelect={handleSelect}
        loading={isLoading}
      />
      <ClickAwayListener onClickAway={handleHideSearch}>
        <TextField
          {...rest}
          ref={inputRef}
          helperText={isError || ''}
          error={!!isError}
          InputProps={{
            startAdornment: withIcon ? <Search color="disabled" /> : null,
            ...rest.InputProps,
            sx: {
              boxShadow: isActive && useActiveState ? theme.shadows[6] : 'none',
              ...rest.InputProps?.sx,
            },
          }}
          sx={{
            width: useActiveState ? (isActive ? '40%' : '30%') : '100%',
            transition: 'all 0.2s ease',
            ...rest.sx,
          }}
          onChange={handleChange}
          onClick={handleOpenSearch}
          value={value}
        />
      </ClickAwayListener>
    </>
  );
};

export default SearchInput;
