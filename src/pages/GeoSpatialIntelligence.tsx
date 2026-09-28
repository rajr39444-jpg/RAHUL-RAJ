import React from 'react';
import { FilterState, DistrictMetricData } from '../types';
import { IndiaMap } from '../components/IndiaMap';
import { TopBottomRanking } from '../components/TopBottomRanking';
import { INDICATOR_DEFINITIONS, DISTRICTS_DATA, STATES_DATA } from '../data/healthData';
import { MapPin, Building2, TrendingUp, TrendingDown, Award, Users, Target, Activity } from 'lucide-react';

interface GeoSpatialIntelligenceProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onNavigateToDistrict: (districtId: string) => void;
}

export const GeoSpatialIntelligence: React.FC<GeoSpatialIntelligenceProps> = ({
  filters,
  onFilterChange,
  onNavigateToDistrict
}) => {
  const currentIndicator = INDICATOR_DEFINITIONS.find(i => i.id === filters.selectedIndicatorId) || INDICATOR_DEFINITIONS[0];
  const natBenchmark = currentIndicator.nationalBenchmark;
  const isWorse = currentIndicator.direction === 'higher_is_worse';

  // Selected Geography Data
  const isDistrictSelected = filters.selectedDistrict !== 'all';
  const isStateSelected = filters.selectedState !== 'all';

  const selectedDistrictObj = DISTRICTS_DATA.find(d => d.districtId === filters.selectedDistrict) || DISTRICTS_DATA[0];
  const selectedStateObj = STATES_DATA.find(s => s.stateId === (isDistrictSelected ? selectedDistrictObj.stateId : filters.selectedState)) || STATES_DATA[0];

  const districtValue = selectedDistrictObj.metrics[currentIndicator.id as keyof DistrictMetricData['metrics']];
  const stateAverage = selectedStateObj.averages[currentIndicator.id] || natBenchmark;

  const diffFromState = Number((districtValue - stateAverage).toFixed(1));
  const diffFromNat = Number((districtValue - natBenchmark).toFixed(1));

  const stateVarPct = Number((((districtValue - stateAverage) / stateAverage) * 100).toFixed(1));
  const natVarPct = Number((((districtValue - natBenchmark) / natBenchmark) * 100).toFixed(1));

  // Dynamic ranking
  const allRanked = [...DISTRICTS_DATA].sort((a, b) => {
    const k = currentIndicator.id as keyof DistrictMetricData['metrics'];
    return b.metrics[k] - a.metrics[k];
  });
  const districtRank = allRanked.findIndex(d => d.districtId === selectedDistrictObj.districtId) + 1;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400">PAGE 02 · GEOSPATIAL INTELLIGENCE</div>
          <h1 className="font-display font-extrabold text-2xl text-white">
            CHOROPLETH SPATIAL ANALYTICS & GEOGRAPHIC DRILL-DOWN
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Interactively explore state-level clusters, district centroids, and rural-urban territorial disparities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Current Scope:</span>
          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
            {isDistrictSelected ? `${selectedDistrictObj.districtName} (${selectedDistrictObj.stateId})` : (isStateSelected ? selectedStateObj.stateName : 'All-India Geospatial')}
          </span>
        </div>
      </div>

      {/* Main Grid: Left Map + Right Selected Geography Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left Side: Large India Choropleth Map (8 Cols) */}
        <div className="xl:col-span-8">
          <IndiaMap
            filters={filters}
            onSelectState={(stateId) => onFilterChange({ selectedState: stateId })}
            onSelectDistrict={(districtId) => onFilterChange({ selectedDistrict: districtId })}
            onModeChange={(mode) => onFilterChange({ mapViewMode: mode })}
          />
        </div>

        {/* Right Side: Selected Geography Panel (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col">
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 flex-1 flex flex-col justify-between shadow-[0_10px_35px_rgba(6,182,212,0.1)]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider">SELECTED GEOGRAPHY</span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {isDistrictSelected ? selectedDistrictObj.districtName : selectedStateObj.stateName}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{isDistrictSelected ? `${selectedDistrictObj.stateName} · ${selectedDistrictObj.tier}` : `Zone: ${selectedStateObj.zone} · Capital: ${selectedStateObj.capital}`}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400">District Rank</span>
                  <div className="text-lg font-mono font-bold text-cyan-300">
                    #{districtRank} <span className="text-[10px] text-slate-500 font-normal">/ {DISTRICTS_DATA.length}</span>
                  </div>
                </div>
              </div>

              {/* Metric Card */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 mb-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Selected Indicator:</span>
                  <span className="text-cyan-400 font-semibold">{currentIndicator.name}</span>
                </div>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    {districtValue.toFixed(1)}%
                  </span>
                  <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded border ${
                    isWorse
                      ? (districtValue > natBenchmark ? 'text-rose-400 bg-rose-950/60 border-rose-500/40' : 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40')
                      : (districtValue >= natBenchmark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40' : 'text-rose-400 bg-rose-950/60 border-rose-500/40')
                  }`}>
                    {isWorse ? (districtValue > natBenchmark ? 'Above Nat. Avg' : 'Below Nat. Avg') : (districtValue >= natBenchmark ? 'Meeting Target' : 'Deficit')}
                  </span>
                </div>
              </div>

              {/* Comparative Metrics Grid */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090f20] border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Population:
                  </span>
                  <span className="text-slate-200 font-bold tabular-nums">
                    {(selectedDistrictObj.population / 1000000).toFixed(2)} Million
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090f20] border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    State Average:
                  </span>
                  <span className="text-slate-200 font-bold tabular-nums">
                    {stateAverage.toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090f20] border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-slate-400" />
                    National Average:
                  </span>
                  <span className="text-slate-200 font-bold tabular-nums">
                    {natBenchmark.toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090f20] border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    Difference from State:
                  </span>
                  <span className={`font-bold tabular-nums ${diffFromState > 0 ? (isWorse ? 'text-rose-400' : 'text-emerald-400') : (isWorse ? 'text-emerald-400' : 'text-rose-400')}`}>
                    {diffFromState > 0 ? `+${diffFromState}%` : `${diffFromState}%`} ({stateVarPct > 0 ? `+${stateVarPct}%` : `${stateVarPct}%`})
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090f20] border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    Difference from National:
                  </span>
                  <span className={`font-bold tabular-nums ${diffFromNat > 0 ? (isWorse ? 'text-rose-400' : 'text-emerald-400') : (isWorse ? 'text-emerald-400' : 'text-rose-400')}`}>
                    {diffFromNat > 0 ? `+${diffFromNat}%` : `${diffFromNat}%`} ({natVarPct > 0 ? `+${natVarPct}%` : `${natVarPct}%`})
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090f20] border border-cyan-500/20">
                  <span className="text-slate-400">MOI Vulnerability Score:</span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    {selectedDistrictObj.moiComponents.moiScore} / 100 ({selectedDistrictObj.moiComponents.category})
                  </span>
                </div>
              </div>
            </div>

            {/* Drill-through action */}
            <div className="mt-4 pt-3 border-t border-cyan-500/20">
              <button
                onClick={() => onNavigateToDistrict(selectedDistrictObj.districtId)}
                className="w-full py-2.5 px-4 text-xs font-mono font-bold text-cyan-200 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/50 hover:border-cyan-400 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] text-center cursor-pointer"
              >
                Open Full District Profile ({selectedDistrictObj.districtName}) →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Districts & Bottom Districts Horizontal Bar Charts */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display font-bold text-lg text-white">
            DISTRICT RANKING COMPARISONS (TOP-N: {filters.topN})
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Click any row to drill into district specifics
          </span>
        </div>
        <TopBottomRanking
          filters={filters}
          onSelectDistrict={(id) => onNavigateToDistrict(id)}
        />
      </div>
    </div>
  );
};
