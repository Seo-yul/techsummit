import { useState } from 'react';
import { Box, Typography, Paper, IconButton, Chip } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Event } from '../../types';
import { EventCard } from '../EventCard/EventCard';
import { TraditionalDivider } from '../TraditionalDivider/TraditionalDivider';

interface CalendarProps {
  year: number;
  events: Event[];
}

export const Calendar = ({ year, events }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(year, 0, 1));
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // 이전 달의 마지막 날들 (달력 시작 전 빈 칸 채우기)
  const startDayOfWeek = monthStart.getDay();
  const prevMonthDays: Date[] = [];
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    prevMonthDays.push(new Date(monthStart.getTime() - (i + 1) * 24 * 60 * 60 * 1000));
  }

  // 다음 달의 첫 날들 (달력 끝난 후 빈 칸 채우기)
  const totalDays = prevMonthDays.length + daysInMonth.length;
  const remainingDays = 42 - totalDays; // 6주 * 7일 = 42
  const nextMonthDays: Date[] = [];
  for (let i = 0; i < remainingDays; i++) {
    nextMonthDays.push(new Date(monthEnd.getTime() + (i + 1) * 24 * 60 * 60 * 1000));
  }

  const getEventsForDate = (date: Date): Event[] => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(23, 59, 59, 999);
      date.setHours(0, 0, 0, 0);
      return date >= eventStart && date <= eventEnd;
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const selectedDateEvents = getEventsForDate(currentDate);
  const hasSelectedDate = selectedDateEvents.length > 0;

  return (
    <Box>
      {/* 달력 헤더 */}
      <Paper
        className="taegeuk-pattern"
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          border: '1px solid #E8E3D8',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <IconButton 
            onClick={handlePrevMonth} 
            size="large"
            sx={{
              color: '#6B8E9F',
              '&:hover': {
                backgroundColor: '#6B8E9F15',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              color: '#3A3A3A',
              letterSpacing: '1px',
            }}
          >
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </Typography>
          <IconButton 
            onClick={handleNextMonth} 
            size="large"
            sx={{
              color: '#C97D60',
              '&:hover': {
                backgroundColor: '#C97D6015',
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        {/* 요일 헤더 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 0.5 }}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <Box key={day}>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  fontWeight: 600,
                  color: day === '일' ? '#C97D60' : day === '토' ? '#6B8E9F' : '#3A3A3A',
                  py: 1,
                }}
              >
                {day}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 달력 그리드 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
          {prevMonthDays.map((date) => (
            <Box key={date.toISOString()}>
              <Paper
                elevation={0}
                sx={{
                  minHeight: 100,
                  p: 1,
                  backgroundColor: '#F5F1E8',
                  border: '1px solid #E8E3D8',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#B0B0B0',
                    mb: 0.5,
                  }}
                >
                  {format(date, 'd')}
                </Typography>
              </Paper>
            </Box>
          ))}

          {daysInMonth.map((date) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentDay = isToday(date);

            return (
              <Box key={date.toISOString()}>
                <Paper
                  elevation={isCurrentDay ? 2 : 0}
                  sx={{
                    minHeight: 100,
                    p: 1,
                    backgroundColor: isCurrentDay ? '#F5E6D8' : '#FFFFFF',
                    border: isCurrentDay ? '2px solid #C97D60' : '1px solid #E8E3D8',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrentDay ? '0 2px 8px rgba(201, 125, 96, 0.2)' : 'none',
                    '&:hover': {
                      backgroundColor: isCurrentDay ? '#F5E6D8' : '#F5F1E8',
                      transform: 'translateY(-2px)',
                      borderColor: '#C97D60',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onClick={() => {
                    // 날짜 클릭 시 해당 날짜로 스크롤
                    const element = document.getElementById(`events-${format(date, 'yyyy-MM-dd')}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isCurrentDay ? 700 : 500,
                      color: isCurrentDay ? '#C97D60' : '#3A3A3A',
                      mb: 0.5,
                    }}
                  >
                    {format(date, 'd')}
                  </Typography>
                  {dayEvents.slice(0, 2).map((event) => {
                    const eventCategoryColor = {
                      conference: '#C97D60',
                      meetup: '#6B8E9F',
                      workshop: '#B8654A',
                      hackathon: '#5A7A8A',
                      exhibition: '#C9A961',
                      expo: '#D4A574',
                      other: '#8B7D6B',
                    }[event.category] || '#8B7D6B';
                    
                    return (
                      <Chip
                        key={event.id}
                        label={event.title.length > 10 ? `${event.title.substring(0, 10)}...` : event.title}
                        size="small"
                        sx={{
                          fontSize: '0.65rem',
                          height: 20,
                          mb: 0.3,
                          display: 'block',
                          width: '100%',
                          backgroundColor: eventCategoryColor,
                          color: '#FFFFFF',
                          fontWeight: 500,
                          '& .MuiChip-label': {
                            px: 0.5,
                          },
                        }}
                      />
                    );
                  })}
                  {dayEvents.length > 2 && (
                    <Typography variant="caption" sx={{ color: '#6B8E9F' }}>
                      +{dayEvents.length - 2}개
                    </Typography>
                  )}
                </Paper>
              </Box>
            );
          })}

          {nextMonthDays.map((date) => (
            <Box key={date.toISOString()}>
              <Paper
                elevation={0}
                sx={{
                  minHeight: 100,
                  p: 1,
                  backgroundColor: '#F5F1E8',
                  border: '1px solid #E8E3D8',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#B0B0B0',
                    mb: 0.5,
                  }}
                >
                  {format(date, 'd')}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 선택된 날짜의 행사 목록 */}
      {hasSelectedDate && (
        <>
          <TraditionalDivider variant="short" />
          <Box id={`events-${format(currentDate, 'yyyy-MM-dd')}`} sx={{ mt: 4 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                color: '#3A3A3A',
                position: 'relative',
                paddingLeft: '12px',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  background: 'linear-gradient(to bottom, #C97D60, #B8654A)',
                  borderRadius: '2px',
                },
              }}
            >
              {format(currentDate, 'yyyy년 M월 d일', { locale: ko })} 행사
            </Typography>
            {selectedDateEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Box>
        </>
      )}

      {/* 전체 행사 목록 (날짜별 그룹화) */}
      <TraditionalDivider variant="short" />
      <Box sx={{ mt: 4 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 600,
            color: '#3A3A3A',
            position: 'relative',
            paddingLeft: '12px',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(to bottom, #6B8E9F, #5A7A8A)',
              borderRadius: '2px',
            },
          }}
        >
          전체 행사 일정
        </Typography>
        {events
          .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
          .map((event) => (
            <Box key={event.id} id={`events-${format(event.startDate, 'yyyy-MM-dd')}`} sx={{ mb: 3 }}>
              <EventCard event={event} />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

