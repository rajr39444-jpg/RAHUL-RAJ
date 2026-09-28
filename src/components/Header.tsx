import React from 'react';
import { Database, Download, Layers, Activity } from 'lucide-react';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenDataArchitecture: () => void;
  onExportData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  onOpenDataArchitecture,
  onExportData
}) => {
  const navItems = [
    { id: 'overview', label: '01. Overview' },
    { id: 'geo', label: '02. Geo-Spatial' },
    { id: 'ncd', label: '03. NCD Burden' },
    { id: 'maternal', label: '04. Maternal & Child' },
    { id: 'service', label: '05. Service Coverage' },
    { id: 'moi', label: '06. Vulnerability / MOI' },
    { id: 'district', label: '07. District Profile' },
    { id: 'action', label: '08. Managerial Action' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070c18]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-6 py-2.5 transition-all">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <button 
              onClick={() => setActivePage('overview')}
              className="text-left font-display font-bold text-base lg:text-lg tracking-tight text-white hover:text-cyan-300 transition-colors cursor-pointer"
            >
              GEO-SPATIAL HEALTH INTELLIGENCE
            </button>
            <div className="text-[11px] text-cyan-400/80 font-mono flex items-center gap-1.5 -mt-0.5">
              <span>INDIA</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">NFHS-5 / HMIS</span>
              <span className="text-slate-500">·</span>
              <span>Owner: <strong className="text-cyan-300 font-semibold">Rahul Raj</strong></span>
            </div>
          </div>
        </div>

        {/* Zone 2: 4-8 clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-all whitespace-nowrap rounded-md ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400">Owner:</span>
            <span className="text-cyan-200 font-bold">Rahul Raj</span>
          </div>
          <button
            onClick={onOpenDataArchitecture}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400/60 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            title="Star Schema, Power Query ETL & DAX measures"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Star Schema & ETL</span>
          </button>
          <button
            onClick={onExportData}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 hover:border-slate-500 rounded-lg transition-colors whitespace-nowrap"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Nav */}
      <div className="xl:hidden flex items-center gap-1 overflow-x-auto pt-2 pb-1 border-t border-slate-800/60 mt-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-2.5 py-1 text-[11px] font-medium transition-all whitespace-nowrap rounded ${
                isActive
                  ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
