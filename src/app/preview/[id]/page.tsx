import { WindowFrame } from "@/components/ui/window-frame";
import { GeneratedPortfolio } from '@/lib/types';
import { notFound } from 'next/navigation';
import { getPage } from '@/server/cache';
import { IENavigation } from '@/components/ui/ie-navigation';

const navItems = [
  { icon: '/icons/about.svg', title: 'About Me', id: 'about' },
  { icon: '/icons/projects.svg', title: 'Projects', id: 'projects' },
  { icon: '/icons/contact.svg', title: 'Contact', id: 'contact' }
];

export default async function PreviewPage({ params }: { params: { id: string } }) {
  const portfolioData = await getPage(params.id);
  if (!portfolioData) notFound();

  let portfolio: GeneratedPortfolio;
  try {
    portfolio = JSON.parse(portfolioData);
  } catch (error) {
    console.error('Failed to parse portfolio data:', error);
    notFound();
  }

  return (
    <div className="min-h-screen relative">
      <div className="xp-background" />
      <div className="relative z-10 p-4">
        <WindowFrame 
          title="Internet Explorer" 
          icon="/icons/internet.svg"
        >
          {/* Navigation Bar */}
          <IENavigation items={navItems} />

          {/* Content */}
          <div className="font-[Tahoma] p-4" dangerouslySetInnerHTML={{ __html: portfolio.html }} />

          {/* Status Bar */}
          <div className="bg-[#ECE9D8] border-t border-[#919B9C] h-[23px] px-2 flex items-center">
            <span className="text-xs font-[Tahoma] text-[#6F6F6F]">Done</span>
          </div>
        </WindowFrame>
      </div>
    </div>
  );
} 