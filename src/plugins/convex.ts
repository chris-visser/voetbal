import { createConvexVue } from '@convex-vue/core'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  if (!config.public.convexUrl) {
    console.error('No CONVEX_URL provided')
    return
  }

  const convexVue = createConvexVue({
    convexUrl: config.public.convexUrl,
  })

  nuxtApp.vueApp.use(convexVue)
})
