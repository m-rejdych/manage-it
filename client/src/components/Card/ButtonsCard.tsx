import {
  Button as ButtonComponent,
  Box,
  Stack,
  Typography,
  ButtonProps,
} from '@mui/material';
import CardBase from './CardBase';

interface Button extends ButtonProps {
  id: string;
  text: string;
}

interface Props {
  title: string;
  buttons: Button[];
  subtitle?: string;
  avatar?: JSX.Element;
  disableClick?: boolean;
}

const ButtonsCard: React.FC<Props> = ({
  title,
  subtitle,
  avatar,
  buttons,
  disableClick,
}) => (
  <CardBase disableClick={disableClick}>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Stack spacing={1} direction="row" alignItems="center">
        {avatar}
        <Box>
          <Typography fontWeight={700}>{title}</Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>
      <Stack spacing={1}>
        {buttons.map(({ id, text, ...rest }) => (
          <ButtonComponent key={id} {...rest}>
            {text}
          </ButtonComponent>
        ))}
      </Stack>
    </Box>
  </CardBase>
);

export default ButtonsCard;
