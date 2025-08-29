
import { AlgorithmInfo } from '@/types/sorting';

export const algorithmInfo: Record<string, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    color: 'from-red-500 to-orange-500'
  },
  merge: {
    name: 'Merge Sort',
    description: 'Divides the array into halves, sorts them, and then merges them back together.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    color: 'from-blue-500 to-cyan-500'
  },
  quick: {
    name: 'Quick Sort',
    description: 'Picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    color: 'from-purple-500 to-pink-500'
  },
  insertion: {
    name: 'Insertion Sort',
    description: 'Builds the final sorted array one item at a time by inserting each element into its correct position.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    color: 'from-green-500 to-emerald-500'
  },
  selection: {
    name: 'Selection Sort',
    description: 'Finds the minimum element and moves it to the beginning, then repeats for the remaining array.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    color: 'from-yellow-500 to-amber-500'
  }
};
