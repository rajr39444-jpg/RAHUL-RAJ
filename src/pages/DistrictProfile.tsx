import React from 'react';
import { FilterState, DistrictMetricData, IndicatorDefinition } from '../types';
import { INDICATOR_DEFINITIONS, DISTRICTS_DATA, STATES_DATA } from '../data/healthData';
import { 
  Building2, 
  MapPin, 
  HeartPulse, 
  Baby, 
  ShieldAlert, 
  Layers, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  AlertCircle, 
  Truck, 
  Pill,
  Users
} from 'lucide-react';

interface DistrictProfileProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onNavigateToPage: (page: string) => void;
}

export const DistrictProfile: React.FC<DistrictProfileProps> = ({
  filters,
  onFilterChange,
  onNavigateToPage
}) => {
  // Current district object
  const currentDistrict = DISTRICTS_DATA.find(d => d.districtId === filters.selectedDistrict) || DISTRICTS_DATA[0];
  const currentState = STATES_DATA.find(s => s.stateId === currentDistrict.stateId) || STATES_DATA[0];

  const currentIndicator = INDICATOR_DEFINITIONS.find(i => i.id === filters.selectedIndicatorId) || INDICATOR_DEFINITIONS[0];
  const activeValue = currentDistrict.metrics[currentIndicator.id as keyof DistrictMetricData['metrics']];
  const natBenchmark = currentIndicator.nationalBenchmark;
  const stateBenchmark = currentState.averages[currentIndicator.id] || natBenchmark;

  const natVariance = Number((((activeValue - natBenchmark) / natBenchmark) * 100).toFixed(1));
  const stateVariance = Number((((activeValue - stateBenchmark) / stateBenchmark) * 100).toFixed(1));

  // Rank calculation
  const ranked = [...DISTRICTS_DATA].sort((a, b) => {
    const k = currentIndicator.id as keyof DistrictMetricData['metrics'];
    return b.metrics[k] - a.metrics[k];
  });
  const districtRank = ranked.findIndex(d => d.districtId === currentDistrict.districtId) + 1;

  // Breakdown sets
  const ncdIndicators = INDICATOR_DEFINITIONS.filter(i => i.category === 'NCD');
  const mchIndicators = INDICATOR_DEFINITIONS.filter(i => i.category === 'Maternal & Child');
  const serviceIndicators = INDICATOR_DEFINITIONS.filter(i => i.category === 'Service Coverage');

  // Identify highest burden indicator for this district
  const highBurdenNcd = [...ncdIndicators].sort((a, b) => {
    const va = currentDistrict.metrics[a.id as keyof DistrictMetricData['metrics']];
    const vb = currentDistrict.metrics[b.id as keyof DistrictMetricData['metrics']];
    return (vb - b.nationalBenchmark) - (va - a.nationalBenchmark);
  })[0];

  // Identify greatest service deficit
  const greatestServiceGap = [...serviceIndicators].sort((a, b) => {
    const va = currentDistrict.metrics[a.id as keyof DistrictMetricData['metrics']];
    const vb = currentDistrict.metrics[b.id as keyof DistrictMetricData['metrics']];
    return (a.nationalBenchmark - va) - (b.nationalBenchmark - vb);
  })[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>PAGE 07 · DRILL-THROUGH EPIDEMIOLOGICAL PROFILE</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white">
              {currentDistrict.districtName.toUpperCase()} HEALTH INTELLIGENCE PROFILE
            </h1>
            <div className="text-xs text-slate-300 font-mono flex flex-wrap items-center gap-3 mt-1.5">
              <span>State: <strong className="text-cyan-300">{currentDistrict.stateName}</strong></span>
              <span className="text-slate-600">·</span>
              <span>Tier: <strong className="text-white">{currentDistrict.tier}</strong></span>
              <span className="text-slate-600">·</span>
              <span>Zone: <strong className="text-white">{currentDistrict.zone}</strong></span>
              <span className="text-slate-600">·</span>
              <span>Est. Population: <strong className="text-white">{(currentDistrict.population / 1000000).toFixed(2)}M</strong></span>
              <span className="text-slate-600">·</span>
              <span>Survey: <strong className="text-cyan-400">NFHS-5 (2019-2021)</strong></span>
            </div>
          </div>

          {/* Quick District Switcher Dropdown */}
          <div className="flex items-center gap-2 shrink-0 bg-[#090f20] p-2 rounded-xl border border-cyan-500/30">
            <span className="text-xs font-mono text-slate-400">Switch District:</span>
            <select
              value={currentDistrict.districtId}
              onChange={(e) => onFilterChange({ selectedDistrict: e.target.value })}
              className="bg-slate-900 text-xs font-mono font-bold text-cyan-300 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {DISTRICTS_DATA.map((d) => (
                <option key={d.districtId} value={d.districtId}>
                  {d.districtName} ({d.stateId})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 7 KPI Cards for District Specifics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 font-mono text-xs">
        <div className="glass-panel rounded-xl p-3 border-cyan-500/30">
          <div className="text-[10px] text-cyan-400 uppercase">Current Value</div>
          <div className="text-2xl font-bold text-cyan-300 tabular-nums mt-0.5">
            {activeValue.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">{currentIndicator.name.split('/')[0]}</div>
        </div>

        <div className="glass-panel rounded-xl p-3">
          <div className="text-[10px] text-slate-400 uppercase">Nat. Benchmark</div>
          <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
            {natBenchmark.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">All-India NFHS-5</div>
        </div>

        <div className="glass-panel rounded-xl p-3">
          <div className="text-[10px] text-slate-400 uppercase">State Benchmark</div>
          <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
            {stateBenchmark.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">{currentState.stateName} Avg</div>
        </div>

        <div className="glass-panel rounded-xl p-3">
          <div className="text-[10px] text-slate-400 uppercase">Nat. Variance %</div>
          <div className={`text-2xl font-bold tabular-nums mt-0.5 ${natVariance > 0 ? (currentIndicator.direction === 'higher_is_worse' ? 'text-rose-400' : 'text-emerald-400') : (currentIndicator.direction === 'higher_is_worse' ? 'text-emerald-400' : 'text-rose-400')}`}>
            {natVariance > 0 ? `+${natVariance}%` : `${natVariance}%`}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">vs All-India Baseline</div>
        </div>

        <div className="glass-panel rounded-xl p-3">
          <div className="text-[10px] text-slate-400 uppercase">State Variance %</div>
          <div className={`text-2xl font-bold tabular-nums mt-0.5 ${stateVariance > 0 ? 'text-cyan-300' : 'text-slate-400'}`}>
            {stateVariance > 0 ? `+${stateVariance}%` : `${stateVariance}%`}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">vs Intra-State Baseline</div>
        </div>

        <div className="glass-panel rounded-xl p-3">
          <div className="text-[10px] text-slate-400 uppercase">District Rank</div>
          <div className="text-2xl font-bold text-amber-300 tabular-nums mt-0.5">
            #{districtRank}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Dense Ranking</div>
        </div>

        <div className="glass-panel rounded-xl p-3 border-cyan-500/30">
          <div className="text-[10px] text-cyan-400 uppercase">MOI Score</div>
          <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
            {currentDistrict.moiComponents.moiScore}
          </div>
          <div className="text-[10px] text-cyan-300 mt-0.5 font-bold">{currentDistrict.moiComponents.category}</div>
        </div>
      </div>

      {/* 3 Domain Pillars: NCD, Maternal & Child, Service Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pillar 1: Chronic NCD Epidemiology */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15 mb-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                NCD CO-MORBIDITY SPECTRUM
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {ncdIndicators.map((ind) => {
                const val = currentDistrict.metrics[ind.id as keyof DistrictMetricData['metrics']];
                const bench = ind.nationalBenchmark;
                const isOver = val > bench;

                return (
                  <div key={ind.id} className="p-2.5 rounded-lg bg-[#090f20] border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-[11px]">{ind.name.split('/')[0]}</span>
                      <span className="text-white font-bold tabular-nums">{val.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isOver ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-500'}`}
                        style={{ width: `${Math.min(100, (val / 60) * 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span>Nat. Benchmark: {bench}%</span>
                      <span className={isOver ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {isOver ? `+${(val - bench).toFixed(1)}%` : `${(val - bench).toFixed(1)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pillar 2: Maternal & Child Continuum of Care */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15 mb-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Baby className="w-4 h-4 text-cyan-400" />
                MATERNAL & CHILD CONTINUUM
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {mchIndicators.map((ind) => {
                const val = currentDistrict.metrics[ind.id as keyof DistrictMetricData['metrics']];
                const bench = ind.nationalBenchmark;
                const isPos = ind.direction === 'higher_is_better';
                const isGood = isPos ? val >= bench : val <= bench;

                return (
                  <div key={ind.id} className="p-2.5 rounded-lg bg-[#090f20] border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-[11px]">{ind.name.split('(')[0]}</span>
                      <span className="text-white font-bold tabular-nums">{val.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isGood ? 'bg-gradient-to-r from-cyan-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-rose-500'}`}
                        style={{ width: `${Math.min(100, val)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span>Benchmark: {bench}%</span>
                      <span className={isGood ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {val >= bench ? `+${(val - bench).toFixed(1)}%` : `${(val - bench).toFixed(1)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pillar 3: Health System Capacity & Insurance */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15 mb-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                SERVICE INFRASTRUCTURE & ACCESS
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {serviceIndicators.map((ind) => {
                const val = currentDistrict.metrics[ind.id as keyof DistrictMetricData['metrics']];
                const bench = ind.nationalBenchmark;
                const isOver = val >= bench;

                return (
                  <div key={ind.id} className="p-2.5 rounded-lg bg-[#090f20] border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-[11px]">{ind.name.split('(')[0]}</span>
                      <span className="text-white font-bold tabular-nums">{val.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isOver ? 'bg-gradient-to-r from-cyan-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-rose-500'}`}
                        style={{ width: `${Math.min(100, Math.max(10, (val / 100) * 100))}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span>Benchmark: {bench}%</span>
                      <span className={isOver ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {val >= bench ? `+${(val - bench).toFixed(1)}%` : `${(val - bench).toFixed(1)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MANAGERIAL INTERPRETATION SECTION (Mandatory Prompt Requirement) */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/20">
          <Briefcase className="w-5 h-5 text-cyan-400" />
          <h2 className="font-display font-extrabold text-lg text-white">
            MANAGERIAL INTERPRETATION & PHARMACEUTICAL STRATEGY MATRIX
          </h2>
          <span className="text-xs font-mono text-cyan-400 ml-auto hidden sm:inline">
            MBA Pharmaceutical Management MIS Decision Support
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          {/* Section 1: Health Need */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/20 space-y-2">
            <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
              <HeartPulse className="w-4 h-4" />
              1. EPIDEMIOLOGICAL HEALTH NEED
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong className="text-white">Primary Burden Indicator: </strong> 
              {highBurdenNcd.name} is recorded at <span className="text-rose-300 font-bold">{currentDistrict.metrics[highBurdenNcd.id as keyof DistrictMetricData['metrics']]}%</span> vs national benchmark of {highBurdenNcd.nationalBenchmark}%.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Indicates concentrated chronic risk and high clinical recurrence. Target cohort requires sustained adherence monitoring, multi-dose blister packaging, and secondary prevention interventions.
            </p>
          </div>

          {/* Section 2: Service Gap */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-amber-500/20 space-y-2">
            <div className="text-amber-400 font-bold flex items-center gap-1.5 text-sm">
              <AlertCircle className="w-4 h-4" />
              2. HEALTHCARE SERVICE GAP
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong className="text-white">Critical Deficit: </strong> 
              {greatestServiceGap.name.split('(')[0]} coverage is currently at <span className="text-amber-300 font-bold">{currentDistrict.metrics[greatestServiceGap.id as keyof DistrictMetricData['metrics']]}%</span>, leaving a shortfall of {(greatestServiceGap.nationalBenchmark - currentDistrict.metrics[greatestServiceGap.id as keyof DistrictMetricData['metrics']]).toFixed(1)}% against the national standard.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Reflects potential bottlenecks in primary tier delivery, cold chain logistics, or diagnostic outreach. Direct retail chemist stocking is vital to offset public hospital procurement delays.
            </p>
          </div>

          {/* Section 3: Managerial Implication */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
            <div className="text-cyan-300 font-bold flex items-center gap-1.5 text-sm">
              <Truck className="w-4 h-4" />
              3. MANAGERIAL & COMMERCIAL ACTION
            </div>
            <p className="text-slate-200 leading-relaxed text-[11px]">
              <strong className="text-cyan-400">Territory & Field Deployment: </strong> 
              Allocate {currentDistrict.tier === 'Metro' || currentDistrict.tier === 'Tier-1' ? 'dedicated institutional key account managers' : 'hub-and-spoke distributor reps'} targeting high-volume retail pharmacies within a 5km radius of top clinics.
            </p>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong className="text-cyan-400">Inventory Prioritization: </strong> 
              Buffer 45-day safety stock for oral hypoglycaemic agents, anti-hypertensives, and pediatric nutritional drops to prevent stockouts in Tier-2/3 retail hubs.
            </p>
          </div>
        </div>

        {/* Regulatory & Clinical Notice */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>IMPORTANT: </strong> 
            These represent decision-support management insights for resource allocation and territory prioritization. They must NOT be interpreted as individual clinical treatment prescriptions.
          </span>
        </div>
      </div>
    </div>
  );
};
