import { matchPath } from "react-router";
import type { AppRouteObject } from "@/types";

/**
 * 匹配结果接口
 */
export interface RouteMatchResult {
  /** 匹配的路由对象 */
  matchedRoute: AppRouteObject;
  /** 从根路由到当前路由的完整路径 */
  matchedRoutes: AppRouteObject[];
  /** 路径参数，如 { id: "123" } */
  params: Record<string, string>;
}

/**
 * 使用 React Router 的 matchPath 检查路径是否匹配路由模式
 * @param routePath 路由路径模式
 * @param currentPath 当前路径
 * @returns 匹配结果
 */
function checkPathMatch(
  routePath: string,
  currentPath: string
): { isMatch: boolean; params: Record<string, string> } {
  const match = matchPath(
    {
      path: routePath,
      caseSensitive: false,
      end: true,
    },
    currentPath
  );

  if (!match) {
    return { isMatch: false, params: {} };
  }

  // 转换参数类型，过滤掉 undefined 值
  const params: Record<string, string> = {};
  if (match.params) {
    Object.entries(match.params).forEach(([key, value]) => {
      if (typeof value === "string") {
        params[key] = value;
      }
    });
  }

  return {
    isMatch: true,
    params,
  };
}

/**
 * 在路由树中查找与指定路径匹配的路由
 * @param routes 路由数组
 * @param path 要匹配的路径
 * @returns 匹配结果，如果未找到返回 null
 */
export function findMatchingRoute(
  routes: AppRouteObject[] = [],
  path: string
): RouteMatchResult | null {
  function searchRoute(
    routes: AppRouteObject[],
    path: string,
    matchedRoutes: AppRouteObject[] = []
  ): RouteMatchResult | null {
    for (const route of routes) {
      const currentMatchedRoutes = [...matchedRoutes, route];

      // 检查当前路由是否匹配
      if (route.path) {
        const { isMatch, params } = checkPathMatch(route.path, path);

        if (isMatch) {
          return {
            matchedRoute: route,
            matchedRoutes: currentMatchedRoutes,
            params,
          };
        }
      }

      // 递归查找子路由
      if (route.children && route.children.length > 0) {
        const childResult = searchRoute(route.children, path, currentMatchedRoutes);
        if (childResult) {
          return childResult;
        }
      }
    }

    return null;
  }

  return searchRoute(routes, path);
}

/**
 * 获取匹配路由的面包屑导航
 * @param routes 路由数组
 * @param path 当前路径
 * @returns 面包屑数组
 */
export function getRouteBreadcrumbs(routes: AppRouteObject[] = [], path: string): AppRouteObject[] {
  const result = findMatchingRoute(routes, path);
  return result ? result.matchedRoutes : [];
}

/**
 * 检查路径是否存在于路由中
 * @param routes 路由数组
 * @param path 要检查的路径
 * @returns 是否存在
 */
export function isValidRoute(routes: AppRouteObject[] = [], path: string): boolean {
  return findMatchingRoute(routes, path) !== null;
}

/**
 * 递归查找最底层的第一个可访问路由
 * 如果一个路由有子路由，会继续递归查找直到找到没有子路由的叶子节点
 */
export function findFirstLeafRoute(route: AppRouteObject): AppRouteObject | null {
  if (route.meta?.hidden) {
    return null;
  }

  if (!route.children || route.children.length === 0) {
    return route;
  }

  for (const child of route.children) {
    const leafRoute = findFirstLeafRoute(child);
    if (leafRoute) {
      return leafRoute;
    }
  }

  return null;
}
