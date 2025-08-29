
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrayBar } from '@/types/sorting';

interface SortingVisualizationProps {
  array: ArrayBar[];
  arraySize: number[];
  isSorted: boolean;
}

const SortingVisualization: React.FC<SortingVisualizationProps> = ({
  array,
  arraySize,
  isSorted
}) => {
  return (
    <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl h-full shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-end justify-center space-x-1 h-96 overflow-hidden bg-slate-900/20 rounded-lg p-4">
          {array.map((bar, index) => {
            let barClass = "bar-glow bg-gradient-to-t from-slate-600 to-slate-400 border-2 border-slate-500 transition-all duration-300 rounded-t-sm";
            
            switch (bar.state) {
              case 'comparing':
                barClass = "bar-glow comparing bg-gradient-to-t from-red-600 to-red-400 border-2 rounded-t-sm";
                break;
              case 'swapping':
                barClass = "bar-glow swapping bg-gradient-to-t from-green-600 to-green-400 border-2 rounded-t-sm";
                break;
              case 'sorted':
                barClass = "bar-glow sorted bg-gradient-to-t from-blue-600 to-blue-400 border-2 rounded-t-sm";
                break;
              case 'pivot':
                barClass = "bar-glow bg-gradient-to-t from-purple-600 to-purple-400 border-2 border-purple-300 rounded-t-sm shadow-glow-purple";
                break;
              case 'active':
                barClass = "bar-glow bg-gradient-to-t from-yellow-600 to-yellow-400 border-2 border-yellow-300 rounded-t-sm shadow-glow-cyan";
                break;
            }

            const barWidth = Math.max(800 / arraySize[0] - 2, 2);
            
            return (
              <div
                key={index}
                className={barClass}
                style={{
                  height: `${bar.value}px`,
                  width: `${barWidth}px`,
                  maxHeight: '350px'
                }}
              />
            );
          })}
        </div>
        
        {isSorted && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-glow-green animate-glow-pulse">
              <span className="text-white font-semibold">✨ Array Sorted Successfully! ✨</span>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-slate-600 to-slate-400 rounded"></div>
            <span className="text-slate-300">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-red-600 to-red-400 rounded"></div>
            <span className="text-slate-300">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-green-600 to-green-400 rounded"></div>
            <span className="text-slate-300">Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-purple-600 to-purple-400 rounded"></div>
            <span className="text-slate-300">Pivot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded"></div>
            <span className="text-slate-300">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-blue-600 to-blue-400 rounded"></div>
            <span className="text-slate-300">Sorted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SortingVisualization;
