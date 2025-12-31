export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  website?: string;
  category: 'conference' | 'meetup' | 'workshop' | 'hackathon' | 'exhibition' | 'expo' | 'other';
  tags?: string[];
}

export interface CalendarDay {
  date: Date;
  events: Event[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

