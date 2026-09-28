import React from 'react';
import { FilterState, DistrictMetricData, IndicatorDefinition } from '../types';
import { IndiaMap } from '../components/IndiaMap';
import { TopBottomRanking } from '../components/TopBottomRanking';
import { INDICATOR_DEFINITIONS, DISTRICTS_DATA, STATES_DATA } from '../data/healthData';
import { ShieldPlus, AlertTriangle, CheckCircle, Activity, Building, Compass, ArrowRight } from 'lucide-react';

interface ServiceCoverageProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onNavigateToDistrict: (districtId: string) => void;
}

export const ServiceCoverage: React.FC<ServiceCoverageProps> = ({
  filters,
  onFilterChange,
  onNavigateToDistrict
}) => {
  const serviceIndicators = INDICATOR_DEFINITIONS.filter(i => i.category === 'Service Coverage');
  const currentIndicator = serviceIndicators.find(i => i.id === filters.selectedIndicatorId) || serviceIndicators[0];

  const selectedDistrictObj = DISTRICTS_DATA.find(d => d.districtId === filters.selectedDistrict) || DISTRICTS_DATA[0];
  const selectedStateObj = STATES_DATA.find(s => s.stateId === selectedDistrictObj.stateId) || STATES_DATA[0];

  const currentCoverage = selectedDistrictObj.metrics[currentIndicator.id as keyof DistrictMetricData['metrics']];
  const natBenchmark = currentIndicator.nationalBenchmark;
  const stateBenchmark = selectedStateObj.averages[currentIndicator.id] || natBenchmark;

  // Gap % = Benchmark - Current Coverage (positive means gap)
  const gapFromNat = Number((natBenchmark - currentCoverage).toFixed(1));
  const gapFromState = Number((stateBenchmark - currentCoverage).toFixed(1));

  // Compute District Overall Service Coverage Score (0-100)
  // Weighted avg of institutional delivery, full immunization, insurance, primary health access
  const overallCoverageScore = Number(
    (
      selectedDistrictObj.metrics.institutional_delivery * 0.35 +
      selectedDistrictObj.metrics.full_immunization * 0.30 +
      selectedDistrictObj.metrics.health_insurance * 0.20 +
      selectedDistrictObj.metrics.primary_health_access * 0.15
    ).toFixed(1)
  );
  const overallGapScore = Number((100 - overallCoverageScore).toFixed(1));

  // Dynamic ranking
  const allRanked = [...DISTRICTS_DATA].sort((a, b) => {
    const k = currentIndicator.id as keyof DistrictMetricData['metrics'];
    return b.metrics[k] - a.metrics[k];
  });
  const districtRank = allRanked.findIndex(d => d.districtId === selectedDistrictObj.districtId) + 1;

  return (
    <div className="space-y-6">
      {/* Header & Indicator Slicer */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
              <ShieldPlus className="w-4 h-4 text-cyan-400" />
              <span>PAGE 05 · HEALTH SYSTEMS CAPACITY & SERVICE DELIVERY</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-white">
              SERVICE COVERAGE & HEALTH SYSTEM GAP ANALYSIS
            </h1>
            <p className="text-xs text-slate-300 font-mono mt-0.5 max-w-2xl">
              Assessing primary healthcare infrastructure, cancer screening penetration, and financial risk protection (PM-JAY/State schemes) to guide distributor and therapy access.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#090f20] p-1.5 rounded-xl border border-cyan-500/30">
            {serviceIndicators.map((ind) => {
              const isSelected = filters.selectedIndicatorId === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => onFilterChange({ selectedIndicatorId: ind.id, selectedCategory: 'Service Coverage' })}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.25)] font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {ind.name.split('(')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Aggregate Health System Score Banner */}
        <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
            <span className="text-cyan-400 text-[10px] uppercase">Service Coverage Score</span>
            <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
              {overallCoverageScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-[10px] text-cyan-300 mt-1">Multi-indicator composite</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30">
            <span className="text-amber-400 text-[10px] uppercase">Service Gap Score</span>
            <div className="text-2xl font-bold text-amber-300 tabular-nums mt-0.5">
              {overallGapScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-[10px] text-amber-400/80 mt-1">Unmet public health capacity</div>
          </div>

          <div className="p-3 rounded-xl bg-[#090f20] border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase">Financial Risk Protection</span>
            <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
              {selectedDistrictObj.metrics.health_insurance}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Households covered by insurance</div>
          </div>

          <div className="p-3 rounded-xl bg-[#090f20] border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase">PHC Radius Accessibility</span>
            <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
              {selectedDistrictObj.metrics.primary_health_access}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Within 5km of functional centre</div>
          </div>
        </div>
      </div>

      {/* Grid: Map (configured in Service Gap mode) + Health System Gap Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Service Gap Map (7 Cols) */}
        <div className="xl:col-span-7">
          <IndiaMap
            filters={{ ...filters, mapViewMode: 'service_gap' }}
            onSelectState={(stateId) => onFilterChange({ selectedState: stateId })}
            onSelectDistrict={(districtId) => onFilterChange({ selectedDistrict: districtId })}
            onModeChange={(mode) => onFilterChange({ mapViewMode: mode })}
          />
        </div>

        {/* Health System Gap Panel (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col">
          <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 tracking-wider">PANEL SPECIFICATION</span>
                  <h3 className="font-display font-bold text-lg text-white">HEALTH SYSTEM GAP ANALYSIS</h3>
                  <div className="text-xs font-mono text-slate-400">
                    Target: {selectedDistrictObj.districtName} ({selectedDistrictObj.stateName})
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-400">Rank</span>
                  <div className="text-base font-bold text-cyan-300">
                    #{districtRank} <span className="text-[10px] text-slate-500 font-normal">/ {DISTRICTS_DATA.length}</span>
                  </div>
                </div>
              </div>

              {/* Core Indicators Breakdown in Panel */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#090f20] border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Current Coverage ({currentIndicator.name.split('(')[0]}):</span>
                  <span className="text-xl font-bold text-white tabular-nums">
                    {currentCoverage.toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#090f20] border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">National Benchmark:</span>
                  <span className="text-slate-200 font-bold tabular-nums">
                    {natBenchmark.toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#090f20] border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">State Benchmark:</span>
                  <span className="text-slate-200 font-bold tabular-nums">
                    {stateBenchmark.toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#090f20] border border-amber-500/30 flex items-center justify-between">
                  <span className="text-amber-300">National Deficit / Gap %:</span>
                  <span className={`font-bold tabular-nums text-sm ${gapFromNat > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {gapFromNat > 0 ? `-${gapFromNat}% Shortfall` : `+${Math.abs(gapFromNat)}% Surplus`}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#090f20] border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">State Deficit / Gap %:</span>
                  <span className={`font-bold tabular-nums ${gapFromState > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {gapFromState > 0 ? `-${gapFromState}% Shortfall` : `+${Math.abs(gapFromState)}% Surplus`}
                  </span>
                </div>
              </div>

              {/* Service Gap Strategic Implication */}
              <div className="mt-4 p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs font-mono">
                <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Supply Chain & Distributor Implication:
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {gapFromNat > 15
                    ? 'Substantial infrastructure gap indicates low primary screening. Pharmaceutical firms should partner with local retail pharmacies and NGO screening camps rather than relying solely on hospital institutional tenders.'
                    : 'High service coverage indicates robust institutional delivery pathways. Ideal candidate for secondary/tertiary oncology tenders, specialty insulin formulations, and PM-JAY hospital formulary listings.'}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => onNavigateToDistrict(selectedDistrictObj.districtId)}
                className="w-full py-2.5 px-4 text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Inspect District Health System Infrastructure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top and Bottom Rankings for Service Indicator */}
      <TopBottomRanking
        filters={filters}
        onSelectDistrict={(id) => onNavigateToDistrict(id)}
      />
    </div>
  );
};
