
import React from "react";
import { cn } from "@/lib/utils";

interface LogoSelectionButtonProps {
  logo: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
  alt: string;
}

const LogoSelectionButton: React.FC<LogoSelectionButtonProps> = ({
  logo,
  value,
  isSelected,
  onClick,
  alt
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-lg transition-all duration-200 transform",
        "border-2 hover:-translate-y-1 hover:shadow-xl",
        "bg-white shadow-md",
        isSelected 
          ? "border-primary translate-y-[-2px] shadow-lg" 
          : "border-transparent hover:border-gray-300",
        // 3D effect classes
        "relative after:absolute after:inset-0 after:rounded-lg",
        isSelected 
          ? "after:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]" 
          : "after:shadow-[inset_0_-1px_3px_rgba(0,0,0,0.05)]"
      )}
      aria-selected={isSelected}
      aria-label={`Select ${alt}`}
    >
      <div className="flex items-center justify-center">
        <img 
          src={logo} 
          alt={alt} 
          className={cn(
            "object-contain transition-all duration-200",
            isSelected ? "max-h-16" : "max-h-14 opacity-90"
          )} 
        />
      </div>
    </button>
  );
};

export default LogoSelectionButton;
