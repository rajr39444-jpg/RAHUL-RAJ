import React, { useState } from 'react';
import { X, Database, ArrowRight, Table, Code, CheckCircle, Sparkles, Filter, Cpu } from 'lucide-react';
import { STAR_SCHEMA_TABLES, DAX_MEASURES, ETL_STEPS } from '../data/starSchema';
import { DISTRICTS_DATA, STATES_DATA, INDICATOR_DEFINITIONS } from '../data/healthData';

interface DataArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataArchitectureModal: React.FC<DataArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'star_schema' | 'etl' | 'dax' | 'quality'>('star_schema');
  const [selectedTable, setSelectedTable] = useState<string>('Fact_HealthMetrics');

  if (!isOpen) return null;

  const currentTableObj = STAR_SCHEMA_TABLES.find(t => t.name === selectedTable) || STAR_SCHEMA_TABLES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[92vh] glass-panel rounded-2xl border border-cyan-500/30 flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#070c18]/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                DATA ARCHITECTURE & POWER BI SPECIFICATIONS
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Star Schema Data Model · Power Query ETL Pipeline · DAX Measure Formulations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-[#090f20]">
          <button
            onClick={() => setActiveTab('star_schema')}
            className={`pb-2.5 px-3 text-xs font-mono font-medium transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'star_schema'
                ? 'text-cyan-300 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Power BI Star Schema</span>
          </button>
          <button
            onClick={() => setActiveTab('etl')}
            className={`pb-2.5 px-3 text-xs font-mono font-medium transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'etl'
                ? 'text-cyan-300 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Power Query ETL Flow</span>
          </button>
          <button
            onClick={() => setActiveTab('dax')}
            className={`pb-2.5 px-3 text-xs font-mono font-medium transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'dax'
                ? 'text-cyan-300 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>DAX Business Logic</span>
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            className={`pb-2.5 px-3 text-xs font-mono font-medium transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'quality'
                ? 'text-cyan-300 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Data Quality & Provenance</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-140px)] space-y-6">
          {/* 1. STAR SCHEMA TAB */}
          {activeTab === 'star_schema' && (
            <div className="space-y-6">
              {/* Star Schema Interactive Diagram */}
              <div className="p-5 rounded-xl bg-[#090f22] border border-cyan-500/20 text-center">
                <div className="text-xs font-mono text-cyan-400 mb-4 tracking-wider">
                  POWER BI STAR SCHEMA RELATIONSHIP TOPOLOGY (1-TO-MANY 1:*)
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
                  {/* Top / Left Dimensions */}
                  <div className="flex flex-col gap-3 w-full md:w-56">
                    <button
                      onClick={() => setSelectedTable('Dim_Geography')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedTable === 'Dim_Geography'
                          ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-cyan-300">Dim_Geography</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">State, District, Tier, Zone, Centroid</div>
                      <div className="text-[9px] font-mono text-cyan-500 mt-1">PK: GeographyKey [1:*]</div>
                    </button>

                    <button
                      onClick={() => setSelectedTable('Dim_Indicator')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedTable === 'Dim_Indicator'
                          ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-cyan-300">Dim_Indicator</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Name, Group, Direction, Benchmark</div>
                      <div className="text-[9px] font-mono text-cyan-500 mt-1">PK: IndicatorKey [1:*]</div>
                    </button>
                  </div>

                  {/* Central Fact Table */}
                  <div className="w-full md:w-72">
                    <button
                      onClick={() => setSelectedTable('Fact_HealthMetrics')}
                      className={`p-4 rounded-xl border text-center transition-all w-full ${
                        selectedTable === 'Fact_HealthMetrics'
                          ? 'bg-cyan-950/90 border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                          : 'bg-[#0f1b38] border-cyan-500/40 hover:border-cyan-300'
                      }`}
                    >
                      <div className="text-[10px] text-cyan-400 font-mono tracking-wider">CENTRAL FACT TABLE</div>
                      <div className="font-display font-bold text-base text-white mt-1">Fact_HealthMetrics</div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        Aggregated Public Health Survey Observations
                      </div>
                      <div className="mt-2 pt-2 border-t border-cyan-500/20 text-[10px] font-mono text-cyan-400">
                        Measures: Value, StandardError, Sample Size
                      </div>
                    </button>
                  </div>

                  {/* Bottom / Right Dimensions */}
                  <div className="flex flex-col gap-3 w-full md:w-56">
                    <button
                      onClick={() => setSelectedTable('Dim_Source')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedTable === 'Dim_Source'
                          ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-cyan-300">Dim_Source</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">NFHS-5, HMIS, IIPS / MoHFW</div>
                      <div className="text-[9px] font-mono text-cyan-500 mt-1">PK: SourceKey [1:*]</div>
                    </button>

                    <button
                      onClick={() => setSelectedTable('Dim_Time')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedTable === 'Dim_Time'
                          ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-cyan-300">Dim_Time</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Year, Period, Round (2019-2021)</div>
                      <div className="text-[9px] font-mono text-cyan-500 mt-1">PK: TimeKey [1:*]</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Selected Table Data Dictionary */}
              <div className="p-5 rounded-xl bg-[#090f20] border border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-mono font-bold text-sm text-cyan-300">
                      Table Schema: {currentTableObj.name} ({currentTableObj.type})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{currentTableObj.description}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-1 rounded bg-slate-800 border border-slate-700">
                    {currentTableObj.columns.length} Columns
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900/90 text-cyan-400 border-b border-slate-800">
                      <tr>
                        <th className="py-2 px-3">Column Name</th>
                        <th className="py-2 px-3">Data Type</th>
                        <th className="py-2 px-3">Key Type</th>
                        <th className="py-2 px-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-300">
                      {currentTableObj.columns.map((col) => (
                        <tr key={col.name} className="hover:bg-slate-800/40">
                          <td className="py-2 px-3 font-semibold text-white">{col.name}</td>
                          <td className="py-2 px-3 text-cyan-400">{col.type}</td>
                          <td className="py-2 px-3">
                            {col.keyType === 'PK' && (
                              <span className="text-[10px] text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40 font-bold">
                                PRIMARY KEY
                              </span>
                            )}
                            {col.keyType === 'FK' && (
                              <span className="text-[10px] text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/40">
                                FOREIGN KEY
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-slate-400">{col.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. POWER QUERY ETL FLOW TAB */}
          {activeTab === 'etl' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                <h3 className="font-display font-bold text-sm text-cyan-300 mb-1">
                  POWER QUERY ETL ARCHITECTURE: RAW DATA → ENTERPRISE READY
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  Standardized extraction, transformation, imputation, and validation flow representing standard Power BI deployment.
                </p>
              </div>

              <div className="space-y-3">
                {ETL_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-xl bg-[#090f20] border border-slate-800 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                          {step.step}
                        </span>
                        <h4 className="font-bold text-sm text-white font-mono">{step.name}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                        {step.tool}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-2">
                      <div>
                        <span className="text-slate-400 font-mono text-[11px]">Input Artifact:</span>
                        <div className="text-slate-200 mt-0.5 font-mono text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
                          {step.input}
                        </div>
                      </div>
                      <div>
                        <span className="text-cyan-400 font-mono text-[11px]">Transformation Operation:</span>
                        <div className="text-slate-200 mt-0.5 font-mono text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
                          {step.operation}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. DAX BUSINESS LOGIC TAB */}
          {activeTab === 'dax' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                <h3 className="font-display font-bold text-sm text-cyan-300 mb-1">
                  POWER BI DAX ENGINE FORMULATION REPOSITORY
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  Exact DAX measure logic powering the dashboard slicers, dynamic rank calculations, and variance expressions.
                </p>
              </div>

              <div className="space-y-4">
                {DAX_MEASURES.map((measure) => (
                  <div key={measure.title} className="p-4 rounded-xl bg-[#090f20] border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-mono text-sm font-bold text-white flex items-center gap-2">
                        <Code className="w-4 h-4 text-cyan-400" />
                        {measure.title}
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                        {measure.businessName}
                      </span>
                    </div>

                    <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800 overflow-x-auto leading-relaxed">
                      {measure.code}
                    </pre>

                    <div className="text-xs text-slate-400 font-mono mt-2">
                      <span className="text-cyan-400 font-semibold">Analytical Purpose: </span>
                      {measure.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. DATA QUALITY & PROVENANCE TAB */}
          {activeTab === 'quality' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-[#090f20] border border-cyan-500/20">
                  <div className="text-[10px] text-slate-400">RECORDS LOADED</div>
                  <div className="text-2xl font-bold text-white tabular-nums">1,036</div>
                  <div className="text-[10px] text-cyan-400 mt-0.5">District × Metric Matrix</div>
                </div>

                <div className="p-3 rounded-xl bg-[#090f20] border border-cyan-500/20">
                  <div className="text-[10px] text-slate-400">MISSING VALUES</div>
                  <div className="text-2xl font-bold text-emerald-400 tabular-nums">0.00%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Cleaned & Imputed</div>
                </div>

                <div className="p-3 rounded-xl bg-[#090f20] border border-cyan-500/20">
                  <div className="text-[10px] text-slate-400">DUPLICATE ROWS</div>
                  <div className="text-2xl font-bold text-emerald-400 tabular-nums">0</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Verified Primary Keys</div>
                </div>

                <div className="p-3 rounded-xl bg-[#090f20] border border-cyan-500/20">
                  <div className="text-[10px] text-slate-400">BENCHMARK DRIFT</div>
                  <div className="text-2xl font-bold text-cyan-300 tabular-nums">&lt;0.05%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Reconciled to MoHFW</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090f20] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono font-bold text-sm text-white">DATA CITATION & METHODOLOGY</h4>
                  <div className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
                    Owner & Lead Analyst: <strong className="text-white">Rahul Raj</strong>
                  </div>
                </div>
                <div className="text-xs text-slate-300 space-y-2 font-mono leading-relaxed">
                  <p>
                    <span className="text-cyan-400 font-semibold">1. NFHS-5 (2019-2021): </span>
                    National Family Health Survey round 5 conducted by International Institute for Population Sciences (IIPS), Mumbai, designated by the Ministry of Health and Family Welfare (MoHFW), Government of India. Sampling multi-stage stratified cluster design covering 636,699 households across India.
                  </p>
                  <p>
                    <span className="text-cyan-400 font-semibold">2. HMIS (Health Management Information System): </span>
                    Facility-level monthly reporting portal maintained by MoHFW covering public healthcare centres (Sub-Centres, PHCs, CHCs, Sub-District and District Hospitals). Used to supplement service delivery and accessibility indicators.
                  </p>
                  <p>
                    <span className="text-cyan-400 font-semibold">3. Academic Ownership: </span>
                    Authored by <strong className="text-white">Rahul Raj</strong> for MBA Pharmaceutical Management MIS Assignment 1 (Geo-Spatial Health Intelligence Decision Support Prototype).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
