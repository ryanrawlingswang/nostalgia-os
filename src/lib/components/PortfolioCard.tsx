'use client';

import { GeneratedPortfolio } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface PortfolioCardProps {
  portfolio: GeneratedPortfolio;
}

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVisitorTypeLabel = (type: string) => {
    const labels = {
      recruiter: 'Recruiter',
      reporter: 'Reporter',
      investor: 'Investor',
      client: 'Client',
      other: 'Other'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getIndustryLabel = (industry: string) => {
    const labels = {
      tech: 'Technology',
      healthcare: 'Healthcare',
      finance: 'Finance',
      media: 'Media',
      other: 'Other'
    };
    return labels[industry as keyof typeof labels] || industry;
  };

  const getStyleLabel = (style: string) => {
    const labels = {
      modern: 'Modern',
      minimal: 'Minimal',
      bold: 'Bold',
      creative: 'Creative'
    };
    return labels[style as keyof typeof labels] || style;
  };

  const handleClick = () => {
    window.open(`/preview/${portfolio.id}`, '_blank');
  };

  return (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={handleClick}>
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center">
          <Image 
            src="/file.svg" 
            alt="Portfolio Icon" 
            width={16} 
            height={16} 
            className="mr-2"
          />
          <span>Portfolio Preview</span>
        </div>
        <div className="flex items-center text-xs text-white">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(portfolio.createdAt)}
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className="bg-[#316AC5] text-white">
              {getVisitorTypeLabel(portfolio.visitorContext.type)}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="text-sm flex items-center">
              <Image 
                src="/window.svg" 
                alt="Industry Icon" 
                width={14} 
                height={14} 
                className="mr-2"
              />
              Industry: {getIndustryLabel(portfolio.visitorContext.industry)}
            </div>
            <div className="text-sm flex items-center">
              <Image 
                src="/globe.svg" 
                alt="Style Icon" 
                width={14} 
                height={14} 
                className="mr-2"
              />
              Style: {getStyleLabel(portfolio.style)}
            </div>
          </div>
          <Button className="button w-full flex items-center justify-center">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
} 