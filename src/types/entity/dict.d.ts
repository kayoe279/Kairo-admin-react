/* 字典数据库表字段 */
declare namespace Entity {
  interface Dict {
    id?: number;
    isRoot?: 0 | 1;
    code: string;
    label: string;
    value?: number;
  }
}
