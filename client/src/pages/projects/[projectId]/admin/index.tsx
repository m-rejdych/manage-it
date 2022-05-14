import { useRouter } from 'next/router';
import { PersonAddAlt, ManageAccountsOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';

import { wrapper } from '../../../../store';
import { getServerSidePropsWithAutologin } from '../../../../util/autologin';
import ROUTES from '../../../../constants/routes';
import ProjectPageContainer from '../../../../components/Projects/ProjectPageContainer';
import SquareButton from '../../../../components/SquareButton';
import Role from '../../../../types/project/Role';

interface AdminPage {
  id: string;
  label: string;
  pathname: string;
  Icon: React.ElementType;
}

const BUTTONS: AdminPage[] = [
  {
    id: 'admin-member-requests',
    label: 'Member requests',
    pathname: '/requests',
    Icon: PersonAddAlt,
  },
  {
    id: 'admin-members',
    label: 'Manage members',
    pathname: '/members',
    Icon: ManageAccountsOutlined,
  },
];

const ProjectAdmin: React.FC = () => {
  const router = useRouter();

  const handleClick = async (pathname: string): Promise<void> => {
    const { projectId } = router.query;

    await router.push(
      `${router.pathname.replace(
        '[projectId]',
        projectId as string,
      )}${pathname}`,
    );
  };

  return (
    <Stack spacing={2} direction="row">
      {BUTTONS.map(({ id, label, pathname, Icon }) => (
        <SquareButton
          Icon={Icon}
          onClick={(): Promise<void> => handleClick(pathname)}
          key={id}
        >
          {label}
        </SquareButton>
      ))}
    </Stack>
  );
};

ProjectAdmin.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProjectPageContainer
    role={Role.Admin}
    breadcrumbs={{
      current: 'Admin',
      values: [
        {
          label: 'Project',
          href: `${ROUTES.PROJECTS}/${page._owner.pendingProps.router.query.projectId}`,
        },
      ],
    }}
  >
    {page}
  </ProjectPageContainer>
);

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default ProjectAdmin;
