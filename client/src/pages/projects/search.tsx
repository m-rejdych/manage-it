import { Paper, Grid, Typography, useTheme } from '@material-ui/core';

const categories = [
  {
    id: 'category 1',
    label: 'Category 1',
  },
  {
    id: 'category 2',
    label: 'Category 2',
  },
  {
    id: 'category 3',
    label: 'Category 3',
  },
  {
    id: 'category 4',
    label: 'Category 4',
  },
  {
    id: 'category 5',
    label: 'Category 5',
  },
  {
    id: 'category 6',
    label: 'Category 6',
  },
];

const Search: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {categories.map(({ id, label }) => (
        <Grid item xs={6} key={id}>
          <Paper
            css={{
              padding: theme.spacing(2),
              height: 200,
              cursor: 'pointer',
            }}
          >
            <Typography
              css={{
                fontWeight: 700,
              }}
            >
              {label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Search;
