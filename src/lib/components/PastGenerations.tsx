import { GeneratedPortfolio } from '@/lib/types';
import { getPage } from '@/server/cache';
import { promises as fs } from 'fs';
import path from 'path';
import PortfolioCard from './PortfolioCard';

async function getPastGenerations(): Promise<GeneratedPortfolio[]> {
  try {
    const cacheDir = path.join(process.cwd(), '.cache');
    const files = await fs.readdir(cacheDir);
    
    const portfolios: GeneratedPortfolio[] = [];
    
    for (const file of files) {
      if (file.endsWith('.html')) {
        try {
          const id = file.replace('.html', '');
          const data = await getPage(id);
          if (data) {
            // Try to parse as JSON first (new format)
            try {
              const portfolio: GeneratedPortfolio = JSON.parse(data);
              portfolios.push(portfolio);
            } catch (jsonError) {
              // If JSON parsing fails, it might be old format with just HTML
              // Skip these for now since we don't have the metadata
              console.log(`Skipping old format portfolio ${id}`);
            }
          }
        } catch (error) {
          // Skip invalid files
          console.error(`Error reading portfolio ${file}:`, error);
        }
      }
    }
    
    // Sort by creation date, newest first
    return portfolios.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error reading cache directory:', error);
    return [];
  }
}

export default async function PastGenerations() {
  const portfolios = await getPastGenerations();

  if (portfolios.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {portfolios.slice(0, 6).map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>
      {portfolios.length > 6 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Showing 6 of {portfolios.length} recent generations
          </p>
        </div>
      )}
    </div>
  );
} 