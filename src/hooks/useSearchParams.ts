import { useCallback } from "react";
import {
  useSearchParams as useSearchParamsRouter,
  type NavigateOptions,
  type SetURLSearchParams,
  type URLSearchParamsInit,
} from "react-router";
import { validValue } from "@/lib";

type QueryParams<T extends string> = {
  [key in T]: string | undefined;
};

/**
 * Custom hook for extracting specific query parameters from URL with optional prefix support.
 * Provides type-safe access to URL search parameters with prefix namespace isolation.
 *
 * @param keys - Array of parameter keys to extract from URL
 * @param prefix - Optional prefix to prepend to parameter names for namespace isolation
 * @returns Object containing extracted query parameters with type-safe keys
 */
export function useQueryParams<T extends string>(keys: T[], prefix?: string): QueryParams<T> {
  const [params] = useSearchParamsRouter();

  const result = {} as QueryParams<T>;

  keys.forEach((key) => {
    const prefixedKey = prefix ? `${prefix}_${key}` : key;
    const value = params.get(prefixedKey) || undefined;
    if (validValue(value)) {
      result[key] = value;
    }
  });

  return result;
}

export const useSearchParams = (
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams] => {
  const [searchParams, setSearchParamsFunction] = useSearchParamsRouter(defaultInit);

  const setSearchParams = useCallback(
    (
      nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit),
      navigateOpts?: NavigateOptions
    ) => {
      setSearchParamsFunction(nextInit, {
        replace: true,
        ...navigateOpts,
      });
    },
    [setSearchParamsFunction]
  );

  return [searchParams, setSearchParams];
};
