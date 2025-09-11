import { useUserInfo } from "@/store";

/** 权限判断 */
export const usePermission = () => {
  const userInfo = useUserInfo();

  // 是否包含其中某个权限
  const hasPermission = (accesses: Entity.RoleType[]) => {
    if (!accesses || !accesses.length) return true;

    const roles = userInfo?.roles || [];
    return accesses.some((r) => roles.includes(r));
  };

  // 包含所有权限
  const hasEveryPermission = (accesses: Entity.RoleType[]) => {
    if (!accesses || !accesses.length) return true;

    const roles = userInfo?.roles || [];
    return accesses.every((r) => roles?.includes(r));
  };

  return {
    hasPermission,
    hasEveryPermission,
  };
};
