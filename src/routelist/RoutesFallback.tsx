/**
 * Fallback на время загрузки ленивых страниц (общий для всех роутов).
 */
export const RoutesFallback: React.FC = () => (
  <div className="grid h-screen place-items-center">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-grey-300 border-t-primary" />
  </div>
);
