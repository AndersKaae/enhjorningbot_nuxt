// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-simple-sitemap'],
  sitemap: {
    // automatically chunk into multiple sitemaps
    sitemaps: true,
  },
  site: {
    url: 'https://enhjorning.bot',
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  runtimeConfig: {
    public: {
      gtagId: 'GTM-KJXRVZZP',
    }
  }
})  