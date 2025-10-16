import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { PAGE } from "@/lib";
import type { RoleType } from "@/service";
import { useIsAuthenticated, useUserInfo } from "@/store/user";
import { usePermission } from "./usePermission";

type RouteGuardBeforeEnterResult =
  | { path?: string; success?: boolean }
  | undefined
  | null
  | undefined;

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
  canRender: boolean;
  /** 验证失败的原因 */
  failReason?: string;
  /** 重定向路径 */
  redirectPath?: string;
}

/**
 * 路由守卫 Hook
 * 提供 beforeEnter/afterEnter 功能
 */
export function useRouteGuard(guardOptions: RouteGuardOptions = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const isAuthenticated = useIsAuthenticated();
  const { hasPermission } = usePermission();

  const { requireAuth, roles = [], beforeEnter, afterEnter, onAuthFailed } = guardOptions;

  const result = useMemo(() => {
    const pathname = location.pathname;
    // beforeEnter 钩子
    if (beforeEnter) {
      const result = beforeEnter(pathname, location.state?.from || "");
      if (result?.path && result.path !== pathname) {
        return { canRender: false, redirectPath: result.path };
      }
      if (result?.success === false) {
        return { canRender: false, redirectPath: PAGE.LOGIN_PATH };
      }
    }

    // 已登录但访问登录页
    if (isAuthenticated && pathname === PAGE.LOGIN_PATH) {
      return { canRender: false, redirectPath: PAGE.HOME_NAME_REDIRECT_PATH };
    }

    // 未登录但需要登录
    if (requireAuth && !isAuthenticated) {
      onAuthFailed?.(pathname, t("auth.loginTip"));
      return { canRender: false, redirectPath: PAGE.LOGIN_PATH, failReason: "auth" };
    }

    // 已登录但缺少角色权限
    if (
      requireAuth &&
      isAuthenticated &&
      roles.length > 0 &&
      userInfo?.user_metadata?.roles?.length
    ) {
      const hasRequiredRole = hasPermission(roles);
      if (!hasRequiredRole) {
        onAuthFailed?.(pathname, t("auth.permissionTip"));
        return { canRender: false, redirectPath: PAGE.FORBIDDEN_PATH, failReason: "role" };
      }
    }

    afterEnter?.(pathname, location.state?.from || "");

    return { canRender: true };
  }, [
    t,
    isAuthenticated,
    roles,
    location.state?.from,
    location.pathname,
    requireAuth,
    userInfo,
    hasPermission,
    beforeEnter,
    afterEnter,
    onAuthFailed
  ]);

  // effect: 处理副作用（跳转、afterEnter 等）
  useEffect(() => {
    if (!result.canRender && result.redirectPath) {
      navigate(result.redirectPath, { replace: true });
    } else {
      guardOptions.afterEnter?.(location.pathname, location.state?.from || "");
    }
  }, [result, navigate, guardOptions, location]);

  return result.canRender;
}
