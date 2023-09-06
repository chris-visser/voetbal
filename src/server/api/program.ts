import { getPrograms } from '~/server/client'

export default defineEventHandler(async (event) => {

    const matches = await getPrograms({ days: 365, teamCodes: [123668, 123683] })

    return {
      matches
    }
  })