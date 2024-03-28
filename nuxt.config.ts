// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap',
            '@zadigetvoltaire/nuxt-gtm',
            '@sidebase/nuxt-auth'],
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
  },
  auth: {
    baseURL: 'https://enhjorning.oaktoad.dk/api/v1',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/session', method: 'get' }
      },
      token: { signInResponseTokenPointer: '/token/accessToken' },
    }
  }
}) 
