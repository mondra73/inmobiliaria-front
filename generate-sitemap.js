import { writeFileSync } from 'fs'

const domain = 'https://www.espinosainmob.com.ar'

const rutas = [
  '/',
  '/nosotros',
  '/propiedades-publicas',
  '/contacto',
]

const fecha = new Date().toISOString()

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rutas
  .map(
    (ruta) => `
  <url>
    <loc>${domain}${ruta}</loc>
    <lastmod>${fecha}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join('')}
</urlset>`

writeFileSync('./dist/sitemap.xml', sitemap)

console.log('✅ Sitemap generado con éxito.')
