
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventFilters as EventFiltersType } from "@/types";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";
import { useEvents } from "@/contexts/EventContext";
import { formatDateForInput } from "@/utils/date-utils";

export default function EventFilters() {
  const { filters, setFilters } = useEvents();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchQuery: e.target.value });
  };

  const handleClear = () => {
    setFilters({});
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value !== undefined && value !== "all");
  };

  return (
    <div className="w-full mb-6 bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events, colleges..."
            className="pl-10"
            value={filters.searchQuery || ""}
            onChange={handleSearch}
          />
          {filters.searchQuery && (
            <button 
              className="absolute right-3 top-2.5"
              onClick={() => setFilters({ ...filters, searchQuery: undefined })}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          className={isExpanded ? "bg-muted" : ""}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter className="h-4 w-4" />
        </Button>
        {hasActiveFilters() && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClear}
          >
            Clear all
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Event Type</label>
            <Select
              value={filters.eventType || "all"}
              onValueChange={(value) => setFilters({ ...filters, eventType: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hackathon">Hackathon</SelectItem>
                <SelectItem value="tech_talk">Tech Talk</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="career_fair">Career Fair</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Start Date</label>
            <Input
              type="date"
              value={filters.startDate ? formatDateForInput(filters.startDate) : ""}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">End Date</label>
            <Input
              type="date"
              value={filters.endDate ? formatDateForInput(filters.endDate) : ""}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
            />
          </div>
          <div className="flex items-end">
            <Button className="w-full" onClick={handleClear}>
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
