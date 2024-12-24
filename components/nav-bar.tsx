"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  handleBack: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleBack }) => {
  return (
    <nav className="flex items-center h-16 px-4 border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleBack()}
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
    </nav>
  );
};

export default Navbar;
