'use server'

import OpenAI from 'openai';
import { WebsiteGenerationOptions } from '@/lib/types';
import { createWebsiteGenerationPrompt, createWebsiteGenerationSystemPrompt } from '@/prompts/website-generation';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePersonalWebsite({
  markdownContent,
  style = 'modern',
  colorScheme = 'auto',
  visitorContext
}: WebsiteGenerationOptions): Promise<string> {
  const prompt = createWebsiteGenerationPrompt({
    markdownContent,
    style,
    colorScheme,
    visitorContext
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: createWebsiteGenerationSystemPrompt()
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 4000,
  });

  const responseContent = completion.choices[0].message.content || '';
  
  try {
    const parsedResponse = JSON.parse(responseContent);
    return parsedResponse.html || '';
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    // Fallback to returning the raw content if JSON parsing fails
    return responseContent;
  }
} 