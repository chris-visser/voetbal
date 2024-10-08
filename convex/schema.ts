import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  sponsors: defineTable({
    name: v.string(),
    logoUrl: v.optional(v.string()),
    storageId: v.optional(v.id('_storage')),
  }),
})
