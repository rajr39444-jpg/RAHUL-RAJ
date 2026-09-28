import React from 'react';
import { FilterState, DistrictMetricData, StateSummary, IndicatorDefinition } from '../types';
import { INDICATOR_DEFINITIONS, STATES_DATA, DISTRICTS_DATA } from '../data/healthData';
import { TrendingUp, TrendingDown, Target, Building2, MapPin, ShieldAlert, Award, Compass } from 'lucide-react';

interface KpiGridProps {
  filters: FilterState;
  onDistrictClick?: (districtId: string) => void;
}

export const KpiGrid: React.FC<KpiGridProps> = ({ filters }) => {
  const currentIndicator = INDICATOR_DEFINITIONS.find(i => i.id === filters.selectedIndicatorId) || INDICATOR_DEFINITIONS[0];
  const isStateSelected = filters.selectedState !== 'all';
  const isDistrictSelected = filters.selectedDistrict !== 'all';

  const selectedStateObj = STATES_DATA.find(s => s.stateId === filters.selectedState);
  const selectedDistrictObj = DISTRICTS_DATA.find(d => d.districtId === filters.selectedDistrict);

  // States & Districts count
  const statesCovered = isStateSelected ? 1 : STATES_DATA.length;
  const filteredDistricts = isStateSelected
    ? DISTRICTS_DATA.filter(d => d.stateId === filters.selectedState)
    : DISTRICTS_DATA;
  const districtsCovered = isDistrictSelected ? 1 : filteredDistricts.length;

  // Compute Active Value
  let activeValue = 0;
  let activeMoi = 0;

  if (isDistrictSelected && selectedDistrictObj) {
    const key = currentIndicator.id as keyof DistrictMetricData['metrics'];
    activeValue = selectedDistrictObj.metrics[key];
    activeMoi = selectedDistrictObj.moiComponents.moiScore;
  } else if (isStateSelected && selectedStateObj) {
    activeValue = selectedStateObj.averages[currentIndicator.id] || currentIndicator.nationalBenchmark;
    activeMoi = selectedStateObj.avgMoi;
  } else {
    // National aggregated average
    activeValue = currentIndicator.nationalBenchmark;
    const allMois = DISTRICTS_DATA.map(d => d.moiComponents.moiScore);
    activeMoi = Number((allMois.reduce((a, b) => a + b, 0) / allMois.length).toFixed(1));
  }

  // Benchmarks
  const nationalBenchmark = currentIndicator.nationalBenchmark;
  const stateBenchmark = isStateSelected && selectedStateObj
    ? (selectedStateObj.averages[currentIndicator.id] || nationalBenchmark)
    : (isDistrictSelected && selectedDistrictObj
        ? (STATES_DATA.find(s => s.stateId === selectedDistrictObj.stateId)?.averages[currentIndicator.id] || nationalBenchmark)
        : nationalBenchmark);

  // Variances
  const nationalVariance = Number((((activeValue - nationalBenchmark) / nationalBenchmark) * 100).toFixed(1));
  const stateVariance = Number((((activeValue - stateBenchmark) / stateBenchmark) * 100).toFixed(1));

  // Polarity helper
  const isHigherWorse = currentIndicator.direction === 'higher_is_worse';

  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) < 0.5) return 'text-slate-400';
    if (isHigherWorse) {
      return variance > 0 ? 'text-rose-400' : 'text-emerald-400';
    } else {
      return variance > 0 ? 'text-emerald-400' : 'text-rose-400';
    }
  };

  const getMoiBadgeColor = (moi: number) => {
    if (moi >= 75) return 'text-rose-400 border-rose-500/30 bg-rose-950/40';
    if (moi >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-950/40';
    if (moi >= 40) return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40';
    return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 my-3">
      {/* 1. States Covered */}
      <div className="glass-panel rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-mono tracking-wider">STATES COVERED</span>
          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <div>
          <div className="text-xl lg:text-2xl font-bold font-mono tabular-nums text-white">
            {statesCovered}
            <span className="text-xs text-slate-500 font-normal ml-1">/ 28</span>
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            {isStateSelected ? selectedStateObj?.stateName : 'All Indian States'}
          </div>
        </div>
      </div>

      {/* 2. Districts Covered */}
      <div className="glass-panel rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-mono tracking-wider">DISTRICTS</span>
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <div>
          <div className="text-xl lg:text-2xl font-bold font-mono tabular-nums text-white">
            {districtsCovered}
            <span className="text-xs text-slate-500 font-normal ml-1">sample</span>
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            {isDistrictSelected ? selectedDistrictObj?.districtName : 'Granular NFHS-5'}
          </div>
        </div>
      </div>

      {/* 3. Selected Indicator Value */}
      <div className="glass-panel rounded-xl p-3 flex flex-col justify-between border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="flex items-center justify-between text-cyan-300 mb-1">
          <span className="text-[10px] font-mono tracking-wider truncate">INDICATOR VALUE</span>
          <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        </div>
        <div>
          <div className="text-xl lg:text-2xl font-bold font-mono tabular-nums text-cyan-300">
            {activeValue.toFixed(1)}
            <span className="text-sm font-normal text-cyan-400 ml-0.5">{currentIndicator.unit}</span>
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            {isDistrictSelected ? selectedDistrictObj?.districtName : (isStateSelected ? selectedStateObj?.stateName : 'All-India Weighted')}
          </div>
        </div>
      </div>

      {/* 4. National Benchmark */}
      <div className="glass-panel rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-mono tracking-wider">NAT. BENCHMARK</span>
          <Target className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div>
          <div className="text-xl lg:text-2xl font-bold font-mono tabular-nums text-slate-200">
            {nationalBenchmark.toFixed(1)}
            <span className="text-xs text-slate-400 ml-0.5">{currentIndicator.unit}</span>
          </div>
          <div className="text-[10px] text-slate-500 truncate mt-0.5">
            Official NFHS-5 All-India
          </div>
        </div>
      </div>

      {/* 5. State Benchmark */}
      <div className="glass-panel rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-mono tracking-wider">STATE BENCHMARK</span>
          <Compass className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div>
          <div className="text-xl lg:text-2xl font-bold font-mono tabular-nums text-slate-200">
            {stateBenchmark.toFixed(1)}
            <span className="text-xs text-slate-400 ml-0.5">{currentIndicator.unit}</span>
          </div>
          <div className="text-[10px] text-slate-500 truncate mt-0.5">
            {isStateSelected ? selectedStateObj?.stateName : 'State Baseline'}
          </div>
        </div>
      </div>

      {/* 6. National Variance % */}
      <div className="glass-panel rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-mono tracking-wider">NAT. VARIANCE %</span>
          {nationalVariance >= 0 ? (
            <TrendingUp className={`w-3.5 h-3.5 ${getVarianceColor(nationalVariance)}`} />
          ) : (
            <TrendingDown className={`w-3.5 h-3.5 ${getVarianceColor(nationalVariance)}`} />
          )}
        </div>
        <div>
          <div className={`text-xl lg:text-2xl font-bold font-mono tabular-nums ${getVarianceColor(nationalVariance)}`}>
            {nationalVariance > 0 ? `+${nationalVariance}%` : `${nationalVariance}%`}
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            vs All-India Mean
          </div>
        </div>
      </div>

      {/* 7. State Variance % */}
      <div className="glass-panel rounded-xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-mono tracking-wider">STATE VARIANCE %</span>
          {stateVariance >= 0 ? (
            <TrendingUp className={`w-3.5 h-3.5 ${getVarianceColor(stateVariance)}`} />
          ) : (
            <TrendingDown className={`w-3.5 h-3.5 ${getVarianceColor(stateVariance)}`} />
          )}
        </div>
        <div>
          <div className={`text-xl lg:text-2xl font-bold font-mono tabular-nums ${getVarianceColor(stateVariance)}`}>
            {stateVariance > 0 ? `+${stateVariance}%` : `${stateVariance}%`}
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            vs State Average
          </div>
        </div>
      </div>

      {/* 8. Market Opportunity / Vulnerability Index */}
      <div className="glass-panel rounded-xl p-3 flex flex-col justify-between border-cyan-500/30">
        <div className="flex items-center justify-between text-cyan-300 mb-1">
          <span className="text-[10px] font-mono tracking-wider">MOI INDEX</span>
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl lg:text-2xl font-bold font-mono tabular-nums text-white">
              {activeMoi.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 100</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded border ${getMoiBadgeColor(activeMoi)}`}>
              {activeMoi >= 75 ? 'Very High' : activeMoi >= 60 ? 'High' : activeMoi >= 40 ? 'Moderate' : 'Low'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
