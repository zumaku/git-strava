import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = 'https://gitstrava.vercel.app/sitemap.xml';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: sitemapUrl,
  }
}