import { query } from './_generated/server'

export const get = query({
  args: {},
  //   handler: async (ctx) => {
  //     return await ctx.db.query('sponsors').collect()
  //   },
  handler: async (ctx) => {
    const sponsors = await ctx.db.query('sponsors').collect()
    return Promise.all(
      sponsors.map(async sponsor => ({
        ...sponsor,
        // If the message is an "image" its `body` is an `Id<"_storage">`
        ...(sponsor.storageId
          ? { logoUrl: await ctx.storage.getUrl(sponsor.storageId) }
          : {}),
      })),
    )
  },
})
