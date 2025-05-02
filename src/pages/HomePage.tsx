
import EventFilters from "@/components/EventFilters";
import EventGrid from "@/components/EventGrid";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">College Tech Events</h1>
        <p className="text-lg text-muted-foreground">
          Discover hackathons, tech talks, and workshops from top colleges
        </p>
      </div>

      <EventFilters />
      <EventGrid />
    </div>
  );
}
