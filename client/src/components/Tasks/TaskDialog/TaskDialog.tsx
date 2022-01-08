import { Dialog, DialogProps, DialogTitle } from '@mui/material';

import TaskForm from '../TaskForm';

interface Props extends Omit<DialogProps, 'onClose'> {
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  projectId: number;
}

const TaskDialog: React.FC<Props> = ({ onClose, projectId, ...rest }) => {
  return (
    <Dialog {...rest} PaperProps={{ sx: { width: '40vw' } }}>
      <DialogTitle>Add new task</DialogTitle>
      <TaskForm onDialogClose={onClose} projectId={projectId} />
    </Dialog>
  );
};

export default TaskDialog;
