import { getUserInfo } from "@/lib/storage";
import type { RoleType } from "@/types";

// 是否包含其中某个权限
export const hasPermission = (accesses: RoleType[]) => {
  const userInfo = getUserInfo();

  if (!accesses || !accesses.length) return true;

  const roles = userInfo?.roles || [];
  return accesses.some((r) => roles.includes(r));
};
// 包含所有权限
export const hasEveryPermission = (accesses: RoleType[]) => {
  const userInfo = getUserInfo();

  if (!accesses || !accesses.length) return true;

  const roles = userInfo?.roles || [];
  return accesses.every((r) => roles?.includes(r));
};

/** 权限判断 */
export const usePermission = () => {
  return {
    hasPermission,
    hasEveryPermission,
  };
};
