
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types";
import { formatEventDate } from "@/utils/date-utils";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const eventTypeBadgeColors: Record<string, string> = {
  hackathon: "bg-purple-500 hover:bg-purple-600",
  tech_talk: "bg-blue-500 hover:bg-blue-600",
  workshop: "bg-green-500 hover:bg-green-600",
  career_fair: "bg-yellow-500 hover:bg-yellow-600",
  other: "bg-gray-500 hover:bg-gray-600",
};

const eventTypeLabels: Record<string, string> = {
  hackathon: "Hackathon",
  tech_talk: "Tech Talk",
  workshop: "Workshop",
  career_fair: "Career Fair",
  other: "Other",
};

export default function EventCard({ event }: EventCardProps) {
  const badgeClass = eventTypeBadgeColors[event.eventType] || "bg-gray-500 hover:bg-gray-600";
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      {event.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      <CardHeader className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className={`${badgeClass} text-white`}>
            {eventTypeLabels[event.eventType]}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold line-clamp-2">
          <Link to={`/event/${event.id}`} className="hover:text-primary">
            {event.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {event.collegeName}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {event.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{formatEventDate(event.date, event.endDate)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-foreground hover:bg-primary px-3 py-1.5 rounded-md text-sm font-medium transition-colors w-full text-center"
        >
          Visit Event Website
        </a>
      </CardFooter>
    </Card>
  );
}
