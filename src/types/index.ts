
export type EventType = 'hackathon' | 'tech_talk' | 'workshop' | 'career_fair' | 'other';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // ISO format
  endDate?: string; // ISO format, optional
  location: string;
  collegeName: string;
  eventType: EventType;
  link: string;
  imageUrl?: string;
}

export interface EventFilters {
  searchQuery?: string;
  eventType?: EventType | 'all';
  collegeName?: string;
  startDate?: string;
  endDate?: string;
}
