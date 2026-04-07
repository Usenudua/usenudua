'use server'

import { db } from '@/lib/db';
import { releases } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export async function getLatestRelease() {
  try {
    const latest = await db.select()
      .from(releases)
      .orderBy(desc(releases.created_at))
      .limit(1);
    
    return latest[0] || null;
  } catch (error) {
    console.error('Failed to fetch latest release from Neon:', error);
    return null;
  }
}
