import {
  sqliteTable,
  text,
  integer,
  real,
  blob,
  primaryKey,
} from 'drizzle-orm/sqlite-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const zitat = sqliteTable('zitat', {
  uuid: text('uuid').primaryKey(),
  date: text('date').notNull(),
  quote: text('quote').notNull(),
  author: text('author').notNull(),
  keywords: text('keywords'),
})

export const keywords = sqliteTable('keywords', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  keyword: text('keyword').unique().notNull(),
})

export const quoteKeywords = sqliteTable(
  'quote_keywords',
  {
    quoteUuid: text('quote_uuid')
      .notNull()
      .references(() => zitat.uuid),
    keywordId: integer('keyword_id')
      .notNull()
      .references(() => keywords.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.quoteUuid, table.keywordId] }),
  })
)

export const quoteRelationships = sqliteTable('quote_relationships', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  quoteUuid1: text('quote_uuid_1')
    .notNull()
    .references(() => zitat.uuid),
  quoteUuid2: text('quote_uuid_2')
    .notNull()
    .references(() => zitat.uuid),
  relationshipType: text('relationship_type'), // 'keyword', 'semantic', 'author', 'topic'
  similarityScore: real('similarity_score'),
  sharedKeywords: text('shared_keywords'), // JSON 배열
})

export const topics = sqliteTable('topics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  description: text('description'),
  parentTopicId: integer('parent_topic_id').references((): any => topics.id),
})

export const quoteTopics = sqliteTable(
  'quote_topics',
  {
    quoteUuid: text('quote_uuid')
      .notNull()
      .references(() => zitat.uuid),
    topicId: integer('topic_id')
      .notNull()
      .references(() => topics.id),
    confidence: real('confidence').default(1.0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.quoteUuid, table.topicId] }),
  })
)

export const quoteEmbeddings = sqliteTable('quote_embeddings', {
  uuid: text('uuid')
    .primaryKey()
    .references(() => zitat.uuid),
  embedding: blob('embedding'),
})

export const selectQuoteSchema = createSelectSchema(zitat)

export type SelectQuoteSchema = z.infer<typeof selectQuoteSchema>

export const dateRangeSchema = z.object({
  first_month: z.string(),
  last_month: z.string(),
})

export type DateRangeSchema = z.infer<typeof dateRangeSchema>
