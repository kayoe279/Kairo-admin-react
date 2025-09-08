import { useMemo } from "react";
import { matchPath, useLocation } from "react-router";
import { menuRoutes } from "@/router";
import type { AppRouteObject } from "@/types";
import { PAGE } from "../constants";

export interface RouteItem {
  name: string;
  path: string;
  fullPath: string;
  hash: string;
  params: Record<string, string>;
  query: Record<string, string>;
  meta?: AppRouteObject["meta"];
}

// 当前路由信息接口
export interface RouteInfo {
  homeRoute: AppRouteObject | null;
  currentRoute: RouteItem;
}

export const useRouteInfo = (): RouteInfo => {
  const location = useLocation();

  // 递归查找匹配的路由
  const findMatchingRoute = (routes: AppRouteObject[], pathname: string): AppRouteObject | null => {
    for (const route of routes) {
      if (route.path) {
        // 尝试匹配当前路由
        const match = matchPath(
          { path: route.path, caseSensitive: route.caseSensitive || false },
          pathname
        );

        if (match) {
          return route;
        }
      }

      // 递归查找子路由
      if (route.children) {
        const childMatch = findMatchingRoute(route.children, pathname);
        if (childMatch) {
          return childMatch;
        }
      }
    }

    return null;
  };

  // 解析查询字符串为对象
  const parseQuery = (search: string): Record<string, string> => {
    const query: Record<string, string> = {};
    if (search) {
      const searchParams = new URLSearchParams(search);
      for (const [key, value] of searchParams.entries()) {
        query[key] = value;
      }
    }
    return query;
  };

  // 从路径中提取参数
  const extractParams = (
    route: AppRouteObject | null,
    pathname: string
  ): Record<string, string> => {
    if (!route?.path) return {};

    const match = matchPath(
      { path: route.path, caseSensitive: route.caseSensitive || false },
      pathname
    );

    const params: Record<string, string> = {};
    if (match?.params) {
      Object.entries(match.params).forEach(([key, value]) => {
        if (value !== undefined) {
          params[key] = value;
        }
      });
    }

    return params;
  };

  const { pathname, search, hash } = location;

  // 查找匹配的路由
  const matchedRoute = findMatchingRoute(menuRoutes, pathname);

  // 解析查询参数
  const query = parseQuery(search);

  // 提取路由参数
  const params = extractParams(matchedRoute, pathname);

  // 构建完整路径
  const fullPath = pathname + search + hash;

  const currentRoute = useMemo(
    () => ({
      name: matchedRoute?.path || "",
      path: matchedRoute?.path || "",
      fullPath,
      hash,
      params,
      query,
      meta: matchedRoute?.meta,
    }),
    [matchedRoute, hash, params, query, fullPath]
  );

  return {
    homeRoute: findMatchingRoute(menuRoutes, PAGE.HOME_NAME_REDIRECT),
    currentRoute,
  };
};
