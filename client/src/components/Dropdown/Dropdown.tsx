import { List, Collapse, CollapseProps, ClickAwayListener } from '@material-ui/core';

import DropdownItem, { Item } from './DropdownItem';
import { PAPER } from '../../constants/styleOverrides';

interface Props extends CollapseProps {
  open: boolean;
  items: Item[];
  onClose: () => void;
}

const Dropdown: React.FC<Props> = ({ open, items, onClose, ...rest }) => {
  return (
    <Collapse
      {...rest}
      sx={{
        ...PAPER.root,
        ...PAPER.elevation1,
        borderRadius: 1,
        ...rest.sx,
      }}
      in={open}
      unmountOnExit
    >
      <ClickAwayListener onClickAway={onClose}>
        <List>
          {items.map((item) => (
            <DropdownItem key={item.id} {...item} />
          ))}
        </List>
      </ClickAwayListener>
    </Collapse>
  );
};

export default Dropdown;
