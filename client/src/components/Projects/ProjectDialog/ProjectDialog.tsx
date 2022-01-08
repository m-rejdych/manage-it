import { Dialog, DialogTitle, DialogProps } from '@mui/material';

import ProjectForm from '../ProjectForm';

interface Props extends Omit<DialogProps, 'onClose'> {
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const NewProjectDialog: React.FC<Props> = ({ onClose, ...rest }) => {
  return (
    <Dialog {...rest} PaperProps={{ sx: { width: '40vw' } }}>
      <DialogTitle>Create new project</DialogTitle>
      <ProjectForm onDialogClose={onClose} />
    </Dialog>
  );
};

export default NewProjectDialog;
