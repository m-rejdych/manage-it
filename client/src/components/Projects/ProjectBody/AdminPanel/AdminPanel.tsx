import React from 'react';
import { PersonOutlined } from '@mui/icons-material';

import SquareButton from '../../../SquareButton';

const AdminPanel: React.FC = () => {
  return (
    <>
      {Array.from({ length: 5 }, () => (
        <SquareButton Icon={PersonOutlined}>Member requests</SquareButton>
      ))}
    </>
  );
};

export default AdminPanel;
