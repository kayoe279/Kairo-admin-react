/**
 * LocalStorage部分操作
 */
function createLocalStorage<T = any>() {
  // 默认缓存期限为7天
  function set<K extends keyof T>(key: K, value: T[K], _: number = 60 * 60 * 24 * 7) {
    const json = JSON.stringify(value);
    window.localStorage.setItem(`${String(key)}`, json);
  }

  function get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(`${String(key)}`);
    if (!json) return null;

    try {
      const storageData: T[K] | null = JSON.parse(json);
      if (storageData) {
        return storageData;
      }
    } catch {
      return null;
    }
  }

  function remove(key: keyof T) {
    window.localStorage.removeItem(`${String(key)}`);
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

function createSessionStorage<T = any>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = JSON.stringify(value);
    window.sessionStorage.setItem(`${String(key)}`, json);
  }
  function get<K extends keyof T>(key: K) {
    const json = sessionStorage.getItem(`${String(key)}`);
    if (!json) return null;

    const storageData: T[K] | null = JSON.parse(json);

    if (storageData) return storageData;

    return null;
  }
  function remove(key: keyof T) {
    window.sessionStorage.removeItem(`${String(key)}`);
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
