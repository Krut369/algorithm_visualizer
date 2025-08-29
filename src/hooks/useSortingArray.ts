
import { useState, useCallback } from 'react';
import { ArrayBar } from '@/types/sorting';

export const useSortingArray = (initialSize: number) => {
  const [array, setArray] = useState<ArrayBar[]>([]);

  const generateRandomArray = useCallback((size: number) => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 300) + 10,
        state: 'default'
      });
    }
    setArray(newArray);
  }, []);

  const resetArray = () => {
    const resetArr = array.map(bar => ({ ...bar, state: 'default' as const }));
    setArray(resetArr);
  };

  return {
    array,
    setArray,
    generateRandomArray,
    resetArray
  };
};
