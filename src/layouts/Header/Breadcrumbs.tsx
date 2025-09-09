import { useMemo } from "react";
import { Breadcrumb } from "antd";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { matchRoutes, useLocation, type RouteObject } from "react-router";
import { SvgIcon } from "@/components/ui";
import { cn, transformToMenus } from "@/lib";
import { menuRoutes } from "@/router";
import { useAppSettings } from "@/store";
import type { AppRouteObject } from "@/types";

export const Breadcrumbs = ({ className }: { className?: string }) => {
  const location = useLocation();
  const { breadcrumbsSetting } = useAppSettings();

  const breadcrumbList = useMemo(() => {
    const res = matchRoutes((menuRoutes || []) as RouteObject[], location.pathname) || [];
    const result = res.map((item) => {
      const route = item.route as AppRouteObject;
      const title = route.meta?.title || route.path || "";
      const icon = route.meta?.icon || "";
      const hasChildren = route.children && route.children.length > 0;
      if (hasChildren) {
        return {
          title: (
            <>
              {!!icon && breadcrumbsSetting.showIcon && (
                <SvgIcon icon={icon as string} className="mr-2 -translate-y-0.5 text-lg" />
              )}
              <span>{title}</span>
            </>
          ),
          menu: { items: transformToMenus(route.children || []) || [] },
        };
      }
      return { title };
    }) as BreadcrumbItemType[];
    return result;
  }, [location.pathname, breadcrumbsSetting.showIcon]);

  return (
    <Breadcrumb
      className={cn("cursor-default text-sm [&_.anticon-down]:!hidden", className)}
      items={breadcrumbList}
    />
  );
};
