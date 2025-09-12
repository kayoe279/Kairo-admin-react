import React, { useEffect, useMemo, type ReactNode } from "react";
import NProgress from "nprogress";
import { useLocation } from "react-router";
import { useRequireAuth, useRequireRoles } from "@/lib/hooks";
import { useRouteGuard, type RouteGuardOptions } from "@/lib/hooks/useRouteGuard";

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
  const { executeGuard } = useRouteGuard(guardOptions);

  useEffect(() => {
    if (location.pathname) {
      executeGuard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // 如果不需要权限验证，直接渲染子组件
  if (!guardOptions.requireAuth) {
    return <>{children}</>;
  }

  // 权限验证通过，渲染子组件
  return <>{children}</>;
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

// 权限路由组件
export const AppRouteGuard = ({ children }: { children: ReactNode }) => {
  const requireAuth = useRequireAuth();
  const requireRoles = useRequireRoles();

  const guardOptions: RouteGuardOptions = useMemo(
    () => ({
      requireAuth: requireAuth,
      roles: requireRoles,
      beforeEnter: async (to, from) => {
        console.log(`路由守卫: 从 ${from} 导航到 ${to}`);
        NProgress.start();
        // 可以在这里添加自定义的权限验证逻辑
        // 例如：检查用户是否有访问特定页面的权限
      },
      afterEnter: (to, _from) => {
        console.log(`路由守卫: 成功进入 ${to}`);
        NProgress.done();

        // 可以在这里添加页面进入后的逻辑
        // 例如：埋点统计、页面标题设置等
      },
      onAuthFailed: (_to, reason) => {
        console.warn(`路由守卫: 权限验证失败 - ${reason}`);
        NProgress.done();
      },
    }),
    [requireAuth, requireRoles]
  );

  return <RouteGuard guardOptions={guardOptions}>{children}</RouteGuard>;
};
