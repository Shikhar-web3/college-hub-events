
import { format, parseISO } from 'date-fns';

export const formatEventDate = (dateString: string, endDateString?: string): string => {
  const date = parseISO(dateString);
  
  if (!endDateString) {
    return format(date, 'MMM d, yyyy - h:mm a');
  }
  
  const endDate = parseISO(endDateString);
  
  // Same day event
  if (format(date, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
    return `${format(date, 'MMM d, yyyy - h:mm a')} to ${format(endDate, 'h:mm a')}`;
  }
  
  // Multi-day event
  return `${format(date, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
};

export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, 'yyyy-MM-dd');
};
