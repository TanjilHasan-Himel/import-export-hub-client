export function CardSkeleton() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-44 w-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      <div className="mt-4 space-y-3">
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-64 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
}
