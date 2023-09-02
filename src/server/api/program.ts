import { getProgram } from '~/server/client'

export default defineEventHandler(async (event) => {

    const matches = await getProgram()


    return {
      matches
    }
  })