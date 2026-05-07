import type { ComponentType } from 'react'
import type { Webinar } from '@/lib/webinars'

export type WebinarPageProps = { webinar: Webinar }
export const webinarPages: Record<string, ComponentType<WebinarPageProps>> = {}
