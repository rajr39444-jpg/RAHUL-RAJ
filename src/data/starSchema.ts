import { StarSchemaTable, DaxFormula } from '../types';

export const STAR_SCHEMA_TABLES: StarSchemaTable[] = [
  {
    name: 'Fact_HealthMetrics',
    type: 'Fact',
    description: 'Grain: One record per District × Indicator × Time Period. Contains central measurable public health numerical observations.',
    columns: [
      { name: 'HealthMetricKey', type: 'BIGINT', keyType: 'PK', description: 'Surrogate primary key for fact record' },
      { name: 'GeographyKey', type: 'INTEGER', keyType: 'FK', description: 'Foreign key to Dim_Geography (District / State)' },
      { name: 'IndicatorKey', type: 'INTEGER', keyType: 'FK', description: 'Foreign key to Dim_Indicator' },
      { name: 'SourceKey', type: 'INTEGER', keyType: 'FK', description: 'Foreign key to Dim_Source (NFHS-5, HMIS)' },
      { name: 'TimeKey', type: 'INTEGER', keyType: 'FK', description: 'Foreign key to Dim_Time' },
      { name: 'Value', type: 'DECIMAL(5,2)', description: 'Reported rate or percentage (e.g. 24.10)' },
      { name: 'Numerator', type: 'BIGINT', description: 'Weighted surveyed sample positive response' },
      { name: 'Denominator', type: 'BIGINT', description: 'Effective sample universe size' },
      { name: 'StandardError', type: 'DECIMAL(4,3)', description: 'Survey sampling standard error' }
    ]
  },
  {
    name: 'Dim_Geography',
    type: 'Dimension',
    description: 'Hierarchical geographical dimension enabling drill-down from National -> Zone -> State -> District.',
    columns: [
      { name: 'GeographyKey', type: 'INTEGER', keyType: 'PK', description: 'Surrogate primary key' },
      { name: 'District', type: 'VARCHAR(100)', description: 'District Name (e.g., Pune, Ernakulam, Patna)' },
      { name: 'DistrictCode', type: 'VARCHAR(20)', description: 'LGD / Census 2011 District Code' },
      { name: 'State', type: 'VARCHAR(100)', description: 'State or Union Territory Name' },
      { name: 'StateCode', type: 'CHAR(2)', description: 'Standard 2-letter ISO 3166-2:IN code' },
      { name: 'Zone', type: 'VARCHAR(20)', description: 'Administrative Zone (North, South, East, West, Central, North-East)' },
      { name: 'Tier', type: 'VARCHAR(20)', description: 'Urban hierarchy classification (Metro, Tier-1, Tier-2, Rural)' },
      { name: 'Latitude', type: 'DECIMAL(9,6)', description: 'District centroid latitude' },
      { name: 'Longitude', type: 'DECIMAL(9,6)', description: 'District centroid longitude' },
      { name: 'Population', type: 'BIGINT', description: 'Projected population for territory weighting' }
    ]
  },
  {
    name: 'Dim_Indicator',
    type: 'Dimension',
    description: 'Clinical and operational metadata defining health and service-delivery parameters.',
    columns: [
      { name: 'IndicatorKey', type: 'INTEGER', keyType: 'PK', description: 'Surrogate primary key' },
      { name: 'IndicatorName', type: 'VARCHAR(150)', description: 'Standard indicator nomenclature' },
      { name: 'IndicatorGroup', type: 'VARCHAR(50)', description: 'High-level category (NCD, Maternal & Child, Service Coverage)' },
      { name: 'SubIndicator', type: 'VARCHAR(250)', description: 'Detailed medical protocol / cohort definition' },
      { name: 'Unit', type: 'VARCHAR(20)', description: 'Metric unit (percentage, per 1000, ratio)' },
      { name: 'Direction', type: 'VARCHAR(20)', description: 'Evaluation polarity (higher_is_better / higher_is_worse)' },
      { name: 'NationalBenchmark', type: 'DECIMAL(5,2)', description: 'Official National Reference Value' },
      { name: 'Target', type: 'DECIMAL(5,2)', description: 'SDG 2030 or National Health Policy Target' }
    ]
  },
  {
    name: 'Dim_Source',
    type: 'Dimension',
    description: 'Originating survey or administrative registry metadata ensuring provenance.',
    columns: [
      { name: 'SourceKey', type: 'INTEGER', keyType: 'PK', description: 'Surrogate primary key' },
      { name: 'SourceName', type: 'VARCHAR(100)', description: 'Source identity (NFHS-5, HMIS Monthly, SRS)' },
      { name: 'SourceType', type: 'VARCHAR(50)', description: 'Collection methodology (Sample Household Survey, Facility Registry)' },
      { name: 'SurveyPeriod', type: 'VARCHAR(50)', description: 'Survey field tenure (2019-2021)' },
      { name: 'Publisher', type: 'VARCHAR(150)', description: 'MoHFW / International Institute for Population Sciences (IIPS)' },
      { name: 'MethodologyNotes', type: 'TEXT', description: 'Sampling frame and multi-stage stratified cluster notes' }
    ]
  },
  {
    name: 'Dim_Time',
    type: 'Dimension',
    description: 'Temporal dimension capturing survey wave and calendar period.',
    columns: [
      { name: 'TimeKey', type: 'INTEGER', keyType: 'PK', description: 'Surrogate primary key' },
      { name: 'Year', type: 'SMALLINT', description: 'Representative reference year' },
      { name: 'Period', type: 'VARCHAR(50)', description: 'Temporal span (2019-2021)' },
      { name: 'SurveyRound', type: 'VARCHAR(20)', description: 'Round designation (NFHS-5 Round 1 / Round 2)' }
    ]
  }
];

export const DAX_MEASURES: DaxFormula[] = [
  {
    title: 'Dynamic Metric Switcher',
    businessName: '[Selected Metric]',
    code: `Selected Metric = 
SWITCH(
    SELECTEDVALUE(Dim_Indicator[IndicatorName]),
    "Hypertension / Elevated Blood Pressure",
        CALCULATE(
            AVERAGE(Fact_HealthMetrics[Value]),
            Dim_Indicator[IndicatorName] = "Hypertension / Elevated Blood Pressure"
        ),
    "High Blood Glucose / Diabetes Risk",
        CALCULATE(
            AVERAGE(Fact_HealthMetrics[Value]),
            Dim_Indicator[IndicatorName] = "High Blood Glucose / Diabetes Risk"
        ),
    "Overweight or Obesity (BMI ≥ 25.0 kg/m²)",
        CALCULATE(
            AVERAGE(Fact_HealthMetrics[Value]),
            Dim_Indicator[IndicatorName] = "Overweight or Obesity (BMI ≥ 25.0 kg/m²)"
        ),
    "Institutional Deliveries",
        CALCULATE(
            AVERAGE(Fact_HealthMetrics[Value]),
            Dim_Indicator[IndicatorName] = "Institutional Deliveries"
        ),
    AVERAGE(Fact_HealthMetrics[Value])
)`,
    explanation: 'Simulates Power BI parameter harvest to dynamically substitute measures based on user slicer interaction.'
  },
  {
    title: 'National Benchmark Variance',
    businessName: '[National Variance %]',
    code: `National Variance % = 
VAR DistrictVal = [Selected Metric]
VAR NatBenchmark = SELECTEDVALUE(Dim_Indicator[NationalBenchmark])
RETURN
    DIVIDE(DistrictVal - NatBenchmark, NatBenchmark, 0) * 100`,
    explanation: 'Quantifies percentage deviation of the selected district against the official All-India NFHS-5 benchmark.'
  },
  {
    title: 'State Benchmark Variance',
    businessName: '[State Variance %]',
    code: `State Variance % = 
VAR DistrictVal = [Selected Metric]
VAR StateAverage = 
    CALCULATE(
        [Selected Metric],
        ALLEXCEPT(Dim_Geography, Dim_Geography[State])
    )
RETURN
    DIVIDE(DistrictVal - StateAverage, StateAverage, 0) * 100`,
    explanation: 'Evaluates intra-state disparities by stripping district-level filters while preserving the parent state context.'
  },
  {
    title: 'Dynamic District Ranking',
    businessName: '[District Rank]',
    code: `District Rank = 
RANKX(
    ALLSELECTED(Dim_Geography[District]),
    [Selected Metric],
    ,
    DESC,
    Dense
)`,
    explanation: 'Dynamically computes dense ordinal rank of the current district across all selected geographies.'
  },
  {
    title: 'Market Opportunity Index (MOI)',
    businessName: '[MOI Score]',
    code: `MOI Score = 
VAR DiseaseBurden = [Normalized Disease Burden Score]
VAR ServiceGap = [Normalized Service Gap Score]
VAR PopulationNeed = [Normalized Population Need Score]
VAR TrendFactor = [Normalized Trend Score]
RETURN
    (DiseaseBurden * 0.40) +
    (ServiceGap * 0.25) +
    (PopulationNeed * 0.20) +
    (TrendFactor * 0.15)`,
    explanation: 'Weighted multi-criteria decision index normalized 0-100 to guide commercial resource prioritization.'
  }
];

export const ETL_STEPS = [
  {
    step: 1,
    name: 'Extraction & Ingestion',
    tool: 'Power Query / Web Connector',
    input: 'data.gov.in & IIPS District Factsheet CSV/PDF extracts',
    operation: 'Web.Contents() & Json.Document() with scheduled parameter refresh across 707 NFHS-5 districts.'
  },
  {
    step: 2,
    name: 'Data Profiling & Cleansing',
    tool: 'Power Query M Transformations',
    input: 'Raw text records with mixed asterisks (*, na) denoting small unweighted sample sizes (<25 cases)',
    operation: 'Filtered small sample flags; replaced strings with typed nulls; imputed standard error variances.'
  },
  {
    step: 3,
    name: 'Standardization & Alignment',
    tool: 'Custom M Functions',
    input: 'Varying indicator headers across NFHS-4 vs NFHS-5 rounds',
    operation: 'Harmonized 14 target clinical definitions; normalized age groups (15-49 standard adult cohort); unified state and district LGD codes.'
  },
  {
    step: 4,
    name: 'Star Schema Data Modeling',
    tool: 'Power BI Relationship Engine',
    input: 'Denormalized wide survey spreadsheets',
    operation: 'Unpivoted columns to create Fact_HealthMetrics; established 1-to-many (1:*) single-direction relationships to 4 dimensions.'
  },
  {
    step: 5,
    name: 'DAX Business Logic Layer',
    tool: 'DAX Engine (VertiPaq)',
    input: 'Star Schema Model tables',
    operation: 'Built dynamic metric switchers, dense ranking measures, variance percentages, and the multi-criteria MOI formula.'
  },
  {
    step: 6,
    name: 'Geospatial Intelligence Surface',
    tool: 'Interactive Visualization Layer',
    input: 'DAX measures + Geo coordinates',
    operation: 'Bound choropleth map polygons, dynamic Top-N bar rankings, and district drill-through analytical pages.'
  }
];
