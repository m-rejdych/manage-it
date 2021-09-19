import React from 'react';
import { Dialog, DialogProps, DialogTitle } from '@mui/material';

import TaskForm from '../TaskForm';

interface Props extends Omit<DialogProps, 'onClose'> {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TaskDialog: React.FC<Props> = ({ onClose, ...rest }) => {
  return (
    <Dialog {...rest} PaperProps={{ sx: { width: '40vw' } }}>
      <DialogTitle>Add new task</DialogTitle>
      <TaskForm onDialogClose={onClose} />
    </Dialog>
  );
};

export default TaskDialog;
