// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap',
            '@zadigetvoltaire/nuxt-gtm'],
  plugins: [
              '~/plugins/fetchTopInvestors.js'
            ],
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
  gtm: {
    id: 'GTM-KJXRVZZP',
  } 
}) 
