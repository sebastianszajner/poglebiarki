interface SkeletonProps {
  variant?: 'card' | 'text' | 'image'
  className?: string
}

export function Skeleton({ variant = 'text', className = '' }: SkeletonProps) {
  const baseClasses = 'skeleton-shimmer rounded-lg'

  if (variant === 'card') {
    return (
      <div className={`${baseClasses} p-5 rounded-xl bg-slate-800/40 border border-slate-700/30 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="skeleton-shimmer w-16 h-4 rounded bg-slate-700/50" />
          <div className="skeleton-shimmer w-12 h-4 rounded bg-slate-700/50" />
        </div>
        <div className="space-y-2">
          <div className="skeleton-shimmer w-full h-4 rounded bg-slate-700/50" />
          <div className="skeleton-shimmer w-3/4 h-4 rounded bg-slate-700/50" />
        </div>
      </div>
    )
  }

  if (variant === 'image') {
    return (
      <div className={`${baseClasses} bg-slate-700/50 aspect-video ${className}`} />
    )
  }

  // text variant
  return (
    <div className={`space-y-2 ${className}`}>
      <div className={`${baseClasses} w-full h-4 bg-slate-700/50`} />
      <div className={`${baseClasses} w-5/6 h-4 bg-slate-700/50`} />
      <div className={`${baseClasses} w-2/3 h-4 bg-slate-700/50`} />
    </div>
  )
}
