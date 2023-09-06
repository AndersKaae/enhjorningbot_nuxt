export default defineEventHandler(async () => {
    const [
      posts
    ] = await Promise.all([
      $fetch('https://virk.oaktoad.dk/api/v1/sitemap')
    ])
    return [...posts].map((p) => {
        return { loc: p.loc, lastmod: p.lastmod }
    })
  })