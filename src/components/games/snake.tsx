'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { WindowFrame } from '@/components/ui/window-frame';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

interface SnakeProps {
  onClose: () => void;
}

export function Snake({ onClose }: SnakeProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  }, []);

  // Handle keyboard controls
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      case ' ':
        setIsPaused(prev => !prev);
        break;
    }
  }, [direction, gameOver]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(currentSnake => {
        const head = currentSnake[0];
        const newHead = { ...head };

        switch (direction) {
          case 'UP':
            newHead.y -= 1;
            break;
          case 'DOWN':
            newHead.y += 1;
            break;
          case 'LEFT':
            newHead.x -= 1;
            break;
          case 'RIGHT':
            newHead.x += 1;
            break;
        }

        // Check collision with walls
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return currentSnake;
        }

        // Check collision with self
        if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return currentSnake;
        }

        const newSnake = [newHead, ...currentSnake];

        // Check if food is eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => prev + 10);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, generateFood, isPaused]);

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

    // Draw snake
    ctx.fillStyle = '#0A246A';
    snake.forEach(({ x, y }) => {
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });

    // Draw food
    ctx.fillStyle = '#CC0000';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);

    // Draw game over text
    if (gameOver) {
      ctx.fillStyle = '#000';
      ctx.font = '20px Tahoma';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', (GRID_SIZE * CELL_SIZE) / 2, (GRID_SIZE * CELL_SIZE) / 2);
      ctx.font = '16px Tahoma';
      ctx.fillText(
        'Press R to restart',
        (GRID_SIZE * CELL_SIZE) / 2,
        (GRID_SIZE * CELL_SIZE) / 2 + 30
      );
    }
  }, [snake, food, gameOver]);

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  };

  useEffect(() => {
    const handleReset = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r' && gameOver) {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleReset);
    return () => window.removeEventListener('keydown', handleReset);
  }, [gameOver]);

  return (
    <WindowFrame
      title="Snake"
      icon="/icons/snake.svg"
      onClose={onClose}
    >
      <div className="p-4 bg-[#ECE9D8] min-h-[500px] flex flex-col items-center">
        <div className="mb-4 font-[Tahoma] text-lg">Score: {score}</div>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="border-2 border-[#919B9C]"
        />
        <div className="mt-4 font-[Tahoma] text-sm text-center">
          <p>Use arrow keys to move</p>
          <p>Space to pause</p>
        </div>
      </div>
    </WindowFrame>
  );
} 