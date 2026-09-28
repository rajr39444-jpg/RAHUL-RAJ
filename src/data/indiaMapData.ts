export interface StateGeoFeature {
  id: string; // stateId, e.g., 'MH', 'KL', 'DL', 'TN', etc.
  name: string;
  path: string; // SVG path data
  center: [number, number]; // [x, y] coordinates on the 800x860 canvas
  labelPos: [number, number];
}

// Custom simplified projection for India SVG viewport (0 0 800 860)
export const INDIA_STATE_PATHS: StateGeoFeature[] = [
  {
    id: 'JK',
    name: 'Jammu and Kashmir & Ladakh',
    center: [300, 110],
    labelPos: [290, 110],
    path: 'M 255,145 L 240,110 L 265,65 L 320,40 L 390,75 L 395,120 L 340,155 L 305,150 L 285,175 L 260,165 Z'
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    center: [325, 185],
    labelPos: [320, 185],
    path: 'M 285,175 L 305,150 L 340,155 L 360,185 L 335,210 L 300,205 L 285,185 Z'
  },
  {
    id: 'PB',
    name: 'Punjab',
    center: [270, 205],
    labelPos: [265, 205],
    path: 'M 260,165 L 285,175 L 295,205 L 275,230 L 245,215 L 245,185 Z'
  },
  {
    id: 'UK',
    name: 'Uttarakhand',
    center: [365, 220],
    labelPos: [365, 220],
    path: 'M 340,185 L 375,195 L 395,235 L 360,250 L 340,225 Z'
  },
  {
    id: 'HR',
    name: 'Haryana',
    center: [290, 240],
    labelPos: [285, 240],
    path: 'M 275,225 L 305,215 L 315,245 L 290,265 L 270,250 Z'
  },
  {
    id: 'DL',
    name: 'Delhi NCT',
    center: [315, 245],
    labelPos: [315, 245],
    path: 'M 310,240 L 322,240 L 322,252 L 310,252 Z'
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    center: [225, 305],
    labelPos: [225, 305],
    path: 'M 245,215 L 275,230 L 290,265 L 270,300 L 295,340 L 255,390 L 195,385 L 140,325 L 175,260 L 220,230 Z'
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    center: [385, 300],
    labelPos: [385, 300],
    path: 'M 315,245 L 360,245 L 395,235 L 475,275 L 500,320 L 460,355 L 380,365 L 350,380 L 325,325 L 320,270 Z'
  },
  {
    id: 'BR',
    name: 'Bihar',
    center: [535, 335],
    labelPos: [535, 335],
    path: 'M 480,290 L 565,295 L 585,340 L 545,365 L 485,345 Z'
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    center: [165, 420],
    labelPos: [165, 420],
    path: 'M 140,325 L 195,385 L 210,435 L 185,480 L 145,465 L 110,435 L 90,390 L 145,385 Z'
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    center: [340, 410],
    labelPos: [340, 410],
    path: 'M 255,390 L 295,340 L 350,380 L 440,365 L 450,425 L 385,460 L 325,470 L 245,455 L 225,415 Z'
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    center: [520, 395],
    labelPos: [520, 395],
    path: 'M 485,355 L 545,365 L 565,415 L 510,435 L 480,410 Z'
  },
  {
    id: 'WB',
    name: 'West Bengal',
    center: [580, 380],
    labelPos: [580, 380],
    path: 'M 565,295 L 590,265 L 605,315 L 585,340 L 600,430 L 565,420 L 555,385 Z'
  },
  {
    id: 'CG',
    name: 'Chhattisgarh',
    center: [435, 475],
    labelPos: [435, 475],
    path: 'M 440,385 L 480,410 L 465,510 L 435,550 L 405,505 L 415,445 Z'
  },
  {
    id: 'OD',
    name: 'Odisha',
    center: [505, 490],
    labelPos: [505, 490],
    path: 'M 480,415 L 560,430 L 530,515 L 475,540 L 465,500 L 485,455 Z'
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    center: [275, 520],
    labelPos: [275, 520],
    path: 'M 195,475 L 245,455 L 340,465 L 390,460 L 385,530 L 340,565 L 275,600 L 220,575 L 205,525 Z'
  },
  {
    id: 'TG',
    name: 'Telangana',
    center: [370, 570],
    labelPos: [370, 570],
    path: 'M 345,545 L 390,525 L 420,570 L 375,625 L 335,600 Z'
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    center: [390, 645],
    labelPos: [390, 645],
    path: 'M 420,570 L 475,540 L 425,670 L 360,705 L 340,660 L 375,625 Z'
  },
  {
    id: 'KA',
    name: 'Karnataka',
    center: [285, 665],
    labelPos: [285, 665],
    path: 'M 235,590 L 285,595 L 335,605 L 340,665 L 335,715 L 275,735 L 240,670 Z'
  },
  {
    id: 'GA',
    name: 'Goa',
    center: [230, 640],
    labelPos: [230, 640],
    path: 'M 226,632 L 236,634 L 233,646 L 224,642 Z'
  },
  {
    id: 'KL',
    name: 'Kerala',
    center: [280, 775],
    labelPos: [280, 775],
    path: 'M 265,720 L 285,735 L 295,780 L 305,820 L 285,825 L 265,750 Z'
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    center: [335, 765],
    labelPos: [335, 765],
    path: 'M 335,715 L 360,705 L 365,770 L 320,830 L 305,820 L 290,750 Z'
  },
  {
    id: 'AS',
    name: 'Assam & North East',
    center: [680, 310],
    labelPos: [680, 310],
    path: 'M 605,310 L 640,270 L 710,240 L 745,280 L 720,335 L 670,350 L 640,325 Z'
  }
];

// District centroids for plotting within states
export interface DistrictMarkerPos {
  districtId: string;
  name: string;
  stateId: string;
  x: number;
  y: number;
}

export const DISTRICT_MAP_COORDS: Record<string, [number, number]> = {
  // MH
  MH_MUM: [210, 520],
  MH_PUN: [245, 545],
  MH_THN: [222, 510],
  MH_NAG: [350, 480],
  MH_GAD: [375, 515],
  // KL
  KL_TVM: [298, 815],
  KL_EKM: [280, 770],
  KL_KKD: [272, 740],
  // TN
  TN_CHN: [362, 705],
  TN_CBE: [305, 765],
  TN_MDU: [328, 795],
  // KA
  KA_BLR: [315, 690],
  KA_MYS: [292, 715],
  KA_BEL: [255, 620],
  // TG
  TG_HYD: [355, 580],
  TG_WRG: [378, 560],
  // AP
  AP_VSK: [445, 565],
  AP_GNT: [385, 625],
  // GJ
  GJ_AHM: [175, 410],
  GJ_SUR: [180, 460],
  GJ_VAD: [195, 430],
  // RJ
  RJ_JAI: [265, 290],
  RJ_JOD: [215, 315],
  RJ_BAR: [185, 345],
  // UP
  UP_LKO: [390, 305],
  UP_VNS: [440, 335],
  UP_KNP: [375, 325],
  UP_AGR: [335, 285],
  UP_SHR: [415, 275],
  // BR
  BR_PAT: [515, 335],
  BR_GAY: [510, 355],
  BR_KSH: [570, 310],
  // WB
  WB_KOL: [585, 405],
  WB_HWR: [575, 400],
  WB_PRL: [535, 385],
  // DL
  DL_CEN: [316, 246],
  DL_SOU: [316, 252],
  // PB
  PB_LDH: [270, 205],
  PB_ASR: [255, 195],
  // MP
  MP_IND: [285, 435],
  MP_BPL: [315, 420],
  MP_BAR: [255, 445],
  // OD
  OD_KRD: [515, 485],
  OD_MBN: [535, 445],
  // AS
  AS_KAM: [665, 315],
  AS_DHU: [635, 325],
  // JH
  JH_RNC: [515, 395],
  JH_PAW: [555, 365],
  // CG
  CG_RAI: [435, 475],
  // HR
  HR_GGN: [310, 255],
  // HP
  HP_SML: [320, 185],
  // UK
  UK_DDN: [345, 215],
  // JK
  JK_SGR: [270, 125],
  // GA
  GA_NG: [228, 638]
};
