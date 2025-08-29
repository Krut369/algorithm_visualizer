
import React from 'react';
import { SortingStats } from '@/types/sorting';

interface SortingHeaderProps {
  stats: SortingStats;
}

const SortingHeader: React.FC<SortingHeaderProps> = ({ stats }) => {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text">
              Sorting Visualizer
            </h1>
            <p className="text-slate-400 mt-2">Watch algorithms come to life</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50">
              <span className="text-slate-400">Comparisons: </span>
              <span className="text-blue-400 font-mono">{stats.comparisons}</span>
            </div>
            <div className="bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50">
              <span className="text-slate-400">Swaps: </span>
              <span className="text-green-400 font-mono">{stats.swaps}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SortingHeader;
