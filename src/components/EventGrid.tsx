
import EventCard from "@/components/EventCard";
import { useEvents } from "@/contexts/EventContext";

export default function EventGrid() {
  const { filteredEvents } = useEvents();

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or add a new event.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
