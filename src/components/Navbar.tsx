
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white border-b py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-eventpurple-600 to-eventpurple-800 bg-clip-text text-transparent">
            CollegeEventHub
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-4">
          <Link to="/">
            <Button variant={location.pathname === "/" ? "default" : "ghost"}>
              Events
            </Button>
          </Link>
          <Link to="/add">
            <Button variant={location.pathname === "/add" ? "default" : "ghost"}>
              Add Event
            </Button>
          </Link>
        </div>
        
        <div className="md:hidden">
          <Link to={location.pathname === "/" ? "/add" : "/"}>
            <Button>
              {location.pathname === "/" ? "Add Event" : "Events"}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
