import React from 'react';
import { FilterState, MapViewMode } from '../types';
import { KpiGrid } from '../components/KpiGrid';
import { IndiaMap } from '../components/IndiaMap';
import { TopBottomRanking } from '../components/TopBottomRanking';
import { HeartPulse, Baby, ShieldCheck, TrendingUp, ArrowRight, Compass } from 'lucide-react';
import { INDICATOR_DEFINITIONS, STATES_DATA, DISTRICTS_DATA } from '../data/healthData';

interface ExecutiveOverviewProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onNavigateToPage: (page: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  filters,
  onFilterChange,
  onNavigateToPage
}) => {
  const currentIndicator = INDICATOR_DEFINITIONS.find(i => i.id === filters.selectedIndicatorId) || INDICATOR_DEFINITIONS[0];

  return (
    <div className="space-y-6">
      {/* Hero Executive Header */}
      <div className="glass-panel rounded-2xl p-5 lg:p-6 border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '18s' }} />
              <span>MIS ASSIGNMENT 1 · PHARMACEUTICAL DECISION SUPPORT SYSTEM</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold">OWNER: RAHUL RAJ</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-white">
              INDIA GEO-SPATIAL HEALTH INTELLIGENCE
            </h1>
            <p className="text-sm text-slate-300 font-mono mt-1 max-w-3xl">
              District-Level Health Analytics for Pharmaceutical & Healthcare Management. Transforming raw NFHS-5 survey observations into clinical vulnerability hotspots, service gap assessments, and territory allocation models.
            </p>
            <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="text-slate-500">Project Owner & Analyst:</span>
              <span className="text-cyan-300 font-bold">Rahul Raj</span>
              <span className="text-slate-600">·</span>
              <span>MBA Pharmaceutical Management</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateToPage('moi')}
              className="px-3.5 py-2 text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center gap-2"
            >
              <span>Vulnerability / MOI Heatmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToPage('action')}
              className="px-3.5 py-2 text-xs font-mono font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all flex items-center gap-2"
            >
              <span>Managerial Action Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <KpiGrid filters={filters} onDistrictClick={(id) => {
        onFilterChange({ selectedDistrict: id });
        onNavigateToPage('district');
      }} />

      {/* Main Visualizations: Map + Strategic Snapshot */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Large India Map (8 Cols) */}
        <div className="xl:col-span-8">
          <IndiaMap
            filters={filters}
            onSelectState={(stateId) => onFilterChange({ selectedState: stateId })}
            onSelectDistrict={(districtId) => {
              onFilterChange({ selectedDistrict: districtId });
              onNavigateToPage('district');
            }}
            onModeChange={(mode) => onFilterChange({ mapViewMode: mode })}
          />
        </div>

        {/* Executive Strategic Summary & Domain Hotspots (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Card 1: NCD Burden Spotlight */}
          <div 
            onClick={() => onNavigateToPage('ncd')}
            className="glass-panel-interactive rounded-2xl p-4 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <HeartPulse className="w-4 h-4 text-cyan-400" />
                  NCD BURDEN HOTSPOTS
                </span>
                <span className="text-[10px] text-slate-400 hover:text-cyan-300">Explore →</span>
              </div>
              <h4 className="font-bold text-sm text-white">Hypertension & Cardiometabolic Clusters</h4>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Southern states (Kerala 34.2%, Telangana 30.0%) and urban metros report elevated blood pressure and diabetes prevalence 25–45% above national benchmarks, demanding chronic therapy field force deployment.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>National Mean: 22.8%</span>
              <span className="text-cyan-300 font-semibold">Max Peak: Kerala (35.8%)</span>
            </div>
          </div>

          {/* Card 2: Maternal & Child Health Vulnerability */}
          <div 
            onClick={() => onNavigateToPage('maternal')}
            className="glass-panel-interactive rounded-2xl p-4 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <Baby className="w-4 h-4 text-amber-400" />
                  MATERNAL & CHILD CRITICAL ZONES
                </span>
                <span className="text-[10px] text-slate-400 hover:text-amber-300">Explore →</span>
              </div>
              <h4 className="font-bold text-sm text-white">Antenatal Gaps & Pediatric Anemia</h4>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Eastern corridor (Bihar, UP, Jharkhand) exhibits ANC 4+ coverage below 45% alongside severe child anemia exceeding 70%, creating critical demand for nutritional IFA prophylaxis and pediatrics.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Nat. Anemia: 67.1%</span>
              <span className="text-amber-400 font-semibold">Eastern Peak: 79.5%</span>
            </div>
          </div>

          {/* Card 3: Market Opportunity Index (MOI) Analytical Lens */}
          <div 
            onClick={() => onNavigateToPage('moi')}
            className="glass-panel-interactive rounded-2xl p-4 cursor-pointer flex flex-col justify-between border-cyan-500/30 bg-cyan-950/20"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  MOI ANALYTICAL CONSTRUCT
                </span>
                <span className="text-[10px] text-slate-400 hover:text-emerald-300">Inspect →</span>
              </div>
              <h4 className="font-bold text-sm text-white">Multi-Criteria Vulnerability Ranking</h4>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Synthesizing Disease Burden (40%), Service Gap (25%), Population Need (20%), and Trend (15%) to target high-priority pharmaceutical distribution and public health intervention.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">High MOI Target Count:</span>
              <span className="text-cyan-300 font-bold">18 Districts Identified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top-N & Bottom-N District Ranking Charts */}
      <TopBottomRanking
        filters={filters}
        onSelectDistrict={(districtId) => {
          onFilterChange({ selectedDistrict: districtId });
          onNavigateToPage('district');
        }}
      />
    </div>
  );
};
