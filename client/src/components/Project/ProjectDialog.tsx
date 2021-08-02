import { Dialog, DialogTitle, DialogContent, DialogProps } from '@material-ui/core';

import ProjectForm from './ProjectForm';

const NewProjectDialog: React.FC<DialogProps> = ({ onClose, ...rest }) => {
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
