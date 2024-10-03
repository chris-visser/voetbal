export type SplFetchOptions = {
  query?: Record<string, string>
}

const baseURL = 'https://data.sportlink.com'
const clientId = '1VZsDN7ueJ'

export const splFetch = async <Output>(path: string, options: SplFetchOptions = {}): Promise<Output> => {
  return $fetch(path, {
    baseURL,
    query: {
      ...(options.query || {}),
      clientId,
    },
  })
}
