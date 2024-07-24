import { z } from 'zod'

const hitSchema = z.object({
  objectID: z.string(),
  _highlightResult: z.object({
    desc: z.object({
      value: z.string(),
    }),
    author: z.object({
      value: z.string(),
    }),
  }),
})

const algoliaSearchResponseSchema = z.object({
  hits: z.array(hitSchema).optional(),
})

export type AlgoliaSearchResponseSchema = z.infer<
  typeof algoliaSearchResponseSchema
>
