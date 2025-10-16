import { useSearchParams } from "react-router";
import {
  PAGE_NAME,
  PAGE_SIZE_NAME,
  SORT_BY_NAME,
  SORT_ORDER_NAME,
  typedBoolean,
  validValue
} from "@/lib";

type QueryParams<T extends string> = {
  [key in T]: string | undefined;
};

export const queryKeys = [PAGE_NAME, PAGE_SIZE_NAME, SORT_BY_NAME, SORT_ORDER_NAME];
type QueryKeys =
  | typeof PAGE_NAME
  | typeof PAGE_SIZE_NAME
  | typeof SORT_BY_NAME
  | typeof SORT_ORDER_NAME;

const excludeResetKeys = [PAGE_SIZE_NAME, SORT_BY_NAME, SORT_ORDER_NAME] as const;

export const useSearchQuery = <T extends string>({
  prefix,
  extendKeys = []
}: {
  prefix?: string;
  extendKeys?: T[];
} = {}) => {
  const [_, setSearchParams] = useSearchParams();
  const allQueryKeys = [...(extendKeys as T[]), ...(queryKeys as QueryKeys[])];
  const searchQuery = useQueryParams<QueryKeys | T>(allQueryKeys, prefix);

  const noQuery = Object.values(searchQuery).filter(typedBoolean).length === 0;

  // 获取带前缀的 key
  const getPrefixedKey = (key: string) => (prefix ? `${prefix}_${key}` : key);

  // 设置搜索参数, 排除 excludeKeys 外的所有参数
  const setSearchQuery = (query: Record<string, any>, excludeKeys = [PAGE_NAME]) => {
    const filteredQuery = Object.entries(query || {});

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      // 处理查询参数的设置和删除
      for (const [key, value] of filteredQuery) {
        const prefixedKey = getPrefixedKey(key);
        if (newParams.get(prefixedKey) && !value) {
          newParams.delete(prefixedKey);
        } else if (value) {
          newParams.set(prefixedKey, value);
        }
      }

      // 处理需要排除的 keys
      if (excludeKeys?.length) {
        for (const key of excludeKeys) {
          const prefixedKey = getPrefixedKey(key);
          if (newParams.has(prefixedKey)) {
            newParams.delete(prefixedKey);
          }
        }
      }

      return newParams;
    });
  };

  // 重置除 excludeResetKeys 外的所有参数
  const resetSearchQuery = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams();

      for (const key of excludeResetKeys) {
        const prefixedKey = getPrefixedKey(key);
        if (prev.has(prefixedKey)) {
          newParams.set(prefixedKey, prev.get(prefixedKey) || "");
        }
      }

      return newParams;
    });
  };

  return { searchQuery, noQuery, setSearchQuery, resetSearchQuery };
};

// 通过特定的 key 在 url 上获取值，支持前缀
export function useQueryParams<T extends string>(keys: T[], prefix?: string): QueryParams<T> {
  const [params] = useSearchParams();

  const result = {} as QueryParams<T>;

  keys.forEach((key) => {
    const prefixedKey = prefix ? `${prefix}_${key}` : key;
    const value = params.get(prefixedKey) || undefined;
    if (validValue(value)) {
      result[key] = value as string;
    }
  });

  return result;
}

// 用来清除指定prefix 的 searchQuery
export const useClearSearchQuery = (prefix?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const clearSearchQuery = () => {
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

  // 清除 page key 重置为 1
  const clearPageKey = (searchParams: URLSearchParams) => {
    const pageKey = prefix ? `${prefix}_${PAGE_NAME}` : PAGE_NAME;
    if (searchParams.get(pageKey)) {
      searchParams.delete(pageKey);
    }

    return searchParams;
  };

  return { clearSearchQuery, clearPageKey };
};
