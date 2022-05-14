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
import Role from '../../../types/project/Role';
import PageContainer from '../../../components/PageContainer';
import ProjectHeader from '../../../components/Projects/ProjectHeader';
import TaskDialog from '../../../components/Tasks/TaskDialog';
import Unauthorized from '../../../components/Unauthorized';

interface Props {
  shouldFade?: boolean;
  breadcrumbs?: BreadcrumbsType;
  role?: Role;
}

const ProjectPageContainer: React.FC<Props> = ({
  children,
  shouldFade,
  breadcrumbs,
  role,
}) => {
  const [open, setOpen] = useState(false);
  const { query } = useRouter();
  const project = useSelector(
    (state: RootState) => state.project.openedProject.project,
  );
  const isMember = useSelector(
    (state: RootState) => state.project.openedProject.isMember,
  );
  const isAdmin = useSelector(
    (state: RootState) => state.project.openedProject.isAdmin,
  );
  const loading = useSelector((state: RootState) => state.project.loading);
  const dispatch = useDispatch();

  const isAuthorized =
    role === undefined ||
    (role === Role.User && isMember) ||
    (role === Role.Admin && isAdmin);

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
      {isAuthorized ? (
        <>
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
        </>
      ) : loading ? null : (
        <Unauthorized />
      )}
    </PageContainer>
  ) : null;
};

export default ProjectPageContainer;
