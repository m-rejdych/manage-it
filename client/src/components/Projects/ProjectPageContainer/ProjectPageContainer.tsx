import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  getProjectById,
  validateMembership,
  reset,
} from '../../../store/ducks/projects/actions';
import type { RootState } from '../../../store/types/state';
import type { BreadcrumbsType } from '../../PageHeader/PageHeader';
import PageContainer from '../../../components/PageContainer';
import ProjectHeader from '../../../components/Projects/ProjectHeader';
import TaskDialog from '../../../components/Tasks/TaskDialog';

interface Props {
  shouldFade?: boolean;
  breadcrumbs?: BreadcrumbsType;
}

const ProjectPageContainer: React.FC<Props> = ({
  children,
  shouldFade,
  breadcrumbs,
}) => {
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
    dispatch(getProjectById(parseInt(query.projectId as string)));
    dispatch(validateMembership(parseInt(query.projectId as string)));
  }, [query.projectId]);

  const toggleDialog = (): void => {
    setOpen((isOpen) => !isOpen);
  };

  return project ? (
    <PageContainer shouldFade={shouldFade}>
      <ProjectHeader
        id={project.id}
        title={project.title}
        toggleTaskDialog={toggleDialog}
        breadcrumbs={breadcrumbs}
      />
      {children}
      <TaskDialog
        open={open}
        onClose={toggleDialog}
        projectId={parseInt(query.projectId as string)}
      />
    </PageContainer>
  ) : null;
};

export default ProjectPageContainer;
