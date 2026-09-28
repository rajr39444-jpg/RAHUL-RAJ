import { IndicatorDefinition, DistrictMetricData, StateSummary } from '../types';

export const INDICATOR_DEFINITIONS: IndicatorDefinition[] = [
  // NCD Intelligence
  {
    id: 'hypertension',
    name: 'Hypertension / Elevated Blood Pressure',
    category: 'NCD',
    subIndicator: 'Adults aged 15-49 with Systolic ≥140 mmHg or Diastolic ≥90 mmHg or taking medication',
    unit: '%',
    direction: 'higher_is_worse',
    nationalBenchmark: 22.8,
    description: 'Prevalence of elevated blood pressure or anti-hypertensive medication among adults.',
    clinicalSignificance: 'High risk of coronary artery disease, stroke, chronic kidney disease; key therapy target for ACE inhibitors, ARBs, and CCBs.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'blood_glucose',
    name: 'High Blood Glucose / Diabetes Risk',
    category: 'NCD',
    subIndicator: 'Adults aged 15-49 with fasting glucose >125 mg/dl or random glucose >140 mg/dl or taking medication',
    unit: '%',
    direction: 'higher_is_worse',
    nationalBenchmark: 14.5,
    description: 'Adults identified with high or very high blood sugar levels or under clinical glycaemic control.',
    clinicalSignificance: 'Predictor of diabetic microvascular/macrovascular complications; guides oral hypoglycaemic agents (Metformin, SGLT2i, DPP-4i) and insulin demand.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'obesity',
    name: 'Overweight or Obesity (BMI ≥ 25.0 kg/m²)',
    category: 'NCD',
    subIndicator: 'Percentage of adults aged 15-49 with Body Mass Index ≥ 25.0 kg/m²',
    unit: '%',
    direction: 'higher_is_worse',
    nationalBenchmark: 22.9,
    description: 'Adult population classified as overweight or obese as per WHO Asia-Pacific classification.',
    clinicalSignificance: 'Major metabolic comorbidity driving cardiovascular disease, metabolic syndrome, non-alcoholic fatty liver disease (NAFLD), and osteoarthritis.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'tobacco',
    name: 'Tobacco Use Prevalence',
    category: 'NCD',
    subIndicator: 'Adults aged 15-49 who use any form of tobacco (smoking or smokeless bidi/gutkha/khaini)',
    unit: '%',
    direction: 'higher_is_worse',
    nationalBenchmark: 27.2,
    description: 'Proportion of adults actively consuming smoked or smokeless tobacco products.',
    clinicalSignificance: 'Principal etiology for head & neck cancers, oral carcinomas, COPD, and premature ischemic cardiovascular mortality.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'alcohol',
    name: 'Alcohol Consumption',
    category: 'NCD',
    subIndicator: 'Adults aged 15-49 who consume alcohol',
    unit: '%',
    direction: 'higher_is_worse',
    nationalBenchmark: 11.5,
    description: 'Percentage of adult population reporting alcohol intake.',
    clinicalSignificance: 'Associated with alcoholic liver cirrhosis, cardiomyopathy, peripheral neuropathy, and psychiatric comorbidities.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },

  // Maternal & Child Health
  {
    id: 'anc_4_visits',
    name: 'Antenatal Care (4+ ANC Visits)',
    category: 'Maternal & Child',
    subIndicator: 'Mothers who had at least 4 antenatal care visits for their last birth',
    unit: '%',
    direction: 'higher_is_better',
    nationalBenchmark: 58.1,
    description: 'Expectant mothers adhering to the WHO-recommended minimum protocol of at least four comprehensive antenatal check-ups.',
    clinicalSignificance: 'Crucial for early detection of pre-eclampsia, gestational diabetes, maternal anemia; prophylactic IFA and calcium supplementation.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'institutional_delivery',
    name: 'Institutional Deliveries',
    category: 'Maternal & Child',
    subIndicator: 'Births delivered in a public or accredited private healthcare institution',
    unit: '%',
    direction: 'higher_is_better',
    nationalBenchmark: 88.6,
    description: 'Proportion of live deliveries managed in medical institutions with skilled birth attendants.',
    clinicalSignificance: 'Dramatically reduces maternal mortality ratio (MMR) and neonatal mortality by preventing postpartum hemorrhage (PPH) and birth asphyxia.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'full_immunization',
    name: 'Full Childhood Immunization (12-23 Months)',
    category: 'Maternal & Child',
    subIndicator: 'Children age 12-23 months fully vaccinated with BCG, Measles/MR, and 3 doses of Polio & DPT/Pentavalent',
    unit: '%',
    direction: 'higher_is_better',
    nationalBenchmark: 76.4,
    description: 'Pediatric immunization completion covering universal primary preventable communicable pathogens.',
    clinicalSignificance: 'Essential vaccine coverage benchmark; prevents outbreaks of pertussis, diphtheria, tetanus, polio, and measles.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'exclusive_breastfeeding',
    name: 'Exclusive Breastfeeding (< 6 Months)',
    category: 'Maternal & Child',
    subIndicator: 'Children age 0-5 months exclusively breastfed without supplementary liquids or formula',
    unit: '%',
    direction: 'higher_is_better',
    nationalBenchmark: 63.7,
    description: 'Infants receiving solely breast milk with no water or fluids during first 180 days of life.',
    clinicalSignificance: 'Confers passive immunoglobulin protection, prevents diarrheal diseases, and reduces severe acute malnutrition (SAM).',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'child_anemia',
    name: 'Childhood Anemia (Hb < 11.0 g/dl)',
    category: 'Maternal & Child',
    subIndicator: 'Children age 6-59 months classified as anemic based on blood hemoglobin assessment',
    unit: '%',
    direction: 'higher_is_worse',
    nationalBenchmark: 67.1,
    description: 'High burden of iron-deficiency microcytic hypochromic anemia in preschool pediatric cohorts.',
    clinicalSignificance: 'Impaired cognitive and motor neurodevelopment; mandates therapeutic iron drops, deworming, and nutritional fortified supplementation.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },

  // Service Coverage / Health System Gap
  {
    id: 'health_insurance',
    name: 'Health Scheme / Insurance Coverage',
    category: 'Service Coverage',
    subIndicator: 'Households with at least one usual member covered under health insurance or state scheme (PM-JAY/Arogyasri)',
    unit: '%',
    direction: 'higher_is_better',
    nationalBenchmark: 41.4,
    description: 'Financial risk protection under Ayushman Bharat (AB-PMJAY), ESIS, CGHS, or private health indemnity policies.',
    clinicalSignificance: 'Key determinant of out-of-pocket expenditure (OOPE) mitigation, inpatient tertiary treatment uptake, and expensive specialty drug affordability.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'cervical_screening',
    name: 'Cervical Cancer Screening (Women 30-49)',
    category: 'Service Coverage',
    subIndicator: 'Women age 30-49 who have ever undergone screening examination for cervical cancer (VIA/Pap smear)',
    unit: '%',
    direction: 'higher_is_better',
    nationalBenchmark: 1.9,
    description: 'Screening penetration for pre-cancerous cervical dysplasia at primary/secondary healthcare tiers.',
    clinicalSignificance: 'Severe service gap indicator; vital for HPV vaccination outreach and secondary oncology diagnostic infrastructure.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  },
  {
    id: 'primary_health_access',
    name: 'Primary Healthcare Facility Accessibility',
    category: 'Service Coverage',
    subIndicator: 'Estimated population living within 5 km radial access of a functional PHC/UPHC/HWC',
    unit: '%',
    direction: 'higher_is_better',
    nationalBenchmark: 73.2,
    description: 'Geographical proximity to comprehensive Ayushman Arogya Mandir / Primary Health Centres.',
    clinicalSignificance: 'Governs first-contact care, chronic disease NCD screening, essential drugs availability, and referral logistics.',
    surveyPeriod: 'NFHS-5 / HMIS (2020-2021)',
    source: 'HMIS / MoHFW Service Delivery Portal'
  },
  {
    id: 'postnatal_care',
    name: 'Postnatal Care within 2 Days of Delivery',
    category: 'Service Coverage',
    subIndicator: 'Mothers who received postnatal care from a doctor/nurse/LHV/ANM within 48 hours of delivery',
    unit: '%',
    direction: 'higher_is_better',
    nationalBenchmark: 78.0,
    description: 'Postpartum clinical monitoring during the critical maternal mortality window.',
    clinicalSignificance: 'Detects puerperal sepsis, hypertensive emergencies, and neonatal jaundice during early transition.',
    surveyPeriod: 'NFHS-5 (2019-2021)',
    source: 'Ministry of Health & Family Welfare / IIPS'
  }
];

// Helper to compute MOI
export function calculateMoiScores(metrics: DistrictMetricData['metrics']) {
  // Normalize Disease Burden (Hypertension, Blood Glucose, Obesity) relative to scale
  // Average percentage of chronic metabolic indicators
  const diseaseBurdenRaw = (metrics.hypertension * 0.4 + metrics.blood_glucose * 0.35 + metrics.obesity * 0.25);
  // Normalize to 0-100: where 15% is low burden and 45% is extreme burden
  const diseaseBurdenScore = Math.min(100, Math.max(0, ((diseaseBurdenRaw - 12) / (42 - 12)) * 100));

  // Service Gap Score: Inverted service metrics
  // Institutional delivery, immunization, insurance
  const serviceAvg = (metrics.institutional_delivery * 0.35 + metrics.full_immunization * 0.35 + metrics.health_insurance * 0.30);
  // Service gap is 100 - service coverage
  const serviceGapScore = Math.min(100, Math.max(0, 100 - serviceAvg));

  // Population Need Score: child anemia + inverse of primary health access
  const anemiaWeight = (metrics.child_anemia / 85) * 60;
  const accessGapWeight = ((100 - metrics.primary_health_access) / 60) * 40;
  const populationNeedScore = Math.min(100, Math.max(0, anemiaWeight + accessGapWeight));

  // Trend / Vulnerability Factor: Tobacco burden + lack of screening
  const trendScore = Math.min(100, Math.max(0, (metrics.tobacco * 1.5) + (100 - metrics.postnatal_care) * 0.5));

  // Coursework Formula: MOI = (Disease Burden * 0.40) + (Service Gap * 0.25) + (Population Need * 0.20) + (Trend * 0.15)
  const moiScore = Number(
    (
      diseaseBurdenScore * 0.40 +
      serviceGapScore * 0.25 +
      populationNeedScore * 0.20 +
      trendScore * 0.15
    ).toFixed(1)
  );

  let category: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High' = 'Moderate';
  if (moiScore < 20) category = 'Very Low';
  else if (moiScore < 40) category = 'Low';
  else if (moiScore < 60) category = 'Moderate';
  else if (moiScore < 75) category = 'High';
  else category = 'Very High';

  return {
    diseaseBurdenScore: Number(diseaseBurdenScore.toFixed(1)),
    serviceGapScore: Number(serviceGapScore.toFixed(1)),
    populationNeedScore: Number(populationNeedScore.toFixed(1)),
    trendScore: Number(trendScore.toFixed(1)),
    moiScore,
    category
  };
}

// Raw district level records
const RAW_DISTRICTS: Omit<DistrictMetricData, 'moiComponents'>[] = [
  // MAHARASHTRA
  {
    districtId: 'MH_MUM',
    districtName: 'Mumbai City',
    stateId: 'MH',
    stateName: 'Maharashtra',
    population: 3145966,
    tier: 'Metro',
    zone: 'West',
    metrics: {
      hypertension: 24.1,
      blood_glucose: 18.2,
      obesity: 37.8,
      tobacco: 19.4,
      alcohol: 11.2,
      anc_4_visits: 76.5,
      institutional_delivery: 99.2,
      full_immunization: 84.1,
      exclusive_breastfeeding: 52.4,
      child_anemia: 59.8,
      health_insurance: 32.5,
      cervical_screening: 3.1,
      primary_health_access: 94.0,
      postnatal_care: 92.4
    }
  },
  {
    districtId: 'MH_PUN',
    districtName: 'Pune',
    stateId: 'MH',
    stateName: 'Maharashtra',
    population: 9429408,
    tier: 'Tier-1',
    zone: 'West',
    metrics: {
      hypertension: 25.4,
      blood_glucose: 17.6,
      obesity: 34.2,
      tobacco: 21.0,
      alcohol: 12.8,
      anc_4_visits: 78.2,
      institutional_delivery: 98.7,
      full_immunization: 86.5,
      exclusive_breastfeeding: 61.2,
      child_anemia: 62.1,
      health_insurance: 36.8,
      cervical_screening: 2.8,
      primary_health_access: 88.5,
      postnatal_care: 91.0
    }
  },
  {
    districtId: 'MH_THN',
    districtName: 'Thane',
    stateId: 'MH',
    stateName: 'Maharashtra',
    population: 11060148,
    tier: 'Tier-1',
    zone: 'West',
    metrics: {
      hypertension: 23.8,
      blood_glucose: 16.9,
      obesity: 31.5,
      tobacco: 22.4,
      alcohol: 13.5,
      anc_4_visits: 72.1,
      institutional_delivery: 97.4,
      full_immunization: 81.3,
      exclusive_breastfeeding: 58.7,
      child_anemia: 64.5,
      health_insurance: 28.4,
      cervical_screening: 2.1,
      primary_health_access: 82.0,
      postnatal_care: 88.6
    }
  },
  {
    districtId: 'MH_NAG',
    districtName: 'Nagpur',
    stateId: 'MH',
    stateName: 'Maharashtra',
    population: 4653570,
    tier: 'Tier-2',
    zone: 'West',
    metrics: {
      hypertension: 27.2,
      blood_glucose: 19.4,
      obesity: 28.6,
      tobacco: 28.5,
      alcohol: 16.2,
      anc_4_visits: 74.8,
      institutional_delivery: 98.1,
      full_immunization: 83.4,
      exclusive_breastfeeding: 64.9,
      child_anemia: 65.3,
      health_insurance: 34.1,
      cervical_screening: 1.8,
      primary_health_access: 84.2,
      postnatal_care: 89.1
    }
  },
  {
    districtId: 'MH_GAD',
    districtName: 'Gadchiroli',
    stateId: 'MH',
    stateName: 'Maharashtra',
    population: 1072942,
    tier: 'Rural',
    zone: 'West',
    metrics: {
      hypertension: 19.5,
      blood_glucose: 11.2,
      obesity: 14.2,
      tobacco: 46.8,
      alcohol: 22.4,
      anc_4_visits: 54.2,
      institutional_delivery: 88.4,
      full_immunization: 71.5,
      exclusive_breastfeeding: 74.2,
      child_anemia: 74.6,
      health_insurance: 48.2,
      cervical_screening: 0.9,
      primary_health_access: 52.0,
      postnatal_care: 74.8
    }
  },

  // KERALA
  {
    districtId: 'KL_TVM',
    districtName: 'Thiruvananthapuram',
    stateId: 'KL',
    stateName: 'Kerala',
    population: 3301427,
    tier: 'Tier-2',
    zone: 'South',
    metrics: {
      hypertension: 34.6,
      blood_glucose: 25.8,
      obesity: 38.1,
      tobacco: 16.2,
      alcohol: 18.5,
      anc_4_visits: 89.4,
      institutional_delivery: 99.8,
      full_immunization: 91.2,
      exclusive_breastfeeding: 68.4,
      child_anemia: 38.2,
      health_insurance: 64.8,
      cervical_screening: 5.6,
      primary_health_access: 96.5,
      postnatal_care: 97.2
    }
  },
  {
    districtId: 'KL_EKM',
    districtName: 'Ernakulam',
    stateId: 'KL',
    stateName: 'Kerala',
    population: 3282388,
    tier: 'Tier-1',
    zone: 'South',
    metrics: {
      hypertension: 35.8,
      blood_glucose: 27.4,
      obesity: 41.2,
      tobacco: 15.4,
      alcohol: 19.1,
      anc_4_visits: 91.2,
      institutional_delivery: 99.9,
      full_immunization: 92.5,
      exclusive_breastfeeding: 65.7,
      child_anemia: 35.6,
      health_insurance: 66.2,
      cervical_screening: 6.2,
      primary_health_access: 97.8,
      postnatal_care: 98.1
    }
  },
  {
    districtId: 'KL_KKD',
    districtName: 'Kozhikode',
    stateId: 'KL',
    stateName: 'Kerala',
    population: 3086293,
    tier: 'Tier-2',
    zone: 'South',
    metrics: {
      hypertension: 32.1,
      blood_glucose: 24.6,
      obesity: 36.5,
      tobacco: 17.8,
      alcohol: 15.3,
      anc_4_visits: 88.5,
      institutional_delivery: 99.7,
      full_immunization: 89.8,
      exclusive_breastfeeding: 70.2,
      child_anemia: 39.8,
      health_insurance: 62.4,
      cervical_screening: 4.8,
      primary_health_access: 95.1,
      postnatal_care: 96.4
    }
  },

  // TAMIL NADU
  {
    districtId: 'TN_CHN',
    districtName: 'Chennai',
    stateId: 'TN',
    stateName: 'Tamil Nadu',
    population: 4646732,
    tier: 'Metro',
    zone: 'South',
    metrics: {
      hypertension: 29.5,
      blood_glucose: 23.4,
      obesity: 39.4,
      tobacco: 18.2,
      alcohol: 14.8,
      anc_4_visits: 85.6,
      institutional_delivery: 99.6,
      full_immunization: 88.4,
      exclusive_breastfeeding: 59.8,
      child_anemia: 54.2,
      health_insurance: 58.4,
      cervical_screening: 4.5,
      primary_health_access: 95.8,
      postnatal_care: 95.1
    }
  },
  {
    districtId: 'TN_CBE',
    districtName: 'Coimbatore',
    stateId: 'TN',
    stateName: 'Tamil Nadu',
    population: 3458045,
    tier: 'Tier-2',
    zone: 'South',
    metrics: {
      hypertension: 28.4,
      blood_glucose: 22.1,
      obesity: 37.6,
      tobacco: 19.5,
      alcohol: 16.4,
      anc_4_visits: 84.2,
      institutional_delivery: 99.4,
      full_immunization: 89.1,
      exclusive_breastfeeding: 62.5,
      child_anemia: 52.8,
      health_insurance: 61.2,
      cervical_screening: 3.8,
      primary_health_access: 93.4,
      postnatal_care: 94.6
    }
  },
  {
    districtId: 'TN_MDU',
    districtName: 'Madurai',
    stateId: 'TN',
    stateName: 'Tamil Nadu',
    population: 3038252,
    tier: 'Tier-2',
    zone: 'South',
    metrics: {
      hypertension: 27.6,
      blood_glucose: 20.8,
      obesity: 33.2,
      tobacco: 21.8,
      alcohol: 17.5,
      anc_4_visits: 82.1,
      institutional_delivery: 99.1,
      full_immunization: 87.5,
      exclusive_breastfeeding: 64.1,
      child_anemia: 56.4,
      health_insurance: 63.8,
      cervical_screening: 3.2,
      primary_health_access: 91.2,
      postnatal_care: 93.2
    }
  },

  // KARNATAKA
  {
    districtId: 'KA_BLR',
    districtName: 'Bengaluru Urban',
    stateId: 'KA',
    stateName: 'Karnataka',
    population: 9621551,
    tier: 'Metro',
    zone: 'South',
    metrics: {
      hypertension: 27.8,
      blood_glucose: 21.6,
      obesity: 36.8,
      tobacco: 17.5,
      alcohol: 13.4,
      anc_4_visits: 81.4,
      institutional_delivery: 99.4,
      full_immunization: 87.8,
      exclusive_breastfeeding: 54.8,
      child_anemia: 61.2,
      health_insurance: 38.6,
      cervical_screening: 3.9,
      primary_health_access: 94.5,
      postnatal_care: 94.2
    }
  },
  {
    districtId: 'KA_MYS',
    districtName: 'Mysuru',
    stateId: 'KA',
    stateName: 'Karnataka',
    population: 3001127,
    tier: 'Tier-2',
    zone: 'South',
    metrics: {
      hypertension: 26.2,
      blood_glucose: 19.5,
      obesity: 31.4,
      tobacco: 22.4,
      alcohol: 15.6,
      anc_4_visits: 76.8,
      institutional_delivery: 98.6,
      full_immunization: 85.2,
      exclusive_breastfeeding: 63.4,
      child_anemia: 63.8,
      health_insurance: 42.1,
      cervical_screening: 2.6,
      primary_health_access: 87.4,
      postnatal_care: 91.5
    }
  },
  {
    districtId: 'KA_BEL',
    districtName: 'Belagavi',
    stateId: 'KA',
    stateName: 'Karnataka',
    population: 4779661,
    tier: 'Tier-3',
    zone: 'South',
    metrics: {
      hypertension: 24.6,
      blood_glucose: 16.8,
      obesity: 26.1,
      tobacco: 26.8,
      alcohol: 14.2,
      anc_4_visits: 70.4,
      institutional_delivery: 96.8,
      full_immunization: 82.4,
      exclusive_breastfeeding: 66.8,
      child_anemia: 67.2,
      health_insurance: 41.5,
      cervical_screening: 1.7,
      primary_health_access: 78.5,
      postnatal_care: 87.8
    }
  },

  // TELANGANA
  {
    districtId: 'TG_HYD',
    districtName: 'Hyderabad',
    stateId: 'TG',
    stateName: 'Telangana',
    population: 3943323,
    tier: 'Metro',
    zone: 'South',
    metrics: {
      hypertension: 31.4,
      blood_glucose: 24.2,
      obesity: 42.6,
      tobacco: 18.6,
      alcohol: 15.2,
      anc_4_visits: 83.2,
      institutional_delivery: 99.5,
      full_immunization: 86.4,
      exclusive_breastfeeding: 56.4,
      child_anemia: 68.2,
      health_insurance: 59.4,
      cervical_screening: 3.4,
      primary_health_access: 96.2,
      postnatal_care: 95.0
    }
  },
  {
    districtId: 'TG_WRG',
    districtName: 'Warangal',
    stateId: 'TG',
    stateName: 'Telangana',
    population: 1400000,
    tier: 'Tier-2',
    zone: 'South',
    metrics: {
      hypertension: 28.5,
      blood_glucose: 20.4,
      obesity: 32.8,
      tobacco: 25.1,
      alcohol: 22.8,
      anc_4_visits: 76.5,
      institutional_delivery: 98.4,
      full_immunization: 83.1,
      exclusive_breastfeeding: 67.2,
      child_anemia: 71.4,
      health_insurance: 66.8,
      cervical_screening: 2.2,
      primary_health_access: 84.1,
      postnatal_care: 90.4
    }
  },

  // ANDHRA PRADESH
  {
    districtId: 'AP_VSK',
    districtName: 'Visakhapatnam',
    stateId: 'AP',
    stateName: 'Andhra Pradesh',
    population: 4290589,
    tier: 'Tier-1',
    zone: 'South',
    metrics: {
      hypertension: 29.8,
      blood_glucose: 21.8,
      obesity: 35.4,
      tobacco: 24.2,
      alcohol: 18.4,
      anc_4_visits: 84.5,
      institutional_delivery: 98.9,
      full_immunization: 86.8,
      exclusive_breastfeeding: 62.8,
      child_anemia: 62.4,
      health_insurance: 78.4,
      cervical_screening: 3.5,
      primary_health_access: 91.5,
      postnatal_care: 93.8
    }
  },
  {
    districtId: 'AP_GNT',
    districtName: 'Guntur',
    stateId: 'AP',
    stateName: 'Andhra Pradesh',
    population: 4887813,
    tier: 'Tier-2',
    zone: 'South',
    metrics: {
      hypertension: 30.6,
      blood_glucose: 22.4,
      obesity: 36.2,
      tobacco: 23.5,
      alcohol: 19.8,
      anc_4_visits: 82.4,
      institutional_delivery: 99.1,
      full_immunization: 87.2,
      exclusive_breastfeeding: 65.4,
      child_anemia: 64.1,
      health_insurance: 81.2,
      cervical_screening: 2.9,
      primary_health_access: 89.6,
      postnatal_care: 94.2
    }
  },

  // GUJARAT
  {
    districtId: 'GJ_AHM',
    districtName: 'Ahmedabad',
    stateId: 'GJ',
    stateName: 'Gujarat',
    population: 7214225,
    tier: 'Metro',
    zone: 'West',
    metrics: {
      hypertension: 23.4,
      blood_glucose: 17.5,
      obesity: 32.8,
      tobacco: 26.4,
      alcohol: 4.8,
      anc_4_visits: 74.5,
      institutional_delivery: 98.4,
      full_immunization: 82.6,
      exclusive_breastfeeding: 57.2,
      child_anemia: 76.5,
      health_insurance: 44.8,
      cervical_screening: 2.1,
      primary_health_access: 93.2,
      postnatal_care: 91.8
    }
  },
  {
    districtId: 'GJ_SUR',
    districtName: 'Surat',
    stateId: 'GJ',
    stateName: 'Gujarat',
    population: 6081322,
    tier: 'Tier-1',
    zone: 'West',
    metrics: {
      hypertension: 22.8,
      blood_glucose: 16.8,
      obesity: 31.2,
      tobacco: 29.8,
      alcohol: 5.2,
      anc_4_visits: 71.2,
      institutional_delivery: 97.6,
      full_immunization: 79.8,
      exclusive_breastfeeding: 59.4,
      child_anemia: 78.4,
      health_insurance: 41.2,
      cervical_screening: 1.8,
      primary_health_access: 90.8,
      postnatal_care: 89.4
    }
  },
  {
    districtId: 'GJ_VAD',
    districtName: 'Vadodara',
    stateId: 'GJ',
    stateName: 'Gujarat',
    population: 4165626,
    tier: 'Tier-2',
    zone: 'West',
    metrics: {
      hypertension: 24.1,
      blood_glucose: 18.2,
      obesity: 30.5,
      tobacco: 25.1,
      alcohol: 4.5,
      anc_4_visits: 75.8,
      institutional_delivery: 98.1,
      full_immunization: 83.2,
      exclusive_breastfeeding: 61.8,
      child_anemia: 74.2,
      health_insurance: 46.5,
      cervical_screening: 2.4,
      primary_health_access: 91.6,
      postnatal_care: 92.1
    }
  },

  // RAJASTHAN
  {
    districtId: 'RJ_JAI',
    districtName: 'Jaipur',
    stateId: 'RJ',
    stateName: 'Rajasthan',
    population: 6626178,
    tier: 'Tier-1',
    zone: 'North',
    metrics: {
      hypertension: 22.1,
      blood_glucose: 15.4,
      obesity: 26.8,
      tobacco: 28.4,
      alcohol: 8.4,
      anc_4_visits: 62.4,
      institutional_delivery: 97.2,
      full_immunization: 84.5,
      exclusive_breastfeeding: 68.2,
      child_anemia: 68.4,
      health_insurance: 87.5,
      cervical_screening: 1.4,
      primary_health_access: 88.5,
      postnatal_care: 88.9
    }
  },
  {
    districtId: 'RJ_JOD',
    districtName: 'Jodhpur',
    stateId: 'RJ',
    stateName: 'Rajasthan',
    population: 3687002,
    tier: 'Tier-2',
    zone: 'North',
    metrics: {
      hypertension: 21.4,
      blood_glucose: 14.8,
      obesity: 24.1,
      tobacco: 31.2,
      alcohol: 9.1,
      anc_4_visits: 58.9,
      institutional_delivery: 96.1,
      full_immunization: 81.2,
      exclusive_breastfeeding: 70.4,
      child_anemia: 71.8,
      health_insurance: 89.2,
      cervical_screening: 1.1,
      primary_health_access: 81.4,
      postnatal_care: 86.4
    }
  },
  {
    districtId: 'RJ_BAR',
    districtName: 'Barmer',
    stateId: 'RJ',
    stateName: 'Rajasthan',
    population: 2603751,
    tier: 'Rural',
    zone: 'North',
    metrics: {
      hypertension: 17.8,
      blood_glucose: 10.9,
      obesity: 15.8,
      tobacco: 38.6,
      alcohol: 11.4,
      anc_4_visits: 42.1,
      institutional_delivery: 92.4,
      full_immunization: 74.8,
      exclusive_breastfeeding: 76.5,
      child_anemia: 79.4,
      health_insurance: 91.4,
      cervical_screening: 0.6,
      primary_health_access: 58.2,
      postnatal_care: 79.2
    }
  },

  // UTTAR PRADESH
  {
    districtId: 'UP_LKO',
    districtName: 'Lucknow',
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    population: 4589838,
    tier: 'Tier-1',
    zone: 'North',
    metrics: {
      hypertension: 23.5,
      blood_glucose: 16.8,
      obesity: 28.4,
      tobacco: 34.2,
      alcohol: 10.5,
      anc_4_visits: 52.4,
      institutional_delivery: 94.6,
      full_immunization: 76.8,
      exclusive_breastfeeding: 54.2,
      child_anemia: 66.8,
      health_insurance: 24.5,
      cervical_screening: 1.5,
      primary_health_access: 87.2,
      postnatal_care: 83.4
    }
  },
  {
    districtId: 'UP_VNS',
    districtName: 'Varanasi',
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    population: 3676841,
    tier: 'Tier-2',
    zone: 'North',
    metrics: {
      hypertension: 24.8,
      blood_glucose: 17.4,
      obesity: 25.6,
      tobacco: 38.4,
      alcohol: 12.1,
      anc_4_visits: 48.6,
      institutional_delivery: 92.8,
      full_immunization: 74.2,
      exclusive_breastfeeding: 58.4,
      child_anemia: 68.2,
      health_insurance: 21.8,
      cervical_screening: 1.2,
      primary_health_access: 82.5,
      postnatal_care: 80.6
    }
  },
  {
    districtId: 'UP_KNP',
    districtName: 'Kanpur Nagar',
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    population: 4581268,
    tier: 'Tier-2',
    zone: 'North',
    metrics: {
      hypertension: 25.2,
      blood_glucose: 18.1,
      obesity: 27.9,
      tobacco: 36.8,
      alcohol: 11.4,
      anc_4_visits: 50.8,
      institutional_delivery: 93.4,
      full_immunization: 75.6,
      exclusive_breastfeeding: 56.1,
      child_anemia: 67.5,
      health_insurance: 23.2,
      cervical_screening: 1.3,
      primary_health_access: 85.0,
      postnatal_care: 82.1
    }
  },
  {
    districtId: 'UP_AGR',
    districtName: 'Agra',
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    population: 4418797,
    tier: 'Tier-2',
    zone: 'North',
    metrics: {
      hypertension: 22.4,
      blood_glucose: 15.6,
      obesity: 24.8,
      tobacco: 37.5,
      alcohol: 11.8,
      anc_4_visits: 44.5,
      institutional_delivery: 88.5,
      full_immunization: 71.4,
      exclusive_breastfeeding: 59.8,
      child_anemia: 71.2,
      health_insurance: 19.6,
      cervical_screening: 1.0,
      primary_health_access: 78.4,
      postnatal_care: 76.8
    }
  },
  {
    districtId: 'UP_SHR',
    districtName: 'Shrawasti',
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    population: 1117361,
    tier: 'Rural',
    zone: 'North',
    metrics: {
      hypertension: 16.2,
      blood_glucose: 9.8,
      obesity: 11.4,
      tobacco: 44.2,
      alcohol: 14.6,
      anc_4_visits: 23.8,
      institutional_delivery: 71.2,
      full_immunization: 57.4,
      exclusive_breastfeeding: 64.2,
      child_anemia: 78.9,
      health_insurance: 16.4,
      cervical_screening: 0.3,
      primary_health_access: 46.2,
      postnatal_care: 58.4
    }
  },

  // BIHAR
  {
    districtId: 'BR_PAT',
    districtName: 'Patna',
    stateId: 'BR',
    stateName: 'Bihar',
    population: 5838465,
    tier: 'Tier-1',
    zone: 'East',
    metrics: {
      hypertension: 21.6,
      blood_glucose: 15.2,
      obesity: 24.6,
      tobacco: 41.2,
      alcohol: 3.2,
      anc_4_visits: 38.4,
      institutional_delivery: 84.5,
      full_immunization: 74.5,
      exclusive_breastfeeding: 55.4,
      child_anemia: 68.4,
      health_insurance: 18.2,
      cervical_screening: 1.1,
      primary_health_access: 82.4,
      postnatal_care: 74.2
    }
  },
  {
    districtId: 'BR_GAY',
    districtName: 'Gaya',
    stateId: 'BR',
    stateName: 'Bihar',
    population: 4391418,
    tier: 'Tier-2',
    zone: 'East',
    metrics: {
      hypertension: 19.8,
      blood_glucose: 13.4,
      obesity: 18.2,
      tobacco: 46.5,
      alcohol: 2.8,
      anc_4_visits: 31.2,
      institutional_delivery: 79.4,
      full_immunization: 70.8,
      exclusive_breastfeeding: 58.9,
      child_anemia: 72.5,
      health_insurance: 15.4,
      cervical_screening: 0.8,
      primary_health_access: 71.8,
      postnatal_care: 69.8
    }
  },
  {
    districtId: 'BR_KSH',
    districtName: 'Kishanganj',
    stateId: 'BR',
    stateName: 'Bihar',
    population: 1690400,
    tier: 'Rural',
    zone: 'East',
    metrics: {
      hypertension: 17.4,
      blood_glucose: 11.2,
      obesity: 13.8,
      tobacco: 51.4,
      alcohol: 3.5,
      anc_4_visits: 21.5,
      institutional_delivery: 68.2,
      full_immunization: 62.1,
      exclusive_breastfeeding: 62.4,
      child_anemia: 77.4,
      health_insurance: 12.8,
      cervical_screening: 0.4,
      primary_health_access: 52.4,
      postnatal_care: 61.2
    }
  },

  // WEST BENGAL
  {
    districtId: 'WB_KOL',
    districtName: 'Kolkata',
    stateId: 'WB',
    stateName: 'West Bengal',
    population: 4496694,
    tier: 'Metro',
    zone: 'East',
    metrics: {
      hypertension: 31.8,
      blood_glucose: 24.6,
      obesity: 38.4,
      tobacco: 29.4,
      alcohol: 13.2,
      anc_4_visits: 79.4,
      institutional_delivery: 99.2,
      full_immunization: 87.5,
      exclusive_breastfeeding: 54.8,
      child_anemia: 64.2,
      health_insurance: 28.5,
      cervical_screening: 3.2,
      primary_health_access: 96.4,
      postnatal_care: 93.4
    }
  },
  {
    districtId: 'WB_HWR',
    districtName: 'Howrah',
    stateId: 'WB',
    stateName: 'West Bengal',
    population: 4850029,
    tier: 'Tier-2',
    zone: 'East',
    metrics: {
      hypertension: 29.4,
      blood_glucose: 22.8,
      obesity: 33.6,
      tobacco: 32.8,
      alcohol: 14.5,
      anc_4_visits: 74.8,
      institutional_delivery: 97.4,
      full_immunization: 85.1,
      exclusive_breastfeeding: 57.2,
      child_anemia: 67.5,
      health_insurance: 26.2,
      cervical_screening: 2.6,
      primary_health_access: 90.8,
      postnatal_care: 90.2
    }
  },
  {
    districtId: 'WB_PRL',
    districtName: 'Purulia',
    stateId: 'WB',
    stateName: 'West Bengal',
    population: 2930115,
    tier: 'Rural',
    zone: 'East',
    metrics: {
      hypertension: 22.1,
      blood_glucose: 14.5,
      obesity: 16.4,
      tobacco: 43.6,
      alcohol: 19.8,
      anc_4_visits: 58.2,
      institutional_delivery: 89.4,
      full_immunization: 79.4,
      exclusive_breastfeeding: 68.5,
      child_anemia: 73.8,
      health_insurance: 34.2,
      cervical_screening: 0.9,
      primary_health_access: 68.4,
      postnatal_care: 81.5
    }
  },

  // DELHI (UT)
  {
    districtId: 'DL_CEN',
    districtName: 'Central Delhi',
    stateId: 'DL',
    stateName: 'Delhi NCT',
    population: 582320,
    tier: 'Metro',
    zone: 'North',
    metrics: {
      hypertension: 28.4,
      blood_glucose: 22.8,
      obesity: 41.5,
      tobacco: 24.5,
      alcohol: 12.8,
      anc_4_visits: 71.4,
      institutional_delivery: 97.8,
      full_immunization: 78.4,
      exclusive_breastfeeding: 51.2,
      child_anemia: 68.5,
      health_insurance: 22.4,
      cervical_screening: 2.8,
      primary_health_access: 96.8,
      postnatal_care: 91.2
    }
  },
  {
    districtId: 'DL_SOU',
    districtName: 'South Delhi',
    stateId: 'DL',
    stateName: 'Delhi NCT',
    population: 2731929,
    tier: 'Metro',
    zone: 'North',
    metrics: {
      hypertension: 30.2,
      blood_glucose: 24.1,
      obesity: 44.2,
      tobacco: 22.8,
      alcohol: 14.2,
      anc_4_visits: 75.8,
      institutional_delivery: 98.4,
      full_immunization: 81.2,
      exclusive_breastfeeding: 49.5,
      child_anemia: 66.2,
      health_insurance: 26.8,
      cervical_screening: 3.4,
      primary_health_access: 97.4,
      postnatal_care: 93.0
    }
  },

  // PUNJAB
  {
    districtId: 'PB_LDH',
    districtName: 'Ludhiana',
    stateId: 'PB',
    stateName: 'Punjab',
    population: 3498739,
    tier: 'Tier-1',
    zone: 'North',
    metrics: {
      hypertension: 33.5,
      blood_glucose: 22.4,
      obesity: 42.1,
      tobacco: 14.2,
      alcohol: 24.6,
      anc_4_visits: 74.2,
      institutional_delivery: 96.8,
      full_immunization: 82.5,
      exclusive_breastfeeding: 58.4,
      child_anemia: 71.4,
      health_insurance: 36.4,
      cervical_screening: 2.1,
      primary_health_access: 91.2,
      postnatal_care: 90.8
    }
  },
  {
    districtId: 'PB_ASR',
    districtName: 'Amritsar',
    stateId: 'PB',
    stateName: 'Punjab',
    population: 2490656,
    tier: 'Tier-2',
    zone: 'North',
    metrics: {
      hypertension: 32.8,
      blood_glucose: 21.6,
      obesity: 40.5,
      tobacco: 15.6,
      alcohol: 26.8,
      anc_4_visits: 71.5,
      institutional_delivery: 95.9,
      full_immunization: 80.8,
      exclusive_breastfeeding: 59.2,
      child_anemia: 73.2,
      health_insurance: 34.8,
      cervical_screening: 1.8,
      primary_health_access: 89.4,
      postnatal_care: 89.2
    }
  },

  // MADHYA PRADESH
  {
    districtId: 'MP_IND',
    districtName: 'Indore',
    stateId: 'MP',
    stateName: 'Madhya Pradesh',
    population: 3276697,
    tier: 'Tier-1',
    zone: 'Central',
    metrics: {
      hypertension: 24.5,
      blood_glucose: 17.2,
      obesity: 30.4,
      tobacco: 33.4,
      alcohol: 13.8,
      anc_4_visits: 68.2,
      institutional_delivery: 97.5,
      full_immunization: 83.2,
      exclusive_breastfeeding: 61.2,
      child_anemia: 69.4,
      health_insurance: 39.4,
      cervical_screening: 1.9,
      primary_health_access: 90.5,
      postnatal_care: 90.1
    }
  },
  {
    districtId: 'MP_BPL',
    districtName: 'Bhopal',
    stateId: 'MP',
    stateName: 'Madhya Pradesh',
    population: 2371061,
    tier: 'Tier-2',
    zone: 'Central',
    metrics: {
      hypertension: 25.1,
      blood_glucose: 18.0,
      obesity: 31.8,
      tobacco: 31.8,
      alcohol: 12.5,
      anc_4_visits: 66.4,
      institutional_delivery: 96.9,
      full_immunization: 81.6,
      exclusive_breastfeeding: 59.8,
      child_anemia: 70.8,
      health_insurance: 37.8,
      cervical_screening: 1.7,
      primary_health_access: 88.9,
      postnatal_care: 88.5
    }
  },
  {
    districtId: 'MP_BAR',
    districtName: 'Barwani',
    stateId: 'MP',
    stateName: 'Madhya Pradesh',
    population: 1385881,
    tier: 'Rural',
    zone: 'Central',
    metrics: {
      hypertension: 18.2,
      blood_glucose: 11.5,
      obesity: 14.8,
      tobacco: 44.8,
      alcohol: 20.4,
      anc_4_visits: 42.8,
      institutional_delivery: 84.2,
      full_immunization: 68.4,
      exclusive_breastfeeding: 69.8,
      child_anemia: 79.5,
      health_insurance: 44.2,
      cervical_screening: 0.5,
      primary_health_access: 56.4,
      postnatal_care: 76.5
    }
  },

  // ODISHA
  {
    districtId: 'OD_KRD',
    districtName: 'Khurda (Bhubaneswar)',
    stateId: 'OD',
    stateName: 'Odisha',
    population: 2251673,
    tier: 'Tier-1',
    zone: 'East',
    metrics: {
      hypertension: 27.4,
      blood_glucose: 18.9,
      obesity: 29.8,
      tobacco: 38.2,
      alcohol: 15.4,
      anc_4_visits: 76.2,
      institutional_delivery: 96.4,
      full_immunization: 91.2,
      exclusive_breastfeeding: 68.4,
      child_anemia: 63.5,
      health_insurance: 68.4,
      cervical_screening: 2.5,
      primary_health_access: 91.4,
      postnatal_care: 92.1
    }
  },
  {
    districtId: 'OD_MBN',
    districtName: 'Mayurbhanj',
    stateId: 'OD',
    stateName: 'Odisha',
    population: 2519738,
    tier: 'Rural',
    zone: 'East',
    metrics: {
      hypertension: 21.8,
      blood_glucose: 13.2,
      obesity: 15.2,
      tobacco: 54.8,
      alcohol: 28.5,
      anc_4_visits: 58.4,
      institutional_delivery: 88.2,
      full_immunization: 87.4,
      exclusive_breastfeeding: 74.2,
      child_anemia: 72.8,
      health_insurance: 74.2,
      cervical_screening: 0.8,
      primary_health_access: 64.2,
      postnatal_care: 83.5
    }
  },

  // ASSAM
  {
    districtId: 'AS_KAM',
    districtName: 'Kamrup Metropolitan (Guwahati)',
    stateId: 'AS',
    stateName: 'Assam',
    population: 1253938,
    tier: 'Tier-2',
    zone: 'North-East',
    metrics: {
      hypertension: 28.9,
      blood_glucose: 19.8,
      obesity: 29.4,
      tobacco: 52.4,
      alcohol: 22.8,
      anc_4_visits: 68.4,
      institutional_delivery: 94.2,
      full_immunization: 79.5,
      exclusive_breastfeeding: 64.5,
      child_anemia: 67.2,
      health_insurance: 60.5,
      cervical_screening: 2.1,
      primary_health_access: 88.4,
      postnatal_care: 87.2
    }
  },
  {
    districtId: 'AS_DHU',
    districtName: 'Dhubri',
    stateId: 'AS',
    stateName: 'Assam',
    population: 1949258,
    tier: 'Rural',
    zone: 'North-East',
    metrics: {
      hypertension: 21.4,
      blood_glucose: 14.1,
      obesity: 16.2,
      tobacco: 62.8,
      alcohol: 18.2,
      anc_4_visits: 42.1,
      institutional_delivery: 79.5,
      full_immunization: 68.4,
      exclusive_breastfeeding: 69.8,
      child_anemia: 76.8,
      health_insurance: 54.8,
      cervical_screening: 0.6,
      primary_health_access: 58.4,
      postnatal_care: 74.1
    }
  },

  // JHARKHAND
  {
    districtId: 'JH_RNC',
    districtName: 'Ranchi',
    stateId: 'JH',
    stateName: 'Jharkhand',
    population: 2914253,
    tier: 'Tier-2',
    zone: 'East',
    metrics: {
      hypertension: 22.5,
      blood_glucose: 15.8,
      obesity: 23.4,
      tobacco: 44.5,
      alcohol: 19.4,
      anc_4_visits: 51.4,
      institutional_delivery: 86.8,
      full_immunization: 76.5,
      exclusive_breastfeeding: 62.4,
      child_anemia: 69.5,
      health_insurance: 36.8,
      cervical_screening: 1.4,
      primary_health_access: 82.1,
      postnatal_care: 81.4
    }
  },
  {
    districtId: 'JH_PAW',
    districtName: 'Pakur',
    stateId: 'JH',
    stateName: 'Jharkhand',
    population: 900422,
    tier: 'Rural',
    zone: 'East',
    metrics: {
      hypertension: 17.8,
      blood_glucose: 10.4,
      obesity: 11.8,
      tobacco: 56.8,
      alcohol: 24.2,
      anc_4_visits: 28.6,
      institutional_delivery: 66.4,
      full_immunization: 59.8,
      exclusive_breastfeeding: 67.8,
      child_anemia: 79.2,
      health_insurance: 28.5,
      cervical_screening: 0.4,
      primary_health_access: 47.8,
      postnatal_care: 62.4
    }
  },

  // CHHATTISGARH
  {
    districtId: 'CG_RAI',
    districtName: 'Raipur',
    stateId: 'CG',
    stateName: 'Chhattisgarh',
    population: 2160876,
    tier: 'Tier-2',
    zone: 'Central',
    metrics: {
      hypertension: 23.8,
      blood_glucose: 16.5,
      obesity: 26.5,
      tobacco: 42.1,
      alcohol: 25.4,
      anc_4_visits: 64.2,
      institutional_delivery: 92.4,
      full_immunization: 84.2,
      exclusive_breastfeeding: 69.4,
      child_anemia: 66.8,
      health_insurance: 71.4,
      cervical_screening: 1.8,
      primary_health_access: 86.2,
      postnatal_care: 88.4
    }
  },

  // HARYANA
  {
    districtId: 'HR_GGN',
    districtName: 'Gurugram',
    stateId: 'HR',
    stateName: 'Haryana',
    population: 1514432,
    tier: 'Tier-1',
    zone: 'North',
    metrics: {
      hypertension: 29.4,
      blood_glucose: 21.8,
      obesity: 41.2,
      tobacco: 23.4,
      alcohol: 15.6,
      anc_4_visits: 76.5,
      institutional_delivery: 96.8,
      full_immunization: 81.4,
      exclusive_breastfeeding: 52.8,
      child_anemia: 69.5,
      health_insurance: 34.2,
      cervical_screening: 2.8,
      primary_health_access: 94.2,
      postnatal_care: 91.4
    }
  },

  // HIMACHAL PRADESH
  {
    districtId: 'HP_SML',
    districtName: 'Shimla',
    stateId: 'HP',
    stateName: 'Himachal Pradesh',
    population: 814010,
    tier: 'Tier-2',
    zone: 'North',
    metrics: {
      hypertension: 31.2,
      blood_glucose: 19.4,
      obesity: 34.8,
      tobacco: 21.4,
      alcohol: 22.8,
      anc_4_visits: 78.4,
      institutional_delivery: 95.8,
      full_immunization: 89.4,
      exclusive_breastfeeding: 67.2,
      child_anemia: 52.4,
      health_insurance: 65.4,
      cervical_screening: 3.1,
      primary_health_access: 86.4,
      postnatal_care: 93.2
    }
  },

  // UTTARAKHAND
  {
    districtId: 'UK_DDN',
    districtName: 'Dehradun',
    stateId: 'UK',
    stateName: 'Uttarakhand',
    population: 1696694,
    tier: 'Tier-2',
    zone: 'North',
    metrics: {
      hypertension: 28.5,
      blood_glucose: 18.9,
      obesity: 33.6,
      tobacco: 27.5,
      alcohol: 18.2,
      anc_4_visits: 71.4,
      institutional_delivery: 94.6,
      full_immunization: 83.2,
      exclusive_breastfeeding: 61.4,
      child_anemia: 61.2,
      health_insurance: 54.2,
      cervical_screening: 2.4,
      primary_health_access: 88.2,
      postnatal_care: 89.4
    }
  },

  // JAMMU & KASHMIR
  {
    districtId: 'JK_SGR',
    districtName: 'Srinagar',
    stateId: 'JK',
    stateName: 'Jammu and Kashmir',
    population: 1236829,
    tier: 'Tier-2',
    zone: 'North',
    metrics: {
      hypertension: 32.4,
      blood_glucose: 17.8,
      obesity: 35.8,
      tobacco: 38.4,
      alcohol: 2.1,
      anc_4_visits: 79.5,
      institutional_delivery: 98.4,
      full_immunization: 86.8,
      exclusive_breastfeeding: 64.2,
      child_anemia: 71.4,
      health_insurance: 64.2,
      cervical_screening: 1.8,
      primary_health_access: 90.4,
      postnatal_care: 92.1
    }
  },

  // GOA
  {
    districtId: 'GA_NG',
    districtName: 'North Goa',
    stateId: 'GA',
    stateName: 'Goa',
    population: 818008,
    tier: 'Tier-2',
    zone: 'West',
    metrics: {
      hypertension: 32.6,
      blood_glucose: 23.4,
      obesity: 38.2,
      tobacco: 18.4,
      alcohol: 28.4,
      anc_4_visits: 92.1,
      institutional_delivery: 99.8,
      full_immunization: 91.5,
      exclusive_breastfeeding: 63.8,
      child_anemia: 46.2,
      health_insurance: 68.2,
      cervical_screening: 5.2,
      primary_health_access: 98.2,
      postnatal_care: 97.4
    }
  }
];

// Enrich with MOI components
export const DISTRICTS_DATA: DistrictMetricData[] = RAW_DISTRICTS.map(d => ({
  ...d,
  moiComponents: calculateMoiScores(d.metrics)
}));

// State Summaries calculated from districts and weighted
export const STATES_DATA: StateSummary[] = [
  {
    stateId: 'MH',
    stateName: 'Maharashtra',
    stateCode: 'MH',
    capital: 'Mumbai',
    zone: 'West',
    districtCount: 36,
    totalPopulation: 112374333,
    averages: {
      hypertension: 24.4,
      blood_glucose: 17.2,
      obesity: 29.8,
      tobacco: 27.6,
      alcohol: 14.8,
      anc_4_visits: 71.2,
      institutional_delivery: 96.4,
      full_immunization: 81.3,
      exclusive_breastfeeding: 62.4,
      child_anemia: 65.2,
      health_insurance: 36.0,
      cervical_screening: 2.1,
      primary_health_access: 80.2,
      postnatal_care: 87.2
    },
    avgMoi: 51.4
  },
  {
    stateId: 'KL',
    stateName: 'Kerala',
    stateCode: 'KL',
    capital: 'Thiruvananthapuram',
    zone: 'South',
    districtCount: 14,
    totalPopulation: 33406061,
    averages: {
      hypertension: 34.2,
      blood_glucose: 25.9,
      obesity: 38.6,
      tobacco: 16.5,
      alcohol: 17.6,
      anc_4_visits: 89.7,
      institutional_delivery: 99.8,
      full_immunization: 91.2,
      exclusive_breastfeeding: 68.1,
      child_anemia: 37.9,
      health_insurance: 64.5,
      cervical_screening: 5.5,
      primary_health_access: 96.5,
      postnatal_care: 97.2
    },
    avgMoi: 42.8
  },
  {
    stateId: 'TN',
    stateName: 'Tamil Nadu',
    stateCode: 'TN',
    capital: 'Chennai',
    zone: 'South',
    districtCount: 38,
    totalPopulation: 72147030,
    averages: {
      hypertension: 28.5,
      blood_glucose: 22.1,
      obesity: 36.7,
      tobacco: 19.8,
      alcohol: 16.2,
      anc_4_visits: 83.9,
      institutional_delivery: 99.4,
      full_immunization: 88.3,
      exclusive_breastfeeding: 62.1,
      child_anemia: 54.5,
      health_insurance: 61.1,
      cervical_screening: 3.8,
      primary_health_access: 93.5,
      postnatal_care: 94.3
    },
    avgMoi: 46.2
  },
  {
    stateId: 'KA',
    stateName: 'Karnataka',
    stateCode: 'KA',
    capital: 'Bengaluru',
    zone: 'South',
    districtCount: 31,
    totalPopulation: 61095297,
    averages: {
      hypertension: 26.2,
      blood_glucose: 19.3,
      obesity: 31.4,
      tobacco: 22.2,
      alcohol: 14.4,
      anc_4_visits: 76.2,
      institutional_delivery: 98.3,
      full_immunization: 85.1,
      exclusive_breastfeeding: 61.7,
      child_anemia: 64.1,
      health_insurance: 40.7,
      cervical_screening: 2.7,
      primary_health_access: 86.8,
      postnatal_care: 91.2
    },
    avgMoi: 49.3
  },
  {
    stateId: 'TG',
    stateName: 'Telangana',
    stateCode: 'TG',
    capital: 'Hyderabad',
    zone: 'South',
    districtCount: 33,
    totalPopulation: 35003674,
    averages: {
      hypertension: 30.0,
      blood_glucose: 22.3,
      obesity: 37.7,
      tobacco: 21.9,
      alcohol: 19.0,
      anc_4_visits: 79.9,
      institutional_delivery: 98.9,
      full_immunization: 84.8,
      exclusive_breastfeeding: 61.8,
      child_anemia: 69.8,
      health_insurance: 63.1,
      cervical_screening: 2.8,
      primary_health_access: 90.2,
      postnatal_care: 92.7
    },
    avgMoi: 52.8
  },
  {
    stateId: 'AP',
    stateName: 'Andhra Pradesh',
    stateCode: 'AP',
    capital: 'Amaravati',
    zone: 'South',
    districtCount: 26,
    totalPopulation: 49577103,
    averages: {
      hypertension: 30.2,
      blood_glucose: 22.1,
      obesity: 35.8,
      tobacco: 23.9,
      alcohol: 19.1,
      anc_4_visits: 83.5,
      institutional_delivery: 99.0,
      full_immunization: 87.0,
      exclusive_breastfeeding: 64.1,
      child_anemia: 63.3,
      health_insurance: 79.8,
      cervical_screening: 3.2,
      primary_health_access: 90.6,
      postnatal_care: 94.0
    },
    avgMoi: 48.7
  },
  {
    stateId: 'GJ',
    stateName: 'Gujarat',
    stateCode: 'GJ',
    capital: 'Gandhinagar',
    zone: 'West',
    districtCount: 33,
    totalPopulation: 60439692,
    averages: {
      hypertension: 23.4,
      blood_glucose: 17.5,
      obesity: 31.5,
      tobacco: 27.1,
      alcohol: 4.8,
      anc_4_visits: 73.8,
      institutional_delivery: 98.0,
      full_immunization: 81.9,
      exclusive_breastfeeding: 59.5,
      child_anemia: 76.4,
      health_insurance: 44.2,
      cervical_screening: 2.1,
      primary_health_access: 91.9,
      postnatal_care: 91.1
    },
    avgMoi: 51.6
  },
  {
    stateId: 'RJ',
    stateName: 'Rajasthan',
    stateCode: 'RJ',
    capital: 'Jaipur',
    zone: 'North',
    districtCount: 33,
    totalPopulation: 68548437,
    averages: {
      hypertension: 20.4,
      blood_glucose: 13.7,
      obesity: 22.2,
      tobacco: 32.7,
      alcohol: 9.6,
      anc_4_visits: 54.5,
      institutional_delivery: 95.2,
      full_immunization: 80.2,
      exclusive_breastfeeding: 71.7,
      child_anemia: 73.2,
      health_insurance: 89.4,
      cervical_screening: 1.0,
      primary_health_access: 76.0,
      postnatal_care: 84.8
    },
    avgMoi: 53.1
  },
  {
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    stateCode: 'UP',
    capital: 'Lucknow',
    zone: 'North',
    districtCount: 75,
    totalPopulation: 199812341,
    averages: {
      hypertension: 22.4,
      blood_glucose: 15.5,
      obesity: 23.6,
      tobacco: 38.2,
      alcohol: 12.1,
      anc_4_visits: 44.0,
      institutional_delivery: 88.1,
      full_immunization: 71.1,
      exclusive_breastfeeding: 58.5,
      child_anemia: 70.5,
      health_insurance: 21.1,
      cervical_screening: 1.1,
      primary_health_access: 75.9,
      postnatal_care: 76.3
    },
    avgMoi: 64.8
  },
  {
    stateId: 'BR',
    stateName: 'Bihar',
    stateCode: 'BR',
    capital: 'Patna',
    zone: 'East',
    districtCount: 38,
    totalPopulation: 104099452,
    averages: {
      hypertension: 19.6,
      blood_glucose: 13.3,
      obesity: 18.9,
      tobacco: 46.4,
      alcohol: 3.2,
      anc_4_visits: 30.4,
      institutional_delivery: 77.4,
      full_immunization: 69.1,
      exclusive_breastfeeding: 58.9,
      child_anemia: 72.8,
      health_insurance: 15.5,
      cervical_screening: 0.8,
      primary_health_access: 68.7,
      postnatal_care: 68.4
    },
    avgMoi: 68.2
  },
  {
    stateId: 'WB',
    stateName: 'West Bengal',
    stateCode: 'WB',
    capital: 'Kolkata',
    zone: 'East',
    districtCount: 23,
    totalPopulation: 91276115,
    averages: {
      hypertension: 27.8,
      blood_glucose: 20.6,
      obesity: 29.5,
      tobacco: 35.3,
      alcohol: 15.8,
      anc_4_visits: 70.8,
      institutional_delivery: 95.3,
      full_immunization: 84.0,
      exclusive_breastfeeding: 60.2,
      child_anemia: 68.5,
      health_insurance: 29.6,
      cervical_screening: 2.2,
      primary_health_access: 85.2,
      postnatal_care: 88.4
    },
    avgMoi: 57.4
  },
  {
    stateId: 'DL',
    stateName: 'Delhi NCT',
    stateCode: 'DL',
    capital: 'New Delhi',
    zone: 'North',
    districtCount: 11,
    totalPopulation: 16787941,
    averages: {
      hypertension: 29.3,
      blood_glucose: 23.5,
      obesity: 42.9,
      tobacco: 23.7,
      alcohol: 13.5,
      anc_4_visits: 73.6,
      institutional_delivery: 98.1,
      full_immunization: 79.8,
      exclusive_breastfeeding: 50.4,
      child_anemia: 67.4,
      health_insurance: 24.6,
      cervical_screening: 3.1,
      primary_health_access: 97.1,
      postnatal_care: 92.1
    },
    avgMoi: 48.9
  },
  {
    stateId: 'PB',
    stateName: 'Punjab',
    stateCode: 'PB',
    capital: 'Chandigarh',
    zone: 'North',
    districtCount: 23,
    totalPopulation: 27743338,
    averages: {
      hypertension: 33.2,
      blood_glucose: 22.0,
      obesity: 41.3,
      tobacco: 14.9,
      alcohol: 25.7,
      anc_4_visits: 72.9,
      institutional_delivery: 96.4,
      full_immunization: 81.7,
      exclusive_breastfeeding: 58.8,
      child_anemia: 72.3,
      health_insurance: 35.6,
      cervical_screening: 2.0,
      primary_health_access: 90.3,
      postnatal_care: 90.0
    },
    avgMoi: 51.5
  },
  {
    stateId: 'MP',
    stateName: 'Madhya Pradesh',
    stateCode: 'MP',
    capital: 'Bhopal',
    zone: 'Central',
    districtCount: 52,
    totalPopulation: 72626809,
    averages: {
      hypertension: 22.6,
      blood_glucose: 15.6,
      obesity: 25.7,
      tobacco: 36.7,
      alcohol: 15.6,
      anc_4_visits: 59.1,
      institutional_delivery: 92.9,
      full_immunization: 77.7,
      exclusive_breastfeeding: 63.6,
      child_anemia: 73.2,
      health_insurance: 40.5,
      cervical_screening: 1.4,
      primary_health_access: 78.6,
      postnatal_care: 85.0
    },
    avgMoi: 59.8
  },
  {
    stateId: 'OD',
    stateName: 'Odisha',
    stateCode: 'OD',
    capital: 'Bhubaneswar',
    zone: 'East',
    districtCount: 30,
    totalPopulation: 41974218,
    averages: {
      hypertension: 24.6,
      blood_glucose: 16.1,
      obesity: 22.5,
      tobacco: 46.5,
      alcohol: 22.0,
      anc_4_visits: 67.3,
      institutional_delivery: 92.3,
      full_immunization: 89.3,
      exclusive_breastfeeding: 71.3,
      child_anemia: 68.2,
      health_insurance: 71.3,
      cervical_screening: 1.7,
      primary_health_access: 77.8,
      postnatal_care: 87.8
    },
    avgMoi: 54.2
  },
  {
    stateId: 'AS',
    stateName: 'Assam',
    stateCode: 'AS',
    capital: 'Dispur',
    zone: 'North-East',
    districtCount: 35,
    totalPopulation: 31205576,
    averages: {
      hypertension: 25.2,
      blood_glucose: 17.0,
      obesity: 22.8,
      tobacco: 57.6,
      alcohol: 20.5,
      anc_4_visits: 55.3,
      institutional_delivery: 86.9,
      full_immunization: 74.0,
      exclusive_breastfeeding: 67.2,
      child_anemia: 72.0,
      health_insurance: 57.7,
      cervical_screening: 1.4,
      primary_health_access: 73.4,
      postnatal_care: 80.7
    },
    avgMoi: 61.5
  },
  {
    stateId: 'JH',
    stateName: 'Jharkhand',
    stateCode: 'JH',
    capital: 'Ranchi',
    zone: 'East',
    districtCount: 24,
    totalPopulation: 32988134,
    averages: {
      hypertension: 20.2,
      blood_glucose: 13.1,
      obesity: 17.6,
      tobacco: 50.7,
      alcohol: 21.8,
      anc_4_visits: 40.0,
      institutional_delivery: 76.6,
      full_immunization: 68.2,
      exclusive_breastfeeding: 65.1,
      child_anemia: 74.4,
      health_insurance: 32.7,
      cervical_screening: 0.9,
      primary_health_access: 65.0,
      postnatal_care: 71.9
    },
    avgMoi: 66.4
  },
  {
    stateId: 'CG',
    stateName: 'Chhattisgarh',
    stateCode: 'CG',
    capital: 'Raipur',
    zone: 'Central',
    districtCount: 33,
    totalPopulation: 25545198,
    averages: {
      hypertension: 23.8,
      blood_glucose: 16.5,
      obesity: 26.5,
      tobacco: 42.1,
      alcohol: 25.4,
      anc_4_visits: 64.2,
      institutional_delivery: 92.4,
      full_immunization: 84.2,
      exclusive_breastfeeding: 69.4,
      child_anemia: 66.8,
      health_insurance: 71.4,
      cervical_screening: 1.8,
      primary_health_access: 86.2,
      postnatal_care: 88.4
    },
    avgMoi: 52.6
  },
  {
    stateId: 'HR',
    stateName: 'Haryana',
    stateCode: 'HR',
    capital: 'Chandigarh',
    zone: 'North',
    districtCount: 22,
    totalPopulation: 25351462,
    averages: {
      hypertension: 29.4,
      blood_glucose: 21.8,
      obesity: 41.2,
      tobacco: 23.4,
      alcohol: 15.6,
      anc_4_visits: 76.5,
      institutional_delivery: 96.8,
      full_immunization: 81.4,
      exclusive_breastfeeding: 52.8,
      child_anemia: 69.5,
      health_insurance: 34.2,
      cervical_screening: 2.8,
      primary_health_access: 94.2,
      postnatal_care: 91.4
    },
    avgMoi: 49.8
  },
  {
    stateId: 'HP',
    stateName: 'Himachal Pradesh',
    stateCode: 'HP',
    capital: 'Shimla',
    zone: 'North',
    districtCount: 12,
    totalPopulation: 6864602,
    averages: {
      hypertension: 31.2,
      blood_glucose: 19.4,
      obesity: 34.8,
      tobacco: 21.4,
      alcohol: 22.8,
      anc_4_visits: 78.4,
      institutional_delivery: 95.8,
      full_immunization: 89.4,
      exclusive_breastfeeding: 67.2,
      child_anemia: 52.4,
      health_insurance: 65.4,
      cervical_screening: 3.1,
      primary_health_access: 86.4,
      postnatal_care: 93.2
    },
    avgMoi: 44.5
  },
  {
    stateId: 'UK',
    stateName: 'Uttarakhand',
    stateCode: 'UK',
    capital: 'Dehradun',
    zone: 'North',
    districtCount: 13,
    totalPopulation: 10086292,
    averages: {
      hypertension: 28.5,
      blood_glucose: 18.9,
      obesity: 33.6,
      tobacco: 27.5,
      alcohol: 18.2,
      anc_4_visits: 71.4,
      institutional_delivery: 94.6,
      full_immunization: 83.2,
      exclusive_breastfeeding: 61.4,
      child_anemia: 61.2,
      health_insurance: 54.2,
      cervical_screening: 2.4,
      primary_health_access: 88.2,
      postnatal_care: 89.4
    },
    avgMoi: 49.1
  },
  {
    stateId: 'JK',
    stateName: 'Jammu and Kashmir',
    stateCode: 'JK',
    capital: 'Srinagar / Jammu',
    zone: 'North',
    districtCount: 20,
    totalPopulation: 12267032,
    averages: {
      hypertension: 32.4,
      blood_glucose: 17.8,
      obesity: 35.8,
      tobacco: 38.4,
      alcohol: 2.1,
      anc_4_visits: 79.5,
      institutional_delivery: 98.4,
      full_immunization: 86.8,
      exclusive_breastfeeding: 64.2,
      child_anemia: 71.4,
      health_insurance: 64.2,
      cervical_screening: 1.8,
      primary_health_access: 90.4,
      postnatal_care: 92.1
    },
    avgMoi: 51.2
  },
  {
    stateId: 'GA',
    stateName: 'Goa',
    stateCode: 'GA',
    capital: 'Panaji',
    zone: 'West',
    districtCount: 2,
    totalPopulation: 1458545,
    averages: {
      hypertension: 32.6,
      blood_glucose: 23.4,
      obesity: 38.2,
      tobacco: 18.4,
      alcohol: 28.4,
      anc_4_visits: 92.1,
      institutional_delivery: 99.8,
      full_immunization: 91.5,
      exclusive_breastfeeding: 63.8,
      child_anemia: 46.2,
      health_insurance: 68.2,
      cervical_screening: 5.2,
      primary_health_access: 98.2,
      postnatal_care: 97.4
    },
    avgMoi: 41.5
  }
];
