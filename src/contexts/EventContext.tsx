
import { createContext, useContext, useState, ReactNode } from "react";
import { events as initialEvents } from "@/data/events";
import { Event, EventFilters } from "@/types";

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  filteredEvents: Event[];
  filters: EventFilters;
  setFilters: (filters: EventFilters) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [filters, setFilters] = useState<EventFilters>({});

  const addEvent = (newEvent: Omit<Event, "id">) => {
    const event = {
      ...newEvent,
      id: String(events.length + 1),
    };
    setEvents([...events, event]);
  };

  const filteredEvents = events.filter((event) => {
    // Filter by search query
    if (filters.searchQuery && !event.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !event.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !event.collegeName.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by event type
    if (filters.eventType && filters.eventType !== 'all' && event.eventType !== filters.eventType) {
      return false;
    }

    // Filter by college name
    if (filters.collegeName && event.collegeName !== filters.collegeName) {
      return false;
    }

    // Filter by date range
    if (filters.startDate && new Date(event.date) < new Date(filters.startDate)) {
      return false;
    }

    if (filters.endDate) {
      // If event has an end date, check if it starts before the filter end date
      if (new Date(event.date) > new Date(filters.endDate)) {
        return false;
      }
    }

    return true;
  });

  return (
    <EventContext.Provider value={{ events, addEvent, filteredEvents, filters, setFilters }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
