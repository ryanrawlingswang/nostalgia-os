import { GeneratedPortfolio } from '@/lib/types';
import { getRecentPortfolios } from '@/server/actions/get-recent';
import PortfolioCard from './PortfolioCard';

export default async function PastGenerations() {
  const portfolios = await getRecentPortfolios();

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