import { getProgram } from '~/server/client'

export default defineEventHandler(async (event) => {

    const program = await getProgram()


    return {
      program
    }
  })