// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/icon', '@nuxt/eslint'],

  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
      },
    },
  },
  runtimeConfig: {
    public: {
      convexUrl: process.env.CONVEX_URL,
    },
  },

  image: {
    domains: [
      'harmless-curlew-467.convex.cloud',
      'data.sportlink.com',
      'logoapi.voetbal.nl',
    ],
  },

  build: {
    transpile: ['date-fns'],
  },

  compatibilityDate: '2024-10-03',
})
