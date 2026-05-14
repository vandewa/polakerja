import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const WEBINAR_HOSTS = new Set([
  'webinar.polakerja.id',
  'webinar.localhost:3000',
  'webinar.localhost',
])

export function proxy(req: NextRequest) {
  const host = req.headers.get('host') ?? ''

  // Canonical host: redirect www → apex. Vercel's edge redirect also covers
  // this once www is set as a redirect domain in the dashboard; this is the
  // in-code safety net so the canonical URL holds regardless of that setting.
  if (host === 'www.polakerja.id') {
    const target = req.nextUrl.clone()
    target.host = 'polakerja.id'
    return NextResponse.redirect(target, 308)
  }

  const isWebinar = WEBINAR_HOSTS.has(host)
  const url = req.nextUrl.clone()

  if (isWebinar && (url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt')) {
    url.pathname = `/webinar${url.pathname}`
    return NextResponse.rewrite(url)
  }

  if (isWebinar && !url.pathname.startsWith('/webinar')) {
    url.pathname = url.pathname === '/' ? '/webinar' : `/webinar${url.pathname}`
    return NextResponse.rewrite(url)
  }

  if (!isWebinar && url.pathname.startsWith('/webinar')) {
    const target = req.nextUrl.clone()
    target.host = 'webinar.polakerja.id'
    target.pathname = url.pathname.replace(/^\/webinar/, '') || '/'
    return NextResponse.redirect(target, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/sitemap.xml',
    '/robots.txt',
  ],
}
