export type IndicatorCategory = 'NCD' | 'Maternal & Child' | 'Service Coverage';

export type IndicatorDirection = 'higher_is_better' | 'higher_is_worse';

export type MapViewMode = 'disease_burden' | 'service_gap' | 'moi';

export interface IndicatorDefinition {
  id: string;
  name: string;
  category: IndicatorCategory;
  subIndicator: string;
  unit: string;
  direction: IndicatorDirection;
  nationalBenchmark: number;
  description: string;
  clinicalSignificance: string;
  surveyPeriod: string;
  source: string;
}

export interface DistrictMetricData {
  districtId: string;
  districtName: string;
  stateId: string;
  stateName: string;
  population: number; // approximate district population
  tier: 'Metro' | 'Tier-1' | 'Tier-2' | 'Tier-3' | 'Rural';
  zone: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East';
  // Indicator values in %
  metrics: {
    // NCD
    hypertension: number; // % adults with elevated BP
    blood_glucose: number; // % adults with high blood glucose
    obesity: number; // % adults BMI >= 25
    tobacco: number; // % adults using tobacco
    alcohol: number; // % adults consuming alcohol
    // Maternal & Child
    anc_4_visits: number; // % mothers 4+ ANC visits
    institutional_delivery: number; // % deliveries in facility
    full_immunization: number; // % children 12-23m fully vaccinated
    exclusive_breastfeeding: number; // % infants <6m exclusively breastfed
    child_anemia: number; // % children 6-59m anemic
    // Service Coverage
    health_insurance: number; // % households with at least 1 member covered
    cervical_screening: number; // % women screened
    primary_health_access: number; // % population within 5km of PHC
    postnatal_care: number; // % mothers receiving PNC within 2 days
  };
  // Pre-calculated or dynamic MOI component scores (0-100)
  moiComponents: {
    diseaseBurdenScore: number;
    serviceGapScore: number;
    populationNeedScore: number;
    trendScore: number;
    moiScore: number;
    category: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  };
}

export interface StateSummary {
  stateId: string;
  stateName: string;
  stateCode: string;
  capital: string;
  zone: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East';
  districtCount: number;
  totalPopulation: number;
  // Averages for all indicators
  averages: Record<string, number>;
  avgMoi: number;
}

export interface FilterState {
  selectedState: string; // 'all' or stateId
  selectedDistrict: string; // 'all' or districtId
  selectedIndicatorId: string;
  selectedCategory: string; // 'all' or category
  surveyPeriod: string;
  dataSource: string;
  topN: number; // 5, 10, 15, 20
  mapViewMode: MapViewMode;
}

export interface StarSchemaTable {
  name: string;
  type: 'Fact' | 'Dimension';
  description: string;
  columns: {
    name: string;
    type: string;
    keyType?: 'PK' | 'FK';
    description: string;
  }[];
}

export interface DaxFormula {
  title: string;
  businessName: string;
  code: string;
  explanation: string;
}
