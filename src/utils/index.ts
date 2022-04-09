import { useState, useEffect } from "react";

export const isFalsy = (v: unknown) => (v === 0 ? false : !v);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    if (isFalsy(result[key])) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
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
