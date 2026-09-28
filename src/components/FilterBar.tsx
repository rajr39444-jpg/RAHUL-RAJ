import React from 'react';
import { FilterState, IndicatorDefinition } from '../types';
import { STATES_DATA, DISTRICTS_DATA, INDICATOR_DEFINITIONS } from '../data/healthData';
import { RotateCcw, SlidersHorizontal, MapPin, Gauge } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters
}) => {
  // Available districts filtered by selected state
  const availableDistricts = filters.selectedState === 'all'
    ? DISTRICTS_DATA
    : DISTRICTS_DATA.filter(d => d.stateId === filters.selectedState);

  // Filter indicators by category if selected
  const availableIndicators = filters.selectedCategory === 'all'
    ? INDICATOR_DEFINITIONS
    : INDICATOR_DEFINITIONS.filter(i => i.category === filters.selectedCategory);

  const selectedIndicator = INDICATOR_DEFINITIONS.find(i => i.id === filters.selectedIndicatorId) || INDICATOR_DEFINITIONS[0];

  return (
    <div className="bg-[#090e1c]/80 backdrop-blur-md border-b border-cyan-500/15 py-3 px-4 lg:px-6 transition-all">
      <div className="max-w-[1720px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* Slicers Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 items-center">
          {/* State Slicer */}
          <div className="flex flex-col">
            <label className="text-[10px] text-slate-400 font-mono tracking-wider mb-1 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-cyan-400" />
              STATE / UT
            </label>
            <select
              value={filters.selectedState}
              onChange={(e) => {
                const newState = e.target.value;
                onFilterChange({
                  selectedState: newState,
                  selectedDistrict: 'all' // reset district when state changes
                });
              }}
              className="bg-[#0f172a] text-xs text-slate-200 border border-slate-700/80 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 cursor-pointer"
            >
              <option value="all">All India (National)</option>
              {STATES_DATA.map((s) => (
                <option key={s.stateId} value={s.stateId}>
                  {s.stateName} ({s.stateCode})
                </option>
              ))}
            </select>
          </div>

          {/* District Slicer */}
          <div className="flex flex-col">
            <label className="text-[10px] text-slate-400 font-mono tracking-wider mb-1 flex items-center gap-1">
              <span>DISTRICT</span>
              <span className="text-cyan-500/70">({availableDistricts.length})</span>
            </label>
            <select
              value={filters.selectedDistrict}
              onChange={(e) => onFilterChange({ selectedDistrict: e.target.value })}
              className="bg-[#0f172a] text-xs text-slate-200 border border-slate-700/80 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 cursor-pointer"
            >
              <option value="all">All Districts (Aggregated)</option>
              {availableDistricts.map((d) => (
                <option key={d.districtId} value={d.districtId}>
                  {d.districtName} ({d.stateId})
                </option>
              ))}
            </select>
          </div>

          {/* Indicator Category Slicer */}
          <div className="flex flex-col">
            <label className="text-[10px] text-slate-400 font-mono tracking-wider mb-1">
              CATEGORY
            </label>
            <select
              value={filters.selectedCategory}
              onChange={(e) => {
                const newCat = e.target.value;
                // If current indicator is not in new category, switch to first of category
                let nextIndId = filters.selectedIndicatorId;
                if (newCat !== 'all') {
                  const firstOfCat = INDICATOR_DEFINITIONS.find(i => i.category === newCat);
                  if (firstOfCat) nextIndId = firstOfCat.id;
                }
                onFilterChange({
                  selectedCategory: newCat,
                  selectedIndicatorId: nextIndId
                });
              }}
              className="bg-[#0f172a] text-xs text-slate-200 border border-slate-700/80 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 cursor-pointer"
            >
              <option value="all">All Categories (14)</option>
              <option value="NCD">NCD Intelligence</option>
              <option value="Maternal & Child">Maternal & Child Health</option>
              <option value="Service Coverage">Service Coverage</option>
            </select>
          </div>

          {/* Dynamic Metric Switcher (DAX SWITCH Simulator) */}
          <div className="flex flex-col col-span-2 sm:col-span-1 md:col-span-2">
            <label className="text-[10px] text-cyan-400 font-mono tracking-wider mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <SlidersHorizontal className="w-2.5 h-2.5" />
                DYNAMIC METRIC SWITCHER
              </span>
              <span className="text-[9px] text-slate-400">DAX SWITCH()</span>
            </label>
            <select
              value={filters.selectedIndicatorId}
              onChange={(e) => onFilterChange({ selectedIndicatorId: e.target.value })}
              className="bg-[#0f172a] text-xs font-medium text-cyan-200 border border-cyan-500/40 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.1)]"
            >
              {availableIndicators.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  [{ind.category}] {ind.name}
                </option>
              ))}
            </select>
          </div>

          {/* Top-N Ranking Slicer */}
          <div className="flex flex-col">
            <label className="text-[10px] text-slate-400 font-mono tracking-wider mb-1 flex items-center gap-1">
              <Gauge className="w-2.5 h-2.5 text-cyan-400" />
              TOP-N SLICER
            </label>
            <div className="flex items-center bg-[#0f172a] border border-slate-700/80 rounded-md p-0.5">
              {[5, 10, 15, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => onFilterChange({ topN: n })}
                  className={`flex-1 py-1 text-[11px] font-mono font-medium rounded transition-colors ${
                    filters.topN === n
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Bar / Map Mode / Reset */}
        <div className="flex items-center flex-wrap gap-2 pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-800/80 justify-between xl:justify-end">
          {/* Active Metric Polarity indicator */}
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <span>Direction:</span>
            <span className={selectedIndicator.direction === 'higher_is_worse' ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
              {selectedIndicator.direction === 'higher_is_worse' ? '▲ Higher = Greater Burden' : '▲ Higher = Better Coverage'}
            </span>
            <span className="text-slate-600">|</span>
            <span>Nat. Benchmark:</span>
            <span className="text-cyan-300 font-mono tabular-nums font-semibold">
              {selectedIndicator.nationalBenchmark}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Map Theme Toggle */}
            <div className="flex items-center bg-[#0f172a] border border-slate-700/80 rounded-md p-0.5 text-xs">
              <button
                onClick={() => onFilterChange({ mapViewMode: 'disease_burden' })}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                  filters.mapViewMode === 'disease_burden'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Burden
              </button>
              <button
                onClick={() => onFilterChange({ mapViewMode: 'service_gap' })}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                  filters.mapViewMode === 'service_gap'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Service Gap
              </button>
              <button
                onClick={() => onFilterChange({ mapViewMode: 'moi' })}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                  filters.mapViewMode === 'moi'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                MOI Index
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-[#0f172a] hover:bg-slate-800/80 border border-slate-700 rounded-md transition-colors"
              title="Reset all filters to National baseline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
