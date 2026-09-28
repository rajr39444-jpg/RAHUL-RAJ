import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 border-t border-cyan-500/20 bg-[#060a14] py-6 px-4 lg:px-8 text-xs font-mono text-slate-400">
      <div className="max-w-[1720px] mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-cyan-400 font-bold">DATA SOURCE: </span>
              <span className="text-slate-200">NFHS-5 / Ministry of Health & Family Welfare (MoHFW) / IIPS / HMIS</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <div>
              <span className="text-cyan-400 font-bold">SURVEY PERIOD: </span>
              <span className="text-slate-200">NFHS-5 (2019–2021) District Factsheets</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-cyan-300/80">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Owner & Lead Analyst: <strong className="text-white font-bold">Rahul Raj</strong> · MBA Pharmaceutical Management · MIS Analytical Assignment 1</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-[11px] text-slate-400 leading-relaxed bg-[#0a1024]/60 p-3 rounded-xl border border-cyan-500/10">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <span className="text-slate-300 font-semibold">DISCLAIMER: </span>
            This dashboard is an analytical decision-support prototype using publicly available health data. NFHS-5 estimates represent the survey period and should not be interpreted as real-time 2026 prevalence. The MOI/Vulnerability Index is a project-specific analytical construct and is not a validated clinical or commercial score. Managerial recommendations require clinical, regulatory, and local field validation before commercial execution.
          </p>
        </div>
      </div>
    </footer>
  );
};
