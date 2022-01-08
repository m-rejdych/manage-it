import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  getProjectById,
  validateMembership,
  reset,
} from '../../../store/ducks/projects/actions';
import type { RootState } from '../../../store/types/state';
import PageContainer from '../../../components/PageContainer';
import ProjectHeader from '../../../components/Projects/ProjectHeader';
import TaskDialog from '../../../components/Tasks/TaskDialog';

const ProjectPageContainer: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { query } = useRouter();
  const project = useSelector(
    (state: RootState) => state.project.openedProject.project,
  );
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  useEffect(() => {
    dispatch(getProjectById(parseInt(query.id as string)));
    dispatch(validateMembership(parseInt(query.id as string)));
  }, [query.id]);

  const toggleDialog = (): void => {
    setOpen((isOpen) => !isOpen);
  };

  return project ? (
    <PageContainer>
      <ProjectHeader
        id={project.id}
        title={project.title}
        toggleTaskDialog={toggleDialog}
      />
      {children}
      <TaskDialog
        open={open}
        onClose={toggleDialog}
        projectId={parseInt(query.id as string)}
      />
    </PageContainer>
  ) : null;
};

export default ProjectPageContainer;
