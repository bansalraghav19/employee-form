import { useState, useEffect } from "react";

const getStorageValue = (key: string, intialValue: any) => {
  const savedValue = localStorage.getItem(key);

  if (savedValue) return JSON.parse(savedValue);

  if (intialValue instanceof Function) return intialValue();

  return intialValue;
};

const useLocalStorage = (key: string, intialValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, intialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
