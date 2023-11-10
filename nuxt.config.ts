// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-icon'
  ],
  runtimeConfig: {
    public: {
      hello: 'foo'
    }
  },
  image: {
    domains: ['nuxtjs.org']
  },
  build: {
    transpile: ['date-fns']
  },
  // nitro: {
  //   storage: {
  //     'redis': {
  //       driver: 'redis',
  //       /* redis connector options */
  //       port: 6379, // Redis port
  //       host: "voetbal-cache-0001-001.dtstxs.0001.euc1.cache.amazonaws.com", // Redis host
  //       // username: "", // needs Redis >= 6
  //       // password: "",
  //       // db: 0, // Defaults to 0
  //       // tls: {} // tls/ssl
  //     }
  //   }
  // }
})
