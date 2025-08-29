
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Shuffle, RotateCcw, Zap, Info } from 'lucide-react';
import { Algorithm } from '@/types/sorting';
import { algorithmInfo } from '@/constants/algorithms';

interface SortingControlsProps {
  algorithm: Algorithm;
  setAlgorithm: (algorithm: Algorithm) => void;
  isPlaying: boolean;
  isSorted: boolean;
  speed: number[];
  setSpeed: (speed: number[]) => void;
  arraySize: number[];
  setArraySize: (size: number[]) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onShuffle: () => void;
}

const SortingControls: React.FC<SortingControlsProps> = ({
  algorithm,
  setAlgorithm,
  isPlaying,
  isSorted,
  speed,
  setSpeed,
  arraySize,
  setArraySize,
  onStart,
  onPause,
  onReset,
  onShuffle
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Algorithm
          </CardTitle>
          <CardDescription>Choose your sorting algorithm</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
            <SelectTrigger className="bg-slate-700/50 border-slate-600 hover:bg-slate-700 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 backdrop-blur-xl">
              {Object.entries(algorithmInfo).map(([key, info]) => (
                <SelectItem key={key} value={key} className="hover:bg-slate-700/50">
                  {info.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-200">Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={isPlaying ? onPause : onStart}
              disabled={isSorted}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-effect shadow-lg"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Start'}
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="border-slate-600 hover:bg-slate-700/50 hover:border-slate-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={onShuffle}
            variant="outline"
            className="w-full border-slate-600 hover:bg-slate-700/50 hover:border-slate-500 transition-colors"
            disabled={isPlaying}
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle Array
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Speed: {speed[0]}ms
            </label>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              max={100}
              min={1}
              step={1}
              className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-purple-500"
              disabled={isPlaying}
            />
          </div>
          
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Array Size: {arraySize[0]}
            </label>
            <Slider
              value={arraySize}
              onValueChange={setArraySize}
              max={100}
              min={10}
              step={5}
              className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-green-500 [&_[role=slider]]:to-emerald-500"
              disabled={isPlaying}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className={`text-slate-200 bg-gradient-to-r ${algorithmInfo[algorithm].color} bg-clip-text text-transparent`}>
            {algorithmInfo[algorithm].name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            {algorithmInfo[algorithm].description}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
              <div className="text-slate-400">Time</div>
              <div className="text-slate-200 font-mono text-sm">{algorithmInfo[algorithm].timeComplexity}</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
              <div className="text-slate-400">Space</div>
              <div className="text-slate-200 font-mono text-sm">{algorithmInfo[algorithm].spaceComplexity}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SortingControls;
