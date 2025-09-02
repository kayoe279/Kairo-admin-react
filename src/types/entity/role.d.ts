/* 角色数据库表字段 */
declare namespace Entity {
  type RoleType = "super" | "admin" | "user";

  interface Role {
    /** 用户id */
    id?: number;
    /** 用户名 */
    role?: RoleType;
  }
}
