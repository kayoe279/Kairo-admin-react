import { useMemo } from "react";
import { useLocation } from "react-router";
import { isRootMenu } from "@/lib/menu";
import { findMatchingRoute } from "@/router/helper";
import { useAuthRouteState } from "@/store";

/**
 * 根据当前路径匹配路由配置的 Hook
 * 支持 React Router 的所有路由类型
 */
export const useRouteMatch = () => {
  const location = useLocation();
  const { authRoutes } = useAuthRouteState();

  const result = useMemo(
    () => findMatchingRoute(authRoutes, location.pathname),
    [authRoutes, location.pathname]
  );

  const isRoot = useMemo(
    () => !result?.matchedRoutes[0]?.children?.length || isRootMenu(result?.matchedRoutes[0]),
    [result]
  );

  return {
    isRoot,
    matchedRoute: result?.matchedRoute || {},
    matchedRoutes: result?.matchedRoutes || [],
    params: result?.params || {},
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
