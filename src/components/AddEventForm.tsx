
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Event, EventType } from "@/types";
import { useEvents } from "@/contexts/EventContext";
import { useToast } from "@/hooks/use-toast";

export default function AddEventForm() {
  const { addEvent } = useEvents();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    name: "",
    description: "",
    date: "",
    location: "",
    collegeName: "",
    eventType: "other",
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.date || !formData.location || !formData.collegeName || !formData.link) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Add event
    addEvent(formData);
    
    // Show success toast
    toast({
      title: "Event Added Successfully",
      description: "Your event has been added to the list.",
    });
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      date: "",
      location: "",
      collegeName: "",
      eventType: "other",
      link: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Add New Event</CardTitle>
        <CardDescription>
          Submit a new college event to be added to the platform
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Event Name *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Hackathon 2025"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date & Time *
              </label>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => {
                  const date = new Date(e.target.value).toISOString();
                  setFormData((prev) => ({ ...prev, date }));
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date & Time (Optional)
              </label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formData.endDate || ""}
                onChange={(e) => {
                  const endDate = e.target.value ? new Date(e.target.value).toISOString() : undefined;
                  setFormData((prev) => ({ ...prev, endDate }));
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location *
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Building, Room #"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="collegeName" className="text-sm font-medium">
                College Name *
              </label>
              <Input
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="University name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="eventType" className="text-sm font-medium">
                Event Type *
              </label>
              <Select
                value={formData.eventType}
                onValueChange={(value) => handleSelectChange("eventType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="tech_talk">Tech Talk</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="career_fair">Career Fair</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="link" className="text-sm font-medium">
                Event Website URL *
              </label>
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrl" className="text-sm font-medium">
              Image URL (Optional)
            </label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Event
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
