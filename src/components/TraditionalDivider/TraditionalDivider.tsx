import { Box } from '@mui/material';

interface TraditionalDividerProps {
  variant?: 'full' | 'short';
  sx?: object;
}

export const TraditionalDivider = ({ variant = 'full', sx }: TraditionalDividerProps) => {
  const width = variant === 'short' ? '60%' : '100%';
  const marginLeft = variant === 'short' ? '20%' : '0';

  return (
    <Box
      className="ink-divider"
      sx={{
        width,
        marginLeft,
        marginTop: 3,
        marginBottom: 3,
        ...sx,
      }}
    />
  );
};

