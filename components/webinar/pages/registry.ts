import type { ComponentType } from 'react'
import type { Webinar } from '@/lib/webinars'
import Iso9001Jan2026 from './Iso9001Jan2026'
import SbuKonstruksiFeb2026 from './SbuKonstruksiFeb2026'

export type WebinarPageProps = { webinar: Webinar }

export const webinarPages: Record<string, ComponentType<WebinarPageProps>> = {
  'iso-9001-jan2026': Iso9001Jan2026,
  'sbu-konstruksi-feb2026': SbuKonstruksiFeb2026,
}
