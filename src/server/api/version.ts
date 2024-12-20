// import { getProgram } from '~/server/client'

const ipMap: Record<string, string> = {
  '::ffff:127.0.0.1': 'Thuis (development)',
  // '3.82.96.116': 'SV de Rijp',
  '2a02:a463:68b:1:eccd:8943:3209:f924': 'SV de Rijp',
  '2a02:a463:68b:1:fbb1:f253:692e:f261': 'SV de Rijp',
  '83.84.2.172': 'Thuis',
}

const VERSION = 'v0.7.0'

export default defineEventHandler(async (event) => {
  const forwardedFor = getHeader(event, 'x-forwarded-for')
  // const query = getQuery(event)
  // console.log(query.screenSize)
  if (!forwardedFor) {
    console.log('Could not find x-forwarded-for header', event.headers)
    return {
      version: VERSION,
    }
  }

  const clientName = ipMap[forwardedFor]
  if (!clientName) {
    console.log(`Version ping from unknown IP "${forwardedFor}" `)
  }
  else {
    console.log(`Version ping from "${clientName}" `)
  }

  // const storage = useStorage('redis')

  return {
    version: VERSION,
  }
})
