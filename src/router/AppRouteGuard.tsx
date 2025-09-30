import { useMemo, type ReactNode } from "react";
import type { ResourceKey } from "i18next";
import NProgress from "nprogress";
import { useTranslation } from "react-i18next";
import {
  useRequireAuth,
  useRequireRoles,
  useRouteGuard,
  useRouteMetaMeta,
  type RouteGuardOptions,
} from "@/hooks";

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
  const canRender = useRouteGuard(guardOptions);

  if (!canRender) {
    return null;
  }

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
        console.log(`🔍路由守卫: 从 ${from} 导航到 ${to}`);
        NProgress.start();
        // 可以在这里添加自定义的权限验证逻辑
      },
      afterEnter: (to, _from) => {
        console.log(`✅路由守卫: 成功进入 ${to}`);
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
