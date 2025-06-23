export type StyleOption = 'modern' | 'minimal' | 'bold' | 'creative';
export type ColorScheme = 'light' | 'dark' | 'auto';

export type VisitorType = 'recruiter' | 'reporter' | 'investor' | 'client' | 'other';
export type IndustryFocus = 'tech' | 'healthcare' | 'finance' | 'media' | 'other';

export interface VisitorContext {
  type: VisitorType;
  industry: IndustryFocus;
  interests: string[];
  companyName?: string;
  specificInterests?: string;
}

export interface GeneratedPortfolio {
  id: string;
  createdAt: Date;
  visitorContext: VisitorContext;
  style: StyleOption;
  colorScheme: ColorScheme;
  html: string;
}

export interface WebsiteGenerationOptions {
  markdownContent: string;
  style: StyleOption;
  colorScheme: ColorScheme;
  visitorContext: VisitorContext;
} 