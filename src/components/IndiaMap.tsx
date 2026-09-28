import React, { useState } from 'react';
import { FilterState, DistrictMetricData, MapViewMode, IndicatorDefinition } from '../types';
import { INDIA_STATE_PATHS, DISTRICT_MAP_COORDS } from '../data/indiaMapData';
import { STATES_DATA, DISTRICTS_DATA, INDICATOR_DEFINITIONS } from '../data/healthData';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Layers, Info } from 'lucide-react';

interface IndiaMapProps {
  filters: FilterState;
  onSelectState: (stateId: string) => void;
  onSelectDistrict: (districtId: string) => void;
  onModeChange: (mode: MapViewMode) => void;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  filters,
  onSelectState,
  onSelectDistrict,
  onModeChange
}) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictMetricData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentIndicator = INDICATOR_DEFINITIONS.find(i => i.id === filters.selectedIndicatorId) || INDICATOR_DEFINITIONS[0];
  const natBenchmark = currentIndicator.nationalBenchmark;

  // Determine color fill for state based on map mode
  const getStateColor = (stateId: string) => {
    const stateObj = STATES_DATA.find(s => s.stateId === stateId);
    if (!stateObj) return 'rgba(30, 41, 59, 0.4)';

    if (filters.mapViewMode === 'moi') {
      const moi = stateObj.avgMoi;
      if (moi >= 70) return 'rgba(239, 68, 68, 0.7)'; // High/Very High
      if (moi >= 55) return 'rgba(245, 158, 11, 0.65)'; // Moderate High
      if (moi >= 45) return 'rgba(6, 182, 212, 0.55)'; // Moderate
      return 'rgba(16, 185, 129, 0.55)'; // Low
    }

    if (filters.mapViewMode === 'service_gap') {
      const ins = stateObj.averages.health_insurance || 40;
      const del = stateObj.averages.institutional_delivery || 90;
      const gap = 100 - ((ins + del) / 2);
      if (gap > 45) return 'rgba(239, 68, 68, 0.7)';
      if (gap > 30) return 'rgba(245, 158, 11, 0.6)';
      return 'rgba(16, 185, 129, 0.55)';
    }

    // Default: Disease burden / Selected indicator
    const val = stateObj.averages[currentIndicator.id] ?? natBenchmark;
    const isWorse = currentIndicator.direction === 'higher_is_worse';
    const variance = ((val - natBenchmark) / natBenchmark) * 100;

    if (isWorse) {
      if (variance > 25) return 'rgba(239, 68, 68, 0.75)'; // Crimson
      if (variance > 5) return 'rgba(245, 158, 11, 0.65)'; // Amber
      if (variance > -15) return 'rgba(6, 182, 212, 0.55)'; // Cyan
      return 'rgba(16, 185, 129, 0.55)'; // Emerald
    } else {
      if (variance > 10) return 'rgba(16, 185, 129, 0.7)'; // High coverage (good)
      if (variance > -10) return 'rgba(6, 182, 212, 0.55)';
      if (variance > -25) return 'rgba(245, 158, 11, 0.65)';
      return 'rgba(239, 68, 68, 0.75)'; // Low coverage (poor)
    }
  };

  // Districts to display (if a state is selected, or all districts)
  const displayDistricts = filters.selectedState === 'all'
    ? DISTRICTS_DATA
    : DISTRICTS_DATA.filter(d => d.stateId === filters.selectedState);

  // Ranked districts for rank calculation
  const rankedDistricts = [...DISTRICTS_DATA].sort((a, b) => {
    const key = currentIndicator.id as keyof DistrictMetricData['metrics'];
    return b.metrics[key] - a.metrics[key];
  });

  const getDistrictRank = (districtId: string) => {
    const index = rankedDistricts.findIndex(d => d.districtId === districtId);
    return index !== -1 ? index + 1 : '-';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className={`relative glass-panel rounded-2xl overflow-hidden border border-cyan-500/20 transition-all ${
      isFullScreen ? 'fixed inset-4 z-50 bg-[#070c18] flex flex-col' : 'w-full h-full min-h-[580px]'
    }`}>
      {/* Map Control Overlay Header */}
      <div className="absolute top-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="bg-[#090f20]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 shadow-md">
            <span className="text-xs font-mono font-medium text-cyan-300">
              {filters.selectedState === 'all' ? 'INDIA GEO-SPATIAL CHOROPLETH' : `${STATES_DATA.find(s => s.stateId === filters.selectedState)?.stateName.toUpperCase()} DISTRICT VIEW`}
            </span>
            <span className="text-[10px] text-slate-400 font-mono ml-2">
              (Metric: {currentIndicator.name})
            </span>
          </div>

          {filters.selectedState !== 'all' && (
            <button
              onClick={() => onSelectState('all')}
              className="pointer-events-auto text-xs bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              ← Back to All-India
            </button>
          )}
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#090f20]/90 backdrop-blur-md p-1 rounded-lg border border-slate-700/60 shadow-md">
          {/* Map Mode Buttons */}
          <button
            onClick={() => onModeChange('disease_burden')}
            className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
              filters.mapViewMode === 'disease_burden' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Disease Burden
          </button>
          <button
            onClick={() => onModeChange('service_gap')}
            className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
              filters.mapViewMode === 'service_gap' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Service Gap
          </button>
          <button
            onClick={() => onModeChange('moi')}
            className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
              filters.mapViewMode === 'moi' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MOI Score
          </button>

          <span className="text-slate-600">|</span>

          {/* Zoom controls */}
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
            className="p-1 text-slate-400 hover:text-slate-200"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
            className="p-1 text-slate-400 hover:text-slate-200"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1 text-slate-400 hover:text-slate-200"
            title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div 
        className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <svg
          viewBox="0 0 800 860"
          className="w-full h-full max-h-[720px] transition-transform duration-300 select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Subtle radar background circles */}
          <circle cx="400" cy="460" r="380" fill="none" stroke="rgba(6, 182, 212, 0.05)" strokeDasharray="4 6" />
          <circle cx="400" cy="460" r="260" fill="none" stroke="rgba(6, 182, 212, 0.05)" />
          <circle cx="400" cy="460" r="140" fill="none" stroke="rgba(6, 182, 212, 0.04)" />
          <line x1="400" y1="40" x2="400" y2="840" stroke="rgba(6, 182, 212, 0.04)" strokeDasharray="3 3" />
          <line x1="40" y1="460" x2="760" y2="460" stroke="rgba(6, 182, 212, 0.04)" strokeDasharray="3 3" />

          {/* State Polygons */}
          <g>
            {INDIA_STATE_PATHS.map((state) => {
              const isSelected = filters.selectedState === state.id;
              const isHovered = hoveredState === state.id;
              const fillColor = getStateColor(state.id);

              return (
                <g key={state.id}>
                  <path
                    d={state.path}
                    fill={fillColor}
                    stroke={isSelected ? '#00f2fe' : isHovered ? '#38bdf8' : 'rgba(56, 189, 248, 0.25)'}
                    strokeWidth={isSelected ? '2.5' : isHovered ? '2' : '1'}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredState(state.id)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => onSelectState(state.id)}
                    style={{
                      filter: isSelected ? 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))' : isHovered ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.35))' : 'none'
                    }}
                  />
                  {/* State Name Label */}
                  <text
                    x={state.labelPos[0]}
                    y={state.labelPos[1]}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : 'rgba(226, 232, 240, 0.75)'}
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                    fontWeight={isSelected ? '700' : '500'}
                    className="pointer-events-none select-none"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
                  >
                    {state.id}
                  </text>
                </g>
              );
            })}
          </g>

          {/* District Pins / Centroids */}
          <g>
            {displayDistricts.map((district) => {
              const coords = DISTRICT_MAP_COORDS[district.districtId];
              if (!coords) return null;

              const isDistrictSelected = filters.selectedDistrict === district.districtId;
              const isDistrictHovered = hoveredDistrict?.districtId === district.districtId;
              const key = currentIndicator.id as keyof DistrictMetricData['metrics'];
              const val = district.metrics[key];

              // Node radius & color
              const radius = isDistrictSelected ? 7 : isDistrictHovered ? 6 : 4;

              return (
                <g
                  key={district.districtId}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredDistrict(district)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDistrict(district.districtId);
                  }}
                >
                  {/* Subtle pulsing outer ring for selected */}
                  {isDistrictSelected && (
                    <circle
                      cx={coords[0]}
                      cy={coords[1]}
                      r="14"
                      fill="none"
                      stroke="#00f2fe"
                      strokeWidth="1.5"
                      className="animate-ping opacity-60"
                    />
                  )}

                  {/* Outer circle */}
                  <circle
                    cx={coords[0]}
                    cy={coords[1]}
                    r={radius}
                    fill={isDistrictSelected ? '#00f2fe' : '#0f172a'}
                    stroke={isDistrictSelected ? '#ffffff' : '#38bdf8'}
                    strokeWidth="1.8"
                    style={{
                      filter: isDistrictSelected ? 'drop-shadow(0 0 10px #00f2fe)' : 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.4))'
                    }}
                  />

                  {/* Centroid dot */}
                  <circle
                    cx={coords[0]}
                    cy={coords[1]}
                    r={radius - 2}
                    fill={isDistrictSelected ? '#0284c7' : '#38bdf8'}
                  />

                  {/* District label (shown if hovered, selected or state focused) */}
                  {(isDistrictSelected || isDistrictHovered || filters.selectedState !== 'all') && (
                    <text
                      x={coords[0]}
                      y={coords[1] - 9}
                      textAnchor="middle"
                      fill={isDistrictSelected ? '#00f2fe' : '#ffffff'}
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      fontWeight="600"
                      className="pointer-events-none"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
                    >
                      {district.districtName} ({val}%)
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Live Hover Tooltip */}
        {(hoveredDistrict || hoveredState) && (
          <div
            className="absolute z-30 pointer-events-none bg-[#090f20]/95 backdrop-blur-xl border border-cyan-400/40 rounded-xl p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] w-72 text-xs"
            style={{
              left: Math.min(tooltipPos.x + 15, 480),
              top: Math.max(tooltipPos.y - 120, 20)
            }}
          >
            {hoveredDistrict ? (
              <div>
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5 mb-2">
                  <div>
                    <div className="font-bold text-sm text-white">{hoveredDistrict.districtName}</div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      {hoveredDistrict.stateName} · Tier: {hoveredDistrict.tier}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400">Rank</span>
                    <div className="text-sm font-bold font-mono text-cyan-300">
                      #{getDistrictRank(hoveredDistrict.districtId)}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Indicator:</span>
                    <span className="text-slate-200 truncate max-w-[150px] font-semibold">{currentIndicator.name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">District Value:</span>
                    <span className="text-cyan-300 font-bold tabular-nums">
                      {hoveredDistrict.metrics[currentIndicator.id as keyof DistrictMetricData['metrics']]}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Nat. Benchmark:</span>
                    <span className="text-slate-300 tabular-nums">{natBenchmark}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">State Benchmark:</span>
                    <span className="text-slate-300 tabular-nums">
                      {STATES_DATA.find(s => s.stateId === hoveredDistrict.stateId)?.averages[currentIndicator.id] || natBenchmark}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-400">Nat. Variance:</span>
                    {(() => {
                      const v = (((hoveredDistrict.metrics[currentIndicator.id as keyof DistrictMetricData['metrics']] - natBenchmark) / natBenchmark) * 100).toFixed(1);
                      const isPos = Number(v) > 0;
                      return (
                        <span className={`tabular-nums font-semibold ${isPos ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {isPos ? `+${v}%` : `${v}%`}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">MOI Score:</span>
                    <span className="text-cyan-300 font-bold tabular-nums">
                      {hoveredDistrict.moiComponents.moiScore} / 100 ({hoveredDistrict.moiComponents.category})
                    </span>
                  </div>
                </div>
                <div className="text-[9px] text-cyan-400/80 font-mono mt-2 pt-1 border-t border-cyan-500/20 text-center">
                  Click to inspect full district profile →
                </div>
              </div>
            ) : (
              // State hover tooltip
              (() => {
                const sObj = STATES_DATA.find(s => s.stateId === hoveredState);
                if (!sObj) return null;
                const stateVal = sObj.averages[currentIndicator.id] || natBenchmark;
                const variance = (((stateVal - natBenchmark) / natBenchmark) * 100).toFixed(1);
                return (
                  <div>
                    <div className="font-bold text-sm text-white mb-0.5">{sObj.stateName}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mb-2">
                      Zone: {sObj.zone} · Capital: {sObj.capital} · {sObj.districtCount} Districts
                    </div>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">State Average:</span>
                        <span className="text-cyan-300 font-bold tabular-nums">{stateVal}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Nat. Benchmark:</span>
                        <span className="text-slate-300 tabular-nums">{natBenchmark}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Variance:</span>
                        <span className={`tabular-nums font-semibold ${Number(variance) > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {Number(variance) > 0 ? `+${variance}%` : `${variance}%`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Avg MOI:</span>
                        <span className="text-cyan-300 font-bold tabular-nums">{sObj.avgMoi}</span>
                      </div>
                    </div>
                    <div className="text-[9px] text-cyan-400/80 font-mono mt-2 pt-1 border-t border-cyan-500/20 text-center">
                      Click state to drill down into districts →
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="p-3 bg-[#090e1c]/90 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Choropleth Scale:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/70 inline-block border border-emerald-400/30" />
            <span className="text-slate-300">Favorable / Low MOI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-500/70 inline-block border border-cyan-400/30" />
            <span className="text-slate-300">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/70 inline-block border border-amber-400/30" />
            <span className="text-slate-300">Elevated Burden</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500/70 inline-block border border-rose-400/30" />
            <span className="text-slate-300">Severe Gap / High MOI</span>
          </div>
        </div>

        <div className="text-slate-400 flex items-center gap-2">
          <span>Click district node or state polygon to filter</span>
          <span className="text-slate-600">·</span>
          <span>Source: NFHS-5</span>
        </div>
      </div>
    </div>
  );
};
