import React from 'react';
import { FilterState, DistrictMetricData, IndicatorDefinition } from '../types';
import { INDICATOR_DEFINITIONS, DISTRICTS_DATA, STATES_DATA } from '../data/healthData';
import { ArrowUpRight, ArrowDownRight, Target, Award } from 'lucide-react';

interface TopBottomRankingProps {
  filters: FilterState;
  onSelectDistrict: (districtId: string) => void;
}

export const TopBottomRanking: React.FC<TopBottomRankingProps> = ({
  filters,
  onSelectDistrict
}) => {
  const currentIndicator = INDICATOR_DEFINITIONS.find(i => i.id === filters.selectedIndicatorId) || INDICATOR_DEFINITIONS[0];
  const natBenchmark = currentIndicator.nationalBenchmark;
  const isWorse = currentIndicator.direction === 'higher_is_worse';

  // Base dataset filtered by state if selected
  const baseData = filters.selectedState === 'all'
    ? DISTRICTS_DATA
    : DISTRICTS_DATA.filter(d => d.stateId === filters.selectedState);

  const metricKey = currentIndicator.id as keyof DistrictMetricData['metrics'];

  // Sorted descending
  const sortedDesc = [...baseData].sort((a, b) => b.metrics[metricKey] - a.metrics[metricKey]);
  // Sorted ascending
  const sortedAsc = [...baseData].sort((a, b) => a.metrics[metricKey] - b.metrics[metricKey]);

  const topNDistricts = sortedDesc.slice(0, filters.topN);
  const bottomNDistricts = sortedAsc.slice(0, filters.topN);

  // Maximum value for scaling horizontal bars
  const maxVal = Math.max(...baseData.map(d => d.metrics[metricKey]), natBenchmark, 1);

  const renderRankingCard = (
    title: string,
    subtitle: string,
    districts: DistrictMetricData[],
    isTop: boolean
  ) => {
    return (
      <div className="glass-panel rounded-2xl p-4 flex flex-col h-full border border-cyan-500/20">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15 mb-3">
          <div>
            <h3 className="font-display font-bold text-sm lg:text-base text-white flex items-center gap-2">
              {isTop ? (
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-emerald-400" />
              )}
              {title} (Top {filters.topN})
            </h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{subtitle}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-500">Nat. Benchmark</span>
            <div className="text-xs font-mono font-bold text-cyan-300">
              {natBenchmark}%
            </div>
          </div>
        </div>

        {/* District Horizontal Bars */}
        <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
          {districts.map((district, idx) => {
            const val = district.metrics[metricKey];
            const stateBenchmark = STATES_DATA.find(s => s.stateId === district.stateId)?.averages[currentIndicator.id] || natBenchmark;
            const natVariance = Number((((val - natBenchmark) / natBenchmark) * 100).toFixed(1));
            const stateVariance = Number((((val - stateBenchmark) / stateBenchmark) * 100).toFixed(1));
            const widthPct = Math.min(100, Math.max(8, (val / (maxVal * 1.05)) * 100));

            const isSelected = filters.selectedDistrict === district.districtId;

            // Bar color logic
            let barColor = 'bg-cyan-500/80';
            if (isWorse) {
              barColor = val > natBenchmark ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-500';
            } else {
              barColor = val >= natBenchmark ? 'bg-gradient-to-r from-cyan-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-rose-500';
            }

            return (
              <div
                key={district.districtId}
                onClick={() => onSelectDistrict(district.districtId)}
                className={`p-2 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-[#0b1328]/60 hover:bg-[#101c38]/80 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-cyan-400/90 w-5">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold text-white hover:text-cyan-300 transition-colors">
                      {district.districtName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ({district.stateId})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[10px] text-slate-400">
                      MOI: <span className="text-slate-200 font-medium">{district.moiComponents.moiScore}</span>
                    </span>
                    <span className="text-xs font-bold text-white tabular-nums">
                      {val.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Bar track and fill */}
                <div className="w-full bg-slate-900/90 h-2 rounded-full overflow-hidden relative border border-slate-800/80">
                  {/* National benchmark hairline marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white z-10 opacity-70"
                    style={{ left: `${Math.min(100, (natBenchmark / (maxVal * 1.05)) * 100)}%` }}
                    title={`National Benchmark: ${natBenchmark}%`}
                  />
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>

                {/* Subtext info */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>
                    Nat Var: <span className={natVariance > 0 ? (isWorse ? 'text-rose-400' : 'text-emerald-400') : (isWorse ? 'text-emerald-400' : 'text-rose-400')}>
                      {natVariance > 0 ? `+${natVariance}%` : `${natVariance}%`}
                    </span>
                  </span>
                  <span>
                    State Var: <span className={stateVariance > 0 ? 'text-cyan-400' : 'text-slate-400'}>
                      {stateVariance > 0 ? `+${stateVariance}%` : `${stateVariance}%`}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      {/* Highest Values */}
      {renderRankingCard(
        isWorse ? 'HIGHEST BURDEN DISTRICTS' : 'HIGHEST COVERAGE DISTRICTS',
        isWorse ? 'Districts requiring prioritized clinical & distribution intervention' : 'Exemplary districts outperforming national benchmarks',
        topNDistricts,
        true
      )}

      {/* Lowest Values */}
      {renderRankingCard(
        isWorse ? 'LOWEST BURDEN DISTRICTS' : 'CRITICAL SERVICE GAP DISTRICTS',
        isWorse ? 'Districts with lowest reported incidence of this health risk' : 'Districts severely lagging behind service delivery targets',
        bottomNDistricts,
        false
      )}
    </div>
  );
};
