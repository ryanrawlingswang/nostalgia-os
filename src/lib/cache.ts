import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), '.cache');

// Ensure cache directory exists
async function ensureCacheDir() {
  try {
    await fs.access(CACHE_DIR);
  } catch {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  }
}

// Generate a unique ID for the page
export function generatePageId(): string {
  return crypto.randomBytes(8).toString('hex');
}

// Save HTML content to cache
export async function cachePage(id: string, html: string): Promise<void> {
  await ensureCacheDir();
  const filePath = path.join(CACHE_DIR, `${id}.html`);
  await fs.writeFile(filePath, html, 'utf-8');
}

// Retrieve HTML content from cache
export async function getPage(id: string): Promise<string | null> {
  try {
    const filePath = path.join(CACHE_DIR, `${id}.html`);
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

// Clean up old cached pages (optional, can be run periodically)
export async function cleanupOldPages(maxAgeHours = 24): Promise<void> {
  try {
    const files = await fs.readdir(CACHE_DIR);
    const now = Date.now();
    
    for (const file of files) {
      const filePath = path.join(CACHE_DIR, file);
      const stats = await fs.stat(filePath);
      const ageHours = (now - stats.mtimeMs) / (1000 * 60 * 60);
      
      if (ageHours > maxAgeHours) {
        await fs.unlink(filePath);
      }
    }
  } catch {
    // Ignore errors during cleanup
  }
} 