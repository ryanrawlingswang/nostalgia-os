import { promises as fs } from 'fs';
import path from 'path';
import { GeneratedPortfolio } from '@/lib/types';

export async function getRecentPortfolios() {
  'use server';
  
  try {
    const cacheDir = path.join(process.cwd(), '.cache');
    const files = await fs.readdir(cacheDir);
    
    const portfolios: GeneratedPortfolio[] = [];
    
    for (const file of files) {
      if (file.endsWith('.html')) {
        try {
          const id = file.replace('.html', '');
          const data = await fs.readFile(path.join(cacheDir, file), 'utf-8');
          const portfolio: GeneratedPortfolio = JSON.parse(data);
          portfolios.push(portfolio);
        } catch (error) {
          console.error(`Error reading portfolio ${file}:`, error);
        }
      }
    }
    
    // Sort by creation date, newest first
    return portfolios
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  } catch (error) {
    console.error('Error reading cache directory:', error);
    return [];
  }
} 