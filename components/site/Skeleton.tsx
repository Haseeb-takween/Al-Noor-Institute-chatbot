/** Lightweight skeleton primitives for lazy-loaded UI. */

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-line/80 ${className}`}
      aria-hidden
    />
  );
}

/** Placeholder for below-fold home sections while JS chunks load. */
export function SectionSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <section
      className={`mx-auto max-w-6xl px-5 py-16 lg:px-8 ${tall ? "lg:py-24" : "lg:py-20"}`}
      aria-busy
      aria-label="Loading section"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="mt-1 h-4 w-full max-w-md" />
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full sm:col-span-2 lg:col-span-1" />
      </div>
    </section>
  );
}

/** Floating chat launcher placeholder (matches ChatWidget FAB size). */
export function ChatWidgetSkeleton() {
  return (
    <div
      className="fixed bottom-5 right-5 z-[60] h-[3.75rem] w-[3.75rem] animate-pulse rounded-full bg-navy/20 sm:bottom-6 sm:right-6"
      aria-hidden
    />
  );
}
