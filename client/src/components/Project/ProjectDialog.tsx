import { Dialog, DialogTitle, DialogContent, DialogProps } from '@material-ui/core';
import React from 'react';

import ProjectForm from './ProjectForm';

interface Props extends Omit<DialogProps, 'onClose'> {
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const NewProjectDialog: React.FC<Props> = ({ onClose, ...rest }) => {
  return (
    <Dialog {...rest} PaperProps={{ sx: { minWidth: '50vw' } }}>
      <DialogTitle>Create</DialogTitle>
      <DialogContent>
        <ProjectForm onDialogClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
