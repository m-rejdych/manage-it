import { Box, IconButton, makeStyles } from '@material-ui/core';
import { Brightness6 } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

interface Props {
  toggleTheme: () => void;
}

const AppBar: React.FC<Props> = ({ toggleTheme }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height={50}
      className={classes.appBar}
    >
      <Box flexGrow={1} />
      <IconButton onClick={toggleTheme}>
        <Brightness6 />
      </IconButton>
    </Box>
  );
};

export default AppBar;
