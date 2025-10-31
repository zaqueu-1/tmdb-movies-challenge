import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        {
          'rounded-md': variant === 'default' || variant === 'rectangular',
          'rounded-full': variant === 'circular',
          'h-4 w-full': variant === 'text',
        },
        className
      )}
      {...props}
    />
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton className="aspect-[2/3] w-full" variant="rectangular" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-12" variant="rectangular" />
          <Skeleton className="h-5 w-16" variant="rectangular" />
        </div>
      </div>
    </div>
  );
}

export function MoviesGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}


