// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss']
})
