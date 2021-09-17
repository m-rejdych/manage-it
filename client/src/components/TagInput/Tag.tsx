import { useState } from 'react';
import { Stack, Typography, Button, Zoom, useTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Close } from '@material-ui/icons';

interface Props {
  name: string;
  onDelete: () => void;
}

const Tag: React.FC<Props> = ({ name, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const theme = useTheme();

  const handleDelete = (): void => {
    setIsDeleted(true);

    setTimeout((): void => {
      onDelete();
    }, 300);
  };

  return (
    <Zoom in={!isDeleted}>
      <Stack
        direction="row"
        spacing={0.5}
        px={1}
        py={0.2}
        m={0.5}
        bgcolor={isDeleting ? red[500] : theme.palette.background.default}
        borderRadius={1}
        display="inline-flex"
        alignItems="center"
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s ease-out',
          ':hover': { filter: 'brightness(1.5)' },
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {name}
        </Typography>
        <Button
          sx={{ p: 0.25, minWidth: 'auto' }}
          onClick={handleDelete}
          onMouseEnter={(): void => setIsDeleting(true)}
          onMouseLeave={(): void => setIsDeleting(false)}
        >
          <Close fontSize="small" />
        </Button>
      </Stack>
    </Zoom>
  );
};

export default Tag;
