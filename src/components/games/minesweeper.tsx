'use client';

import { useState, useEffect } from 'react';
import { WindowFrame } from '@/components/ui/window-frame';

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

const GRID_SIZE = 10;
const MINE_COUNT = 10;

interface MinesweeperProps {
  onClose: () => void;
}

export function Minesweeper({ onClose }: MinesweeperProps) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagCount, setFlagCount] = useState(0);

  // Initialize game
  const initializeGrid = () => {
    // Create empty grid
    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[y][x].isMine) {
        newGrid[y][x].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (!newGrid[y][x].isMine) {
          let count = 0;
          // Check all 8 neighbors
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (
                ny >= 0 && ny < GRID_SIZE &&
                nx >= 0 && nx < GRID_SIZE &&
                newGrid[ny][nx].isMine
              ) {
                count++;
              }
            }
          }
          newGrid[y][x].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setFlagCount(0);
  };

  // Reveal cell and its neighbors if it's empty
  const revealCell = (y: number, x: number) => {
    if (gameOver || gameWon || grid[y][x].isRevealed || grid[y][x].isFlagged) return;

    const newGrid = [...grid.map(row => [...row])];
    
    if (grid[y][x].isMine) {
      // Game over - reveal all mines
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (newGrid[i][j].isMine) {
            newGrid[i][j].isRevealed = true;
          }
        }
      }
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    const revealEmpty = (y: number, x: number) => {
      if (
        y < 0 || y >= GRID_SIZE ||
        x < 0 || x >= GRID_SIZE ||
        newGrid[y][x].isRevealed ||
        newGrid[y][x].isFlagged
      ) return;

      newGrid[y][x].isRevealed = true;

      if (newGrid[y][x].neighborMines === 0) {
        // Reveal all neighbors
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            revealEmpty(y + dy, x + dx);
          }
        }
      }
    };

    revealEmpty(y, x);
    setGrid(newGrid);

    // Check for win
    let unrevealedSafeCells = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (!newGrid[i][j].isMine && !newGrid[i][j].isRevealed) {
          unrevealedSafeCells++;
        }
      }
    }
    if (unrevealedSafeCells === 0) {
      setGameWon(true);
    }
  };

  // Toggle flag on cell
  const toggleFlag = (y: number, x: number) => {
    if (gameOver || gameWon || grid[y][x].isRevealed) return;

    const newGrid = [...grid.map(row => [...row])];
    newGrid[y][x].isFlagged = !newGrid[y][x].isFlagged;
    setGrid(newGrid);
    setFlagCount(prev => newGrid[y][x].isFlagged ? prev + 1 : prev - 1);
  };

  // Initialize game on mount
  useEffect(() => {
    initializeGrid();
  }, []);

  const getCellContent = (cell: Cell) => {
    if (!cell.isRevealed && cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    return cell.neighborMines || '';
  };

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return 'bg-[#C0C0C0]';
    if (cell.isMine) return 'bg-red-500';
    return 'bg-[#ECE9D8]';
  };

  const getNumberColor = (number: number) => {
    const colors = [
      'text-blue-600',   // 1
      'text-green-600',  // 2
      'text-red-600',    // 3
      'text-blue-900',   // 4
      'text-red-900',    // 5
      'text-teal-600',   // 6
      'text-black',      // 7
      'text-gray-600'    // 8
    ];
    return colors[number - 1] || '';
  };

  return (
    <WindowFrame
      title="Minesweeper"
      icon="/icons/minesweeper.svg"
      onClose={onClose}
    >
      <div className="p-4 bg-[#ECE9D8] min-h-[500px]">
        <div className="mb-4 font-[Tahoma] flex justify-between">
          <div>Mines: {MINE_COUNT - flagCount}</div>
          <button
            onClick={initializeGrid}
            className="px-4 py-1 bg-[#C0C0C0] border border-[#919B9C] hover:bg-[#B0B0B0]"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-10 gap-[1px] bg-[#919B9C] p-[1px] w-fit mx-auto">
          {grid.map((row, y) => (
            row.map((cell, x) => (
              <button
                key={`${y}-${x}`}
                onClick={() => revealCell(y, x)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleFlag(y, x);
                }}
                className={`
                  w-8 h-8 flex items-center justify-center font-bold
                  ${getCellColor(cell)}
                  ${!cell.isRevealed ? 'hover:bg-[#B0B0B0]' : ''}
                  ${cell.isRevealed && !cell.isMine ? getNumberColor(cell.neighborMines) : ''}
                  border border-[#919B9C]
                `}
              >
                {getCellContent(cell)}
              </button>
            ))
          ))}
        </div>
        {(gameOver || gameWon) && (
          <div className="mt-4 text-center font-[Tahoma] text-lg">
            {gameWon ? 'You won!' : 'Game Over!'}
          </div>
        )}
      </div>
    </WindowFrame>
  );
} 