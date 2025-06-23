'use client';

import Image from 'next/image';

interface NavItem {
  icon: string;
  title: string;
  id: string;
}

interface IENavigationProps {
  items: NavItem[];
}

export function IENavigation({ items }: IENavigationProps) {
  return (
    <div className="bg-[#ECE9D8] border-b border-[#919B9C] p-1 flex items-center gap-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            const element = document.getElementById(item.id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-1 px-3 py-1 rounded hover:bg-[#CCE4FF] active:bg-[#99C9FF] text-sm font-[Tahoma] text-[#00309C]"
        >
          <Image 
            src={item.icon}
            alt={item.title}
            width={16}
            height={16}
          />
          {item.title}
        </button>
      ))}
    </div>
  );
} 