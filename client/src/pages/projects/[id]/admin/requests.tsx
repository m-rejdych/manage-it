import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Stack, Avatar, ButtonProps } from '@mui/material';
import { PersonAddAlt1, PersonRemove } from '@mui/icons-material';

import ProjectPageContainer from '../../../../components/Projects/ProjectPageContainer';
import ButtonsCard from '../../../../components/Card/ButtonsCard';
import {
  getAdminMemberRequests,
  rejectAdminMemberRequest,
} from '../../../../store/ducks/projects/actions';
import type { RootState } from '../../../../store/types/state';

interface Button extends ButtonProps {
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
    }
  }, []);

  if (!isAdmin) return null;

  const handleReject = (id: number): void => {
    dispatch(rejectAdminMemberRequest(id));
  };

  const BUTTONS: Button[] = [
    {
      text: 'Accept',
      variant: 'contained',
      startIcon: <PersonAddAlt1 />,
      onClick: () => {},
    },
    {
      text: 'Reject',
      variant: 'contained',
      color: 'secondary',
      startIcon: <PersonRemove />,
      onClick: (id) => handleReject(id),
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
          buttons={BUTTONS.map(({ text, onClick, ...rest }) => ({
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

export default ProjectRequests;
