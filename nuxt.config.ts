// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-simple-sitemap','nuxt-gtag'],
  sitemap: {
    // automatically chunk into multiple sitemaps
    sitemaps: true,
  },
  site: {
    url: 'https://www.enhjorning.bot',
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
  },
  // Google Analytics configuration
  gtag: {
    id: 'GTM-KJXRVZZP', // Your Google Analytics ID
    // additional gtag configurations if needed
  }
})  