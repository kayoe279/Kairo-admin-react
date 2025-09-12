import { useEffect, useState } from "react";
import { useRoutes } from "react-router";
import type { AppRouteObject } from "@/types";

// interface AsyncRoute {
//   path: string;
//   element: React.ReactNode;
//   children?: AsyncRoute[];
// }

export function useAsyncRoutes(fetcher: () => Promise<AppRouteObject[]>) {
  const [routes, setRoutes] = useState<AppRouteObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const element = useRoutes(routes);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        const result = await fetcher();
        if (active) {
          setRoutes(result);
          setError(null);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [fetcher]);

  return { element, loading, error };
}
