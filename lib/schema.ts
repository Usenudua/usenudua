import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const releases = pgTable('releases', {
  id: serial('id').primaryKey(),
  version: varchar('version', { length: 50 }).notNull(),
  supabase_url: text('supabase_url').notNull(),
  neon_mirror_url: text('neon_mirror_url'),
  checksum: varchar('checksum', { length: 256 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type Release = typeof releases.$inferSelect;
export type NewRelease = typeof releases.$inferInsert;
