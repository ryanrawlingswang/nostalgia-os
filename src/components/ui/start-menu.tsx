import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface StartMenuItem {
  icon: string;
  label: string;
  onClick?: () => void;
  submenu?: StartMenuItem[];
}

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onGameSelect: (game: 'snake' | 'minesweeper') => void;
}

export function StartMenu({ isOpen, onClose, onGameSelect }: StartMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: StartMenuItem[] = [
    {
      icon: '/icons/games.svg',
      label: 'Games',
      submenu: [
        {
          icon: '/icons/snake.svg',
          label: 'Snake',
          onClick: () => onGameSelect('snake')
        },
        {
          icon: '/icons/minesweeper.svg',
          label: 'Minesweeper',
          onClick: () => onGameSelect('minesweeper')
        }
      ]
    },
    {
      icon: '/icons/internet.svg',
      label: 'Internet Explorer',
      onClick: () => window.location.reload()
    },
    {
      icon: '/icons/shutdown.svg',
      label: 'Turn Off Computer',
      onClick: onClose
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay to capture clicks outside */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="fixed bottom-[30px] left-0 z-50 w-[320px] bg-[#ECE9D8] border-2 border-[#919B9C] rounded-tr-lg shadow-lg">
        {/* User section */}
        <div className="h-[54px] bg-gradient-to-r from-[#0A246A] via-[#3A6EA5] to-[#0A246A] p-2 flex items-center gap-2">
          <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center">
            <Image 
              src="/icons/user.svg"
              alt="User"
              width={32}
              height={32}
            />
          </div>
          <span className="text-white font-[Tahoma] text-lg">User</span>
        </div>

        {/* Menu items */}
        <div className="p-1">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={item.onClick}
                className={cn(
                  "w-full px-1 py-1 flex items-center gap-2 rounded hover:bg-[#316AC5] hover:text-white",
                  "transition-colors duration-100 text-left"
                )}
              >
                <Image 
                  src={item.icon}
                  alt={item.label}
                  width={32}
                  height={32}
                />
                <span className="font-[Tahoma]">{item.label}</span>
              </button>

              {/* Submenu */}
              {item.submenu && hoveredItem === item.label && (
                <div className="absolute left-full top-0 w-[200px] bg-[#ECE9D8] border border-[#919B9C] shadow-lg rounded-tr-lg rounded-b-lg">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.label}
                      onClick={subitem.onClick}
                      className="w-full px-2 py-1 flex items-center gap-2 hover:bg-[#316AC5] hover:text-white transition-colors duration-100"
                    >
                      <Image 
                        src={subitem.icon}
                        alt={subitem.label}
                        width={24}
                        height={24}
                      />
                      <span className="font-[Tahoma]">{subitem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 