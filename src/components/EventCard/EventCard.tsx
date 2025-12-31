import { Card, CardContent, Typography, Chip, Box, Link } from '@mui/material';
import { LocationOn, CalendarToday, Language } from '@mui/icons-material';
import type { Event } from '../../types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface EventCardProps {
  event: Event;
}

const categoryColors: Record<Event['category'], string> = {
  conference: '#C97D60', // 파스텔톤 홍색
  meetup: '#6B8E9F', // 파스텔톤 청색
  workshop: '#B8654A', // 진한 홍색
  hackathon: '#5A7A8A', // 진한 청색
  exhibition: '#C9A961', // 금빛 베이지
  expo: '#D4A574', // 밝은 홍색
  other: '#8B7D6B', // 옅은 먹색
};

const categoryLabels: Record<Event['category'], string> = {
  conference: '컨퍼런스',
  meetup: '밋업',
  workshop: '워크샵',
  hackathon: '해커톤',
  exhibition: '전시회',
  expo: '엑스포',
  other: '기타',
};

export const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (date: Date) => {
    return format(date, 'yyyy년 M월 d일 (EEE)', { locale: ko });
  };

  const isMultiDay = event.startDate.getTime() !== event.endDate.getTime();

  return (
    <Card
      className="ink-style-card fade-in-up"
      sx={{
        mb: 3,
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(232, 227, 216, 0.5)',
        borderRadius: 3,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          background: `linear-gradient(to bottom, ${categoryColors[event.category]}, ${categoryColors[event.category]}80)`,
          opacity: 0.8,
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 16px ${categoryColors[event.category]}30`,
          borderColor: categoryColors[event.category],
          '&::before': {
            width: '5px',
            opacity: 1,
          },
        },
      }}
    >
      <CardContent sx={{ pl: 3, pt: 2.5, pb: 2.5 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            mb: 2,
            gap: 2,
          }}
        >
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 700, 
              flex: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              lineHeight: 1.4,
              color: '#3A3A3A',
            }}
          >
            {event.title}
          </Typography>
          <Chip
            label={categoryLabels[event.category]}
            size="small"
            sx={{
              backgroundColor: categoryColors[event.category],
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: '28px',
              boxShadow: `0 2px 8px ${categoryColors[event.category]}40`,
              flexShrink: 0,
            }}
          />
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 1.5, 
            color: 'text.secondary',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarToday sx={{ fontSize: 18, color: '#6B8E9F' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {isMultiDay
                ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
                : formatDate(event.startDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 18, color: '#C97D60' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {event.location}
            </Typography>
          </Box>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            lineHeight: 1.7,
            fontSize: '0.9375rem',
          }}
        >
          {event.description}
        </Typography>

        {event.tags && event.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
            {event.tags.map((tag) => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small" 
                variant="outlined" 
                sx={{
                  borderColor: '#6B8E9F',
                  color: '#6B8E9F',
                  backgroundColor: 'rgba(107, 142, 159, 0.05)',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: '26px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(201, 125, 96, 0.1)',
                    borderColor: '#C97D60',
                    color: '#C97D60',
                    transform: 'scale(1.05)',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {event.website && (
          <Link
            href={event.website}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              textDecoration: 'none',
              color: '#6B8E9F',
              fontWeight: 600,
              fontSize: '0.875rem',
              px: 1.5,
              py: 0.75,
              borderRadius: 2,
              backgroundColor: 'rgba(107, 142, 159, 0.05)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                backgroundColor: 'rgba(201, 125, 96, 0.1)',
                color: '#C97D60',
                transform: 'translateX(4px)',
              },
            }}
          >
            <Language sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              공식 웹사이트
            </Typography>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

