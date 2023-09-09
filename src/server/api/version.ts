// import { getProgram } from '~/server/client'

const ipMap: Record<string, string> = {
    '::ffff:127.0.0.1': 'Thuis (development)',
    '3.82.96.116': 'SV de Rijp',
    '83.84.2.172': 'Thuis'
}

const VERSION = 'v0.0.4-beta'

export default defineEventHandler(async (event) => {
    const forwardedFor = getHeader(event, 'x-forwarded-for')
    console.log(forwardedFor, event.headers)
    if(!forwardedFor) {
        return {
            version: VERSION
        }
    }
    
    const clientName = ipMap[forwardedFor] || 'Onbekend'
    console.log(`Version ping from "${clientName}" `)
    // const storage = useStorage('redis')

    return {
        version: VERSION
    }
  })