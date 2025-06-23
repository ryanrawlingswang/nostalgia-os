'use client';

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
}

export function LoadingSpinner({ text = "Generating your portfolio...", className }: LoadingSpinnerProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 space-y-4 rounded-md",
      "bg-[#ECE9D8] border border-[#919B9C] shadow-md",
      className
    )}>
      <div className="w-full max-w-[300px] space-y-4">
        <div className="text-sm font-[Tahoma] text-black">
          {text}{dots}
        </div>
        <div className="h-[20px] bg-white border border-[#6B8AAB] p-[1px]">
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-y-0 animate-xp-progress flex">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full w-[30px] bg-[#3BA662] mx-[2px] first:ml-0 last:mr-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <button 
        className="px-4 py-1 text-sm font-[Tahoma] bg-[#ECE9D8] border border-[#919B9C] rounded 
                   hover:bg-[#E3E1D8] active:bg-[#E3E1D8] active:border-[#919B9C] active:shadow-inner"
        disabled
      >
        Cancel
      </button>
    </div>
  );
} 