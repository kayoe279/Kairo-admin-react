import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_NAME, typedBoolean } from "@/lib";
import { useQueryParams, useSearchParams } from "../useSearchParams";

export const queryKeys = ["page", "pageSize", "keyword", "sortBy", "sortOrder"];
type QueryKeys = "page" | "pageSize" | "keyword" | "sortBy" | "sortOrder";

/**
 * Custom hook for managing table query parameters with type-safe extensions.
 * Extracts and transforms URL parameters into a format suitable for API queries,
 * handling pagination, search, and custom filter parameters.
 *
 * @param config - Configuration for query parameter management
 * @param config.pageSize - Number of items per page for pagination
 * @param config.prefix - URL parameter prefix for namespace isolation
 * @param config.extendKeys - Additional query parameter keys to include
 * @returns Object containing transformed search parameters and query state information
 */
export const useTableQuery = <T extends string>({
  pageSize: pageSizeParam,
  prefix,
  extendKeys = [],
  extendSearchParams = {},
}: {
  pageSize?: number;
  prefix?: string;
  extendKeys?: T[];
  extendSearchParams?: Record<string, any>;
} = {}) => {
  const allQueryKeys = [...(extendKeys as T[]), ...(queryKeys as QueryKeys[])];
  const raw = useQueryParams<QueryKeys | T>(allQueryKeys, prefix);

  const { page, pageSize, ...rest } = raw;

  const pageSizeValue = Number(pageSize || pageSizeParam || DEFAULT_PAGE_SIZE);

  const searchParams = {
    ...rest,
    ...extendSearchParams,
    page: page ? Number(page) : DEFAULT_PAGE,
    pageSize: isNaN(pageSizeValue) ? DEFAULT_PAGE_SIZE : pageSizeValue,
  };

  const noQuery = Object.values(raw).filter(typedBoolean).length === 0;

  return { searchParams, noQuery };
};

/**
 * Custom hook for clearing query parameters with optional prefix filtering.
 * Provides functionality to reset URL parameters while preserving non-prefixed ones.
 *
 * @param prefix - Optional prefix to filter which parameters to clear
 * @returns Function to clear query parameters
 */
export const useClearQueryParams = (prefix?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const clearQueryParams = () => {
    if (searchParams.toString()) {
      if (prefix) {
        const newParams = new URLSearchParams();
        for (const [key, value] of searchParams.entries()) {
          if (!key.startsWith(prefix)) {
            newParams.append(key, value);
          }
        }
        setSearchParams(newParams);
      } else {
        const newParams = new URLSearchParams();
        setSearchParams(newParams);
      }
    }
  };

  //   清除 page
  const clearPageKey = (searchParams: URLSearchParams) => {
    const pageKey = prefix ? `${prefix}_${PAGE_NAME}` : PAGE_NAME;
    if (searchParams.get(pageKey)) {
      searchParams.delete(pageKey);
    }

    return searchParams;
  };

  return { clearQueryParams, clearPageKey };
};
