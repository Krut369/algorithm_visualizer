
import { ArrayBar, SortingStats } from '@/types/sorting';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface SortingContext {
  array: ArrayBar[];
  setArray: (array: ArrayBar[]) => void;
  setComparisons: (count: number) => void;
  setSwaps: (count: number) => void;
  speed: number;
  isPlaying: boolean;
}

export const bubbleSort = async (context: SortingContext) => {
  console.log('Starting bubble sort');
  const { array, setArray, setComparisons, setSwaps, speed, isPlaying } = context;
  const arr = [...array];
  const n = arr.length;
  let compCount = 0;
  let swapCount = 0;
  
  for (let i = 0; i < n - 1; i++) {
    if (!isPlaying) {
      console.log('Bubble sort stopped');
      return { arr, compCount, swapCount };
    }
    
    for (let j = 0; j < n - i - 1; j++) {
      if (!isPlaying) {
        console.log('Bubble sort stopped');
        return { arr, compCount, swapCount };
      }
      
      arr[j].state = 'comparing';
      arr[j + 1].state = 'comparing';
      setArray([...arr]);
      setComparisons(++compCount);
      await delay(101 - speed);

      if (arr[j].value > arr[j + 1].value) {
        arr[j].state = 'swapping';
        arr[j + 1].state = 'swapping';
        setArray([...arr]);
        setSwaps(++swapCount);
        await delay(101 - speed);

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        console.log(`Swapped positions ${j} and ${j + 1}`);
      }

      arr[j].state = 'default';
      arr[j + 1].state = 'default';
    }
    arr[n - 1 - i].state = 'sorted';
    setArray([...arr]);
  }
  
  if (arr.length > 0) {
    arr[0].state = 'sorted';
  }
  setArray([...arr]);
  console.log('Bubble sort completed');
  return { arr, compCount, swapCount };
};

export const mergeSort = async (context: SortingContext) => {
  console.log('Starting merge sort');
  const { array, setArray, setComparisons, setSwaps, speed, isPlaying } = context;
  const arr = [...array];
  let compCount = 0;
  let swapCount = 0;
  
  const merge = async (left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (!isPlaying) return;
      
      arr[k].state = 'comparing';
      setArray([...arr]);
      setComparisons(++compCount);
      await delay(101 - speed);

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = { ...leftArr[i], state: 'swapping' };
        i++;
      } else {
        arr[k] = { ...rightArr[j], state: 'swapping' };
        j++;
      }
      
      setArray([...arr]);
      setSwaps(++swapCount);
      await delay(101 - speed);
      
      arr[k].state = 'default';
      k++;
    }
    
    while (i < leftArr.length) {
      if (!isPlaying) return;
      arr[k] = { ...leftArr[i], state: 'default' };
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      if (!isPlaying) return;
      arr[k] = { ...rightArr[j], state: 'default' };
      j++;
      k++;
    }
    
    setArray([...arr]);
  };

  const mergeSortHelper = async (left: number, right: number): Promise<void> => {
    if (left < right && isPlaying) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(left, mid);
      if (!isPlaying) return;
      await mergeSortHelper(mid + 1, right);
      if (!isPlaying) return;
      await merge(left, mid, right);
    }
  };

  await mergeSortHelper(0, arr.length - 1);
  
  if (isPlaying) {
    arr.forEach(bar => bar.state = 'sorted');
    setArray([...arr]);
  }
  console.log('Merge sort completed');
  return { arr, compCount, swapCount };
};

export const quickSort = async (context: SortingContext) => {
  console.log('Starting quick sort');
  const { array, setArray, setComparisons, setSwaps, speed, isPlaying } = context;
  const arr = [...array];
  let compCount = 0;
  let swapCount = 0;

  const partition = async (low: number, high: number): Promise<number> => {
    if (!isPlaying) return -1;
    
    const pivotValue = arr[high].value;
    arr[high].state = 'pivot';
    setArray([...arr]);
    await delay(101 - speed);
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (!isPlaying) return -1;
      
      arr[j].state = 'comparing';
      setArray([...arr]);
      setComparisons(++compCount);
      await delay(101 - speed);

      if (arr[j].value < pivotValue) {
        i++;
        if (i !== j) {
          arr[i].state = 'swapping';
          arr[j].state = 'swapping';
          setArray([...arr]);
          await delay(101 - speed);
          
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setSwaps(++swapCount);
          console.log(`Swapped positions ${i} and ${j}`);
        }
      }
      
      arr[j].state = 'default';
      if (i >= 0 && i !== j) arr[i].state = 'default';
      setArray([...arr]);
    }

    if (i + 1 !== high) {
      arr[i + 1].state = 'swapping';
      arr[high].state = 'swapping';
      setArray([...arr]);
      await delay(101 - speed);
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setSwaps(++swapCount);
      console.log(`Moved pivot to position ${i + 1}`);
    }

    arr[i + 1].state = 'default';
    setArray([...arr]);
    return i + 1;
  };

  const quickSortHelper = async (low: number, high: number): Promise<void> => {
    if (low < high && isPlaying) {
      const pi = await partition(low, high);
      if (pi === -1 || !isPlaying) return;
      
      await quickSortHelper(low, pi - 1);
      if (!isPlaying) return;
      await quickSortHelper(pi + 1, high);
    }
  };

  await quickSortHelper(0, arr.length - 1);
  
  if (isPlaying) {
    arr.forEach(bar => bar.state = 'sorted');
    setArray([...arr]);
  }
  console.log('Quick sort completed');
  return { arr, compCount, swapCount };
};

export const insertionSort = async (context: SortingContext) => {
  console.log('Starting insertion sort');
  const { array, setArray, setComparisons, setSwaps, speed, isPlaying } = context;
  const arr = [...array];
  let compCount = 0;
  let swapCount = 0;

  for (let i = 1; i < arr.length; i++) {
    if (!isPlaying) {
      console.log('Insertion sort stopped');
      return { arr, compCount, swapCount };
    }
    
    const key = { ...arr[i] };
    let j = i - 1;

    arr[i].state = 'active';
    setArray([...arr]);
    await delay(101 - speed);

    while (j >= 0 && isPlaying) {
      arr[j].state = 'comparing';
      setArray([...arr]);
      setComparisons(++compCount);
      await delay(101 - speed);

      if (arr[j].value <= key.value) {
        arr[j].state = 'default';
        break;
      }

      arr[j + 1] = { ...arr[j], state: 'swapping' };
      setArray([...arr]);
      setSwaps(++swapCount);
      await delay(101 - speed);
      
      arr[j].state = 'default';
      j--;
    }

    arr[j + 1] = { ...key, state: 'default' };
    setArray([...arr]);
    console.log(`Inserted element at position ${j + 1}`);
  }

  if (isPlaying) {
    arr.forEach(bar => bar.state = 'sorted');
    setArray([...arr]);
  }
  console.log('Insertion sort completed');
  return { arr, compCount, swapCount };
};

export const selectionSort = async (context: SortingContext) => {
  console.log('Starting selection sort');
  const { array, setArray, setComparisons, setSwaps, speed, isPlaying } = context;
  const arr = [...array];
  let compCount = 0;
  let swapCount = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    if (!isPlaying) {
      console.log('Selection sort stopped');
      return { arr, compCount, swapCount };
    }
    
    let minIdx = i;
    arr[i].state = 'active';
    setArray([...arr]);
    await delay(101 - speed);

    for (let j = i + 1; j < arr.length; j++) {
      if (!isPlaying) return { arr, compCount, swapCount };
      
      arr[j].state = 'comparing';
      setArray([...arr]);
      setComparisons(++compCount);
      await delay(101 - speed);

      if (arr[j].value < arr[minIdx].value) {
        if (minIdx !== i) arr[minIdx].state = 'default';
        minIdx = j;
        arr[minIdx].state = 'active';
      } else {
        arr[j].state = 'default';
      }
      setArray([...arr]);
    }

    if (minIdx !== i) {
      arr[i].state = 'swapping';
      arr[minIdx].state = 'swapping';
      setArray([...arr]);
      await delay(101 - speed);
      
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setSwaps(++swapCount);
      console.log(`Swapped positions ${i} and ${minIdx}`);
    }

    arr[i].state = 'sorted';
    setArray([...arr]);
  }

  if (isPlaying && arr.length > 0) {
    arr[arr.length - 1].state = 'sorted';
    setArray([...arr]);
  }
  console.log('Selection sort completed');
  return { arr, compCount, swapCount };
};
