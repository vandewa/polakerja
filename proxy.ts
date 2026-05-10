import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const WEBINAR_HOSTS = new Set([
  'webinar.polakerja.com',
  'webinar.localhost:3000',
  'webinar.localhost',
])

export function proxy(req: NextRequest) {
  const host = req.headers.get('host') ?? ''
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
    target.host = 'webinar.polakerja.com'
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
