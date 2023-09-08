import { getProgram } from '~/server/client'

export default defineEventHandler(async (event) => {

    const query = getQuery<{
        days: string
        away: string
    }>(event)

    const params = {
        ...(query.days ? { days: parseInt(query.days, 10) } : {}),
        ...(query.away ? { away: Boolean(query.away !== 'false') } : {}),
    }

    const matches = await getProgram(params)

    return {
      matches
    }
  })