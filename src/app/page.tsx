import PastGenerations from '@/lib/components/PastGenerations';
import ClientForm from '@/lib/components/ClientForm';
import { handleSubmit } from '@/server/actions/submit';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="xp-background" />
      <main>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="card">
            <div className="card-header">
              <Image 
                src="/window.svg" 
                alt="Window Icon" 
                width={16} 
                height={16} 
                className="mr-2"
              />
              <span>Portfolio Generator</span>
            </div>
            <div className="card-content">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This portfolio will be generated using AI to curate and present information specifically for your context.
                  While the content is based on real information about Ryan Wang, the presentation and emphasis are
                  automatically tailored to your specific interests and needs.
                </AlertDescription>
              </Alert>
              <ClientForm action={handleSubmit} />
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <Image 
                src="/file.svg" 
                alt="File Icon" 
                width={16} 
                height={16} 
                className="mr-2"
              />
              <span>Past Generations</span>
            </div>
            <div className="card-content">
              <PastGenerations />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
