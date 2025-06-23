'use server'

import { generatePersonalWebsite } from './generate';
import { generatePageId, cachePage } from '../cache';
import { VisitorType, IndustryFocus, VisitorContext, GeneratedPortfolio } from '@/lib/types';
import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

export async function handleSubmit(formData: FormData) {
  // Parse visitor context
  const visitorType = formData.get('visitorType') as VisitorType;
  const industry = formData.get('industry') as IndustryFocus;
  const style = formData.get('style') as 'modern' | 'minimal' | 'bold' | 'creative';

  const visitorContext: VisitorContext = {
    type: visitorType,
    industry,
    interests: [] // We'll derive interests from the role and industry
  };

  // Read the markdown content
  const markdownContent = await fs.readFile(path.join(process.cwd(), 'ryanwang.md'), 'utf-8');

  // Generate the portfolio
  const html = await generatePersonalWebsite({
    markdownContent,
    style,
    colorScheme: 'auto', // Default to auto
    visitorContext
  });

  // Generate a unique ID
  const pageId = generatePageId();

  // Create portfolio record
  const portfolio: GeneratedPortfolio = {
    id: pageId,
    createdAt: new Date(),
    visitorContext,
    style,
    colorScheme: 'auto',
    html
  };

  // Save the portfolio
  await cachePage(pageId, JSON.stringify(portfolio));

  // Redirect to the preview page
  redirect(`/preview/${pageId}`);
} 