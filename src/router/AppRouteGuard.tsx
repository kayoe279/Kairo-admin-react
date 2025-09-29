import { useMemo, type ReactNode } from "react";
import type { ResourceKey } from "i18next";
import NProgress from "nprogress";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { usePermission, useRequireAuth, useRequireRoles, useRouteMetaMeta } from "@/hooks";
import { type RouteGuardOptions } from "@/hooks/useRouteGuard";
import { PAGE } from "@/lib";
import { useIsAuthenticated, useUserInfo } from "@/store";

const title = import.meta.env.VITE_GLOB_APP_TITLE;

interface RouteGuardProps {
  children: ReactNode;
  /** 路由守卫配置 */
  guardOptions?: RouteGuardOptions;
  /** 权限不足时的组件 */
  fallbackComponent?: ReactNode;
}

/**
 * 路由守卫组件
 * 包装需要权限控制的路由组件
 */
export const RouteGuard = ({ children, guardOptions = {} }: RouteGuardProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const isAuthenticated = useIsAuthenticated();
  const { hasPermission } = usePermission();
  const navigate = useNavigate();

  const { requireAuth, roles = [], beforeEnter } = guardOptions;

  // 1. 执行自定义 beforeEnter 钩子
  if (beforeEnter) {
    const result = beforeEnter(location.pathname, location.state?.from || "");
    if (result && (result.path || !result.success)) {
      navigate(result.path || PAGE.LOGIN_PATH, { replace: true });
    }
  }

  // 已经登录，且访问登录页面，则重定向到首页
  if (isAuthenticated && location.pathname === PAGE.LOGIN_PATH) {
    navigate(PAGE.HOME_NAME_REDIRECT_PATH, { replace: true });
  }

  // 2. 检查是否需要登录
  if (requireAuth && !isAuthenticated) {
    guardOptions.onAuthFailed?.(location.pathname, t("auth.loginTip"));
    navigate(PAGE.LOGIN_PATH, { replace: true });
  }

  // 3. 检查角色权限
  if (
    requireAuth &&
    isAuthenticated &&
    roles.length > 0 &&
    userInfo?.user_metadata?.roles?.length
  ) {
    const hasRequiredRole = hasPermission(roles);
    if (!hasRequiredRole) {
      guardOptions.onAuthFailed?.(location.pathname, t("auth.permissionTip"));
      navigate(PAGE.FORBIDDEN_PATH, { replace: true });
    }
  }

  // 4. 执行自定义 afterEnter 钩子
  guardOptions.afterEnter?.(location.pathname, location.state?.from || "");

  return <>{children}</>;
};

// 权限路由组件
export const AppRouteGuard = ({ children }: { children: ReactNode }) => {
  const requireAuth = useRequireAuth();
  const requireRoles = useRequireRoles();
  const meta = useRouteMetaMeta();
  const { t } = useTranslation();

  const guardOptions: RouteGuardOptions = useMemo(
    () => ({
      requireAuth: requireAuth,
      roles: requireRoles,
      beforeEnter: (to, from) => {
        console.log(`路由守卫: 从 ${from} 导航到 ${to}`);
        NProgress.start();
        // 可以在这里添加自定义的权限验证逻辑
      },
      afterEnter: (to, _from) => {
        console.log(`路由守卫: 成功进入 ${to}`);
        if (meta.name) {
          document.title = `${t(`route.${meta.name}` as ResourceKey)} - ${title}`;
        }
        NProgress.done();

        // 可以在这里添加页面进入后的逻辑
      },
      onAuthFailed: (_to, reason) => {
        console.warn(`路由守卫: 权限验证失败 - ${reason}`);
        NProgress.done();
      },
    }),
    [requireAuth, requireRoles, meta, t]
  );

  return <RouteGuard guardOptions={guardOptions}>{children}</RouteGuard>;
};

/**
 * 高阶组件：为组件添加路由守卫
 */
export function withRouteGuard<P extends object>(
  Component: React.ComponentType<P>,
  guardOptions?: RouteGuardOptions
) {
  return function GuardedComponent(props: P) {
    return (
      <RouteGuard guardOptions={guardOptions}>
        <Component {...props} />
      </RouteGuard>
    );
  };
}
