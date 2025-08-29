
import React, { useState, useEffect } from 'react';
import { Algorithm } from '@/types/sorting';
import { useSortingArray } from '@/hooks/useSortingArray';
import { 
  bubbleSort, 
  mergeSort, 
  quickSort, 
  insertionSort, 
  selectionSort,
  SortingContext 
} from '@/utils/sortingAlgorithms';
import SortingHeader from './SortingHeader';
import SortingControls from './SortingControls';
import SortingVisualization from './SortingVisualization';

const SortingVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>('bubble');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [arraySize, setArraySize] = useState([50]);
  const [isSorted, setIsSorted] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const { array, setArray, generateRandomArray, resetArray } = useSortingArray(arraySize[0]);

  useEffect(() => {
    generateRandomArray(arraySize[0]);
  }, [arraySize, generateRandomArray]);

  const startSorting = async () => {
    if (isSorted) {
      console.log('Array is already sorted');
      return;
    }
    
    console.log(`Starting ${algorithm} sort with ${array.length} elements`);
    setIsPlaying(true);
    
    const context: SortingContext = {
      array,
      setArray,
      setComparisons,
      setSwaps,
      speed: speed[0],
      isPlaying: true
    };
    
    try {
      let result;
      switch (algorithm) {
        case 'bubble':
          result = await bubbleSort(context);
          break;
        case 'insertion':
          result = await insertionSort(context);
          break;
        case 'selection':
          result = await selectionSort(context);
          break;
        case 'merge':
          result = await mergeSort(context);
          break;
        case 'quick':
          result = await quickSort(context);
          break;
        default:
          console.log('Unknown algorithm:', algorithm);
          result = await bubbleSort(context);
      }
      
      if (result && isPlaying) {
        setIsSorted(true);
      }
    } catch (error) {
      console.error('Error during sorting:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const pauseSorting = () => {
    console.log('Pausing sort');
    setIsPlaying(false);
  };

  const handleReset = () => {
    console.log('Resetting array');
    setIsPlaying(false);
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
    resetArray();
  };

  const handleShuffle = () => {
    setIsPlaying(false);
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
    generateRandomArray(arraySize[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SortingHeader stats={{ comparisons, swaps }} />

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SortingControls
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              isPlaying={isPlaying}
              isSorted={isSorted}
              speed={speed}
              setSpeed={setSpeed}
              arraySize={arraySize}
              setArraySize={setArraySize}
              onStart={startSorting}
              onPause={pauseSorting}
              onReset={handleReset}
              onShuffle={handleShuffle}
            />
          </div>

          <div className="lg:col-span-3">
            <SortingVisualization
              array={array}
              arraySize={arraySize}
              isSorted={isSorted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
