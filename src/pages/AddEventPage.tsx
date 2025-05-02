
import AddEventForm from "@/components/AddEventForm";

export default function AddEventPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Submit a New Event</h1>
        <p className="text-lg text-muted-foreground">
          Help grow our community by sharing college tech events
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <AddEventForm />
      </div>
    </div>
  );
}
