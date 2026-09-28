/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FilterState } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { Footer } from './components/Footer';
import { DataArchitectureModal } from './components/DataArchitectureModal';
import { ExecutiveOverview } from './pages/ExecutiveOverview';
import { GeoSpatialIntelligence } from './pages/GeoSpatialIntelligence';
import { NcdIntelligence } from './pages/NcdIntelligence';
import { MaternalChildHealth } from './pages/MaternalChildHealth';
import { ServiceCoverage } from './pages/ServiceCoverage';
import { VulnerabilityMoi } from './pages/VulnerabilityMoi';
import { DistrictProfile } from './pages/DistrictProfile';
import { ManagerialAction } from './pages/ManagerialAction';
import { DISTRICTS_DATA, INDICATOR_DEFINITIONS, STATES_DATA } from './data/healthData';

const INITIAL_FILTERS: FilterState = {
  selectedState: 'all',
  selectedDistrict: 'all',
  selectedIndicatorId: 'hypertension',
  selectedCategory: 'all',
  surveyPeriod: 'NFHS-5 (2019-2021)',
  dataSource: 'NFHS-5 / IIPS / MoHFW',
  topN: 10,
  mapViewMode: 'disease_burden'
};

export default function App() {
  const [activePage, setActivePage] = useState<string>('overview');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isDataArchitectureOpen, setIsDataArchitectureOpen] = useState<boolean>(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleNavigateToDistrict = (districtId: string) => {
    const districtObj = DISTRICTS_DATA.find(d => d.districtId === districtId);
    if (districtObj) {
      setFilters(prev => ({
        ...prev,
        selectedState: districtObj.stateId,
        selectedDistrict: districtId
      }));
      setActivePage('district');
    }
  };

  // CSV Export utility
  const handleExportData = () => {
    const indicator = INDICATOR_DEFINITIONS.find(i => i.id === filters.selectedIndicatorId) || INDICATOR_DEFINITIONS[0];
    const filteredDistricts = filters.selectedState === 'all'
      ? DISTRICTS_DATA
      : DISTRICTS_DATA.filter(d => d.stateId === filters.selectedState);

    const headers = [
      'District ID',
      'District Name',
      'State ID',
      'State Name',
      'Zone',
      'Tier',
      'Population',
      'Indicator Name',
      'Indicator Value (%)',
      'National Benchmark (%)',
      'State Benchmark (%)',
      'National Variance (%)',
      'MOI Score',
      'MOI Category'
    ];

    const rows = filteredDistricts.map(d => {
      const val = d.metrics[indicator.id as keyof typeof d.metrics];
      const stateObj = STATES_DATA.find(s => s.stateId === d.stateId);
      const stateBench = stateObj?.averages[indicator.id] || indicator.nationalBenchmark;
      const natVar = (((val - indicator.nationalBenchmark) / indicator.nationalBenchmark) * 100).toFixed(1);

      return [
        `"${d.districtId}"`,
        `"${d.districtName}"`,
        `"${d.stateId}"`,
        `"${d.stateName}"`,
        `"${d.zone}"`,
        `"${d.tier}"`,
        d.population,
        `"${indicator.name}"`,
        val,
        indicator.nationalBenchmark,
        stateBench,
        natVar,
        d.moiComponents.moiScore,
        `"${d.moiComponents.category}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NFHS5_Health_Intelligence_${indicator.id}_${filters.selectedState}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050811] text-slate-100 tech-grid-bg selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Global Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenDataArchitecture={() => setIsDataArchitectureOpen(true)}
        onExportData={handleExportData}
      />

      {/* 2. Top Filter Bar & Dynamic Metric Switcher */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 3. Main Viewport Container */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 lg:px-6 py-5">
        {activePage === 'overview' && (
          <ExecutiveOverview
            filters={filters}
            onFilterChange={handleFilterChange}
            onNavigateToPage={setActivePage}
          />
        )}

        {activePage === 'geo' && (
          <GeoSpatialIntelligence
            filters={filters}
            onFilterChange={handleFilterChange}
            onNavigateToDistrict={handleNavigateToDistrict}
          />
        )}

        {activePage === 'ncd' && (
          <NcdIntelligence
            filters={filters}
            onFilterChange={handleFilterChange}
            onNavigateToDistrict={handleNavigateToDistrict}
          />
        )}

        {activePage === 'maternal' && (
          <MaternalChildHealth
            filters={filters}
            onFilterChange={handleFilterChange}
            onNavigateToDistrict={handleNavigateToDistrict}
          />
        )}

        {activePage === 'service' && (
          <ServiceCoverage
            filters={filters}
            onFilterChange={handleFilterChange}
            onNavigateToDistrict={handleNavigateToDistrict}
          />
        )}

        {activePage === 'moi' && (
          <VulnerabilityMoi
            filters={filters}
            onFilterChange={handleFilterChange}
            onNavigateToDistrict={handleNavigateToDistrict}
          />
        )}

        {activePage === 'district' && (
          <DistrictProfile
            filters={filters}
            onFilterChange={handleFilterChange}
            onNavigateToPage={setActivePage}
          />
        )}

        {activePage === 'action' && (
          <ManagerialAction
            filters={filters}
            onNavigateToDistrict={handleNavigateToDistrict}
            onOpenDataArchitecture={() => setIsDataArchitectureOpen(true)}
          />
        )}
      </main>

      {/* 4. Mandatory Footer with Sources & Disclaimers */}
      <Footer />

      {/* 5. Data Architecture, Star Schema & Power Query ETL Modal */}
      <DataArchitectureModal
        isOpen={isDataArchitectureOpen}
        onClose={() => setIsDataArchitectureOpen(false)}
      />
    </div>
  );
}
