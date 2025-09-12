import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { isRootMenu } from "@/lib/menu";
import { useAuthRouteState } from "@/store";
import type { AppRouteObject } from "@/types";

/**
 * 根据当前路径匹配路由配置的 Hook
 * 支持 React Router 的所有路由类型
 */
export const useRouteMatch = () => {
  const location = useLocation();
  const { authRoutes } = useAuthRouteState();

  const [matchedRoute, setMatchedRoute] = useState<AppRouteObject | null>(null);
  const [matchedRoutes, setMatchedRoutes] = useState<AppRouteObject[]>([]);

  const findMatchingRoute = useCallback(
    (routes: AppRouteObject[] = [], matchedRoutes: AppRouteObject[] = []) => {
      for (const route of routes) {
        const newMatchedRoutes = [...matchedRoutes, route];

        if (route?.path === location.pathname) {
          setMatchedRoute(route);
          setMatchedRoutes(newMatchedRoutes);
          return true;
        }

        // 递归查找子菜单
        if (route?.children && route?.children?.length > 0) {
          if (findMatchingRoute(route?.children, newMatchedRoutes)) {
            return true;
          }
        }
      }
      return false;
    },
    [location.pathname]
  );

  useEffect(() => {
    findMatchingRoute(authRoutes, []);
  }, [findMatchingRoute, authRoutes]);

  const isRoot = useMemo(
    () => !matchedRoutes[0]?.children?.length || isRootMenu(matchedRoutes[0]),
    [matchedRoutes]
  );

  return {
    isRoot,
    matchedRoute,
    matchedRoutes,
  };
};

/**
 * 获取当前路由的 meta 信息
 */
export function useRouteMetaMeta(): Record<string, any> {
  const { matchedRoute } = useRouteMatch();
  return matchedRoute?.meta || {};
}

/**
 * 检查当前路由是否需要权限验证
 */
export function useRequireAuth(): boolean {
  const meta = useRouteMetaMeta();

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
export function useRequireRoles(): Entity.RoleType[] {
  const meta = useRouteMetaMeta();
  return meta.roles || [];
}
