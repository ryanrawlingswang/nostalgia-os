'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRef } from 'react';
import Image from 'next/image';

export default function ClientForm({ action }: { action: (formData: FormData) => void }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Ryan Wang&apos;s Portfolio Generator</CardTitle>
        <CardDescription>
          Generate a personalized portfolio tailored to your specific needs and interests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          action={action}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="visitorType" className="flex items-center">
                <Image 
                  src="/globe.svg" 
                  alt="Visitor Icon" 
                  width={16} 
                  height={16} 
                  className="mr-2"
                />
                What best describes you?
              </Label>
              <Select name="visitorType" required>
                <SelectTrigger className="input">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recruiter">Technical Recruiter</SelectItem>
                  <SelectItem value="reporter">Journalist/Reporter</SelectItem>
                  <SelectItem value="investor">Investor/VC</SelectItem>
                  <SelectItem value="client">Potential Client</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" className="flex items-center">
                <Image 
                  src="/window.svg" 
                  alt="Industry Icon" 
                  width={16} 
                  height={16} 
                  className="mr-2"
                />
                What industry are you primarily interested in?
              </Label>
              <Select name="industry" required>
                <SelectTrigger className="input">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style" className="flex items-center">
                <Image 
                  src="/file.svg" 
                  alt="Style Icon" 
                  width={16} 
                  height={16} 
                  className="mr-2"
                />
                What vibe are you looking for?
              </Label>
              <Select name="style" defaultValue="modern">
                <SelectTrigger className="input">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern & Professional</SelectItem>
                  <SelectItem value="minimal">Clean & Minimal</SelectItem>
                  <SelectItem value="bold">Bold & Impactful</SelectItem>
                  <SelectItem value="creative">Creative & Unique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="button w-full" size="lg">
            Generate Personalized Portfolio
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 