// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  routeRules: {
    '/selectie': {
      swr: 3600
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],
  image: {
    domains: ['nuxtjs.org']
  }
})
