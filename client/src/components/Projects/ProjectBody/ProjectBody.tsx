import React from 'react';

import UserPanel from './UserPanel';
import AdminPanel from './AdminPanel';

interface Props {
  taskDialogOpen: boolean;
  toggleDialog: () => void;
  isAdminPanelActive: boolean;
}

const ProjectBody: React.FC<Props> = ({
  taskDialogOpen,
  toggleDialog,
  isAdminPanelActive,
}) => {
  return isAdminPanelActive ? (
    <AdminPanel />
  ) : (
    <UserPanel toggleDialog={toggleDialog} taskDialogOpen={taskDialogOpen} />
  );
};

export default ProjectBody;
