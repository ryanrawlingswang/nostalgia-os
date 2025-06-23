import { getPage } from '@/server/cache';
import { GeneratedPortfolio } from '@/lib/types';
import { notFound } from 'next/navigation';

export default async function PreviewPage({
  params
}: {
  params: { id: string }
}) {
  const portfolioData = await getPage(params.id);

  if (!portfolioData) {
    notFound();
  }

  let html: string;

  try {
    // Try to parse as JSON (new format)
    const portfolio: GeneratedPortfolio = JSON.parse(portfolioData);
    html = portfolio.html;
  } catch (error) {
    // If JSON parsing fails, treat as raw HTML (old format)
    html = portfolioData;
  }

  return (
    <html dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE html>/, '') }} />
  );
} 