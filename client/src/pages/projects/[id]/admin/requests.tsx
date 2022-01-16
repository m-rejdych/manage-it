import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Stack, Avatar, ButtonProps } from '@mui/material';
import { PersonAddAlt1, PersonRemove } from '@mui/icons-material';

import ROUTES from '../../../../constants/routes';
import ProjectPageContainer from '../../../../components/Projects/ProjectPageContainer';
import ButtonsCard from '../../../../components/Card/ButtonsCard';
import {
  acceptAdminMemberRequest,
  getAdminMemberRequests,
  setAdminMemberRequests,
  rejectAdminMemberRequest,
} from '../../../../store/ducks/projects/actions';
import { wrapper } from '../../../../store';
import { getServerSidePropsWithAutologin } from '../../../../util/autologin';
import type { RootState } from '../../../../store/types/state';

interface Button extends Omit<ButtonProps, 'onClick'> {
  text: string;
  onClick: (id: number) => void;
}

const ProjectRequests: React.FC = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.project.openedProject.isAdmin,
  );
  const memberRequests = useSelector(
    (state: RootState) => state.project.openedProject.admin?.memberRequests,
  );
  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      dispatch(
        getAdminMemberRequests({
          projectId: parseInt(query.id as string),
          isAccepted: false,
        }),
      );
    } else {
      dispatch(setAdminMemberRequests([]));
    }
  }, [isAdmin, query.id]);

  if (!isAdmin) return null;

  const handleReject = (id: number): void => {
    dispatch(rejectAdminMemberRequest(id));
  };

  const handleAccept = (id: number): void => {
    dispatch(acceptAdminMemberRequest(id));
  };

  const buttons: Button[] = [
    {
      text: 'Accept',
      variant: 'contained',
      startIcon: <PersonAddAlt1 />,
      onClick: handleAccept,
    },
    {
      text: 'Reject',
      variant: 'contained',
      color: 'secondary',
      startIcon: <PersonRemove />,
      onClick: handleReject,
    },
  ];

  return (
    <Stack spacing={3}>
      {memberRequests?.map(({ id, requestedBy, createdAt }) => (
        <ButtonsCard
          disableClick
          key={`request-${id}`}
          avatar={<Avatar />}
          title={requestedBy ? `${requestedBy.username}` : ''}
          subtitle={`Requested ${format(new Date(createdAt), 'd.M.y, h:m a')}`}
          buttons={buttons.map(({ text, onClick, ...rest }) => ({
            text,
            onClick: (): void => onClick(id),
            id: `${text}-button-request-${id}`,
            ...rest,
          }))}
        />
      ))}
    </Stack>
  );
};

ProjectRequests.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProjectPageContainer>{page}</ProjectPageContainer>
);

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default ProjectRequests;
