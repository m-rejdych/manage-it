import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { wrapper } from '../../../store';
import { getServerSidePropsWithAutologin } from '../../../util/autologin';
import {
  getProjectById,
  validateMembership,
  reset,
} from '../../../store/ducks/projects/actions';
import { RootState } from '../../../store/types/state';
import ROUTES from '../../../constants/routes';
import PageContainer from '../../../components/PageContainer';
import ProjectHeader from '../../../components/Projects/ProjectHeader';
import ProjectBody from '../../../components/Projects/ProjectBody';

const Project: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isAdminPanelActive, setIsAdminPanelActive] = useState(false);
  const { query } = useRouter();
  const project = useSelector(
    (state: RootState) => state.project.openedProject.project,
  );
  const isAdmin = useSelector((state: RootState) => state.project.openedProject.isAdmin);
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

const toggleAdminPanel = (): void => {
  setIsAdminPanelActive(prev => !prev);
}

  return (
    project && (
      <PageContainer>
        <ProjectHeader
          id={project.id}
          title={project.title}
          toggleTaskDialog={toggleDialog}
          toggleAdminPanel={toggleAdminPanel}
          isAdminPanelActive={isAdminPanelActive && isAdmin}
        />
        <ProjectBody
          taskDialogOpen={open}
          toggleDialog={toggleDialog}
          isAdminPanelActive={isAdminPanelActive && isAdmin}
        />
      </PageContainer>
    )
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default Project;
