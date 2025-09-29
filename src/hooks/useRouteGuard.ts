import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import type { RoleType } from "@/service";
import { useIsAuthenticated, useUserInfo } from "@/store/user";
import { usePermission } from "./usePermission";

type RouteGuardBeforeEnterResult = { path?: string; success: boolean } | void | null | undefined;

export interface RouteGuardOptions {
  /** 是否需要登录 */
  requireAuth?: boolean;
  /** 需要的角色权限 */
  roles?: RoleType[];
  /** 路由进入前的回调 */
  beforeEnter?: (to: string, from: string) => RouteGuardBeforeEnterResult;
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
  const { hasPermission } = usePermission();

  const { requireAuth, roles = [], beforeEnter } = options;

  //检查用户权限
  const checkPermission = useCallback((): RouteGuardResult => {
    const currentPath = location.pathname;

    // 1. 检查是否需要登录
    if (requireAuth && !isAuthenticated) {
      return {
        passed: false,
        reason: t("auth.loginTip"),
        redirectTo: loginPath,
      };
    }

    // 2. 检查角色权限
    if (
      requireAuth &&
      isAuthenticated &&
      roles.length > 0 &&
      userInfo?.user_metadata?.roles?.length
    ) {
      const hasRequiredRole = hasPermission(roles);
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
        const result = beforeEnter(currentPath, location.state?.from || "");
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
    hasPermission,
    requireAuth,
    isAuthenticated,
    roles,
    location.pathname,
    userInfo,
    t,
    location.state?.from,
  ]);

  //执行路由守卫检查
  const executeGuard = useCallback(() => {
    if (isChecking) return false;

    setIsChecking(true);

    try {
      const result = checkPermission();

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
