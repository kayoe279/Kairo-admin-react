export * from "./api";
export * from "./route";

// 路径字符串类型定义
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key] & object>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type PathValue<T extends object, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? T[Key] extends object
      ? Rest extends NestedKeyOf<T[Key] & object>
        ? PathValue<T[Key] & object, Rest>
        : never
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;
