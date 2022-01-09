import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PersonOutlined } from '@mui/icons-material';

import SquareButton from '../../SquareButton';
import type { RootState } from '../../../store/types/state';

interface Functionality {
  id: string;
  label: string;
  pathname: string;
}

const BUTTONS: Functionality[] = [
  {
    id: 'admin-member-requests',
    label: 'Member requests',
    pathname: '/requests',
  },
];

const AdminPanel: React.FC = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.project.openedProject.isAdmin,
  );
  const router = useRouter();

  if (!isAdmin) return null;

  const handleClick = async (pathname: string): Promise<void> => {
    const { id } = router.query;

    await router.push(
      `${router.pathname.replace('[id]', id as string)}${pathname}`,
    );
  };

  return (
    <>
      {BUTTONS.map(({ id, label, pathname }) => (
        <SquareButton
          Icon={PersonOutlined}
          onClick={(): Promise<void> => handleClick(pathname)}
          key={id}
        >
          {label}
        </SquareButton>
      ))}
    </>
  );
};

export default AdminPanel;
