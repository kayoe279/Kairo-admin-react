import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { useIsAuthenticated, useUserInfo } from "@/store/user";

type RouteGuardBeforeEnterResult = { path?: string; success: boolean } | void | null | undefined;

export interface RouteGuardOptions {
  /** 是否需要登录 */
  requireAuth?: boolean;
  /** 需要的角色权限 */
  roles?: string[];
  /** 路由进入前的回调 */
  beforeEnter?: (
    to: string,
    from: string
  ) => RouteGuardBeforeEnterResult | Promise<RouteGuardBeforeEnterResult>;
  /** 路由进入后的回调 */
  afterEnter?: (to: string, from: string) => void;
  /** 权限验证失败时的回调 */
  onAuthFailed?: (to: string, reason: string) => void;
}

export interface RouteGuardResult {
  /** 是否通过验证 */
  passed: boolean;
  /** 验证失败的原因 */
  reason?: string;
  /** 重定向路径 */
  redirectTo?: string;
}

const loginPath = "/auth/login";
const forbiddenPath = "/403";

/**
 * 路由守卫 Hook
 * 提供 beforeEnter/afterEnter 功能
 */
export function useRouteGuard(options: RouteGuardOptions = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const isAuthenticated = useIsAuthenticated();
  const [isChecking, setIsChecking] = useState(false);

  const { requireAuth, roles = [], beforeEnter } = options;

  //检查用户权限
  const checkPermission = useCallback(async (): Promise<RouteGuardResult> => {
    const currentPath = location.pathname;

    // 1. 检查是否需要登录
    if (requireAuth && !isAuthenticated) {
      return {
        passed: false,
        reason: t("auth.loginTip"),
        redirectTo: loginPath,
      };
    }

    // 2. 检查角色权限 TODO: 这里需要根据角色权限来判断
    if (requireAuth && isAuthenticated && roles.length > 0 && userInfo?.roles) {
      const userRoles = userInfo.roles.map((role) => role.toString());
      const hasRequiredRole = roles.some((role) => userRoles.includes(role));
      if (!hasRequiredRole) {
        return {
          passed: false,
          reason: t("auth.permissionTip"),
          redirectTo: forbiddenPath,
        };
      }
    }

    // 3. 执行自定义 beforeEnter 钩子
    if (beforeEnter) {
      try {
        const result = await beforeEnter(currentPath, location.state?.from || "");
        if (result && (result.path || !result.success)) {
          return {
            passed: false,
            reason: t("auth.permissionTip"),
            redirectTo: result.path || loginPath,
          };
        }
      } catch (error) {
        console.error("Route guard beforeEnter error:", error);
        return {
          passed: false,
          reason: t("http.defaultTip"),
          redirectTo: forbiddenPath,
        };
      }
    }

    return { passed: true };
  }, [
    beforeEnter,
    requireAuth,
    isAuthenticated,
    roles,
    location.pathname,
    userInfo,
    t,
    location.state?.from,
  ]);

  //执行路由守卫检查
  const executeGuard = useCallback(async () => {
    if (isChecking) return false;

    setIsChecking(true);

    try {
      const result = await checkPermission();

      if (!result.passed) {
        // 权限验证失败
        options.onAuthFailed?.(location.pathname, result.reason || t("http.defaultTip"));

        if (result.redirectTo) {
          navigate(result.redirectTo, { replace: true });
        }
        return false;
      }

      // 权限验证通过，执行 afterEnter
      options.afterEnter?.(location.pathname, location.state?.from || "");
      return true;
    } finally {
      setIsChecking(false);
    }
  }, [checkPermission, navigate, t, location.pathname, location.state?.from, isChecking, options]);

  return {
    isChecking,
    executeGuard,
  };
}

/**
 * 权限验证工具函数
 */
export const routeGuardUtils = {
  /**
   * 检查用户是否有指定角色
   */
  hasRole: (userRoles: string[], requiredRoles: string[]): boolean => {
    return requiredRoles.some((role) => userRoles.includes(role));
  },

  /**
   * 检查用户是否有指定权限
   */
  hasPermission: (userPermissions: string[], requiredPermissions: string[]): boolean => {
    return requiredPermissions.every((permission) => userPermissions.includes(permission));
  },

  /**
   * 获取路由元信息
   */
  getRouteMeta: (pathname: string): any => {
    // 这里可以根据实际路由配置来查找 meta 信息
    // 简化实现，实际项目中可能需要更复杂的路由匹配逻辑
    console.log("Getting route meta for:", pathname);
    return null;
  },
};
