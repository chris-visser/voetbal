// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],
  image: {
    domains: ['nuxtjs.org']
  },
  build: {
    transpile: ['date-fns']
  }
})
