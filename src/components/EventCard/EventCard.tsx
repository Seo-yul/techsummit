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
      className="ink-style-card"
      sx={{
        mb: 2,
        backgroundColor: '#FFFFFF',
        border: '1px solid #E8E3D8',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          borderColor: categoryColors[event.category],
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '30%',
          height: '2px',
          background: `linear-gradient(to right, ${categoryColors[event.category]}, transparent)`,
        },
      }}
    >
      <CardContent>
        <Box 
          className="red-accent-line"
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            mb: 1,
            position: 'relative',
          }}
        >
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
            {event.title}
          </Typography>
          <Chip
            label={categoryLabels[event.category]}
            size="small"
            sx={{
              backgroundColor: categoryColors[event.category],
              color: '#FFFFFF',
              fontWeight: 500,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
          <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: '#6B8E9F' }} />
          <Typography variant="body2">
            {isMultiDay
              ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
              : formatDate(event.startDate)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, color: 'text.secondary' }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: '#C97D60' }} />
          <Typography variant="body2">{event.location}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {event.description}
        </Typography>

        {event.tags && event.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
            {event.tags.map((tag) => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small" 
                variant="outlined" 
                sx={{
                  borderColor: '#6B8E9F',
                  color: '#6B8E9F',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: '#6B8E9F15',
                    borderColor: '#C97D60',
                    color: '#C97D60',
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
              textDecoration: 'none',
              color: '#6B8E9F',
              '&:hover': { 
                textDecoration: 'underline',
                color: '#C97D60',
              },
            }}
          >
            <Language sx={{ fontSize: 16, mr: 0.5, color: '#6B8E9F' }} />
            <Typography variant="body2">공식 웹사이트</Typography>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

