import { useRef } from 'react';
import { Box, List } from '@mui/material';

import CheckpointListItem from './CheckpointListItem';

interface Props {
  value: string[];
  onDelete: (deletedValue: string) => void;
}

const CheckpointList: React.FC<Props> = ({ value, onDelete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box display="flex" justifyContent="center" ref={containerRef}>
      <List dense sx={{ width: '90%' }}>
        {value.map((checkpoint) => (
          <CheckpointListItem
            key={`checkpoint-${checkpoint}`}
            value={checkpoint}
            onDelete={onDelete}
            containerRef={containerRef}
          />
        ))}
      </List>
    </Box>
  );
};

export default CheckpointList;
