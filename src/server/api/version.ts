// import { getProgram } from '~/server/client'

export default defineEventHandler(async (event) => {

    console.log('Version ping from', event.headers)
    // const storage = useStorage('redis')

    return {
        version: 'v0.0.4-beta'
    }
  })