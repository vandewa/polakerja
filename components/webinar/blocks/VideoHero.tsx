import { cn } from '@/lib/cn'
export default function VideoHero({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  return (
    <div className={cn('relative aspect-video rounded-2xl overflow-hidden bg-neutral-900', className)}>
      <video src={src} poster={poster} controls playsInline preload="metadata" className="w-full h-full object-cover" />
    </div>
  )
}
