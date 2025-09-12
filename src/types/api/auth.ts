export type RoleType = "super" | "admin" | "user";

export type UserInfo = {
  /** 用户id */
  id: number;
  /** 用户角色类型 */
  roles: RoleType[];
  /** 访问token */
  accessToken: string;
  /** 刷新token */
  refreshToken: string;
  /** 用户名 */
  username?: string;
  /* 用户头像 */
  avatar?: string;
  /* 用户性别 */
  gender?: 0 | 1;
  /* 用户邮箱 */
  email?: string;
  /* 用户昵称 */
  nickname?: string;
  /* 用户电话 */
  tel?: string;
  /** 用户状态 */
  status?: 0 | 1;
  /** 备注 */
  remark?: string;
};
