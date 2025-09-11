import { useCallback, useMemo } from "react";
import { matchPath, useLocation } from "react-router";
import { rootRoutes } from "@/router";
import type { AppRouteObject } from "@/types";

/**
 * 根据当前路径匹配路由配置的 Hook
 * 支持 React Router 的所有路由类型
 */
export function useRouteMatch(): AppRouteObject | null {
  const location = useLocation();

  const findMatchingRoute = useCallback(
    (routes: AppRouteObject[], pathname: string): AppRouteObject | null => {
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
    },
    []
  );

  const matchedRoute = useMemo(
    () => findMatchingRoute(rootRoutes, location.pathname),
    [location.pathname, findMatchingRoute]
  );

  return matchedRoute;
}

/**
 * 获取当前路由的 meta 信息
 */
export function useCurrentRouteMeta(): Record<string, any> {
  const currentRoute = useRouteMatch();
  return currentRoute?.meta || {};
}

/**
 * 检查当前路由是否需要权限验证
 */
export function useRequiresAuth(): boolean {
  const meta = useCurrentRouteMeta();

  // 如果设置了 ignoreAuth，不需要验证
  if (meta.ignoreAuth) {
    return false;
  }

  // 如果明确设置了 requireAuth: false，不需要验证
  if (meta.requireAuth === false) {
    return false;
  }

  // 默认需要验证
  return true;
}

/**
 * 获取当前路由需要的角色
 */
export function useRequiredRoles(): string[] {
  const meta = useCurrentRouteMeta();
  return meta.roles || [];
}
