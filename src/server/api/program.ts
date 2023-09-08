import { getProgram } from '~/server/client'

export default defineEventHandler(async (event) => {

    const matches = await getProgram({ days: 2, away: false })

    return {
      matches
    }
  })