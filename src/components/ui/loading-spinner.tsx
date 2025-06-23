'use client';

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
}

export function LoadingSpinner({ text = "Please wait...", className }: LoadingSpinnerProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 space-y-4", className)}>
      <div className="relative w-32 h-32">
        {/* XP-style loading animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-[#316AC5]"
                style={{
                  opacity: 1 - (i * 0.07),
                  transform: `rotate(${i * 30}deg) translateY(-24px)`,
                  borderRadius: '50%',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#316AC5] animate-pulse" />
          <span className="font-[Tahoma] text-[#316AC5] min-w-[120px]">
            {text}{dots}
          </span>
        </div>
      </div>
    </div>
  );
} 