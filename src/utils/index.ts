import { useState, useEffect } from "react";

export const isFalsy = (v: unknown) => (v === 0 ? false : !v);

export const isVoid = (v: unknown) => v === null || v === undefined || v === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
    // TODO 依赖项里加上cb会造成无限循环，这个和useCallback以及useMemo有关系
    cb();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return debounceValue;
};
