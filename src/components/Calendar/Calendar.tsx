import { useState } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
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
          p: { xs: 2, sm: 4 },
          mb: 4,
          backgroundColor: '#FFFFFF',
          borderRadius: 3,
          border: '1px solid rgba(232, 227, 216, 0.5)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(to right, #C97D60, #6B8E9F, #C97D60)',
            opacity: 0.3,
          },
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 3,
            px: 1,
          }}
        >
          <IconButton 
            onClick={handlePrevMonth} 
            size="large"
            sx={{
              color: '#6B8E9F',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(107, 142, 159, 0.1)',
                transform: 'translateX(-2px)',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              color: '#3A3A3A',
              letterSpacing: '1px',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              background: 'linear-gradient(135deg, #C97D60 0%, #6B8E9F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </Typography>
          <IconButton 
            onClick={handleNextMonth} 
            size="large"
            sx={{
              color: '#C97D60',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(201, 125, 96, 0.1)',
                transform: 'translateX(2px)',
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        {/* 요일 헤더 */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: 1, 
            mb: 2,
            px: 0.5,
          }}
        >
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <Box 
              key={day}
              sx={{
                textAlign: 'center',
                py: 1.5,
                borderRadius: 2,
                background: day === '일' 
                  ? 'linear-gradient(135deg, rgba(201, 125, 96, 0.1) 0%, rgba(201, 125, 96, 0.05) 100%)'
                  : day === '토'
                  ? 'linear-gradient(135deg, rgba(107, 142, 159, 0.1) 0%, rgba(107, 142, 159, 0.05) 100%)'
                  : 'transparent',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: day === '일' ? '#C97D60' : day === '토' ? '#6B8E9F' : '#3A3A3A',
                  fontSize: '0.875rem',
                }}
              >
                {day}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 달력 그리드 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
          {prevMonthDays.map((date) => (
            <Box key={date.toISOString()}>
              <Paper
                elevation={0}
                sx={{
                  minHeight: { xs: 80, sm: 100 },
                  p: 1,
                  backgroundColor: '#FAFAFA',
                  border: '1px solid rgba(232, 227, 216, 0.3)',
                  borderRadius: 0, // 사각형으로 통일
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

          {daysInMonth.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentDay = isToday(date);
            
            // 연속된 날짜 확인용 (행사 칩 내부에서 사용)
            const prevDate = index > 0 ? daysInMonth[index - 1] : null;
            const nextDate = index < daysInMonth.length - 1 ? daysInMonth[index + 1] : null;
            
            // 행사가 있는 날짜의 여백 조정을 위한 확인
            const prevDayEvents = prevDate ? getEventsForDate(prevDate) : [];
            const nextDayEvents = nextDate ? getEventsForDate(nextDate) : [];
            
            // 같은 행사가 이전/다음 날에도 있는지 확인
            const hasContinuationLeft = prevDate && dayEvents.length > 0 && dayEvents.some(event => 
              prevDayEvents.some(prevEvent => prevEvent.id === event.id)
            );
            const hasContinuationRight = nextDate && dayEvents.length > 0 && dayEvents.some(event => 
              nextDayEvents.some(nextEvent => nextEvent.id === event.id)
            );
            
            // 행사가 있는 날짜인지 확인
            const hasEvents = dayEvents.length > 0;
            
            // 연속된 행사 그룹의 첫 날/마지막 날/중간 날 판단
            const isEventStart = hasEvents && !hasContinuationLeft;
            const isEventEnd = hasEvents && !hasContinuationRight;
            const isEventMiddle = hasEvents && hasContinuationLeft && hasContinuationRight;

            return (
              <Box key={date.toISOString()}>
                <Paper
                  elevation={0}
                  sx={{
                    minHeight: { xs: 80, sm: 100 },
                    p: 1.5,
                    // 행사가 있는 날짜의 가로줄이 양옆까지 붙도록 padding 조정
                    // 첫 날짜: 오른쪽 여백 제거, 마지막 날짜: 왼쪽 여백 제거, 중간 날짜: 양쪽 여백 제거
                    pl: hasEvents && (isEventEnd || isEventMiddle) ? 0 : 1.5,
                    pr: hasEvents && (isEventStart || isEventMiddle) ? 0 : 1.5,
                    pt: 1.5,
                    pb: 1.5,
                    backgroundColor: isCurrentDay 
                      ? 'linear-gradient(135deg, rgba(201, 125, 96, 0.15) 0%, rgba(201, 125, 96, 0.05) 100%)' 
                      : '#FFFFFF',
                    border: isCurrentDay 
                      ? '2px solid #C97D60' 
                      : '1px solid rgba(232, 227, 216, 0.5)',
                    borderRadius: 0, // 모든 셀을 사각형으로 통일
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isCurrentDay 
                      ? '0 4px 12px rgba(201, 125, 96, 0.25), 0 2px 4px rgba(201, 125, 96, 0.1)' 
                      : '0 1px 3px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'visible', // 연속된 행사 막대가 보이도록
                    zIndex: 1, // 기본 z-index
                    '&::before': isCurrentDay ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(to right, #C97D60, #6B8E9F)',
                    } : {},
                    '&:hover': {
                      backgroundColor: isCurrentDay 
                        ? 'linear-gradient(135deg, rgba(201, 125, 96, 0.2) 0%, rgba(201, 125, 96, 0.1) 100%)' 
                        : 'linear-gradient(135deg, rgba(245, 241, 232, 0.8) 0%, rgba(255, 255, 255, 1) 100%)',
                      transform: 'translateY(-4px) scale(1.02)',
                      border: isCurrentDay 
                        ? '2px solid #C97D60' 
                        : '1px solid #C97D60', // 네 테두리 모두 동일하게
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
                      zIndex: 10, // 호버 시 다른 셀 위에 표시되도록
                    },
                  }}
                  onClick={() => {
                    // 날짜 클릭 시 해당 날짜로 스크롤 (달력이 사라지지 않도록)
                    // 중간 날짜를 클릭한 경우 첫 번째 날짜로 스크롤
                    let targetDate = date;
                    
                    // 행사가 있는 경우, 첫 번째 날짜를 찾기
                    if (dayEvents.length > 0) {
                      // 이 행사가 이전 날에도 있는지 확인
                      const prevDate = index > 0 ? daysInMonth[index - 1] : null;
                      const prevDayEvents = prevDate ? getEventsForDate(prevDate) : [];
                      const hasContinuationLeft = prevDate && dayEvents.some(event => 
                        prevDayEvents.some(prevEvent => prevEvent.id === event.id)
                      );
                      
                      // 중간 날짜인 경우 첫 번째 날짜 찾기
                      if (hasContinuationLeft) {
                        for (let i = index - 1; i >= 0; i--) {
                          const checkDate = daysInMonth[i];
                          const checkEvents = getEventsForDate(checkDate);
                          const hasEvent = checkEvents.some(e => dayEvents.some(de => de.id === e.id));
                          if (hasEvent) {
                            targetDate = checkDate;
                          } else {
                            break;
                          }
                        }
                      }
                    }
                    
                    const element = document.getElementById(`events-${format(targetDate, 'yyyy-MM-dd')}`);
                    if (element) {
                      // 요소의 위치를 계산하여 달력 아래로 스크롤
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - 100; // 헤더 높이 고려
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
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
                    
                    // 이 행사가 이전/다음 날에도 있는지 확인
                    const eventHasContinuationLeft = prevDate && getEventsForDate(prevDate).some(e => e.id === event.id);
                    const eventHasContinuationRight = nextDate && getEventsForDate(nextDate).some(e => e.id === event.id);
                    const isEventStart = !eventHasContinuationLeft;
                    const isEventEnd = !eventHasContinuationRight;
                    
                    return (
                      <Tooltip
                        key={event.id}
                        title={event.title}
                        arrow
                        placement="top"
                      >
                        <Box
                          sx={{
                            height: 22,
                            mb: 0.5,
                            backgroundColor: eventCategoryColor,
                            borderRadius: isEventStart && isEventEnd
                              ? '4px' // 단일 날짜
                              : isEventStart
                              ? '4px 0 0 4px' // 첫 날짜
                              : isEventEnd
                              ? '0 4px 4px 0' // 마지막 날짜
                              : '0', // 중간 날짜
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: `0 2px 4px ${eventCategoryColor}40`,
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            // 연속된 행사 막대를 붙이기 위한 마진 조정 (이미 Paper padding으로 처리됨)
                            zIndex: isEventStart ? 3 : isEventEnd ? 1 : 2,
                          }}
                        >
                          {/* 텍스트는 첫 날짜에만 표시 */}
                          {isEventStart && (
                            <Typography
                              sx={{
                                fontSize: '0.7rem',
                                color: '#FFFFFF',
                                fontWeight: 600,
                                px: 0.75,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                flex: 1,
                              }}
                            >
                              {event.title.length > 8 ? `${event.title.substring(0, 8)}...` : event.title}
                            </Typography>
                          )}
                        </Box>
                      </Tooltip>
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
                  minHeight: { xs: 80, sm: 100 },
                  p: 1,
                  backgroundColor: '#FAFAFA',
                  border: '1px solid rgba(232, 227, 216, 0.3)',
                  borderRadius: 0, // 사각형으로 통일
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
          <Box 
            id={`events-${format(currentDate, 'yyyy-MM-dd')}`} 
            sx={{ 
              mt: 5,
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 3,
                px: 2,
                py: 1,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(201, 125, 96, 0.1) 0%, rgba(107, 142, 159, 0.1) 100%)',
              }}
            >
              <Box
                sx={{
                  width: '4px',
                  height: '24px',
                  background: 'linear-gradient(to bottom, #C97D60, #6B8E9F)',
                  borderRadius: '2px',
                }}
              />
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 700,
                  color: '#3A3A3A',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}
              >
                {format(currentDate, 'yyyy년 M월 d일', { locale: ko })} 행사
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {selectedDateEvents.map((event, index) => (
                <Box
                  key={event.id}
                  sx={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    '@keyframes fadeInUp': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(20px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  <EventCard event={event} />
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}

      {/* 전체 행사 목록 (날짜별 그룹화) */}
      <TraditionalDivider variant="short" />
      <Box sx={{ mt: 5 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 4,
            px: 2,
            py: 1,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(107, 142, 159, 0.1) 0%, rgba(201, 125, 96, 0.1) 100%)',
          }}
        >
          <Box
            sx={{
              width: '4px',
              height: '24px',
              background: 'linear-gradient(to bottom, #6B8E9F, #C97D60)',
              borderRadius: '2px',
            }}
          />
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              color: '#3A3A3A',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            전체 행사 일정
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {events
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
            .map((event, index) => (
              <Box 
                key={event.id} 
                id={`events-${format(event.startDate, 'yyyy-MM-dd')}`}
                sx={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                  '@keyframes fadeInUp': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(20px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <EventCard event={event} />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

