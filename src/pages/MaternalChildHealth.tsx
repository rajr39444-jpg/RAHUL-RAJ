import React from 'react';
import { FilterState, DistrictMetricData, IndicatorDefinition } from '../types';
import { IndiaMap } from '../components/IndiaMap';
import { TopBottomRanking } from '../components/TopBottomRanking';
import { INDICATOR_DEFINITIONS, DISTRICTS_DATA, STATES_DATA } from '../data/healthData';
import { Baby, Shield, CheckCircle2, AlertOctagon, Heart, ArrowRight } from 'lucide-react';

interface MaternalChildHealthProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onNavigateToDistrict: (districtId: string) => void;
}

export const MaternalChildHealth: React.FC<MaternalChildHealthProps> = ({
  filters,
  onFilterChange,
  onNavigateToDistrict
}) => {
  const mchIndicators = INDICATOR_DEFINITIONS.filter(i => i.category === 'Maternal & Child');
  const currentIndicator = mchIndicators.find(i => i.id === filters.selectedIndicatorId) || mchIndicators[0];

  const selectedDistrictObj = DISTRICTS_DATA.find(d => d.districtId === filters.selectedDistrict) || DISTRICTS_DATA[0];
  const natBenchmark = currentIndicator.nationalBenchmark;
  const isHigherBetter = currentIndicator.direction === 'higher_is_better';

  // State Comparison Data
  const stateComparison = [...STATES_DATA]
    .map(s => ({
      stateId: s.stateId,
      stateName: s.stateName,
      value: s.averages[currentIndicator.id] || natBenchmark
    }))
    .sort((a, b) => (isHigherBetter ? b.value - a.value : a.value - b.value));

  const maxStateVal = Math.max(...stateComparison.map(s => s.value), natBenchmark);

  return (
    <div className="space-y-6">
      {/* Header & Indicator Selector */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
              <Baby className="w-4 h-4 text-cyan-400" />
              <span>PAGE 04 · REPRODUCTIVE, MATERNAL, NEWBORN & CHILD HEALTH (RMNCH)</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-white">
              MATERNAL & CHILD HEALTH INTELLIGENCE
            </h1>
            <p className="text-xs text-slate-300 font-mono mt-0.5 max-w-2xl">
              Tracking primary preventive coverage, institutional obstetrics, infant nutrition, and pediatric micronutrient deficiencies across Indian geographies.
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#090f20] p-1.5 rounded-xl border border-cyan-500/30">
            {mchIndicators.map((ind) => {
              const isSelected = filters.selectedIndicatorId === ind.id;
              const isPos = ind.direction === 'higher_is_better';
              return (
                <button
                  key={ind.id}
                  onClick={() => onFilterChange({ selectedIndicatorId: ind.id, selectedCategory: 'Maternal & Child' })}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.25)] font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span>{ind.name.split('(')[0].trim()}</span>
                    <span className={`text-[9px] ${isPos ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isPos ? '▲+' : '▲-'}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Polarity Banner: Explaining Higher is Better vs Worse */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Metric Directionality:</span>
            {isHigherBetter ? (
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                HIGHER IS BETTER (Universal Coverage Indicator)
              </span>
            ) : (
              <span className="text-rose-400 font-bold bg-rose-950/60 px-2.5 py-1 rounded border border-rose-500/30 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5" />
                HIGHER IS WORSE (Morbidity / Deficit Burden)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <span>All-India Benchmark: <strong className="text-white tabular-nums">{natBenchmark}%</strong></span>
            <span className="text-slate-600">·</span>
            <span>Survey: <strong className="text-cyan-400">NFHS-5 (2019-2021)</strong></span>
          </div>
        </div>
      </div>

      {/* Grid: Map + State Benchmark Bar Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Map (7 Cols) */}
        <div className="xl:col-span-7">
          <IndiaMap
            filters={filters}
            onSelectState={(stateId) => onFilterChange({ selectedState: stateId })}
            onSelectDistrict={(districtId) => onFilterChange({ selectedDistrict: districtId })}
            onModeChange={(mode) => onFilterChange({ mapViewMode: mode })}
          />
        </div>

        {/* State Comparison Bar Chart (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col">
          <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15 mb-3">
              <div>
                <h3 className="font-display font-bold text-sm text-white">
                  STATE COVERAGE BENCHMARK: {currentIndicator.name.toUpperCase()}
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Ordered by {isHigherBetter ? 'highest coverage (favorable)' : 'lowest burden (favorable)'}
                </p>
              </div>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[500px] pr-2 font-mono text-xs">
              {stateComparison.map((s, idx) => {
                const widthPct = Math.min(100, (s.value / (maxStateVal * 1.05)) * 100);
                const isSelectedState = filters.selectedState === s.stateId;
                const isGood = isHigherBetter ? s.value >= natBenchmark : s.value <= natBenchmark;

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
                        <span className={`text-[10px] ${isGood ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {s.value >= natBenchmark ? `+${(s.value - natBenchmark).toFixed(1)}%` : `${(s.value - natBenchmark).toFixed(1)}%`}
                        </span>
                        <span className="font-bold text-white tabular-nums">{s.value.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden relative">
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white z-10 opacity-70"
                        style={{ left: `${(natBenchmark / (maxStateVal * 1.05)) * 100}%` }}
                      />
                      <div
                        className={`h-full rounded-full ${
                          isGood ? 'bg-gradient-to-r from-cyan-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-rose-500'
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

      {/* Maternal & Child Indicator Profile for Selected District */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-500/15">
          <div>
            <h3 className="font-display font-bold text-base text-white">
              MATERNAL & CHILD SCORECARD: {selectedDistrictObj.districtName.toUpperCase()} ({selectedDistrictObj.stateName})
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Continuum of care evaluation: Antenatal Checkups → Delivery → Pediatric Immunization & Nutrition
            </p>
          </div>
          <button
            onClick={() => onNavigateToDistrict(selectedDistrictObj.districtId)}
            className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30"
          >
            <span>Open Detailed Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono">
          {mchIndicators.map((ind) => {
            const val = selectedDistrictObj.metrics[ind.id as keyof DistrictMetricData['metrics']];
            const bench = ind.nationalBenchmark;
            const isGood = ind.direction === 'higher_is_better' ? val >= bench : val <= bench;
            const variance = (((val - bench) / bench) * 100).toFixed(1);

            return (
              <div key={ind.id} className="p-3.5 rounded-xl bg-[#090f20] border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>{ind.name.split('(')[0]}</span>
                    <span className={isGood ? 'text-emerald-400' : 'text-rose-400'}>
                      {isGood ? '✓' : '!'}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-white tabular-nums">
                    {val.toFixed(1)}%
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] flex items-center justify-between">
                  <span className="text-slate-500">Benchmark: {bench}%</span>
                  <span className={`font-bold tabular-nums ${isGood ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {Number(variance) > 0 ? `+${variance}%` : `${variance}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top-N and Bottom-N Rankings */}
      <TopBottomRanking
        filters={filters}
        onSelectDistrict={(id) => onNavigateToDistrict(id)}
      />
    </div>
  );
};
