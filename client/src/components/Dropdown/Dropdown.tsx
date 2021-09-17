import {
  Paper,
  List,
  Collapse,
  CollapseProps,
  ClickAwayListener,
  PaperProps,
} from '@material-ui/core';

import DropdownItem, { Item } from './DropdownItem';

interface Props extends CollapseProps {
  open: boolean;
  items: Item[];
  onClose: () => void;
  paperProps?: PaperProps;
}

const Dropdown: React.FC<Props> = ({ open, items, onClose, paperProps, ...rest }) => {
  return (
    <Collapse
      {...rest}
      sx={{
        borderRadius: 1,
        ...rest.sx,
      }}
      in={open}
      unmountOnExit
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper {...paperProps}>
          <List>
            {items.map((item) => (
              <DropdownItem key={item.id} {...item} />
            ))}
          </List>
        </Paper>
      </ClickAwayListener>
    </Collapse>
  );
};

export default Dropdown;
