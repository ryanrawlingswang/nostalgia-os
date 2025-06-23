'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useRouter } from "next/navigation";

interface WindowFrameProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  defaultMaximized?: boolean;
}

export function WindowFrame({
  title,
  icon,
  children,
  className,
  onClose,
  onMinimize,
  onMaximize,
  defaultMaximized = false
}: WindowFrameProps) {
  const router = useRouter();
  const [isMaximized, setIsMaximized] = React.useState(defaultMaximized);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isMinimizing, setIsMinimizing] = React.useState(false);
  const [logoClickCount, setLogoClickCount] = React.useState(0);

  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      if (prev === 2) {
        // Play Windows XP error sound after 3 clicks
        const audio = new Audio('/error.wav');
        audio.play();
        return 0;
      }
      return prev + 1;
    });
  };

  const handleMinimize = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      setIsMinimized(true);
      setIsMinimizing(false);
    }, 300);
  };

  const handleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleTaskbarClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      handleMinimize();
    }
  };

  const bookmarks = [
    { title: 'About Me', icon: '/icons/user.png' },
    { title: 'Projects', icon: '/icons/folder.png' },
    { title: 'Contact', icon: '/icons/email.png' }
  ];

  return (
    <>
      <div className={cn(
        "bg-[#ECE9D8] border border-[#919B9C] rounded-lg shadow-lg overflow-hidden",
        isMaximized ? "fixed inset-4" : "w-full max-w-[1000px] mx-auto",
        className
      )}>
        {/* Title Bar */}
        <div className="h-[28px] bg-gradient-to-r from-[#0A246A] via-[#3A6EA5] to-[#0A246A] flex items-center justify-between px-2">
          <div className="flex items-center gap-1">
            {icon && (
              <Image
                src={icon}
                alt={title}
                width={16}
                height={16}
                className="mr-1"
              />
            )}
            <span className="text-white font-[Tahoma] text-sm">{title}</span>
          </div>
          <div className="flex items-center gap-[2px]">
            {onMinimize && (
              <button
                onClick={onMinimize}
                className="w-[20px] h-[18px] bg-[#ECE9D8] hover:bg-[#FFFFFF] border border-[#919B9C] rounded-none flex items-center justify-center"
              >
                <div className="w-[8px] h-[2px] bg-black mt-2" />
              </button>
            )}
            {onMaximize && (
              <button
                onClick={() => {
                  setIsMaximized(!isMaximized);
                  onMaximize();
                }}
                className="w-[20px] h-[18px] bg-[#ECE9D8] hover:bg-[#FFFFFF] border border-[#919B9C] rounded-none flex items-center justify-center"
              >
                {isMaximized ? (
                  <div className="w-[8px] h-[8px] border-2 border-black relative -top-[2px] -left-[2px]">
                    <div className="w-[8px] h-[8px] border-2 border-black absolute top-[2px] left-[2px] bg-[#ECE9D8]" />
                  </div>
                ) : (
                  <div className="w-[8px] h-[8px] border-2 border-black" />
                )}
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="w-[20px] h-[18px] bg-[#ECE9D8] hover:bg-[#C75050] hover:text-white border border-[#919B9C] rounded-none flex items-center justify-center"
              >
                <span className="text-sm font-bold">×</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className={cn(
          "bg-white flex-1 p-6 overflow-auto",
          isMaximized ? "h-[calc(100vh-150px)]" : "min-h-[400px]" // Adjusted for taskbar
        )}>
          {children}
        </div>
      </div>

      {/* Taskbar - Always visible */}
      <div 
        onClick={handleTaskbarClick}
        className={cn(
          "flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors",
          isMinimized ? "bg-[#3A6EA5]" : "hover:bg-[#3A6EA5]"
        )}
      >
        <Image 
          src="/globe.svg" 
          alt="IE Icon" 
          width={16} 
          height={16}
          className="bg-white rounded"
        />
        <span className="text-white font-[Tahoma] text-sm truncate select-none">{title}</span>
      </div>
    </>
  );
} 