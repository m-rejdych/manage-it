import Link from 'next/link';
import { Box, Typography, Breadcrumbs } from '@mui/material';

export interface BreadcrumbsType {
  values: {
    label: string;
    href: string;
  }[];
  current: string;
}

interface Props {
  title: string;
  renderButtons?: () => JSX.Element;
  breadcrumbs?: BreadcrumbsType;
}

const PageHeader: React.FC<Props> = ({ title, renderButtons, breadcrumbs }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" sx={{ mr: 6 }}>
        {title}
      </Typography>
      {breadcrumbs && (
        <Breadcrumbs>
          {breadcrumbs.values.map(({ label, href }) => (
            <Typography
              key={`breadcrumb-${href}`}
              color="textSecondary"
              sx={{ '& > a': { color: 'inherit', fontWeight: 700 } }}
            >
              <Link href={href}>{label}</Link>
            </Typography>
          ))}
          <Typography>{breadcrumbs.current}</Typography>
        </Breadcrumbs>
      )}
    </Box>
    {renderButtons && renderButtons()}
  </Box>
);

export default PageHeader;
