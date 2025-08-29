
export type Algorithm = 'bubble' | 'merge' | 'quick' | 'insertion' | 'selection';

export interface ArrayBar {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'active';
}

export interface AlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  color: string;
}

export interface SortingStats {
  comparisons: number;
  swaps: number;
}
