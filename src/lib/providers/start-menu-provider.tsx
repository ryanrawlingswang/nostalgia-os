'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { StartMenu } from '@/components/ui/start-menu';
import { Snake } from '@/components/games/snake';
import { Minesweeper } from '@/components/games/minesweeper';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type GameType = 'snake' | 'minesweeper';

interface StartMenuContextType {
  isStartMenuOpen: boolean;
  toggleStartMenu: () => void;
  openGame: (game: GameType) => void;
}

const StartMenuContext = createContext<StartMenuContextType>({
  isStartMenuOpen: false,
  toggleStartMenu: () => {},
  openGame: () => {},
});

export function StartMenuProvider({ children }: { children: React.ReactNode }) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activeGames, setActiveGames] = useState<GameType[]>([]);

  const toggleStartMenu = useCallback(() => {
    setIsStartMenuOpen(prev => !prev);
  }, []);

  const openGame = useCallback((game: GameType) => {
    setActiveGames(prev => [...prev, game]);
    setIsStartMenuOpen(false);
  }, []);

  const closeGame = useCallback((game: GameType) => {
    setActiveGames(prev => prev.filter(g => g !== game));
  }, []);

  return (
    <StartMenuContext.Provider value={{ isStartMenuOpen, toggleStartMenu, openGame }}>
      {children}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onGameSelect={openGame}
      />
      {activeGames.includes('snake') && (
        <Snake onClose={() => closeGame('snake')} />
      )}
      {activeGames.includes('minesweeper') && (
        <Minesweeper onClose={() => closeGame('minesweeper')} />
      )}
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-[30px] bg-gradient-to-r from-[#235DCC] via-[#1547A7] to-[#235DCC] border-t-2 border-[#5A8AE1] flex items-center px-1 z-50">
        <button
          onClick={toggleStartMenu}
          className={cn(
            "h-[25px] flex items-center gap-1 px-2 rounded-sm",
            "bg-gradient-to-r from-[#5AA744] via-[#6DBA4C] to-[#5AA744]",
            "hover:from-[#4E9138] hover:via-[#5AA744] hover:to-[#4E9138]",
            "active:from-[#3F7A2B] active:via-[#4E9138] active:to-[#3F7A2B]",
            "border border-[#3F7A2B] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3)]",
            isStartMenuOpen && "bg-[#2F5A1B] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.3)]"
          )}
        >
          <Image
            src="/icons/start.svg"
            alt="Start"
            width={28}
            height={24}
            className="drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]"
          />
          <span className="text-white font-[Tahoma] text-sm font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]">start</span>
        </button>
      </div>
    </StartMenuContext.Provider>
  );
}

export const useStartMenu = () => {
  const context = useContext(StartMenuContext);
  if (!context) {
    throw new Error('useStartMenu must be used within a StartMenuProvider');
  }
  return context;
}; 