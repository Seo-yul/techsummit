import { Chip } from '@mui/material';

interface TraditionalBadgeProps {
  label: string;
  variant?: 'today' | 'urgent' | 'featured';
}

export const TraditionalBadge = ({ label, variant = 'featured' }: TraditionalBadgeProps) => {
  const getColor = () => {
    switch (variant) {
      case 'today':
        return '#C97D60'; // 홍색
      case 'urgent':
        return '#B8654A'; // 진한 홍색
      case 'featured':
        return '#C9A961'; // 금빛 베이지
      default:
        return '#C9A961';
    }
  };

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor: getColor(),
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: '0.75rem',
        height: '24px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    />
  );
};

