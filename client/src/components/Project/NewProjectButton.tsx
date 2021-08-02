import { useState } from 'react';
import ButtonMain from '../ButtonMain';

import ProjectDialog from './ProjectDialog';

const NewProjectButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDialog = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ButtonMain onClick={toggleDialog}>Create new project</ButtonMain>
      <ProjectDialog open={open} onClose={toggleDialog} />
    </>
  );
};

export default NewProjectButton;
