import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export type FalseType = "" | 0 | false | null | undefined;
export const typedBoolean = <Value>(value: Value): value is Exclude<Value, FalseType> => {
  return Boolean(value);
};

export const validValue = (value: undefined | null | string | boolean) => {
  return value !== undefined && value !== null && value !== "" && value !== false;
};

/**
 * 判断是否 url
 * */
export function isUrl(url: string) {
  return /^(http|https):\/\//g.test(url);
}

/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
const addLight = (color: string, amount: number) => {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
};
/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export const lighten = (color: string, amount: number) => {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`;
};

// 辅助函数：通过路径字符串设置对象的值
export const setValueByPath = (obj: Record<string, unknown>, path: string, value: unknown) => {
  const keys = path.split(".");
  let current = obj;

  // 遍历到倒数第二个键
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] && typeof current[key] === "object") {
      current = current[key] as Record<string, unknown>;
    } else {
      return; // 路径不存在，直接返回
    }
  }

  // 设置最后一个键的值
  const lastKey = keys[keys.length - 1];
  if (current && typeof current === "object") {
    current[lastKey] = value;
  }
};

/**
 * 将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export const toURLSearchParams = <T extends Record<string, any>>(record: T) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(record)) {
    params.append(key, value as string);
  }
  return params;
};
