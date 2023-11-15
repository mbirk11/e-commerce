/** @format */

import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [data, setData] = useState(generateInitialValueForState);

  function generateInitialValueForState() {
    const itemValue = localStorage.getItem(key);
    if (itemValue) return JSON.parse(itemValue);
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  }

  function updateStorage(newValue) {
    setData(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [data, updateStorage];
};

export default useLocalStorage;
