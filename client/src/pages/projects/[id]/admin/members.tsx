import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Avatar, ButtonProps } from '@mui/material';
import {
  PersonRemove,
  AdminPanelSettings,
  ArrowCircleDown,
} from '@mui/icons-material';

import type { RootState } from '../../../../store/types/state';
import { wrapper } from '../../../../store';
import { getServerSidePropsWithAutologin } from '../../../../util/autologin';
import {
  getMembers,
  degradeAdmin,
  makeAdmin,
  setMembers,
  removeAdminMember,
} from '../../../../store/ducks/projects/actions';
import ProjectPageContainer from '../../../../components/Projects/ProjectPageContainer';
import ButtonsCard from '../../../../components/Card/ButtonsCard';
import ROUTES from '../../../../constants/routes';

interface Button extends Omit<ButtonProps, 'onClick'> {
  text: string;
  onClick: (id: number) => void;
}

const AdminMembers: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const isAdmin = useSelector(
    (state: RootState) => state.project.openedProject.isAdmin,
  );
  const admins = useSelector(
    (state: RootState) => state.project.openedProject.project?.admins,
  );
  const members = useSelector(
    (state: RootState) => state.project.openedProject.project?.members,
  );
  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      dispatch(getMembers(parseInt(query.id as string, 10)));
    } else {
      dispatch(setMembers([]));
    }
  }, [isAdmin, query.id]);

  if (!isAdmin) return null;

  const handleRemoveMember = (id: number): void => {
    dispatch(
      removeAdminMember({
        memberId: id,
        projectId: parseInt(query.id as string, 10),
      }),
    );
  };

  const handleMakeAdmin = (id: number): void => {
    dispatch(
      makeAdmin({
        memberId: id,
        projectId: parseInt(query.id as string, 10),
      }),
    );
  };

  const handleDegradeAdmin = (id: number): void => {
    dispatch(
      degradeAdmin({
        memberId: id,
        projectId: parseInt(query.id as string, 10),
      }),
    );
  };

  const memberButtons: Button[] = [
    {
      variant: 'contained',
      text: 'Make admin',
      startIcon: <AdminPanelSettings />,
      onClick: handleMakeAdmin,
    },
    {
      variant: 'contained',
      color: 'secondary',
      text: 'Remove',
      startIcon: <PersonRemove />,
      onClick: handleRemoveMember,
    },
  ];

  const adminButtons: Button[] = [
    {
      variant: 'contained',
      text: 'Degrade',
      color: 'secondary',
      startIcon: <ArrowCircleDown />,
      onClick: handleDegradeAdmin,
    },
  ];

  return members ? (
    <Stack spacing={3}>
      {members.map(({ id, username }) => (
        <ButtonsCard
          disableClick
          key={`member-${id}`}
          avatar={<Avatar />}
          title={username}
          subtitle={
            admins?.some(({ id: adminId }) => adminId === id)
              ? 'Admin'
              : 'Member'
          }
          buttons={
            id === userId
              ? []
              : (admins?.some(({ id: adminId }) => adminId === id)
                  ? adminButtons
                  : memberButtons
                ).map(({ text, onClick, ...rest }) => ({
                  text,
                  onClick: (): void => onClick(id),
                  id: `${text}-button-member-${id}`,
                  ...rest,
                }))
          }
        />
      ))}
    </Stack>
  ) : null;
};

AdminMembers.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProjectPageContainer>{page}</ProjectPageContainer>
);

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default AdminMembers;
