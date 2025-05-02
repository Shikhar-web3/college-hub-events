
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatEventDate } from "@/utils/date-utils";
import { Calendar, MapPin, ArrowLeft, Globe, School } from "lucide-react";
import { useEvents } from "@/contexts/EventContext";
import { useEffect } from "react";

const eventTypeLabels: Record<string, string> = {
  hackathon: "Hackathon",
  tech_talk: "Tech Talk",
  workshop: "Workshop",
  career_fair: "Career Fair",
  other: "Other",
};

const eventTypeBadgeColors: Record<string, string> = {
  hackathon: "bg-purple-500 hover:bg-purple-600",
  tech_talk: "bg-blue-500 hover:bg-blue-600",
  workshop: "bg-green-500 hover:bg-green-600",
  career_fair: "bg-yellow-500 hover:bg-yellow-600",
  other: "bg-gray-500 hover:bg-gray-600",
};

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();
  const event = events.find(e => e.id === id);
  
  useEffect(() => {
    if (!event) {
      navigate("/not-found");
    }
  }, [event, navigate]);
  
  if (!event) return null;
  
  const badgeClass = eventTypeBadgeColors[event.eventType] || "bg-gray-500 hover:bg-gray-600";
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            {event.imageUrl && (
              <div className="h-64 md:h-80 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className={`${badgeClass} text-white`}>
                  {eventTypeLabels[event.eventType]}
                </Badge>
              </div>
              <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
              <CardDescription className="text-lg">
                Hosted by {event.collegeName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-2">About this event</h3>
                <p className="whitespace-pre-line text-base text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">Date & Time</span>
                </div>
                <p>{formatEventDate(event.date, event.endDate)}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="font-medium">Location</span>
                </div>
                <p>{event.location}</p>
              </div>
              
              <div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <School className="h-4 w-4 mr-2" />
                  <span className="font-medium">College</span>
                </div>
                <p>{event.collegeName}</p>
              </div>
              
              <div className="pt-4">
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full"
                >
                  <Button className="w-full">
                    <Globe className="mr-2 h-4 w-4" /> Visit Event Website
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
