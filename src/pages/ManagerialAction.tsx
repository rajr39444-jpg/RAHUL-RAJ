import React, { useState } from 'react';
import { FilterState, DistrictMetricData } from '../types';
import { DISTRICTS_DATA, STATES_DATA, INDICATOR_DEFINITIONS } from '../data/healthData';
import { 
  Briefcase, 
  Layers, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  Users, 
  Calendar, 
  Pill, 
  ShieldCheck, 
  ArrowRight,
  Database,
  Cpu,
  BrainCircuit,
  Compass
} from 'lucide-react';

interface ManagerialActionProps {
  filters: FilterState;
  onNavigateToDistrict: (districtId: string) => void;
  onOpenDataArchitecture: () => void;
}

export const ManagerialAction: React.FC<ManagerialActionProps> = ({
  filters,
  onNavigateToDistrict,
  onOpenDataArchitecture
}) => {
  const [selectedTherapyFocus, setSelectedTherapyFocus] = useState<'cardiometabolic' | 'mch_pediatrics' | 'oncology_screening' | 'supply_chain'>('cardiometabolic');

  // Identify Top 5 Target Districts for the selected managerial focus
  const getActionDistricts = () => {
    switch (selectedTherapyFocus) {
      case 'cardiometabolic':
        return [...DISTRICTS_DATA]
          .sort((a, b) => (b.metrics.hypertension + b.metrics.blood_glucose) - (a.metrics.hypertension + a.metrics.blood_glucose))
          .slice(0, 5);
      case 'mch_pediatrics':
        return [...DISTRICTS_DATA]
          .sort((a, b) => b.metrics.child_anemia - a.metrics.child_anemia)
          .slice(0, 5);
      case 'oncology_screening':
        return [...DISTRICTS_DATA]
          .sort((a, b) => b.metrics.tobacco - a.metrics.tobacco)
          .slice(0, 5);
      case 'supply_chain':
        return [...DISTRICTS_DATA]
          .sort((a, b) => b.moiComponents.moiScore - a.moiComponents.moiScore)
          .slice(0, 5);
    }
  };

  const actionDistricts = getActionDistricts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>PAGE 08 · PHARMACEUTICAL MANAGEMENT DECISION SUPPORT FRAMEWORK</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-white">
              FROM INSIGHT TO MANAGERIAL ACTION
            </h1>
            <p className="text-xs text-slate-300 font-mono mt-1 max-w-3xl leading-relaxed">
              Operationalizing public health intelligence into commercial pharma decisions: Territory realignment, field-force deployment, distributor network buffering, and chronic therapy portfolio alignment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDataArchitecture}
              className="px-3.5 py-2 text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 rounded-xl transition-all flex items-center gap-2"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Inspect Star Schema</span>
            </button>
          </div>
        </div>
      </div>

      {/* THE 4-LEVEL VALUE CREATION HIERARCHY (Mandatory Prompt Requirement) */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20">
        <h2 className="font-display font-bold text-base text-white mb-4 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-cyan-400" />
          THE 4-LEVEL MIS VALUE CREATION CHAIN: RAW DATA → MANAGERIAL ACTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {/* Level 1: Raw Data */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-400 text-[10px] font-bold tracking-wider">LEVEL 01</span>
                <Database className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1.5">RAW PUBLIC DATA</h3>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                636,699 surveyed households and facility registries across 707 districts collected by MoHFW and IIPS via NFHS-5 and HMIS.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              Artifact: Unpivoted survey sheets & fact tables
            </div>
          </div>

          {/* Level 2: Information */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-400 text-[10px] font-bold tracking-wider">LEVEL 02</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-bold text-sm text-cyan-200 mb-1.5">STRUCTURED INFO</h3>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Standardized clinical indicators, national/state benchmarks, dynamic DAX measures, dense rankings, and interactive choropleth vector geometries.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-cyan-400">
              Artifact: Star Schema & DAX Vertical Measures
            </div>
          </div>

          {/* Level 3: Knowledge */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-amber-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-400 text-[10px] font-bold tracking-wider">LEVEL 03</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-bold text-sm text-amber-200 mb-1.5">SYNTHESIZED KNOWLEDGE</h3>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Identification of geographical burden hotspots (e.g. Southern cardiometabolic belt, Eastern pediatric anemia clusters, and district health system service shortfalls).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-amber-400">
              Artifact: Multi-Criteria MOI Scores (0-100)
            </div>
          </div>

          {/* Level 4: Managerial Action */}
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-300 text-[10px] font-bold tracking-wider">LEVEL 04</span>
                <Briefcase className="w-4 h-4 text-cyan-300" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1.5">MANAGERIAL ACTION</h3>
              <p className="text-cyan-100 text-[11px] leading-relaxed">
                Commercial resource allocation: Sales-force headcount deployment, 45-day warehouse safety stock, C&F agency expansion, and therapy area portfolio alignment.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-cyan-500/30 text-[10px] text-cyan-300 font-bold">
              Outcome: Supply resilience & revenue optimization
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MANAGERIAL SIMULATION & LEVERS */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-cyan-500/15">
          <div>
            <h3 className="font-display font-bold text-base text-white">
              PHARMACEUTICAL STRATEGY SIMULATOR & FIELD PRIORITIZATION
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Select strategic therapy domain to generate targeted territory and supply chain deployment recommendations
            </p>
          </div>

          {/* Therapy Focus Selector */}
          <div className="flex items-center gap-1.5 bg-[#090f20] p-1 rounded-xl border border-cyan-500/30">
            <button
              onClick={() => setSelectedTherapyFocus('cardiometabolic')}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                selectedTherapyFocus === 'cardiometabolic'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cardiometabolic
            </button>
            <button
              onClick={() => setSelectedTherapyFocus('mch_pediatrics')}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                selectedTherapyFocus === 'mch_pediatrics'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pediatrics & RMNCH
            </button>
            <button
              onClick={() => setSelectedTherapyFocus('oncology_screening')}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                selectedTherapyFocus === 'oncology_screening'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Oncology & Screening
            </button>
            <button
              onClick={() => setSelectedTherapyFocus('supply_chain')}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                selectedTherapyFocus === 'supply_chain'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Supply Chain Buffering
            </button>
          </div>
        </div>

        {/* 6 Core Managerial Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {/* Action 1: Territory Planning */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <MapPin className="w-4 h-4 text-cyan-400" />
              1. Territory Planning & Boundary Realignment
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Consolidate contiguous high-burden districts into specialized territory clusters (e.g. Southern Cardiometabolic corridor, Eastern Micronutrient focus). Shift representative headcounts from saturated tier-1 metros into emerging tier-2/3 demand nodes.
            </p>
          </div>

          {/* Action 2: Sales Force Deployment */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Users className="w-4 h-4 text-cyan-400" />
              2. Sales-Force Deployment & Call Frequency
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Increase Medical Representative (MR) call frequency from 2×/month to 4×/month for high-prescribing endocrinologists, cardiologists, and pediatricians located in districts showing &gt;20% benchmark variance.
            </p>
          </div>

          {/* Action 3: Distributor Coverage */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Truck className="w-4 h-4 text-cyan-400" />
              3. Distributor Coverage & C&F Optimization
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Appoint secondary hub-and-spoke stockists within 15 km of top community health centres in districts where primary healthcare accessibility is below 70%, bypassing urban wholesale choke points.
            </p>
          </div>

          {/* Action 4: Inventory Prioritization */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Layers className="w-4 h-4 text-cyan-400" />
              4. Inventory Prioritization & Buffer Stock
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Maintain a 45-day rolling safety inventory of essential chronic maintenance formulations (Metformin, Telmisartan, Amlodipine, IFA syrups) in regional carrying & forwarding (C&F) depots to absorb seasonal demand spikes.
            </p>
          </div>

          {/* Action 5: Therapy-Area Planning */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Pill className="w-4 h-4 text-cyan-400" />
              5. Therapy-Area Planning & Portfolio Mix
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Tailor regional product detailing binders. Emphasize fixed-dose combination anti-hypertensives in Kerala and Punjab; emphasize fortified iron-folic acid preparations and ORS in Bihar, UP, and Jharkhand.
            </p>
          </div>

          {/* Action 6: Screening & CSR Initiatives */}
          <div className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              6. Screening Partnerships & PM-JAY Alignment
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Partner with diagnostic chains and local health authorities to fund free glucometer and BP monitoring camps in low-screening districts, converting undiagnosed cases into managed medical cohorts.
            </p>
          </div>
        </div>

        {/* Priority Target Districts for Current Focus */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm text-white font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              TOP 5 PRIORITY TARGET DISTRICTS FOR CURRENT FOCUS ({selectedTherapyFocus.toUpperCase()})
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">Ranked by analytical need</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
            {actionDistricts.map((d, i) => (
              <div
                key={d.districtId}
                onClick={() => onNavigateToDistrict(d.districtId)}
                className="p-3 rounded-xl bg-[#090f20] hover:bg-[#101b36] border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                    <span>PRIORITY #{i + 1}</span>
                    <span className="text-cyan-400">{d.tier}</span>
                  </div>
                  <div className="font-bold text-sm text-white">{d.districtName}</div>
                  <div className="text-[10px] text-slate-400">{d.stateName}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">MOI Index:</span>
                  <span className="text-cyan-300 font-bold">{d.moiComponents.moiScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MANDATORY VALIDATION NOTICE (Prompt Requirement) */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs font-mono flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-amber-300 font-bold">
            MANDATORY GOVERNANCE & COMPLIANCE DISCLAIMER
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            “Managerial actions require validation with clinical, regulatory, commercial and operational teams.” These models serve strictly as strategic decision-support simulations for MBA coursework analysis and do not replace legal, field distributor contracts, or Drug Controller General of India (DCGI) regulatory compliance audits.
          </p>
        </div>
      </div>
    </div>
  );
};
