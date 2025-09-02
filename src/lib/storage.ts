import {
  STORAGE_LOCALE,
  STORAGE_LOGIN_ACCOUNT,
  STORAGE_PREFIX,
  STORAGE_USER_INFO
} from "./constants";

interface StorageData<T> {
  value: T;
  expire: number | null;
}
/**
 * LocalStorage部分操作
 */
function createLocalStorage<T extends Storage.Local>() {
  // 默认缓存期限为7天
  function set<K extends keyof T>(key: K, value: T[K], expire: number = 60 * 60 * 24 * 7) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: new Date().getTime() + expire * 1000
    };
    const json = JSON.stringify(storageData);
    window.localStorage.setItem(`${STORAGE_PREFIX}${String(key)}`, json);
  }

  function get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(`${STORAGE_PREFIX}${String(key)}`);
    if (!json) return null;

    const storageData: StorageData<T[K]> | null = JSON.parse(json);

    if (storageData) {
      const { value, expire } = storageData;
      if (expire === null || expire >= Date.now()) return value;
    }
    remove(key);
    return null;
  }

  function remove(key: keyof T) {
    window.localStorage.removeItem(`${STORAGE_PREFIX}${String(key)}`);
  }

  const clear = window.localStorage.clear;

  return {
    set,
    get,
    remove,
    clear
  };
}
/**
 * sessionStorage部分操作
 */

function createSessionStorage<T extends Storage.Session>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = JSON.stringify(value);
    window.sessionStorage.setItem(`${STORAGE_PREFIX}${String(key)}`, json);
  }
  function get<K extends keyof T>(key: K) {
    const json = sessionStorage.getItem(`${STORAGE_PREFIX}${String(key)}`);
    if (!json) return null;

    const storageData: T[K] | null = JSON.parse(json);

    if (storageData) return storageData;

    return null;
  }
  function remove(key: keyof T) {
    window.sessionStorage.removeItem(`${STORAGE_PREFIX}${String(key)}`);
  }
  const clear = window.sessionStorage.clear;

  return {
    set,
    get,
    remove,
    clear
  };
}

export const local = createLocalStorage();
export const session = createSessionStorage();

// 用户信息
export const getUserInfo = () => {
  return local.get(STORAGE_USER_INFO);
};
export const setUserInfo = (userInfo: Storage.Local["userInfo"]) => {
  local.set(STORAGE_USER_INFO, userInfo);
};
export const removeUserInfo = () => {
  local.remove(STORAGE_USER_INFO);
};

// 登录账号
export const getLoginAccount = () => {
  return local.get(STORAGE_LOGIN_ACCOUNT);
};
export const setLoginAccount = (loginAccount: Storage.Local["loginAccount"]) => {
  local.set(STORAGE_LOGIN_ACCOUNT, loginAccount);
};
export const removeLoginAccount = () => {
  local.remove(STORAGE_LOGIN_ACCOUNT);
};

// 当前语言
export const getCurrentLocale = () => {
  return local.get(STORAGE_LOCALE);
};
export const setCurrentLocale = (locale: Locale) => {
  local.set(STORAGE_LOCALE, locale);
};
export const removeCurrentLocale = () => {
  local.remove(STORAGE_LOCALE);
};
