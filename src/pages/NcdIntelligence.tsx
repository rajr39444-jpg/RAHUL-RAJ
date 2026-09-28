import React from 'react';
import { FilterState, DistrictMetricData, IndicatorDefinition } from '../types';
import { IndiaMap } from '../components/IndiaMap';
import { TopBottomRanking } from '../components/TopBottomRanking';
import { INDICATOR_DEFINITIONS, DISTRICTS_DATA, STATES_DATA } from '../data/healthData';
import { HeartPulse, Activity, Zap, Pill, AlertTriangle, ArrowRight } from 'lucide-react';

interface NcdIntelligenceProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onNavigateToDistrict: (districtId: string) => void;
}

export const NcdIntelligence: React.FC<NcdIntelligenceProps> = ({
  filters,
  onFilterChange,
  onNavigateToDistrict
}) => {
  const ncdIndicators = INDICATOR_DEFINITIONS.filter(i => i.category === 'NCD');
  const currentIndicator = ncdIndicators.find(i => i.id === filters.selectedIndicatorId) || ncdIndicators[0];

  const selectedDistrictObj = DISTRICTS_DATA.find(d => d.districtId === filters.selectedDistrict) || DISTRICTS_DATA[0];
  const natBenchmark = currentIndicator.nationalBenchmark;

  // State Comparison Data for this NCD metric
  const stateComparison = [...STATES_DATA]
    .map(s => ({
      stateId: s.stateId,
      stateName: s.stateName,
      value: s.averages[currentIndicator.id] || natBenchmark
    }))
    .sort((a, b) => b.value - a.value);

  const maxStateVal = Math.max(...stateComparison.map(s => s.value), natBenchmark);

  return (
    <div className="space-y-6">
      {/* Header & Metric Selector */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs mb-1">
              <HeartPulse className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>PAGE 03 · CHRONIC DISEASE & METABOLIC SURVEILLANCE</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-white">
              NON-COMMUNICABLE DISEASE (NCD) INTELLIGENCE
            </h1>
            <p className="text-xs text-slate-300 font-mono mt-0.5 max-w-2xl">
              Surveillance of chronic cardiometabolic conditions, lifestyle risk factors, and target epidemiology for pharmaceutical therapy deployment.
            </p>
          </div>

          {/* Dedicated NCD Metric Selector */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#090f20] p-1.5 rounded-xl border border-cyan-500/30">
            {ncdIndicators.map((ind) => {
              const isSelected = filters.selectedIndicatorId === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => onFilterChange({ selectedIndicatorId: ind.id, selectedCategory: 'NCD' })}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                    isSelected
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.25)] font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {ind.name.split('/')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clinical Summary Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-[#070c18] p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">Clinical Protocol:</span>
            <div className="text-slate-200 mt-0.5 truncate">{currentIndicator.subIndicator}</div>
          </div>
          <div className="bg-[#070c18] p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">National Benchmark:</span>
            <div className="text-rose-400 font-bold mt-0.5 tabular-nums">
              {natBenchmark}% All-India Average
            </div>
          </div>
          <div className="bg-[#070c18] p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">Pharma Therapy Area Target:</span>
            <div className="text-cyan-300 font-semibold mt-0.5 truncate">
              {currentIndicator.clinicalSignificance.split(';')[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: A. NCD Burden India Map + B. State Comparison Bar Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* A. NCD Burden Map (7 Cols) */}
        <div className="xl:col-span-7">
          <IndiaMap
            filters={filters}
            onSelectState={(stateId) => onFilterChange({ selectedState: stateId })}
            onSelectDistrict={(districtId) => onFilterChange({ selectedDistrict: districtId })}
            onModeChange={(mode) => onFilterChange({ mapViewMode: mode })}
          />
        </div>

        {/* B. State Comparison Bar Chart (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col">
          <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15 mb-3">
              <div>
                <h3 className="font-display font-bold text-sm text-white">
                  STATE-LEVEL {currentIndicator.name.toUpperCase()} BENCHMARK
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Comparative state averages ranked vs All-India line ({natBenchmark}%)
                </p>
              </div>
            </div>

            {/* Vertical scrolling list of state bars */}
            <div className="space-y-2 overflow-y-auto max-h-[500px] pr-2 font-mono text-xs">
              {stateComparison.map((s, idx) => {
                const widthPct = Math.min(100, (s.value / (maxStateVal * 1.05)) * 100);
                const isSelectedState = filters.selectedState === s.stateId;
                const isAboveNat = s.value > natBenchmark;

                return (
                  <div
                    key={s.stateId}
                    onClick={() => onFilterChange({ selectedState: s.stateId })}
                    className={`p-2 rounded-lg cursor-pointer transition-all border ${
                      isSelectedState
                        ? 'bg-cyan-950/70 border-cyan-400 shadow-md'
                        : 'bg-[#090f20]/60 hover:bg-[#101b36] border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500 font-bold w-4">#{idx + 1}</span>
                        <span className="text-slate-200 font-medium">{s.stateName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] ${isAboveNat ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {isAboveNat ? `+${(s.value - natBenchmark).toFixed(1)}%` : `${(s.value - natBenchmark).toFixed(1)}%`}
                        </span>
                        <span className="font-bold text-white tabular-nums">{s.value.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden relative">
                      {/* Nat Benchmark Line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white z-10 opacity-70"
                        style={{ left: `${(natBenchmark / (maxStateVal * 1.05)) * 100}%` }}
                      />
                      <div
                        className={`h-full rounded-full ${
                          isAboveNat ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-500'
                        }`}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* D. Multi-Indicator NCD Comparison for Selected District */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-500/15">
          <div>
            <h3 className="font-display font-bold text-base text-white">
              NCD CO-MORBIDITY SPECTRUM: {selectedDistrictObj.districtName.toUpperCase()} ({selectedDistrictObj.stateName})
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Multi-indicator profile examining cardiometabolic convergence and behavioral risk factors
            </p>
          </div>
          <button
            onClick={() => onNavigateToDistrict(selectedDistrictObj.districtId)}
            className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30"
          >
            <span>Open Comprehensive Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono">
          {ncdIndicators.map((ind) => {
            const val = selectedDistrictObj.metrics[ind.id as keyof DistrictMetricData['metrics']];
            const bench = ind.nationalBenchmark;
            const variance = (((val - bench) / bench) * 100).toFixed(1);
            const isHigh = val > bench;

            return (
              <div key={ind.id} className="p-3.5 rounded-xl bg-[#090f20] border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    {ind.name.split('/')[0]}
                  </div>
                  <div className="text-xl font-bold text-white tabular-nums">
                    {val.toFixed(1)}%
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] flex items-center justify-between">
                  <span className="text-slate-500">Nat: {bench}%</span>
                  <span className={`font-bold tabular-nums ${isHigh ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {Number(variance) > 0 ? `+${variance}%` : `${variance}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* C. District Ranking (Top-N / Bottom-N) */}
      <TopBottomRanking
        filters={filters}
        onSelectDistrict={(id) => onNavigateToDistrict(id)}
      />
    </div>
  );
};
