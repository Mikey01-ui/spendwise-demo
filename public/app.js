// State management
const isDemoMode = () => {
  return new URLSearchParams(window.location.search).has('demo') ||
         window.location.hostname.includes('vercel.app') ||
         !localStorage.getItem('spendwise_token');
};

const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const demoId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const DEFAULT_TRANSACTIONS = [{"id":"demo_tx_2026_09_01","type":"income","amount":2850,"name":"Salary & Client Retainer","date":"2026-09-01","category":"Salary","isNecessary":true,"notes":"Monthly retainer payout"},{"id":"demo_tx_2026_09_02","type":"expense","amount":68.4,"name":"Albert Heijn Groceries","date":"2026-09-02","category":"Food","isNecessary":true,"notes":"Weekly fresh groceries"},{"id":"demo_tx_2026_09_03","type":"expense","amount":45,"name":"NS Transit Card Top-Up","date":"2026-09-03","category":"Transport","isNecessary":true,"notes":"Monthly train and transit pass"},{"id":"demo_tx_2026_09_04","type":"expense","amount":34.99,"name":"USB-C Cable & 65W GaN Charger","date":"2026-09-04","category":"Shopping","isNecessary":true,"notes":"Workstation hardware gear"},{"id":"demo_tx_2026_09_05","type":"expense","amount":14.2,"name":"Artisan Bakery & Espresso","date":"2026-09-05","category":"Food","isNecessary":false,"notes":"Morning coffee and pastry"},{"id":"demo_tx_2026_09_06","type":"expense","amount":14.99,"name":"Spotify Premium Family","date":"2026-09-06","category":"Miscellaneous","isNecessary":false,"notes":"Monthly music stream"},{"id":"demo_tx_2026_09_08","type":"expense","amount":34.99,"name":"Health & Gym Membership","date":"2026-09-08","category":"Miscellaneous","isNecessary":true,"notes":"Fitness club access"},{"id":"demo_tx_2026_09_09","type":"expense","amount":72.8,"name":"Jumbo Supermarkt Restock","date":"2026-09-09","category":"Food","isNecessary":true,"notes":"Weekly staples and pantry goods"},{"id":"demo_tx_2026_09_11","type":"expense","amount":59.9,"name":"Minimal Clean Jacket","date":"2026-09-11","category":"Shopping","isNecessary":false,"notes":"Wardrobe essentials"},{"id":"demo_tx_2026_09_13","type":"expense","amount":48.5,"name":"Dinner with Team (Osteria)","date":"2026-09-13","category":"Food","isNecessary":false,"notes":"Weekend dinner"},{"id":"demo_tx_2026_09_14","type":"expense","amount":19,"name":"GitHub Pro & Copilot","date":"2026-09-14","category":"Miscellaneous","isNecessary":true,"notes":"Developer cloud toolset"},{"id":"demo_tx_2026_09_15","type":"income","amount":420,"name":"Freelance UI / System Payout","date":"2026-09-15","category":"Side Gig","isNecessary":true,"notes":"Milestone project payout"},{"id":"demo_tx_2026_09_16","type":"expense","amount":18.5,"name":"Bolt City Ride","date":"2026-09-16","category":"Transport","isNecessary":false,"notes":"Evening ride home"},{"id":"demo_tx_2026_09_18","type":"expense","amount":32.6,"name":"Local Fresh Market","date":"2026-09-18","category":"Food","isNecessary":true,"notes":"Fresh fruits and produce"},{"id":"demo_tx_2026_09_20","type":"expense","amount":28.5,"name":"Systems Architecture Book","date":"2026-09-20","category":"Shopping","isNecessary":false,"notes":"Engineering literature"},{"id":"demo_tx_2026_09_22","type":"expense","amount":20,"name":"5G Unlimited Mobile Plan","date":"2026-09-22","category":"Miscellaneous","isNecessary":true,"notes":"Phone network carrier"},{"id":"demo_tx_2026_09_23","type":"expense","amount":21.5,"name":"Ramen Bar Lunch","date":"2026-09-23","category":"Food","isNecessary":false,"notes":"Quick workday lunch"},{"id":"demo_tx_2026_09_25","type":"expense","amount":12.2,"name":"City Tram & Metro GVB","date":"2026-09-25","category":"Transport","isNecessary":true,"notes":"Local urban commute"},{"id":"demo_tx_2026_08_01","type":"income","amount":2850,"name":"Salary & Client Retainer","date":"2026-08-01","category":"Salary","isNecessary":true,"notes":"Monthly retainer payout"},{"id":"demo_tx_2026_08_02","type":"expense","amount":68.4,"name":"Albert Heijn Groceries","date":"2026-08-02","category":"Food","isNecessary":true,"notes":"Weekly fresh groceries"},{"id":"demo_tx_2026_08_03","type":"expense","amount":45,"name":"NS Transit Card Top-Up","date":"2026-08-03","category":"Transport","isNecessary":true,"notes":"Monthly train and transit pass"},{"id":"demo_tx_2026_08_04","type":"expense","amount":34.99,"name":"USB-C Cable & 65W GaN Charger","date":"2026-08-04","category":"Shopping","isNecessary":true,"notes":"Workstation hardware gear"},{"id":"demo_tx_2026_08_05","type":"expense","amount":14.2,"name":"Artisan Bakery & Espresso","date":"2026-08-05","category":"Food","isNecessary":false,"notes":"Morning coffee and pastry"},{"id":"demo_tx_2026_08_06","type":"expense","amount":14.99,"name":"Spotify Premium Family","date":"2026-08-06","category":"Miscellaneous","isNecessary":false,"notes":"Monthly music stream"},{"id":"demo_tx_2026_08_08","type":"expense","amount":34.99,"name":"Health & Gym Membership","date":"2026-08-08","category":"Miscellaneous","isNecessary":true,"notes":"Fitness club access"},{"id":"demo_tx_2026_08_09","type":"expense","amount":72.8,"name":"Jumbo Supermarkt Restock","date":"2026-08-09","category":"Food","isNecessary":true,"notes":"Weekly staples and pantry goods"},{"id":"demo_tx_2026_08_11","type":"expense","amount":59.9,"name":"Minimal Clean Jacket","date":"2026-08-11","category":"Shopping","isNecessary":false,"notes":"Wardrobe essentials"},{"id":"demo_tx_2026_08_13","type":"expense","amount":48.5,"name":"Dinner with Team (Osteria)","date":"2026-08-13","category":"Food","isNecessary":false,"notes":"Weekend dinner"},{"id":"demo_tx_2026_08_14","type":"expense","amount":19,"name":"GitHub Pro & Copilot","date":"2026-08-14","category":"Miscellaneous","isNecessary":true,"notes":"Developer cloud toolset"},{"id":"demo_tx_2026_08_15","type":"income","amount":420,"name":"Freelance UI / System Payout","date":"2026-08-15","category":"Side Gig","isNecessary":true,"notes":"Milestone project payout"},{"id":"demo_tx_2026_08_16","type":"expense","amount":18.5,"name":"Bolt City Ride","date":"2026-08-16","category":"Transport","isNecessary":false,"notes":"Evening ride home"},{"id":"demo_tx_2026_08_18","type":"expense","amount":32.6,"name":"Local Fresh Market","date":"2026-08-18","category":"Food","isNecessary":true,"notes":"Fresh fruits and produce"},{"id":"demo_tx_2026_08_20","type":"expense","amount":28.5,"name":"Systems Architecture Book","date":"2026-08-20","category":"Shopping","isNecessary":false,"notes":"Engineering literature"},{"id":"demo_tx_2026_08_22","type":"expense","amount":20,"name":"5G Unlimited Mobile Plan","date":"2026-08-22","category":"Miscellaneous","isNecessary":true,"notes":"Phone network carrier"},{"id":"demo_tx_2026_08_23","type":"expense","amount":21.5,"name":"Ramen Bar Lunch","date":"2026-08-23","category":"Food","isNecessary":false,"notes":"Quick workday lunch"},{"id":"demo_tx_2026_08_25","type":"expense","amount":12.2,"name":"City Tram & Metro GVB","date":"2026-08-25","category":"Transport","isNecessary":true,"notes":"Local urban commute"},{"id":"demo_tx_001","type":"income","amount":2200,"name":"Freelance retainer — Studio Nova","date":"2026-07-01","category":"Salary","isNecessary":true,"notes":"Monthly client payment"},{"id":"demo_tx_002","type":"expense","amount":42.5,"name":"Green Basket Market","date":"2026-07-02","category":"Food","isNecessary":true,"notes":"Weekly groceries"},{"id":"demo_tx_003","type":"expense","amount":18.9,"name":"MetroLine Transit","date":"2026-07-03","category":"Transport","isNecessary":true,"notes":"Commute pass top-up"},{"id":"demo_tx_004","type":"expense","amount":64,"name":"Thread & Co.","date":"2026-07-04","category":"Shopping","isNecessary":false,"notes":"Summer sale hoodie"},{"id":"demo_tx_005","type":"expense","amount":12.4,"name":"Corner Café","date":"2026-07-05","category":"Food","isNecessary":false,"notes":"Coffee with friend"},{"id":"demo_tx_006","type":"income","amount":350,"name":"Side project payout","date":"2026-07-06","category":"Side Gig","isNecessary":true,"notes":"Landing page delivery"},{"id":"demo_tx_007","type":"expense","amount":29.99,"name":"StreamBox Plus","date":"2026-07-07","category":"Shopping","isNecessary":false,"notes":"Entertainment subscription"},{"id":"demo_tx_008","type":"expense","amount":9.5,"name":"CityRide Bike Share","date":"2026-07-08","category":"Transport","isNecessary":true,"notes":"Evening ride home"},{"id":"demo_tx_009","type":"expense","amount":87.2,"name":"Fresh Fields Superstore","date":"2026-07-10","category":"Food","isNecessary":true,"notes":"Bulk shop"},{"id":"demo_tx_010","type":"expense","amount":24,"name":"CloudHost Pro","date":"2026-07-11","category":"Miscellaneous","isNecessary":true,"notes":"Homelab hosting"},{"id":"demo_tx_011","type":"expense","amount":55,"name":"Pixel Market","date":"2026-07-12","category":"Shopping","isNecessary":false,"notes":"Mechanical keyboard keycaps"},{"id":"demo_tx_012","type":"expense","amount":16.75,"name":"Lunch Box Deli","date":"2026-07-14","category":"Food","isNecessary":true,"notes":"Work lunch"},{"id":"demo_tx_013","type":"expense","amount":34.5,"name":"MetroLine Transit","date":"2026-07-15","category":"Transport","isNecessary":true,"notes":"Monthly travel bundle"},{"id":"demo_tx_014","type":"income","amount":120,"name":"Refund — Pixel Market","date":"2026-07-16","category":"Refund","isNecessary":true,"notes":"Returned duplicate order"},{"id":"demo_tx_015","type":"expense","amount":19.99,"name":"GameVault Store","date":"2026-07-18","category":"Shopping","isNecessary":false,"notes":"Indie game purchase"},{"id":"demo_tx_016","type":"expense","amount":45,"name":"Weekend Brunch Co.","date":"2026-07-20","category":"Food","isNecessary":false,"notes":"Sunday brunch"},{"id":"demo_tx_017","type":"expense","amount":11.2,"name":"QuickMart Express","date":"2026-07-22","category":"Food","isNecessary":true,"notes":"Snacks and drinks"},{"id":"demo_tx_018","type":"expense","amount":72,"name":"TradeDesk Monthly","date":"2026-07-23","category":"Miscellaneous","isNecessary":true,"notes":"Paper trading tools"},{"id":"demo_tx_019","type":"expense","amount":28.4,"name":"Urban Threads","date":"2026-07-25","category":"Shopping","isNecessary":false,"notes":"Casual sneakers"},{"id":"demo_tx_020","type":"expense","amount":38.6,"name":"Fresh Fields Superstore","date":"2026-07-27","category":"Food","isNecessary":true,"notes":"Mid-month top-up"},{"id":"demo_tx_021","type":"income","amount":2100,"name":"Freelance retainer — Studio Nova","date":"2026-06-01","category":"Salary","isNecessary":true,"notes":"Monthly client payment"},{"id":"demo_tx_022","type":"expense","amount":52.3,"name":"Green Basket Market","date":"2026-06-03","category":"Food","isNecessary":true,"notes":"Groceries"},{"id":"demo_tx_023","type":"expense","amount":34.5,"name":"MetroLine Transit","date":"2026-06-05","category":"Transport","isNecessary":true,"notes":"Monthly travel bundle"},{"id":"demo_tx_024","type":"expense","amount":89.99,"name":"AudioWave Headphones","date":"2026-06-07","category":"Shopping","isNecessary":false,"notes":"Impulse buy"},{"id":"demo_tx_025","type":"expense","amount":22,"name":"CloudHost Pro","date":"2026-06-11","category":"Miscellaneous","isNecessary":true,"notes":"Homelab hosting"},{"id":"demo_tx_026","type":"expense","amount":41.5,"name":"Corner Café","date":"2026-06-14","category":"Food","isNecessary":false,"notes":"Catch-up coffee"},{"id":"demo_tx_027","type":"income","amount":280,"name":"Workshop honorarium","date":"2026-06-18","category":"Side Gig","isNecessary":true,"notes":"Guest lecture"},{"id":"demo_tx_028","type":"expense","amount":15.8,"name":"CityRide Bike Share","date":"2026-06-20","category":"Transport","isNecessary":true,"notes":"Weekend rides"},{"id":"demo_tx_029","type":"expense","amount":63.4,"name":"Fresh Fields Superstore","date":"2026-06-22","category":"Food","isNecessary":true,"notes":"Bulk shop"},{"id":"demo_tx_030","type":"expense","amount":47,"name":"PrintLab Supplies","date":"2026-06-25","category":"Miscellaneous","isNecessary":true,"notes":"Project materials"},{"id":"demo_tx_031","type":"income","amount":2050,"name":"Freelance retainer — Studio Nova","date":"2026-05-01","category":"Salary","isNecessary":true,"notes":"Monthly client payment"},{"id":"demo_tx_032","type":"expense","amount":48.9,"name":"Green Basket Market","date":"2026-05-04","category":"Food","isNecessary":true,"notes":"Groceries"},{"id":"demo_tx_033","type":"expense","amount":34.5,"name":"MetroLine Transit","date":"2026-05-06","category":"Transport","isNecessary":true,"notes":"Monthly travel bundle"},{"id":"demo_tx_034","type":"expense","amount":120,"name":"DeskCraft Store","date":"2026-05-09","category":"Shopping","isNecessary":false,"notes":"Monitor arm"},{"id":"demo_tx_035","type":"expense","amount":22,"name":"CloudHost Pro","date":"2026-05-11","category":"Miscellaneous","isNecessary":true,"notes":"Homelab hosting"},{"id":"demo_tx_036","type":"expense","amount":36.2,"name":"Lunch Box Deli","date":"2026-05-15","category":"Food","isNecessary":true,"notes":"Work lunches"},{"id":"demo_tx_037","type":"income","amount":150,"name":"Birthday gift","date":"2026-05-18","category":"Gift","isNecessary":true,"notes":"From family"},{"id":"demo_tx_038","type":"expense","amount":59.99,"name":"StreamBox Plus","date":"2026-05-20","category":"Shopping","isNecessary":false,"notes":"Annual plan upgrade"},{"id":"demo_tx_039","type":"expense","amount":71.5,"name":"Fresh Fields Superstore","date":"2026-05-24","category":"Food","isNecessary":true,"notes":"Bulk shop"},{"id":"demo_tx_040","type":"expense","amount":18,"name":"CityRide Bike Share","date":"2026-05-28","category":"Transport","isNecessary":true,"notes":"Commute backup"}];

const state = {
  demoMode: isDemoMode(),
  token: isDemoMode() ? null : (localStorage.getItem('spendwise_token') || null),
  data: {
    profile: { currency: 'EUR', hourlyWage: 18.50, startingBalance: 8312.49, displayName: 'Alex' },
    budgets: {
      Food: 320,
      Shopping: 180,
      Transport: 95,
      Miscellaneous: 120
    },
    transactions: DEFAULT_TRANSACTIONS,
    subscriptions: [
      { id: 'demo_sub_001', name: 'Spotify Premium Family', cost: 17.99, cycle: 'monthly', category: 'Entertainment', active: true },
      { id: 'demo_sub_002', name: 'Fitness Club Membership', cost: 35.00, cycle: 'monthly', category: 'Health', active: true },
      { id: 'demo_sub_003', name: 'GitHub Pro & Copilot', cost: 19.00, cycle: 'monthly', category: 'Software', active: true },
      { id: 'demo_sub_004', name: '5G Unlimited Data Plan', cost: 20.00, cycle: 'monthly', category: 'Utilities', active: true },
      { id: 'demo_sub_005', name: 'Figma Professional', cost: 15.00, cycle: 'monthly', category: 'Software', active: true }
    ]
  },
  activeTab: 'dashboard',
  currentTxType: 'expense',
  chartInstance: null,
  theme: localStorage.getItem('spendwise_theme') || 'light',
  selectedMonth: localStorage.getItem('spendwise_selected_month') || '2026-09',
  pickerDraftMonth: null
};

// DOM Elements
const elements = {
  loginContainer: document.getElementById('login-container'),
  loginForm: document.getElementById('login-form'),
  loginError: document.getElementById('login-error'),
  appContainer: document.getElementById('app-container'),
  themeBtn: document.getElementById('theme-toggle-btn'),
  themeIcon: document.getElementById('theme-toggle-icon'),
  logoutBtn: document.getElementById('logout-btn'),
  mobileLogoutBtn: document.getElementById('mobile-logout-btn'),
  mobileRefreshBtn: document.getElementById('mobile-refresh-btn'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  sidebar: document.getElementById('app-sidebar'),
  sidebarCollapseBtn: document.getElementById('sidebar-collapse-btn'),
  
  // Navigation Tabs
  navItems: document.querySelectorAll('.nav-item'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  
  // Dashboard Metrics
  metricTotalBalance: document.getElementById('metric-total-balance'),
  metricNetSavingsRate: document.getElementById('metric-net-savings-rate'),
  metricMonthIncome: document.getElementById('metric-month-income'),
  metricIncomeCount: document.getElementById('metric-income-count'),
  metricMonthExpense: document.getElementById('metric-month-expense'),
  metricExpenseRatio: document.getElementById('metric-expense-ratio'),
  dashboardGreeting: document.getElementById('dashboard-date-greeting'),
  
  // Impulse Meter
  impulseDialFill: document.getElementById('impulse-dial-fill'),
  impulsePercentage: document.getElementById('impulse-percentage'),
  impulseWantsAmount: document.getElementById('impulse-wants-amount'),
  impulseNeedsAmount: document.getElementById('impulse-needs-amount'),
  impulseAdviceText: document.getElementById('impulse-advice-text'),
  
  // Dashboard lists
  dashboardTxList: document.getElementById('dashboard-tx-list'),
  btnViewAllTx: document.querySelector('.btn-view-all-tx'),
  
  // Transactions Tab
  txSearchInput: document.getElementById('tx-search-input'),
  txFilterType: document.getElementById('tx-filter-type'),
  txFilterCategory: document.getElementById('tx-filter-category'),
  txTableBody: document.getElementById('tx-table-body'),
  txMobileList: document.getElementById('tx-mobile-list'),
  txEmptyState: document.getElementById('tx-empty-state'),
  
  // Subscriptions Tab
  subMetricMonthly: document.getElementById('sub-metric-monthly'),
  subMetricYearly: document.getElementById('sub-metric-yearly'),
  subscriptionsContainer: document.getElementById('subscriptions-list-container'),
  subEmptyState: document.getElementById('sub-empty-state'),
  btnAddSubTrigger: document.getElementById('btn-add-sub-trigger'),
  
  // Tools & Settings Tab
  calcItemCost: document.getElementById('calc-item-cost'),
  calcHourlyWage: document.getElementById('calc-hourly-wage'),
  calculatorResult: document.getElementById('calculator-result'),
  resultHours: document.getElementById('result-hours'),
  resultHoursBold: document.getElementById('result-hours-bold'),
  btnSaveWage: document.getElementById('btn-save-wage'),
  budgetInputsContainer: document.getElementById('budget-inputs-container'),
  budgetSettingsForm: document.getElementById('budget-settings-form'),
  btnExportBackup: document.getElementById('btn-export-backup'),
  importFileInput: document.getElementById('import-file-input'),
  
  // Modals
  txModal: document.getElementById('tx-modal'),
  subModal: document.getElementById('sub-modal'),
  btnAddTxTriggers: document.querySelectorAll('.btn-add-tx-trigger'),
  btnCloseModals: document.querySelectorAll('.btn-close-modal'),
  
  // Transaction Modal Form
  txForm: document.getElementById('tx-form'),
  toggleExpense: document.getElementById('toggle-expense'),
  toggleIncome: document.getElementById('toggle-income'),
  txAmount: document.getElementById('tx-amount'),
  txName: document.getElementById('tx-name'),
  labelTxName: document.getElementById('label-tx-name'),
  labelTxAmount: document.getElementById('label-tx-amount'),
  txDate: document.getElementById('tx-date'),
  txCategory: document.getElementById('tx-category'),
  groupNecessity: document.getElementById('group-necessity'),
  txNecessary: document.getElementById('tx-necessary'),
  txNotes: document.getElementById('tx-notes'),
  modalTxTitle: document.getElementById('modal-tx-title'),
  
  // Subscription Modal Form
  subForm: document.getElementById('sub-form'),
  subId: document.getElementById('sub-id'),
  subName: document.getElementById('sub-name'),
  subCost: document.getElementById('sub-cost'),
  subCycle: document.getElementById('sub-cycle'),
  subCategory: document.getElementById('sub-category'),
  subNextRenewal: document.getElementById('sub-next-renewal'),
  subActive: document.getElementById('sub-active'),
  modalSubTitle: document.getElementById('modal-sub-title')
};

// Categories lists — 4 expense buckets: Food, Shopping, Transport, everything else → Miscellaneous
const categories = {
  income: ['Salary', 'Gift', 'Side Gig', 'Refund', 'Allowance', 'Other'],
  expense: ['Food', 'Shopping', 'Transport', 'Miscellaneous']
};

const BREAKDOWN_CATEGORIES = ['Food', 'Shopping', 'Transport', 'Miscellaneous'];

const MERCHANT_CATEGORY_RULES = [
  {
    category: 'Transport',
    patterns: [
      /\bns\b/,
      /ns reizigers/,
      /ovpay/,
      /\bov\b/,
      /\bgvb\b/,
      /\bret\b/,
      /\bhtm\b/,
      /arriva/,
      /eurostar/,
      /flixbus/,
      /check netherlands/
    ]
  },
  {
    category: 'Food',
    patterns: [
      /vomar/,
      /jumbo/,
      /albert heijn/,
      /\bah\b/,
      /lidl/,
      /aldi/,
      /deka[ ]?markt/,
      /sligro/,
      /plus\b/,
      /coop\b/,
      /supermarkt/,
      /versshop/,
      /bck exotica/,
      /exotica/,
      /subway/,
      /mcdonald/,
      /kfc/,
      /burger king/,
      /new york pizza/,
      /domino/,
      /pizza/,
      /caf[eé]/,
      /restaurant/,
      /snack/,
      /friet/,
      /kebab/,
      /sushi/,
      /wok/,
      /starbucks/
    ]
  },
  {
    category: 'Shopping',
    patterns: [
      /vinted/,
      /mangopay/,
      /bol\.com/,
      /\bbol\b/,
      /action/,
      /joybuy/,
      /amazon/,
      /zalando/,
      /h&m/,
      /primark/,
      /coolblue/,
      /mediamarkt/,
      /onlineveiling/,
      /pickthisup/,
      /hema/,
      /kruidvat/,
      /etos/,
      /decathlon/,
      /ikea/,
      /shein/,
      /temu/,
      /aliexpress/,
      /canva/,
      /spotify/,
      /netflix/,
      /disney\+/,
      /lebara/,
      /vodafone/,
      /kpn/,
      /sportcity/,
      /cursor/,
      /github/,
      /subscription/,
      /back market/,
      /odi odi/,
      /adobe/,
      /icloud/,
      /google one/,
      /youtube premium/,
      /walibi/,
      /efteling/,
      /booking\.com/,
      /airbnb/,
      /cinema/,
      /pathe/,
      /ticketmaster/,
      /steam/,
      /playstation/,
      /xbox/,
      /concert/,
      /museum/
    ]
  },
  {
    category: 'Miscellaneous',
    patterns: [
      /fxflat/,
      /hetzner/,
      /digitalocean/,
      /cloudflare/,
      /ovh/,
      /contabo/,
      /domain/,
      /hostinger/,
      /proxmox/
    ]
  }
];

const normalizeExpenseCategory = (category) => {
  if (category === 'Food' || category === 'Transport' || category === 'Shopping') {
    return category;
  }
  return 'Miscellaneous';
};

const normalizeMerchantName = (name) => (name || '').trim().toLowerCase();

const inferCategoryFromMerchant = (name) => {
  const normalized = normalizeMerchantName(name);
  if (!normalized) return null;

  for (const rule of MERCHANT_CATEGORY_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(normalized))) {
      return rule.category;
    }
  }
  return null;
};

const resolveExpenseCategory = (tx) => {
  const fromMerchant = inferCategoryFromMerchant(tx.name);
  if (fromMerchant) return normalizeExpenseCategory(fromMerchant);

  const cat = (tx.category || '').trim().toLowerCase();
  const categoryMap = {
    food: 'Food',
    shopping: 'Shopping',
    transport: 'Transport',
    transit: 'Transport',
    subscriptions: 'Shopping',
    entertainment: 'Shopping',
    homelab: 'Miscellaneous',
    utilities: 'Miscellaneous',
    rent: 'Miscellaneous',
    school: 'Miscellaneous',
    miscellaneous: 'Miscellaneous',
    misc: 'Miscellaneous'
  };

  return normalizeExpenseCategory(categoryMap[cat] || 'Miscellaneous');
};

const NECESSARY_CATEGORIES = new Set(['Food', 'Transport', 'Miscellaneous']);
const IMPULSE_CATEGORIES = new Set(['Shopping']);

const inferIsNecessaryFromCategory = (category) => {
  if (NECESSARY_CATEGORIES.has(category)) return true;
  if (IMPULSE_CATEGORIES.has(category)) return false;
  return null;
};

const resolveIsNecessary = (tx) => {
  if (tx.type !== 'expense') return true;
  const category = resolveExpenseCategory(tx);
  const fromCategory = inferIsNecessaryFromCategory(category);
  if (fromCategory !== null) return fromCategory;
  return tx.isNecessary !== false;
};

const applyInferredNecessityToForm = (category) => {
  const necessary = inferIsNecessaryFromCategory(category);
  if (necessary !== null && elements.txNecessary) {
    elements.txNecessary.checked = necessary;
  }
};

// Helper: Refresh Lucide Icons in dynamically loaded DOM
const refreshIcons = () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
};

// Helper: Format currencies consistently
const getCurrencySymbol = () => (state.data.profile.currency === 'EUR' ? '€' : '$');

const formatCurrency = (val) => {
  const currencySymbol = getCurrencySymbol();
  return `${currencySymbol}${parseFloat(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Helper: Format currency with abbreviated K/M suffix
const formatAbbreviated = (num) => {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  const currencySymbol = getCurrencySymbol();
  if (absNum >= 1000000) {
    return sign + currencySymbol + (absNum / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (absNum >= 1000) {
    return sign + currencySymbol + (absNum / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return sign + currencySymbol + absNum.toFixed(0);
};

// ==================== MONTH FILTER HELPERS ====================

const parseMonthKey = (monthKey) => {
  const [year, month] = monthKey.split('-').map(Number);
  return new Date(year, month - 1, 1);
};

const getPreviousMonthKey = (monthKey) => {
  const date = parseMonthKey(monthKey);
  date.setMonth(date.getMonth() - 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const getNextMonthKey = (monthKey) => {
  const date = parseMonthKey(monthKey);
  date.setMonth(date.getMonth() + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const formatMonthLabel = (monthKey, short = false) => {
  const date = parseMonthKey(monthKey);
  return date.toLocaleDateString('en-US', short
    ? { month: 'short', year: 'numeric' }
    : { month: 'long', year: 'numeric' });
};

const formatMonthShort = (monthKey) => {
  return parseMonthKey(monthKey).toLocaleDateString('en-US', { month: 'short' });
};

const isCurrentMonth = (monthKey) => monthKey === getCurrentMonthKey();

const txInSelectedMonth = (tx) => tx && tx.date && tx.date.substring(0, 7) === state.selectedMonth;

// ==================== REALISTIC TRANSACTION GENERATOR ====================

const generateMonthTransactions = (monthKey) => {
  const [yearStr, monthStr] = monthKey.split('-');
  const y = yearStr;
  const m = monthStr;

  return [
    // 1. Income Streams
    {
      id: `tx_${y}_${m}_inc_1`,
      type: 'income',
      amount: 2850.00,
      name: 'Salary & Client Retainer',
      date: `${y}-${m}-01`,
      category: 'Salary',
      isNecessary: true,
      notes: 'Monthly retainer payout'
    },
    {
      id: `tx_${y}_${m}_inc_2`,
      type: 'income',
      amount: 420.00,
      name: 'Freelance UI / System Payout',
      date: `${y}-${m}-15`,
      category: 'Side Gig',
      isNecessary: true,
      notes: 'Milestone project payout'
    },

    // 2. Food & Groceries (Realistic mix of Needs vs Wants)
    {
      id: `tx_${y}_${m}_exp_food1`,
      type: 'expense',
      amount: 68.40,
      name: 'Albert Heijn Groceries',
      date: `${y}-${m}-02`,
      category: 'Food',
      isNecessary: true,
      notes: 'Weekly fresh groceries'
    },
    {
      id: `tx_${y}_${m}_exp_food2`,
      type: 'expense',
      amount: 14.20,
      name: 'Artisan Bakery & Espresso',
      date: `${y}-${m}-05`,
      category: 'Food',
      isNecessary: false,
      notes: 'Morning coffee and pastry'
    },
    {
      id: `tx_${y}_${m}_exp_food3`,
      type: 'expense',
      amount: 72.80,
      name: 'Jumbo Supermarkt Restock',
      date: `${y}-${m}-09`,
      category: 'Food',
      isNecessary: true,
      notes: 'Weekly staples and pantry goods'
    },
    {
      id: `tx_${y}_${m}_exp_food4`,
      type: 'expense',
      amount: 48.50,
      name: 'Dinner with Team (Osteria)',
      date: `${y}-${m}-13`,
      category: 'Food',
      isNecessary: false,
      notes: 'Weekend dinner'
    },
    {
      id: `tx_${y}_${m}_exp_food5`,
      type: 'expense',
      amount: 32.60,
      name: 'Local Fresh Market',
      date: `${y}-${m}-18`,
      category: 'Food',
      isNecessary: true,
      notes: 'Fresh fruits and produce'
    },
    {
      id: `tx_${y}_${m}_exp_food6`,
      type: 'expense',
      amount: 21.50,
      name: 'Ramen Bar Lunch',
      date: `${y}-${m}-23`,
      category: 'Food',
      isNecessary: false,
      notes: 'Quick workday lunch'
    },

    // 3. Shopping & Hardware
    {
      id: `tx_${y}_${m}_exp_shop1`,
      type: 'expense',
      amount: 34.99,
      name: 'USB-C Cable & 65W GaN Charger',
      date: `${y}-${m}-04`,
      category: 'Shopping',
      isNecessary: true,
      notes: 'Workstation hardware gear'
    },
    {
      id: `tx_${y}_${m}_exp_shop2`,
      type: 'expense',
      amount: 59.90,
      name: 'Minimal Clean Jacket',
      date: `${y}-${m}-11`,
      category: 'Shopping',
      isNecessary: false,
      notes: 'Wardrobe essentials'
    },
    {
      id: `tx_${y}_${m}_exp_shop3`,
      type: 'expense',
      amount: 28.50,
      name: 'Systems Architecture Book',
      date: `${y}-${m}-20`,
      category: 'Shopping',
      isNecessary: false,
      notes: 'Engineering literature'
    },

    // 4. Transport
    {
      id: `tx_${y}_${m}_exp_trans1`,
      type: 'expense',
      amount: 45.00,
      name: 'NS Transit Card Top-Up',
      date: `${y}-${m}-03`,
      category: 'Transport',
      isNecessary: true,
      notes: 'Monthly train and transit pass'
    },
    {
      id: `tx_${y}_${m}_exp_trans2`,
      type: 'expense',
      amount: 18.50,
      name: 'Bolt City Ride',
      date: `${y}-${m}-16`,
      category: 'Transport',
      isNecessary: false,
      notes: 'Evening ride home'
    },
    {
      id: `tx_${y}_${m}_exp_trans3`,
      type: 'expense',
      amount: 12.20,
      name: 'City Tram & Metro GVB',
      date: `${y}-${m}-25`,
      category: 'Transport',
      isNecessary: true,
      notes: 'Local urban commute'
    },

    // 5. Miscellaneous & Software
    {
      id: `tx_${y}_${m}_exp_misc1`,
      type: 'expense',
      amount: 14.99,
      name: 'Spotify Premium Family',
      date: `${y}-${m}-06`,
      category: 'Miscellaneous',
      isNecessary: false,
      notes: 'Monthly music stream'
    },
    {
      id: `tx_${y}_${m}_exp_misc2`,
      type: 'expense',
      amount: 34.99,
      name: 'Health & Gym Membership',
      date: `${y}-${m}-08`,
      category: 'Miscellaneous',
      isNecessary: true,
      notes: 'Fitness club access'
    },
    {
      id: `tx_${y}_${m}_exp_misc3`,
      type: 'expense',
      amount: 19.00,
      name: 'GitHub Pro & Copilot',
      date: `${y}-${m}-14`,
      category: 'Miscellaneous',
      isNecessary: true,
      notes: 'Developer cloud toolset'
    },
    {
      id: `tx_${y}_${m}_exp_misc4`,
      type: 'expense',
      amount: 20.00,
      name: '5G Unlimited Mobile Plan',
      date: `${y}-${m}-22`,
      category: 'Miscellaneous',
      isNecessary: true,
      notes: 'Phone network carrier'
    }
  ];
};

const ensureMonthHasData = (monthKey) => {
  if (!state.data) state.data = {};
  if (!state.data.transactions) state.data.transactions = [];

  const hasTxs = state.data.transactions.some(tx => tx.date && tx.date.substring(0, 7) === monthKey);
  if (!hasTxs) {
    const generated = generateMonthTransactions(monthKey);
    state.data.transactions = [...generated, ...state.data.transactions];
    state.data.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

const ensureCurrentAndRecentMonthsData = () => {
  if (!state.data) state.data = {};
  if (!state.data.transactions) state.data.transactions = [];
  if (!state.data.budgets || Object.keys(state.data.budgets).length === 0) {
    state.data.budgets = {
      Food: 320,
      Shopping: 180,
      Transport: 95,
      Miscellaneous: 120
    };
  }
  if (!state.data.subscriptions || state.data.subscriptions.length === 0) {
    state.data.subscriptions = [
      { id: 'demo_sub_001', name: 'Spotify Premium Family', cost: 17.99, cycle: 'monthly', category: 'Entertainment', active: true },
      { id: 'demo_sub_002', name: 'Fitness Club Membership', cost: 35.00, cycle: 'monthly', category: 'Health', active: true },
      { id: 'demo_sub_003', name: 'GitHub Pro & Copilot', cost: 19.00, cycle: 'monthly', category: 'Software', active: true },
      { id: 'demo_sub_004', name: '5G Unlimited Data Plan', cost: 20.00, cycle: 'monthly', category: 'Utilities', active: true },
      { id: 'demo_sub_005', name: 'Figma Professional', cost: 15.00, cycle: 'monthly', category: 'Software', active: true }
    ];
  }

  const currentKey = getCurrentMonthKey();
  const prevKey = getPreviousMonthKey(currentKey);
  const prevPrevKey = getPreviousMonthKey(prevKey);

  // Set selectedMonth to current month if not set or if pointed to an empty month
  if (!state.selectedMonth || !state.data.transactions.some(tx => tx.date && tx.date.substring(0, 7) === state.selectedMonth)) {
    state.selectedMonth = currentKey;
    localStorage.setItem('spendwise_selected_month', currentKey);
  }

  ensureMonthHasData(currentKey);
  ensureMonthHasData(prevKey);
  ensureMonthHasData(prevPrevKey);
  ensureMonthHasData(state.selectedMonth);

  // Keep subscriptions renewals in the current/upcoming period
  if (state.data.subscriptions && state.data.subscriptions.length > 0) {
    const [currY, currM] = currentKey.split('-');
    state.data.subscriptions.forEach((sub, idx) => {
      const day = String(Math.min(5 + idx * 4, 28)).padStart(2, '0');
      sub.nextRenewal = `${currY}-${currM}-${day}`;
    });
  }
};

const setSelectedMonth = (monthKey) => {
  state.selectedMonth = monthKey;
  localStorage.setItem('spendwise_selected_month', monthKey);
  ensureMonthHasData(monthKey);
  updateMonthPickerLabels();
  renderApp();
  if (state.activeTab === 'transactions') renderTransactionsTab();
  if (state.activeTab === 'notifications') renderNotificationsTab();
};

const updateMonthPickerLabels = () => {
  const monthKey = state.selectedMonth;
  const dashLabel = document.getElementById('dashboard-month-picker-label');
  if (dashLabel) dashLabel.textContent = formatMonthLabel(monthKey, true);

  const monthEl = document.querySelector('.month-selector span');
  if (monthEl) monthEl.textContent = formatMonthShort(monthKey);

  const pickerLabel = document.getElementById('month-picker-display');
  if (pickerLabel) pickerLabel.textContent = formatMonthLabel(state.pickerDraftMonth || monthKey);

  const jumpBtn = document.getElementById('btn-jump-current-month');
  if (jumpBtn) {
    jumpBtn.classList.toggle('hidden', isCurrentMonth(state.pickerDraftMonth || monthKey));
  }

  setupDashboardGreeting();
};

// ==================== DEMO MODE ====================

const isEmbedPreview = () => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

const initDemoMode = () => {
  document.body.classList.add('demo-mode');
  if (isEmbedPreview()) {
    document.body.classList.add('embed-preview');
    state.activeTab = 'dashboard';
  }

  [elements.logoutBtn, elements.mobileLogoutBtn].forEach((btn) => {
    if (!btn) return;
    const label = btn.querySelector('span');
    if (label) label.textContent = 'Reset demo';
    btn.setAttribute('aria-label', 'Reset demo');
  });

  document.querySelectorAll('[data-demo-hide]').forEach((el) => {
    el.classList.add('hidden');
  });

  showApp();
};

// ==================== AUTHENTICATION WORKFLOW ====================

// Verify session on initial load
const initAuth = async () => {
  if (state.demoMode) {
    initDemoMode();
    return;
  }
  if (state.token) {
    try {
      const response = await fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${state.token}` }
      });
      if (response.ok) {
        showApp();
      } else {
        logout();
      }
    } catch (error) {
      console.error('Session verification failed, server offline?', error);
      // Keep offline/local status if needed, but for safety require login
      logout();
    }
  } else {
    showLogin();
  }
};

// Show Login panel
const showLogin = () => {
  elements.loginContainer.classList.remove('hidden');
  elements.appContainer.classList.add('hidden');
  refreshIcons();
};

// Show main Dashboard
const showApp = () => {
  elements.loginContainer.classList.add('hidden');
  elements.appContainer.classList.remove('hidden');
  setupDashboardGreeting();
  fetchData();
};

// Handle Login submission
elements.loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = elements.email.value;
  const password = elements.password.value;
  elements.loginError.classList.add('hidden');

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const resData = await response.json();
      state.token = resData.token;
      localStorage.setItem('spendwise_token', state.token);
      elements.email.value = '';
      elements.password.value = '';
      showApp();
    } else {
      // Fallback for demo / portfolio preview
      state.demoMode = true;
      showApp();
    }
  } catch (error) {
    console.error('Authentication request error (fallback to demo mode):', error);
    state.demoMode = true;
    showApp();
  }
});

// Logout method
const logout = () => {
  if (state.demoMode) {
    window.location.reload();
    return;
  }
  state.token = null;
  localStorage.removeItem('spendwise_token');
  elements.loginContainer.classList.remove('hidden');
  elements.appContainer.classList.add('hidden');
  window.location.reload();
};

elements.logoutBtn.addEventListener('click', logout);
elements.mobileLogoutBtn.addEventListener('click', logout);

// ==================== API COMMUNICATIONS ====================

// Fetch whole budget structure
const fetchData = async () => {
  if (state.demoMode) {
    try {
      const response = await fetch(new URL('demo-data.json', window.location.href));
      if (!response.ok) throw new Error('Failed to load demo data');
      state.data = await response.json();
      ensureCurrentAndRecentMonthsData();
      renderApp();
      setupDashboardGreeting();
      return true;
    } catch (error) {
      console.error('Error loading demo data:', error);
      ensureCurrentAndRecentMonthsData();
      renderApp();
      setupDashboardGreeting();
      return false;
    }
  }

  try {
    const response = await fetch('/api/data', {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (response.ok) {
      state.data = await response.json();
      ensureCurrentAndRecentMonthsData();
      renderApp();
      setupDashboardGreeting();
      return true;
    }
    if (response.status === 401 || response.status === 403) {
      logout();
    }
    return false;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Fallback to rich demo data on static hosting / server failure
    state.demoMode = true;
    ensureCurrentAndRecentMonthsData();
    renderApp();
    setupDashboardGreeting();
    return false;
  }
};

const refreshAppData = async () => {
  if (state.demoMode) return fetchData();
  if (!state.token) return false;
  return fetchData();
};

// Update budgets & wage configuration
const saveSettings = async (profile, budgets) => {
  if (state.demoMode) {
    state.data.profile = { ...state.data.profile, ...profile };
    state.data.budgets = { ...budgets };
    renderApp();
    return;
  }

  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ profile, budgets })
    });
    if (response.ok) {
      const result = await response.json();
      state.data = result.data;
      renderApp();
    }
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

// Add new transaction
const addTransaction = async (tx) => {
  if (state.demoMode) {
    const newTx = {
      id: demoId('demo_tx'),
      type: tx.type,
      amount: parseFloat(tx.amount),
      name: tx.name,
      date: tx.date,
      category: tx.category,
      isNecessary: tx.type === 'expense' ? !!tx.isNecessary : true,
      notes: tx.notes || ''
    };
    state.data.transactions.unshift(newTx);
    closeAllModals();
    renderApp();
    if (state.activeTab === 'transactions') renderTransactionsTab();
    return;
  }

  try {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify(tx)
    });
    if (response.ok) {
      closeAllModals();
      fetchData();
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
};

// Delete transaction
const deleteTransaction = async (id) => {
  if (!confirm('Are you sure you want to delete this transaction?')) return;

  if (state.demoMode) {
    state.data.transactions = state.data.transactions.filter((tx) => tx.id !== id);
    renderApp();
    if (state.activeTab === 'transactions') renderTransactionsTab();
    return;
  }

  try {
    const response = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (response.ok) {
      fetchData();
    }
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
};

// Add or Edit subscription
const saveSubscription = async (sub) => {
  if (state.demoMode) {
    if (sub.id) {
      const index = state.data.subscriptions.findIndex((item) => item.id === sub.id);
      if (index !== -1) {
        state.data.subscriptions[index] = {
          id: sub.id,
          name: sub.name,
          cost: parseFloat(sub.cost),
          cycle: sub.cycle,
          category: sub.category,
          nextRenewal: sub.nextRenewal,
          active: sub.active !== false
        };
      }
    } else {
      state.data.subscriptions.unshift({
        id: demoId('demo_sub'),
        name: sub.name,
        cost: parseFloat(sub.cost),
        cycle: sub.cycle,
        category: sub.category,
        nextRenewal: sub.nextRenewal,
        active: sub.active !== false
      });
    }
    closeAllModals();
    renderApp();
    return;
  }

  try {
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify(sub)
    });
    if (response.ok) {
      closeAllModals();
      fetchData();
    }
  } catch (error) {
    console.error('Error saving subscription:', error);
  }
};

// Delete subscription
const deleteSubscription = async (id) => {
  if (!confirm('Are you sure you want to delete this subscription?')) return;

  if (state.demoMode) {
    state.data.subscriptions = state.data.subscriptions.filter((sub) => sub.id !== id);
    renderApp();
    return;
  }

  try {
    const response = await fetch(`/api/subscriptions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    if (response.ok) {
      fetchData();
    }
  } catch (error) {
    console.error('Error deleting subscription:', error);
  }
};

// ==================== NAVIGATION TABS WORKFLOW ====================

elements.navItems.forEach(item => {
  item.addEventListener('click', () => {
    const tabName = item.getAttribute('data-tab');
    switchTab(tabName);
  });
});

const switchTab = (tabName) => {
  state.activeTab = tabName;
  
  // Sync active states on all nav-items (sidebar and bottom navigation)
  elements.navItems.forEach(nav => {
    if (nav.getAttribute('data-tab') === tabName) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  });

  // Sync pane visibility
  elements.tabPanes.forEach(pane => {
    if (pane.id === `tab-${pane.id.replace('tab-', '')}`) {
      if (pane.id === `tab-${tabName}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    }
  });

  // Render operations specific to target tab
  if (tabName === 'transactions') {
    renderTransactionsTab();
  } else if (tabName === 'subscriptions') {
    renderSubscriptionsTab();
  } else if (tabName === 'settings') {
    populateSettingsTab();
  } else if (tabName === 'notifications') {
    renderNotificationsTab();
  } else if (tabName === 'general-settings') {
    initGeneralSettingsTab();
  }
};

// Set welcome message based on time of day
const getGreetingName = () => state.data?.profile?.displayName?.trim() || 'Milton';

const setupDashboardGreeting = () => {
  if (!elements.dashboardGreeting) return;
  const hours = new Date().getHours();
  let greet = 'Good morning';
  if (hours >= 12 && hours < 17) greet = 'Good afternoon';
  if (hours >= 17) greet = 'Good evening';
  elements.dashboardGreeting.innerText = `${greet} ${getGreetingName()}!`;
};

// ==================== RENDERING COMPONENT LOGIC ====================

const renderApp = () => {
  updateMonthPickerLabels();
  renderDashboard();
  renderSubscriptionsTab();
  refreshIcons();
};

const categoryMeta = {
  homelab: { icon: 'server', bg: 'rgba(59, 130, 246, 0.12)', color: '#2563EB' },
  food: { icon: 'utensils', bg: 'rgba(245, 158, 11, 0.12)', color: '#D97706' },
  shopping: { icon: 'shopping-bag', bg: 'rgba(236, 72, 153, 0.12)', color: '#DB2777' },
  entertainment: { icon: 'sparkles', bg: 'rgba(236, 72, 153, 0.12)', color: '#DB2777' },
  subscriptions: { icon: 'refresh-cw', bg: 'rgba(139, 92, 246, 0.12)', color: '#7C3AED' },
  school: { icon: 'graduation-cap', bg: 'rgba(16, 185, 129, 0.12)', color: '#059669' },
  utilities: { icon: 'zap', bg: 'rgba(6, 182, 212, 0.12)', color: '#0891B2' },
  transit: { icon: 'train', bg: 'rgba(99, 102, 241, 0.12)', color: '#4F46E5' },
  transport: { icon: 'train', bg: 'rgba(99, 102, 241, 0.12)', color: '#4F46E5' },
  miscellaneous: { icon: 'tag', bg: 'rgba(107, 114, 128, 0.12)', color: '#4B5563' },
  rent: { icon: 'home', bg: 'rgba(6, 182, 212, 0.12)', color: '#0891B2' },
  income: { icon: 'banknote', bg: 'rgba(16, 185, 129, 0.12)', color: '#059669' },
  salary: { icon: 'briefcase', bg: 'rgba(16, 185, 129, 0.12)', color: '#059669' },
  gift: { icon: 'gift', bg: 'rgba(236, 72, 153, 0.12)', color: '#DB2777' },
  'side gig': { icon: 'laptop', bg: 'rgba(99, 102, 241, 0.12)', color: '#4F46E5' },
  refund: { icon: 'rotate-ccw', bg: 'rgba(6, 182, 212, 0.12)', color: '#0891B2' },
  allowance: { icon: 'wallet', bg: 'rgba(245, 158, 11, 0.12)', color: '#D97706' },
  other: { icon: 'help-circle', bg: 'rgba(107, 114, 128, 0.12)', color: '#4B5563' }
};

const getDisplayName = (name) => {
  if (!name) return '';
  const trimmed = name.trim();
  const parenIndex = trimmed.indexOf('(');
  return parenIndex > 0 ? trimmed.slice(0, parenIndex).trim() : trimmed;
};

const getCategoryMeta = (cat) => {
  const normalized = (cat || 'other').toLowerCase();
  return categoryMeta[normalized] || categoryMeta.other;
};

const getTxMeta = (tx) => {
  if (tx.type === 'income') {
    const cat = (tx.category || 'income').toLowerCase();
    return categoryMeta[cat] || categoryMeta.income;
  }
  const resolved = resolveExpenseCategory(tx).toLowerCase();
  return categoryMeta[resolved] || categoryMeta.other;
};

const getBreakdownBucket = (tx) => resolveExpenseCategory(tx);

// --- RENDER LATEST TRANSACTION BANNER ---
const renderLatestTxBanner = () => {
  const container = document.getElementById('latest-tx-banner');
  if (!container) return;

  const txs = state.data.transactions;
  let monthTxs = (txs || [])
    .filter(txInSelectedMonth)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (!monthTxs.length && (txs || []).length > 0) {
    monthTxs = [...txs].sort((a, b) => b.date.localeCompare(a.date));
  }

  if (!monthTxs.length) {
    const monthLabel = formatMonthLabel(state.selectedMonth, true);
    container.innerHTML = `
      <div class="banner-content empty">
        <div class="banner-left">
          <div class="banner-icon-circle empty-circle">
            <i data-lucide="plus"></i>
          </div>
          <div class="banner-info">
            <span class="banner-title">No transactions in ${monthLabel}</span>
            <span class="banner-sub-text">Log a transaction to start tracking this month.</span>
          </div>
        </div>
        <div class="banner-right">
          <button class="btn-banner-add btn-add-tx-trigger" type="button">
            <i data-lucide="plus"></i>
          </button>
        </div>
      </div>
    `;
    
    const addBtn = container.querySelector('.btn-banner-add');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTxModal();
      });
    }
  } else {
    const tx = monthTxs[0];
    const meta = getTxMeta(tx);
    const displayName = getDisplayName(tx.name);
    
    const isIncome = tx.type === 'income';
    const amountText = (isIncome ? '+' : '-') + formatCurrency(parseFloat(tx.amount));
    const amountClass = isIncome ? 'banner-amount flow-in' : 'banner-amount flow-out';
    
    let statusText = 'Success';
    let statusClass = 'banner-status income';
    if (!isIncome) {
      statusText = resolveIsNecessary(tx) ? 'Necessary' : 'Impulse';
      statusClass = resolveIsNecessary(tx) ? 'banner-status necessary' : 'banner-status impulse';
    }

    container.innerHTML = `
      <div class="banner-content">
        <div class="banner-left">
          <div class="banner-icon-circle" style="background-color: ${meta.bg}; color: ${meta.color};">
            <i data-lucide="${meta.icon}"></i>
          </div>
          <div class="banner-info">
            <span class="banner-title">${displayName}</span>
            <div class="banner-sub">
              <span class="${amountClass}">${amountText}</span>
              <span class="${statusClass}">${statusText}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  refreshIcons();
};

// Relative date helper
const formatRelativeDate = (dateStr) => {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  
  const txDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const txDateKey = txDate.toDateString();
  const todayKey = today.toDateString();
  const yesterdayKey = yesterday.toDateString();

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = `${monthNames[txDate.getMonth()]} ${txDate.getDate()}`;

  if (txDateKey === todayKey) {
    return 'Today';
  } else if (txDateKey === yesterdayKey) {
    return 'Yesterday';
  } else {
    return formattedDate;
  }
};

// --- RENDER: DASHBOARD ---
const renderDashboard = () => {
  const txs = state.data.transactions;
  const selectedMonthStr = state.selectedMonth;

  // 1. Balance Calculations
  let totalBalance = parseFloat(state.data.profile.startingBalance || 0);
  let currentMonthIncome = 0;
  let currentMonthExpense = 0;
  let currentMonthNecessary = 0;
  let currentMonthUnnecessary = 0;
  
  let incomeCount = 0;

  txs.forEach(tx => {
    const amt = parseFloat(tx.amount);
    const txMonth = tx.date.substring(0, 7);
    
    if (tx.type === 'income') {
      totalBalance += amt;
      if (txMonth === selectedMonthStr) {
        currentMonthIncome += amt;
        incomeCount++;
      }
    } else if (tx.type === 'expense') {
      totalBalance -= amt;
      if (txMonth === selectedMonthStr) {
        currentMonthExpense += amt;
        if (resolveIsNecessary(tx)) {
          currentMonthNecessary += amt;
        } else {
          currentMonthUnnecessary += amt;
        }
      }
    }
  });

  // Update Balance Metric Card
  elements.metricTotalBalance.innerText = formatCurrency(totalBalance);
  if (totalBalance < 0) {
    elements.metricTotalBalance.className = 'metric-value text-coral';
    elements.metricTotalBalance.style.color = '';
  } else {
    elements.metricTotalBalance.className = 'metric-value';
    elements.metricTotalBalance.style.color = '';
  }

  let savingsRate = 0;
  if (currentMonthIncome > 0) {
    savingsRate = ((currentMonthIncome - currentMonthExpense) / currentMonthIncome) * 100;
  }
  
  // Calculate trend vs previous month dynamically
  const prevMonthStr = getPreviousMonthKey(selectedMonthStr);
  let prevMonthIncome = 0;
  let prevMonthExpense = 0;

  txs.forEach(tx => {
    const amt = parseFloat(tx.amount);
    const txMonth = tx.date.substring(0, 7);
    if (txMonth === prevMonthStr) {
      if (tx.type === 'income') {
        prevMonthIncome += amt;
      } else if (tx.type === 'expense') {
        prevMonthExpense += amt;
      }
    }
  });

  const prevNetSavings = prevMonthIncome - prevMonthExpense;
  const thisNetSavings = currentMonthIncome - currentMonthExpense;
  
  if (prevMonthIncome > 0 || prevMonthExpense > 0) {
    const diffSavings = thisNetSavings - prevNetSavings;
    const prefix = diffSavings >= 0 ? '+' : '';
    elements.metricNetSavingsRate.innerHTML = `<span>${prefix}${formatCurrency(diffSavings)} vs last month</span>`;
  } else {
    elements.metricNetSavingsRate.innerHTML = `<span>All assets combined</span>`;
  }

  // Income Card
  elements.metricMonthIncome.innerText = formatCurrency(currentMonthIncome);
  elements.metricIncomeCount.innerHTML = `<span>${incomeCount} deposits logged</span>`;

  // Expenses Card
  elements.metricMonthExpense.innerText = formatCurrency(currentMonthExpense);
  const necessaryRatio = currentMonthExpense > 0 ? (currentMonthNecessary / currentMonthExpense) * 100 : 0;
  elements.metricExpenseRatio.innerHTML = currentMonthExpense > 0
    ? `<span>${necessaryRatio.toFixed(0)}% necessary spend</span>`
    : '<span>No expenses logged</span>';

  // Savings Hero card values
  const heroNetSavings = document.getElementById('hero-net-savings');
  const heroSavingsRate = document.getElementById('hero-savings-rate');
  if (heroNetSavings) {
    const netSavings = currentMonthIncome - currentMonthExpense;
    heroNetSavings.innerText = formatCurrency(netSavings);
    if (netSavings < 0) {
      heroNetSavings.style.color = '#EF4444';
    } else {
      heroNetSavings.style.color = '';
    }
  }
  if (heroSavingsRate) {
    heroSavingsRate.innerText = currentMonthIncome > 0
      ? `${savingsRate >= 0 ? '+' : ''}${savingsRate.toFixed(0)}% Savings Rate`
      : 'No income logged';
  }

  // 2. Impulse Spending Meter
  const unnecessaryRatio = currentMonthExpense > 0 ? (currentMonthUnnecessary / currentMonthExpense) * 100 : 0;
  
  const impulsePercentage = document.getElementById('impulse-percentage');
  const impulseWantsAmount = document.getElementById('impulse-wants-amount');
  const impulseNeedsAmount = document.getElementById('impulse-needs-amount');
  const impulseAdviceText = document.getElementById('impulse-advice-text');

  if (impulsePercentage) impulsePercentage.innerText = `${unnecessaryRatio.toFixed(0)}%`;
  if (impulseWantsAmount) impulseWantsAmount.innerText = formatCurrency(currentMonthUnnecessary);
  if (impulseNeedsAmount) impulseNeedsAmount.innerText = formatCurrency(currentMonthNecessary);

  // SVG ring fill update
  const ringFill = document.getElementById('impulse-ring-fill');
  if (ringFill) {
    const circumference = 314.16;
    const offset = circumference - (circumference * Math.min(unnecessaryRatio, 100)) / 100;
    ringFill.style.strokeDashoffset = offset;
    
    ringFill.classList.remove('lime', 'amber', 'red');
    if (unnecessaryRatio < 30) {
      ringFill.classList.add('lime');
    } else if (unnecessaryRatio < 50) {
      ringFill.classList.add('amber');
    } else {
      ringFill.classList.add('red');
    }
  }

  if (impulseAdviceText) {
    if (unnecessaryRatio === 0) {
      impulseAdviceText.innerText = 'Excellent job! All spending this month has been necessary.';
    } else if (unnecessaryRatio < 30) {
      impulseAdviceText.innerText = 'Impulse spending is well under control. Keep it up!';
    } else if (unnecessaryRatio < 50) {
      impulseAdviceText.innerText = 'Moderate impulse spending. Try reviewing your wants list.';
    } else {
      impulseAdviceText.innerText = 'Warning: Over 50% of your expenses went to impulse buys!';
    }
  }

  // 3. Render Chart
  renderChart(txs, selectedMonthStr);

  // 4. Render Grouped Bar Trend Chart
  renderTrendChart(txs);

  // 5. Recent Activity
  renderRecentActivity(txs);

  // 6. Budgets
  renderDashboardBudgets(txs);

  // 7. Subscriptions Renewals
  renderDashboardRenewals();

  // 8. Latest Transaction Banner
  renderLatestTxBanner();
};

// Render Doughnut Chart using merchant-aware expense categories
const renderChart = (txs, currentMonthStr) => {
  const categoriesMap = Object.fromEntries(BREAKDOWN_CATEGORIES.map((key) => [key, 0]));
  let totalExpenses = 0;

  txs.forEach(tx => {
    const amt = parseFloat(tx.amount);
    const txMonth = tx.date.substring(0, 7);
    
    if (txMonth === currentMonthStr) {
      if (tx.type === 'expense') {
        totalExpenses += amt;
        const bucket = getBreakdownBucket(tx);
        categoriesMap[bucket] += amt;
      }
    }
  });

  const chartTotal = totalExpenses;

  const chartPlaceholder = document.getElementById('chart-placeholder');
  const canvasElement = document.getElementById('categoryChart');
  const legendContainer = document.getElementById('category-legend-list-container');

  if (chartTotal === 0) {
    if (chartPlaceholder) chartPlaceholder.classList.remove('hidden');
    if (canvasElement) canvasElement.classList.add('hidden');
    if (legendContainer) legendContainer.innerHTML = '<div class="empty-state"><p>No transaction data</p></div>';
    if (state.chartInstance) {
      state.chartInstance.destroy();
      state.chartInstance = null;
    }
    return;
  }

  if (chartPlaceholder) chartPlaceholder.classList.add('hidden');
  if (canvasElement) canvasElement.classList.remove('hidden');

  const centerValueEl = document.getElementById('chart-center-value');
  const centerLabelEl = document.getElementById('chart-center-label');
  let selectedBreakdownIndex = null;

  // Keep labels that have non-zero value
  const categoriesLabels = [];
  const categoriesData = [];

  BREAKDOWN_CATEGORIES.forEach((key) => {
    if (categoriesMap[key] > 0) {
      categoriesLabels.push(key);
      categoriesData.push(categoriesMap[key]);
    }
  });

  const setChartCenter = (index = null) => {
    if (centerLabelEl) {
      centerLabelEl.innerText = index === null ? 'Total' : categoriesLabels[index];
    }
    if (centerValueEl) {
      const amount = index === null ? chartTotal : categoriesData[index];
      centerValueEl.innerText = index === null && amount >= 1000
        ? formatAbbreviated(amount)
        : formatCurrency(amount);
    }
    if (legendContainer) {
      legendContainer.querySelectorAll('.legend-list-item').forEach((el, i) => {
        el.classList.toggle('legend-list-item-active', index !== null && i === index);
      });
    }
    if (state.chartInstance) {
      state.chartInstance.setActiveElements(
        index === null ? [] : [{ datasetIndex: 0, index }]
      );
      state.chartInstance.update();
    }
  };

  const isDark = state.theme === 'dark';

  // High-contrast colors suited for the dark card background
  const getCategoryColor = (label) => {
    const colors = {
      'Food': '#D6FF1F',
      'Shopping': '#EC4899',
      'Transport': '#6366F1',
      'Miscellaneous': '#9CA3AF'
    };
    return colors[label] || '#9CA3AF';
  };

  const bgColors = categoriesLabels.map(getCategoryColor);

  if (state.chartInstance) {
    state.chartInstance.destroy();
  }

  const ctx = canvasElement.getContext('2d');
  state.chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categoriesLabels,
      datasets: [{
        data: categoriesData,
        backgroundColor: bgColors,
        borderColor: state.theme === 'dark' ? '#121212' : '#0B1F17',
        borderWidth: 2,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (_event, elements) => {
        if (!elements.length) {
          selectedBreakdownIndex = null;
          setChartCenter(null);
          return;
        }
        const idx = elements[0].index;
        selectedBreakdownIndex = selectedBreakdownIndex === idx ? null : idx;
        setChartCenter(selectedBreakdownIndex);
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      cutout: '72%'
    }
  });

  // Dynamic Metadata matching icons and color circles
  const chartGroupMeta = {
    'Food': { icon: 'utensils', bg: 'rgba(16, 185, 129, 0.08)', color: '#10B981' },
    'Shopping': { icon: 'shopping-bag', bg: 'rgba(236, 72, 153, 0.08)', color: '#DB2777' },
    'Transport': { icon: 'train', bg: 'rgba(99, 102, 241, 0.08)', color: '#6366F1' },
    'Miscellaneous': { icon: 'tag', bg: 'rgba(107, 114, 128, 0.08)', color: '#4B5563' }
  };

  // Render Custom Side Legend List with Icon Chips
  if (legendContainer) {
    legendContainer.innerHTML = '';
    categoriesLabels.forEach((label, idx) => {
      const amount = categoriesData[idx];
      const percentage = chartTotal > 0 ? (amount / chartTotal) * 100 : 0;
      const meta = chartGroupMeta[label] || { icon: 'help-circle', bg: 'rgba(107, 114, 128, 0.08)', color: '#4B5563' };
      
      const swatchColor = getCategoryColor(label);
      const item = document.createElement('div');
      item.className = 'legend-list-item';
      item.innerHTML = `
        <div class="legend-item-left">
          <span class="breakdown-legend-icon" style="background-color: ${meta.bg}; color: ${swatchColor};">
            <i data-lucide="${meta.icon}"></i>
          </span>
          <span class="legend-label-text">${label}</span>
          <span class="category-percentage">${percentage.toFixed(0)}%</span>
        </div>
        <span class="legend-amount">${formatCurrency(amount)}</span>
      `;
      item.addEventListener('click', () => {
        selectedBreakdownIndex = selectedBreakdownIndex === idx ? null : idx;
        setChartCenter(selectedBreakdownIndex);
      });
      legendContainer.appendChild(item);
    });
    refreshIcons();
  }

  setChartCenter(null);
};

// Render Grouped Bar Chart for Income vs Expense monthly comparison (last 6 months)
const renderTrendChart = (txs) => {
  const canvasElement = document.getElementById('trendChart');
  const trendBody = document.querySelector('.trend-chart-body');
  if (!canvasElement || !trendBody) return;

  if (!txs || txs.length === 0) {
    if (state.trendChartInstance) {
      state.trendChartInstance.destroy();
      state.trendChartInstance = null;
    }
    canvasElement.classList.add('hidden');
    let placeholder = document.getElementById('trend-placeholder');
    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.id = 'trend-placeholder';
      placeholder.className = 'empty-state';
      placeholder.innerHTML = `
        <i data-lucide="bar-chart-2" style="width: 32px; height: 32px; color: var(--text-muted); margin-bottom: 12px;"></i>
        <p>No transaction data available</p>
      `;
      trendBody.appendChild(placeholder);
    } else {
      placeholder.classList.remove('hidden');
    }
    refreshIcons();
    return;
  }

  const placeholder = document.getElementById('trend-placeholder');
  if (placeholder) placeholder.classList.add('hidden');
  canvasElement.classList.remove('hidden');

  // Generate months dynamically (custom date range or default last 6 months)
  const now = new Date();
  const chartMonths = [];
  
  if (state.chartDateRange) {
    const startParts = state.chartDateRange.start.split('-');
    const endParts = state.chartDateRange.end.split('-');
    const startDate = new Date(parseInt(startParts[0]), parseInt(startParts[1]) - 1, 1);
    const endDate = new Date(parseInt(endParts[0]), parseInt(endParts[1]) - 1, 1);
    
    let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    let safetyCounter = 0;
    while (current <= endDate && safetyCounter < 100) {
      const monthKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
      // Show year if not current year
      const labelFormat = current.getFullYear() !== now.getFullYear() ? { month: 'short', year: 'numeric' } : { month: 'short' };
      const displayLabel = current.toLocaleDateString('en-US', labelFormat);
      chartMonths.push({ key: monthKey, label: displayLabel });
      current.setMonth(current.getMonth() + 1);
      safetyCounter++;
    }
  } else {
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const displayLabel = d.toLocaleDateString('en-US', { month: 'short' });
      chartMonths.push({ key: monthKey, label: displayLabel });
    }
  }

  const labels = chartMonths.map(m => m.label);
  const incomeData = chartMonths.map(m => {
    let sum = 0;
    txs.forEach(tx => {
      if (tx.type === 'income' && tx.date.substring(0, 7) === m.key) {
        sum += parseFloat(tx.amount);
      }
    });
    return sum;
  });
  const expenseData = chartMonths.map(m => {
    let sum = 0;
    txs.forEach(tx => {
      if (tx.type === 'expense' && tx.date.substring(0, 7) === m.key) {
        sum += parseFloat(tx.amount);
      }
    });
    return sum;
  });

  if (state.trendChartInstance) {
    state.trendChartInstance.destroy();
  }

  const isDark = state.theme === 'dark';
  const ctx = canvasElement.getContext('2d');
  state.trendChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: isDark ? '#FFFFFF' : '#0B1F17',
          borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
          borderSkipped: false,
          barThickness: 12
        },
        {
          label: 'Expense',
          data: expenseData,
          backgroundColor: '#D6FF1F', // Acid lemon green
          borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
          borderSkipped: false,
          barThickness: 12
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#000000' : '#0B1F17',
          borderColor: isDark ? '#D6FF1F' : 'transparent',
          borderWidth: isDark ? 1 : 0,
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF',
          padding: 12,
          cornerRadius: isDark ? 2 : 12,
          boxWidth: 8,
          boxHeight: 8,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            label: function(context) {
              return ` ${context.dataset.label}: ${formatCurrency(context.raw)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: isDark ? '#8A8A8A' : '#6B7280',
            font: { family: 'Plus Jakarta Sans', size: 10 }
          }
        },
        y: {
          grid: {
            borderDash: [4, 4],
            color: isDark ? '#2A2A2A' : '#E5E7EB'
          },
          ticks: {
            precision: 0,
            color: isDark ? '#8A8A8A' : '#6B7280',
            font: { family: 'Plus Jakarta Sans', size: 10 },
            callback: function(value) {
              const sym = getCurrencySymbol();
              return value >= 1000 ? sym + (value / 1000) + 'K' : sym + value;
            }
          }
        }
      }
    }
  });
};

// Render Recent Activity (Avatars bubbles + Activity Feed rows)
const renderRecentActivity = (txs) => {
  let recentTxs = (txs || [])
    .filter(txInSelectedMonth)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);
  if (recentTxs.length === 0 && (txs || []).length > 0) {
    recentTxs = [...txs]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
  }
  const bubblesContainer = document.getElementById('overlapping-bubbles-container');
  
  if (bubblesContainer) {
    bubblesContainer.innerHTML = '';
    recentTxs.forEach(tx => {
      const meta = getTxMeta(tx);
      const bubble = document.createElement('div');
      bubble.className = 'avatar-bubble';
      bubble.style.backgroundColor = state.theme === 'dark' ? '#121212' : meta.bg;
      bubble.style.color = state.theme === 'dark' ? '#D6FF1F' : meta.color;
      bubble.innerHTML = `<i data-lucide="${meta.icon}" style="width: 15px; height: 15px;"></i>`;
      bubblesContainer.appendChild(bubble);
    });
    
    // Floating Plus bubble at end
    const plusBubble = document.createElement('div');
    plusBubble.className = 'avatar-bubble bubble-plus';
    plusBubble.innerHTML = '<i data-lucide="plus" style="width: 15px; height: 15px;"></i>';
    plusBubble.addEventListener('click', () => {
      openTxModal();
    });
    bubblesContainer.appendChild(plusBubble);
  }

  // Activity Feed rows below
  const feedContainer = document.getElementById('dashboard-tx-list-new');
  if (feedContainer) {
    feedContainer.innerHTML = '';
    if (recentTxs.length === 0) {
      const monthLabel = formatMonthLabel(state.selectedMonth, true);
      feedContainer.innerHTML = `<div class="empty-state"><p>No activity in ${monthLabel}.</p></div>`;
      refreshIcons();
      return;
    }

    recentTxs.forEach(tx => {
      const isIncome = tx.type === 'income';
      const meta = getTxMeta(tx);
      const amountStr = (isIncome ? '+' : '-') + formatCurrency(parseFloat(tx.amount));
      const amountClass = isIncome ? 'income' : 'expense';
      const tagClass = resolveIsNecessary(tx) ? 'need' : 'want';
      const tagText = resolveIsNecessary(tx) ? 'Need' : 'Want';

      const row = document.createElement('div');
      row.className = 'activity-feed-row';
      row.innerHTML = `
        <div class="activity-left">
          <div class="activity-icon-box" style="background-color: ${state.theme === 'dark' ? 'transparent' : meta.bg}; color: ${state.theme === 'dark' ? '#D6FF1F' : meta.color}">
            <i data-lucide="${meta.icon}" style="width: 15px; height: 15px;"></i>
          </div>
          <div class="activity-info-text">
            <span class="activity-name">${getDisplayName(tx.name) || tx.category}</span>
            <span class="activity-date">${tx.date}</span>
          </div>
        </div>
        <div class="activity-right">
          <span class="activity-amount ${amountClass}">${amountStr}</span>
          <span class="activity-tag ${tagClass}">${tagText}</span>
        </div>
      `;
      feedContainer.appendChild(row);
    });
  }
  refreshIcons();
};

// Render Category Budgets with mini circular progress rings
const renderDashboardBudgets = (txs) => {
  const selectedMonthStr = state.selectedMonth;
  const budgetsList = document.getElementById('dashboard-budgets-list');
  if (!budgetsList) return;

  budgetsList.innerHTML = '';

  const budgets = state.data.budgets || {};
  const spentMap = {};
  
  txs.forEach(tx => {
    if (tx.type === 'expense' && tx.date.substring(0, 7) === selectedMonthStr) {
      const cat = resolveExpenseCategory(tx);
      spentMap[cat] = (spentMap[cat] || 0) + parseFloat(tx.amount);
    }
  });

  const categoriesList = Object.keys(budgets);
  let activeBudgetsCount = 0;

  categoriesList.forEach(cat => {
    const limit = parseFloat(budgets[cat]);
    if (isNaN(limit) || limit <= 0) return;

    activeBudgetsCount++;
    const spent = spentMap[cat] || 0;
    const ratio = Math.min((spent / limit) * 100, 100);
    
    const circumference = 87.96;
    const offset = circumference - (circumference * ratio) / 100;
    
    const isDark = state.theme === 'dark';
    let colorHex = '#D6FF1F'; // brand green for healthy
    if (ratio >= 100) {
      colorHex = isDark ? '#FF4444' : '#EF4444'; // warning red
    } else if (ratio >= 80 && !isDark) {
      colorHex = '#F59E0B'; // amber for light mode
    }

    const row = document.createElement('div');
    row.className = 'budget-row-item';
    row.innerHTML = `
      <div class="budget-row-left">
        <div class="budget-mini-ring">
          <svg width="32" height="32">
            <circle class="budget-mini-ring-track" cx="16" cy="16" r="14" stroke="${isDark ? '#1C1C1C' : '#F4F4F1'}" stroke-width="3" fill="transparent"/>
            <circle class="budget-mini-ring-fill" cx="16" cy="16" r="14" stroke="${colorHex}" stroke-width="3" fill="transparent" stroke-dasharray="87.96" stroke-dashoffset="${offset}"/>
          </svg>
        </div>
        <div class="budget-row-info">
          <span class="budget-row-title">${cat}</span>
          <span class="budget-row-subtext">${formatCurrency(spent)} of ${formatCurrency(limit)}</span>
        </div>
      </div>
      <button class="btn-icon-more btn-to-settings" type="button"><i data-lucide="more-horizontal"></i></button>
    `;
    
    const btnSettings = row.querySelector('.btn-to-settings');
    if (btnSettings) {
      btnSettings.addEventListener('click', () => switchTab('settings'));
    }
    budgetsList.appendChild(row);
  });

  if (activeBudgetsCount === 0) {
    budgetsList.innerHTML = `
      <div class="empty-state" style="padding: 16px 0;">
        <p>No monthly category budgets set.</p>
      </div>`;
  }
  refreshIcons();
};

// Render Upcoming Subscription Renewals with urgency highlights
const renderDashboardRenewals = () => {
  const renewalsList = document.getElementById('dashboard-renewals-list');
  if (!renewalsList) return;

  renewalsList.innerHTML = '';
  const subs = state.data.subscriptions || [];
  const activeSubs = subs.filter(s => s.active);

  if (activeSubs.length === 0) {
    renewalsList.innerHTML = `
      <div class="empty-state" style="padding: 16px 0;">
        <p>No active subscriptions tracked.</p>
      </div>`;
    refreshIcons();
    return;
  }

  const renewals = activeSubs.map(sub => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const nextDate = new Date(sub.nextRenewal);
    nextDate.setHours(0,0,0,0);
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { ...sub, diffDays };
  }).sort((a, b) => a.diffDays - b.diffDays);

  const topRenewals = renewals.slice(0, 5);

  // Helper to resolve service icons
  const getServiceIcon = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('netflix')) return 'tv';
    if (n.includes('aws') || n.includes('amazon') || n.includes('cloud')) return 'cloud';
    if (n.includes('spotify') || n.includes('music')) return 'music';
    if (n.includes('github') || n.includes('copilot') || n.includes('code')) return 'code';
    if (n.includes('chatgpt') || n.includes('openai') || n.includes('bot') || n.includes('ai')) return 'bot';
    return 'refresh-cw';
  };

  topRenewals.forEach(sub => {
    const daysText = sub.diffDays === 0
      ? 'Renews today'
      : sub.diffDays < 0
      ? `Due ${Math.abs(sub.diffDays)} days ago`
      : `Renews in ${sub.diffDays} day${sub.diffDays > 1 ? 's' : ''}`;

    const serviceIcon = getServiceIcon(sub.name);
    
    let urgencyClass = 'text-neutral';
    let rowUrgencyClass = '';
    
    if (sub.diffDays <= 3) {
      urgencyClass = 'text-red';
      rowUrgencyClass = 'urgent-red';
    } else if (sub.diffDays <= 10) {
      urgencyClass = 'text-amber';
      rowUrgencyClass = 'urgent-amber';
    }

    const row = document.createElement('div');
    row.className = `renewal-row-item ${rowUrgencyClass}`;
    row.innerHTML = `
      <div class="renewal-info-left" style="display: flex; align-items: center; gap: 12px;">
        <div class="renewal-icon-box" style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 6px; background-color: var(--border-color); color: var(--text-secondary); flex-shrink: 0;">
          <i data-lucide="${serviceIcon}" style="width: 15px; height: 15px;"></i>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px;">
          <span class="renewal-name" style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">${sub.name}</span>
          <span class="renewal-days ${urgencyClass}" style="font-size: 0.72rem; font-weight: 600;">${daysText}</span>
        </div>
      </div>
      <span class="renewal-cost" style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">${formatCurrency(parseFloat(sub.cost))}</span>
    `;
    renewalsList.appendChild(row);
  });
  refreshIcons();
};

elements.btnViewAllTx.addEventListener('click', () => switchTab('transactions'));

elements.btnViewAllTx.addEventListener('click', () => switchTab('transactions'));

// --- RENDER: TRANSACTIONS TAB ---
const renderTransactionsTab = () => {
  const txs = state.data.transactions;
  const searchVal = elements.txSearchInput.value.toLowerCase();
  const typeFilter = elements.txFilterType.value;
  const catFilter = elements.txFilterCategory.value;

  // 1. Populate Category dropdown filter
  const allCategories = new Set();
  txs.forEach(t => {
    allCategories.add(t.type === 'expense' ? resolveExpenseCategory(t) : t.category);
  });
  
  // Maintain current selection
  const currentSelect = elements.txFilterCategory.value;
  elements.txFilterCategory.innerHTML = '<option value="all">All Categories</option>';
  allCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.innerText = cat;
    if (cat === currentSelect) opt.selected = true;
    elements.txFilterCategory.appendChild(opt);
  });

  // 2. Filter Transactions
  const filtered = txs.filter(tx => {
    if (!txInSelectedMonth(tx)) return false;

    // Search filter
    const matchesSearch = tx.name.toLowerCase().includes(searchVal) || 
                          (tx.notes && tx.notes.toLowerCase().includes(searchVal));
    
    // Type filter
    let matchesType = true;
    if (typeFilter === 'income') matchesType = tx.type === 'income';
    else if (typeFilter === 'expense') matchesType = tx.type === 'expense';
    else if (typeFilter === 'necessary') matchesType = tx.type === 'expense' && resolveIsNecessary(tx);
    else if (typeFilter === 'unnecessary') matchesType = tx.type === 'expense' && !resolveIsNecessary(tx);

    // Category filter
    let matchesCategory = true;
    if (catFilter !== 'all') {
      const txCategory = tx.type === 'expense' ? resolveExpenseCategory(tx) : tx.category;
      matchesCategory = txCategory === catFilter;
    }

    return matchesSearch && matchesType && matchesCategory;
  });

  // Dynamic Month & Flow Summary calculation
  let totalIn = 0;
  let totalOut = 0;
  filtered.forEach(tx => {
    if (tx.type === 'income') totalIn += tx.amount;
    else totalOut += tx.amount;
  });
  
  const inEl = document.getElementById('summary-in-val');
  const outEl = document.getElementById('summary-out-val');
  if (inEl) inEl.innerText = formatCurrency(totalIn);
  if (outEl) outEl.innerText = formatCurrency(totalOut);

  updateMonthPickerLabels();

  // 3. Render Table & Mobile Feed
  const tbody = elements.txTableBody;
  const mobList = elements.txMobileList;
  tbody.innerHTML = '';
  if (mobList) mobList.innerHTML = '';

  if (filtered.length === 0) {
    elements.txEmptyState.classList.remove('hidden');
    const emptyMsg = elements.txEmptyState.querySelector('p');
    if (emptyMsg) {
      emptyMsg.textContent = `No transactions found for ${formatMonthLabel(state.selectedMonth, true)}.`;
    }
    document.querySelector('.data-table').classList.add('hidden');
    if (mobList) mobList.classList.add('hidden');
    return;
  }

  elements.txEmptyState.classList.add('hidden');
  document.querySelector('.data-table').classList.remove('hidden');
  if (mobList) mobList.classList.remove('hidden');

  filtered.forEach(tx => {
    const isInc = tx.type === 'income';
    const meta = getTxMeta(tx);
    const displayCategory = isInc ? tx.category : resolveExpenseCategory(tx);
    
    let badgeHtml = '';
    if (isInc) {
      badgeHtml = `<span class="tx-tag income">Income</span>`;
    } else {
      badgeHtml = resolveIsNecessary(tx) 
        ? `<span class="tx-tag need">Need</span>` 
        : `<span class="tx-tag want">Want (Impulse)</span>`;
    }

    const amountPrefix = isInc ? '+' : '-';
    const amountClass = isInc ? 'text-green font-bold' : 'font-bold';

    // Desktop Table Row
    const rowHtml = `
      <tr id="tx-row-${tx.id}">
        <td style="padding: 12px 10px;">
          <div class="activity-icon-box" style="background-color: ${state.theme === 'dark' ? 'transparent' : meta.bg}; color: ${state.theme === 'dark' ? '#D6FF1F' : meta.color}">
            <i data-lucide="${meta.icon}" style="width: 15px; height: 15px;"></i>
          </div>
        </td>
        <td style="padding: 12px 10px;">${tx.date}</td>
        <td style="padding: 12px 10px;">
          <div style="font-weight: 600;">${getDisplayName(tx.name)}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${tx.notes || ''}
          </div>
        </td>
        <td style="padding: 12px 10px;">${displayCategory}</td>
        <td style="padding: 12px 10px;">${badgeHtml}</td>
        <td style="padding: 12px 10px;" class="text-right ${amountClass}">${amountPrefix}${formatCurrency(tx.amount)}</td>
        <td style="padding: 12px 10px;" class="text-center">
          <button class="btn-delete" data-id="${tx.id}" style="background: none; border: none; padding: 4px; cursor: pointer; color: var(--text-secondary);">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', rowHtml);

    // Mobile Feed Row
    if (mobList) {
      const mobRowHtml = `
        <div class="tx-mobile-row" id="tx-mob-row-${tx.id}">
          <div class="tx-mob-left">
            <div class="tx-mob-icon-circle" style="background-color: ${state.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : meta.bg}; color: ${state.theme === 'dark' ? '#D6FF1F' : meta.color}">
              <i data-lucide="${meta.icon}" style="width: 16px; height: 16px;"></i>
            </div>
            <div class="tx-mob-details">
              <span class="tx-mob-name">${getDisplayName(tx.name)}</span>
              <span class="tx-mob-date">${tx.date}</span>
            </div>
          </div>
          <div class="tx-mob-right">
            <span class="tx-mob-amount ${amountClass}">${amountPrefix}${formatCurrency(tx.amount)}</span>
            <button class="btn-delete btn-delete-mobile" data-id="${tx.id}" style="background: none; border: none; padding: 6px; cursor: pointer; color: var(--text-secondary);">
              <i data-lucide="trash-2" style="width: 15px; height: 15px;"></i>
            </button>
          </div>
        </div>
      `;
      mobList.insertAdjacentHTML('beforeend', mobRowHtml);
    }
  });

  // Attach delete listeners
  const allDeleteBtns = document.querySelectorAll('#tx-table-body .btn-delete, #tx-mobile-list .btn-delete');
  allDeleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteTransaction(id);
    });
  });

  refreshIcons();
};

// Bind Transaction Filters
elements.txSearchInput.addEventListener('input', renderTransactionsTab);
elements.txFilterType.addEventListener('change', renderTransactionsTab);
elements.txFilterCategory.addEventListener('change', renderTransactionsTab);

// --- RENDER: SUBSCRIPTIONS TAB ---
const renderSubscriptionsTab = () => {
  const subs = state.data.subscriptions;
  const container = elements.subscriptionsContainer;
  container.innerHTML = '';

  let monthlyCommit = 0;

  if (subs.length === 0) {
    elements.subEmptyState.classList.remove('hidden');
    elements.subMetricMonthly.innerText = formatCurrency(0);
    const yearlyEl = document.getElementById('sub-metric-yearly');
    if (yearlyEl) yearlyEl.innerText = formatCurrency(0);
    const countEl = document.getElementById('sub-metric-count');
    if (countEl) countEl.innerText = '0';
    return;
  }

  elements.subEmptyState.classList.add('hidden');

  subs.forEach(sub => {
    const cost = parseFloat(sub.cost);
    let equivMonthly = cost;
    
    if (sub.cycle === 'quarterly') equivMonthly = cost / 3;
    else if (sub.cycle === 'yearly') equivMonthly = cost / 12;

    if (sub.active) {
      monthlyCommit += equivMonthly;
    }

    // Days until renewal calculation
    const renewalDate = new Date(sub.nextRenewal);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    let diffDays = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
    let renewalStatusText = '';
    
    if (diffDays < 0) {
      renewalStatusText = 'Renewed (date passed)';
    } else if (diffDays === 0) {
      renewalStatusText = 'Renews Today!';
    } else if (diffDays === 1) {
      renewalStatusText = 'Renews Tomorrow';
    } else {
      renewalStatusText = `Renews in ${diffDays} days`;
    }

    const rowHtml = `
      <div class="budget-row-item" style="padding: 12px 10px !important; display: flex !important; justify-content: space-between !important; align-items: center !important; border-bottom: 1px solid var(--border-color) !important;">
        <div style="display: flex !important; align-items: center !important; gap: 12px !important;">
          <div class="activity-icon-box" style="background-color: ${state.theme === 'dark' ? 'transparent' : 'rgba(139, 92, 246, 0.12)'}; color: ${state.theme === 'dark' ? '#D6FF1F' : '#7C3AED'}">
            <i data-lucide="refresh-cw" style="width: 15px; height: 15px;"></i>
          </div>
          <div style="display: flex !important; flex-direction: column !important; justify-content: center !important;">
            <span style="font-weight: 700 !important; font-size: 0.9rem !important; color: var(--text-primary);">${sub.name}</span>
          </div>
        </div>
        <div style="display: flex !important; align-items: center !important; gap: 16px !important;">
          <span style="font-weight: 700 !important; font-size: 0.95rem !important; color: ${sub.active ? 'var(--text-primary)' : 'var(--text-secondary)'}">${formatCurrency(sub.cost)}</span>
          <span class="activity-tag btn-sub-toggle ${sub.active ? 'need' : 'want'}" style="cursor: pointer !important; padding: 3px 8px !important;" data-id="${sub.id}">
            ${sub.active ? 'Active' : 'Muted'}
          </span>
          <div style="display: flex !important; gap: 6px !important;">
            <button class="btn-sub-edit" data-id="${sub.id}" style="background: none; border: none; padding: 4px; cursor: pointer; color: var(--text-secondary);">
              <i data-lucide="edit-3" style="width: 16px; height: 16px;"></i>
            </button>
            <button class="btn-sub-delete text-coral" data-id="${sub.id}" style="background: none; border: none; padding: 4px; cursor: pointer; color: var(--text-secondary);">
              <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', rowHtml);
  });

  // Update metrics header
  elements.subMetricMonthly.innerText = formatCurrency(monthlyCommit);
  const yearlyEl = document.getElementById('sub-metric-yearly');
  if (yearlyEl) {
    yearlyEl.innerText = formatCurrency(monthlyCommit * 12);
  }
  const countEl = document.getElementById('sub-metric-count');
  if (countEl) {
    countEl.innerText = subs.filter(s => s.active).length;
  }

  // Attach event handlers
  container.querySelectorAll('.btn-sub-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const sub = subs.find(s => s.id === id);
      if (sub) {
        sub.active = !sub.active;
        saveSubscription(sub);
      }
    });
  });

  container.querySelectorAll('.btn-sub-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const sub = subs.find(s => s.id === id);
      if (sub) {
        openSubModal(sub);
      }
    });
  });

  container.querySelectorAll('.btn-sub-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteSubscription(id);
    });
  });

  refreshIcons();
};

// --- POPULATE: BUDGETS & TOOLS ---
const populateSettingsTab = () => {
  // 1. Hourly wage info & Currency labels
  elements.calcHourlyWage.value = state.data.profile.hourlyWage;
  document.querySelectorAll('.calc-currency-sym').forEach(el => {
    el.textContent = getCurrencySymbol();
  });

  // 2. Budget list container
  const container = elements.budgetInputsContainer;
  container.innerHTML = '';

  const txs = state.data.transactions || [];
  const selectedMonthStr = state.selectedMonth;
  
  // Calculate spent amounts per category
  const spentMap = {};
  txs.forEach(tx => {
    if (tx.type === 'expense' && tx.date.substring(0, 7) === selectedMonthStr) {
      const cat = resolveExpenseCategory(tx);
      spentMap[cat] = (spentMap[cat] || 0) + parseFloat(tx.amount);
    }
  });

  // Render inputs for all expense categories
  categories.expense.forEach(cat => {
    const limit = parseFloat(state.data.budgets[cat]) || 0;
    const spent = spentMap[cat] || 0;
    const hasLimit = limit > 0;
    const ratio = hasLimit ? Math.min((spent / limit) * 100, 100) : 0;
    
    const circumference = 87.96;
    const offset = circumference - (circumference * ratio) / 100;
    
    const isDark = state.theme === 'dark';
    let colorHex = '#D6FF1F'; // brand green for healthy
    if (ratio >= 100) {
      colorHex = isDark ? '#FF4444' : '#EF4444'; // warning red
    } else if (ratio >= 80 && !isDark) {
      colorHex = '#F59E0B'; // amber for light mode
    } else if (!hasLimit) {
      colorHex = isDark ? '#333333' : '#CCCCCC'; // neutral empty
    }

    const rowHtml = `
      <div class="budget-row-item" style="padding: 14px 10px !important; display: flex !important; justify-content: space-between !important; align-items: center !important; border-bottom: 1px solid var(--border-color) !important; gap: 12px !important;">
        <div style="display: flex !important; align-items: center !important; gap: 12px !important;">
          <div class="budget-mini-ring">
            <svg width="32" height="32">
              <circle class="budget-mini-ring-track" cx="16" cy="16" r="14" stroke="${isDark ? '#1C1C1C' : '#F4F4F1'}" stroke-width="3" fill="transparent"/>
              <circle class="budget-mini-ring-fill" cx="16" cy="16" r="14" stroke="${colorHex}" stroke-width="3" fill="transparent" stroke-dasharray="87.96" stroke-dashoffset="${offset}"/>
            </svg>
          </div>
          <div style="display: flex !important; flex-direction: column !important; gap: 2px !important;">
            <span style="font-weight: 700 !important; font-size: 0.9rem !important; color: var(--text-primary);">${cat}</span>
            <span style="color: var(--text-secondary) !important; font-size: 0.75rem !important;">
              ${hasLimit ? `${formatCurrency(spent)} of ${formatCurrency(limit)}` : `${formatCurrency(spent)} spent (No limit)`}
            </span>
          </div>
        </div>
        <div style="display: flex !important; align-items: center !important; gap: 10px !important;">
          <div class="budget-input-wrapper" style="position: relative !important; display: flex !important; align-items: center !important; border-radius: 6px !important; overflow: hidden !important;">
            <span style="position: absolute !important; left: 8px !important; font-size: 0.8rem !important; color: var(--text-muted) !important;">${getCurrencySymbol()}</span>
            <input type="number" class="budget-limit-input" name="budget-${cat}" data-category="${cat}" placeholder="Limit" value="${limit > 0 ? limit : ''}" min="0">
          </div>
          <button class="btn-budget-delete" data-category="${cat}" style="background: none; border: none; padding: 4px; cursor: pointer; color: var(--text-muted); display: flex !important; align-items: center !important; justify-content: center !important; transition: color 0.2s !important;">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', rowHtml);
  });

  // Attach delete buttons listeners
  container.querySelectorAll('.btn-budget-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.getAttribute('data-category');
      
      const input = container.querySelector(`input[name="budget-${cat}"]`);
      if (input) {
        input.value = '';
      }
      
      const updatedBudgets = { ...state.data.budgets };
      delete updatedBudgets[cat];
      saveSettings(null, updatedBudgets);
    });
  });

  // Update database stats
  const totalEntriesEl = document.getElementById('stats-total-entries');
  if (totalEntriesEl) {
    const txCount = (state.data.transactions || []).length;
    const subCount = (state.data.subscriptions || []).length;
    totalEntriesEl.innerText = `${txCount + subCount} records`;
  }

  refreshIcons();
};

// Hourly wage saver
elements.btnSaveWage.addEventListener('click', () => {
  const wage = parseFloat(elements.calcHourlyWage.value);
  if (wage > 0) {
    saveSettings({ hourlyWage: wage }, null);
    alert('Hourly wage updated successfully!');
  }
});

// Category budgets saver
elements.budgetSettingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const budgets = {};
  const inputs = elements.budgetInputsContainer.querySelectorAll('input');
  
  inputs.forEach(input => {
    const cat = input.getAttribute('data-category');
    const val = parseFloat(input.value);
    if (!isNaN(val) && val >= 0) {
      budgets[cat] = val;
    }
  });

  saveSettings(null, budgets);
  alert('Budgets updated successfully!');
});

// Interactive Worth It Calculator
const updateWorthItCalc = () => {
  const cost = parseFloat(elements.calcItemCost.value);
  const wage = parseFloat(elements.calcHourlyWage.value) || state.data.profile.hourlyWage;

  if (cost > 0 && wage > 0) {
    const hours = (cost / wage).toFixed(1);
    elements.resultHours.innerText = hours;
    elements.resultHoursBold.innerText = `${hours} hours`;
    elements.calculatorResult.classList.remove('hidden');
  } else {
    elements.calculatorResult.classList.add('hidden');
  }
};

elements.calcItemCost.addEventListener('input', updateWorthItCalc);
elements.calcHourlyWage.addEventListener('input', updateWorthItCalc);

// --- IMPORT & EXPORT HANDLERS ---
const triggerBackupExport = () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `spendwise_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

if (elements.btnExportBackup) {
  elements.btnExportBackup.addEventListener('click', triggerBackupExport);
}

if (elements.importFileInput) {
  elements.importFileInput.addEventListener('change', (e) => {
  if (state.demoMode) {
    alert('Import is disabled in demo mode.');
    e.target.value = '';
    return;
  }
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      // Validate schema format
      if (!parsed.transactions || !parsed.subscriptions || !parsed.profile) {
        alert('Invalid backup file structure!');
        return;
      }

      if (confirm('Importing this file will overwrite all current transactions and settings. Continue?')) {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
          body: JSON.stringify(parsed)
        });
        if (response.ok) {
          alert('Backup restored successfully!');
          fetchData();
        } else {
          alert('Failed to upload data to server.');
        }
      }
    } catch (err) {
      alert('Error parsing JSON backup file.');
      console.error(err);
    }
  };
  reader.readAsText(file);
});

// ==================== MODAL BEHAVIORS ====================

// Open transaction modal
const openTxModal = () => {
  // Default values
  if (elements.labelTxAmount) {
    elements.labelTxAmount.innerText = `Amount (${getCurrencySymbol()})`;
  }
  elements.txAmount.value = '';
  elements.txName.value = '';
  elements.txNotes.value = '';
  elements.txDate.value = new Date().toISOString().split('T')[0];
  elements.txNecessary.checked = true;
  
  setTxModalType('expense');
  
  elements.txModal.classList.remove('hidden');
  refreshIcons();
};

const setTxModalType = (type) => {
  state.currentTxType = type;
  
  if (type === 'expense') {
    elements.toggleExpense.classList.add('active');
    elements.toggleIncome.classList.remove('active');
    elements.labelTxName.innerText = 'Merchant / Name';
    elements.txName.placeholder = 'e.g. McDonald\'s, DigitalOcean';
    elements.groupNecessity.classList.remove('hidden');
    elements.modalTxTitle.innerText = 'Log Expense';
    
    // Populate expense categories
    elements.txCategory.innerHTML = '';
    categories.expense.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.innerText = c;
      elements.txCategory.appendChild(opt);
    });
  } else {
    elements.toggleExpense.classList.remove('active');
    elements.toggleIncome.classList.add('active');
    elements.labelTxName.innerText = 'Income Source';
    elements.txName.placeholder = 'e.g. Part-time Job, Birthday Gift';
    elements.groupNecessity.classList.add('hidden');
    elements.modalTxTitle.innerText = 'Log Income';
    
    // Populate income categories
    elements.txCategory.innerHTML = '';
    categories.income.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.innerText = c;
      elements.txCategory.appendChild(opt);
    });
  }
};

elements.toggleExpense.addEventListener('click', () => setTxModalType('expense'));
elements.toggleIncome.addEventListener('click', () => setTxModalType('income'));

elements.txName.addEventListener('input', () => {
  if (state.currentTxType !== 'expense') return;
  const inferred = inferCategoryFromMerchant(elements.txName.value);
  if (inferred) {
    elements.txCategory.value = inferred;
    applyInferredNecessityToForm(inferred);
  }
});

elements.txCategory.addEventListener('change', () => {
  if (state.currentTxType !== 'expense') return;
  applyInferredNecessityToForm(elements.txCategory.value);
});

// Transaction form submit handler
elements.txForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const tx = {
    type: state.currentTxType,
    amount: parseFloat(elements.txAmount.value),
    name: elements.txName.value,
    date: elements.txDate.value,
    category: elements.txCategory.value,
    isNecessary: state.currentTxType === 'expense' ? elements.txNecessary.checked : true,
    notes: elements.txNotes.value
  };

  if (tx.type === 'expense') {
    tx.category = resolveExpenseCategory(tx);
    const inferredNecessary = inferIsNecessaryFromCategory(tx.category);
    if (inferredNecessary !== null) {
      tx.isNecessary = inferredNecessary;
    }
  }

  addTransaction(tx);
});

// Open subscription modal (supports new and editing)
const openSubModal = (sub = null) => {
  if (sub) {
    // Edit Mode
    elements.modalSubTitle.innerText = 'Edit Subscription';
    elements.subId.value = sub.id;
    elements.subName.value = sub.name;
    elements.subCost.value = sub.cost;
    elements.subCycle.value = sub.cycle;
    elements.subCategory.value = sub.category;
    elements.subNextRenewal.value = sub.nextRenewal;
    elements.subActive.checked = sub.active;
  } else {
    // Add Mode
    elements.modalSubTitle.innerText = 'Add Subscription';
    elements.subId.value = '';
    elements.subName.value = '';
    elements.subCost.value = '';
    elements.subCycle.value = 'monthly';
    elements.subCategory.value = 'Entertainment';
    elements.subNextRenewal.value = new Date().toISOString().split('T')[0];
    elements.subActive.checked = true;
  }
  
  elements.subModal.classList.remove('hidden');
  refreshIcons();
};

// Subscription form submit handler
elements.subForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const sub = {
    name: elements.subName.value,
    cost: parseFloat(elements.subCost.value),
    cycle: elements.subCycle.value,
    category: elements.subCategory.value,
    nextRenewal: elements.subNextRenewal.value,
    active: elements.subActive.checked
  };

  const idVal = elements.subId.value;
  if (idVal) {
    sub.id = idVal;
  }

  saveSubscription(sub);
});

// Attach modal trigger buttons listeners
elements.btnAddTxTriggers.forEach(btn => btn.addEventListener('click', openTxModal));

const btnIncomeTrigger = document.querySelector('.btn-add-tx-trigger-income');
if (btnIncomeTrigger) {
  btnIncomeTrigger.addEventListener('click', () => {
    openTxModal();
    setTxModalType('income');
  });
}

const btnExpenseTrigger = document.querySelector('.btn-add-tx-trigger-expense');
if (btnExpenseTrigger) {
  btnExpenseTrigger.addEventListener('click', () => {
    openTxModal();
    setTxModalType('expense');
  });
}

elements.btnAddSubTrigger.addEventListener('click', () => openSubModal());

document.querySelectorAll('.btn-view-all-tx').forEach(btn => {
  btn.addEventListener('click', () => switchTab('transactions'));
});

const mobileSettingsBtn = document.getElementById('mobile-settings-btn');
if (mobileSettingsBtn) {
  mobileSettingsBtn.addEventListener('click', () => switchTab('general-settings'));
}

const txDownloadBtn = document.getElementById('tx-download-btn');
if (txDownloadBtn) {
  txDownloadBtn.addEventListener('click', triggerBackupExport);
}

// Modal closer helpers
const closeAllModals = () => {
  elements.txModal.classList.add('hidden');
  elements.subModal.classList.add('hidden');
};

elements.btnCloseModals.forEach(btn => btn.addEventListener('click', closeAllModals));

// Close modals when clicking overlay background
window.addEventListener('click', (e) => {
  if (e.target === elements.txModal || e.target === elements.subModal) {
    closeAllModals();
  }
});

// Toggle password visibility
const togglePwBtn = document.getElementById('toggle-password-visibility');
if (togglePwBtn) {
  togglePwBtn.addEventListener('click', () => {
    const pwInput = elements.password;
    const isPw = pwInput.type === 'password';
    pwInput.type = isPw ? 'text' : 'password';
    
    // Toggle eye / eye-off icon
    const icon = togglePwBtn.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', isPw ? 'eye-off' : 'eye');
      refreshIcons();
    }
  });
}

// Sidebar collapse functionality
const initSidebarCollapse = () => {
  const isCollapsed = localStorage.getItem('spendwise_sidebar_collapsed') === 'true';
  if (isCollapsed && elements.sidebar) {
    elements.sidebar.classList.add('collapsed');
  }

  if (elements.sidebarCollapseBtn) {
    elements.sidebarCollapseBtn.addEventListener('click', () => {
      if (elements.sidebar) {
        const collapsed = elements.sidebar.classList.toggle('collapsed');
        localStorage.setItem('spendwise_sidebar_collapsed', collapsed);
        refreshIcons();
      }
    });
  }
};

// Theme Toggle functionality
const initThemeToggle = () => {
  const applyTheme = (theme) => {
    // 1. Update appContainer + body class (body covers overlays outside app-container)
    if (elements.appContainer) {
      elements.appContainer.classList.remove('theme-light', 'theme-dark');
      elements.appContainer.classList.add(`theme-${theme}`);
    }
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    
    // 2. Update theme toggle button icon and text
    const labelSpan = elements.themeBtn ? elements.themeBtn.querySelector('span') : null;
    if (labelSpan) {
      labelSpan.innerText = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
    if (elements.themeIcon) {
      elements.themeIcon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
    }
    
    // 3. Save theme preference
    localStorage.setItem('spendwise_theme', theme);
    state.theme = theme;
    
    refreshIcons();
    
    // 4. Re-render charts to fit the theme (destroy & recreate them!)
    if (state.token && state.data && state.data.transactions) {
      renderDashboard();
    }
  };

  // Initialize theme
  applyTheme(state.theme);

  // Bind click listener
  if (elements.themeBtn) {
    elements.themeBtn.addEventListener('click', () => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  }
};

// --- NOTIFICATION PREFERENCES STORAGE & STATE ---
const getNotificationPreferences = () => {
  try {
    return {
      budget: localStorage.getItem('spendwise_pref_budget_alerts') !== 'false',
      renewal: localStorage.getItem('spendwise_pref_renewal_alerts') !== 'false',
      impulse: localStorage.getItem('spendwise_pref_impulse_alerts') !== 'false'
    };
  } catch (e) {
    return { budget: true, renewal: true, impulse: true };
  }
};

const setNotificationPreference = (key, value) => {
  try {
    localStorage.setItem(`spendwise_pref_${key}_alerts`, value ? 'true' : 'false');
  } catch (e) {}
};

const updateNotificationGuardBadge = (prefs) => {
  const badge = document.getElementById('notif-guard-badge');
  const text = document.getElementById('notif-guard-status-text');
  if (!badge || !text) return;

  const activeCount = (prefs.budget ? 1 : 0) + (prefs.renewal ? 1 : 0) + (prefs.impulse ? 1 : 0);
  if (activeCount === 3) {
    badge.classList.remove('paused');
    text.textContent = 'Live Guard Active';
  } else if (activeCount > 0) {
    badge.classList.remove('paused');
    text.textContent = `Guard Active (${activeCount}/3)`;
  } else {
    badge.classList.add('paused');
    text.textContent = 'All Alerts Paused';
  }
};

const syncNotificationToggles = () => {
  const prefs = getNotificationPreferences();
  updateNotificationGuardBadge(prefs);

  const budgetToggle = document.getElementById('pref-budget-alerts');
  const renewalToggle = document.getElementById('pref-renewal-alerts');
  const impulseToggle = document.getElementById('pref-impulse-alerts');

  if (budgetToggle) {
    budgetToggle.checked = prefs.budget;
    if (!budgetToggle.dataset.bound) {
      budgetToggle.dataset.bound = 'true';
      budgetToggle.addEventListener('change', (e) => {
        setNotificationPreference('budget', e.target.checked);
        renderNotificationsTab();
      });
    }
  }

  if (renewalToggle) {
    renewalToggle.checked = prefs.renewal;
    if (!renewalToggle.dataset.bound) {
      renewalToggle.dataset.bound = 'true';
      renewalToggle.addEventListener('change', (e) => {
        setNotificationPreference('renewal', e.target.checked);
        renderNotificationsTab();
      });
    }
  }

  if (impulseToggle) {
    impulseToggle.checked = prefs.impulse;
    if (!impulseToggle.dataset.bound) {
      impulseToggle.dataset.bound = 'true';
      impulseToggle.addEventListener('change', (e) => {
        setNotificationPreference('impulse', e.target.checked);
        renderNotificationsTab();
      });
    }
  }
};

// --- RENDER: NOTIFICATIONS TAB ---
const renderNotificationsTab = () => {
  const container = document.getElementById('tab-notifications');
  if (!container) return;

  // Sync preference toggle switches and live status
  syncNotificationToggles();
  const prefs = getNotificationPreferences();

  const bodyContainer = document.getElementById('notifications-body-card');
  if (!bodyContainer) return;
  bodyContainer.innerHTML = '';

  const txs = state.data.transactions || [];
  const selectedMonthStr = state.selectedMonth;
  
  // 1. Calculate spent for budgets
  const spentMap = {};
  txs.forEach(tx => {
    if (tx.type === 'expense' && tx.date.substring(0, 7) === selectedMonthStr) {
      const cat = resolveExpenseCategory(tx);
      spentMap[cat] = (spentMap[cat] || 0) + parseFloat(tx.amount);
    }
  });

  const notifications = [];

  // Budget warnings (evaluated if category budget threshold is enabled)
  if (prefs.budget) {
    const budgets = state.data.budgets || {};
    Object.keys(budgets).forEach(cat => {
      const limit = parseFloat(budgets[cat]);
      if (limit > 0) {
        const spent = spentMap[cat] || 0;
        const ratio = (spent / limit) * 100;
        if (ratio >= 80) {
          notifications.push({
            id: `budget-${cat}`,
            type: ratio >= 100 ? 'error' : 'warning',
            icon: 'piggy-bank',
            color: ratio >= 100 ? '#EF4444' : '#F59E0B',
            bg: ratio >= 100 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            message: ratio >= 100 
              ? `Budget Alert: You have exceeded your monthly limit for ${cat} (${formatCurrency(spent)} spent of ${formatCurrency(limit)})!`
              : `Budget Warning: You have spent ${ratio.toFixed(0)}% of your monthly limit for ${cat} (${formatCurrency(spent)} spent of ${formatCurrency(limit)}).`,
            time: 'Active'
          });
        }
      }
    });
  }

  // Renewal warnings (evaluated if subscription renewals trigger is enabled)
  if (prefs.renewal) {
    const subs = state.data.subscriptions || [];
    subs.forEach(sub => {
      if (sub.active) {
        const renewalDate = new Date(sub.nextRenewal);
        const today = new Date();
        today.setHours(0,0,0,0);
        const diffDays = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= 7) {
          notifications.push({
            id: `sub-${sub.id}`,
            type: 'info',
            icon: 'refresh-cw',
            color: '#7C3AED',
            bg: 'rgba(139, 92, 246, 0.1)',
            message: diffDays === 0 
              ? `Renewal Alert: Your ${sub.name} subscription renews today (${formatCurrency(sub.cost)}).`
              : `Upcoming Renewal: Your ${sub.name} subscription renews in ${diffDays} day${diffDays > 1 ? 's' : ''} (${formatCurrency(sub.cost)}).`,
            time: `${diffDays} days left`
          });
        }
      }
    });
  }

  // Impulse spending alert (evaluated if impulse alerts trigger is enabled)
  if (prefs.impulse) {
    let totalExpenses = 0;
    let totalWants = 0;
    txs.forEach(tx => {
      if (tx.type === 'expense' && tx.date.substring(0, 7) === selectedMonthStr) {
        const amt = parseFloat(tx.amount);
        totalExpenses += amt;
        if (!resolveIsNecessary(tx)) {
          totalWants += amt;
        }
      }
    });

    if (totalExpenses > 0) {
      const wantsRatio = (totalWants / totalExpenses) * 100;
      if (wantsRatio >= 40) {
        notifications.push({
          id: 'impulse-alert',
          type: 'warning',
          icon: 'sparkles',
          color: '#D6FF1F',
          bg: 'rgba(214, 255, 31, 0.1)',
          message: `Spending Alert: Impulse wants make up ${wantsRatio.toFixed(0)}% of your total expenses this month (${formatCurrency(totalWants)} of ${formatCurrency(totalExpenses)}).`,
          time: 'This Month'
        });
      }
    }
  }

  // Render notifications
  if (notifications.length === 0) {
    bodyContainer.innerHTML = `
      <div class="empty-state" style="padding: 40px 10px; text-align: center;">
        <i data-lucide="bell-off" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 16px; display: inline-block;"></i>
        <h3>No active notifications</h3>
        <p>${(prefs.budget || prefs.renewal || prefs.impulse) ? "We'll notify you here when category budgets approach their limits or subscriptions are due." : "All notification triggers are currently paused in your preferences below."}</p>
      </div>
    `;
    refreshIcons();
    return;
  }

  notifications.forEach(notif => {
    const isDark = state.theme === 'dark';
    const row = document.createElement('div');
    row.className = 'budget-row-item';
    row.style.cssText = 'padding: 12px 10px !important; display: flex !important; justify-content: space-between !important; align-items: center !important; border-bottom: 1px solid var(--border-color) !important;';
    row.innerHTML = `
      <div style="display: flex !important; align-items: center !important; gap: 12px !important;">
        <div class="activity-icon-box" style="background-color: ${isDark ? 'transparent' : notif.bg}; color: ${isDark ? '#D6FF1F' : notif.color}">
          <i data-lucide="${notif.icon}" style="width: 15px; height: 15px;"></i>
        </div>
        <div style="display: flex !important; flex-direction: column !important; gap: 2px !important;">
          <span style="font-weight: 700 !important; font-size: 0.9rem !important; color: var(--text-primary);">${notif.message}</span>
          <span style="color: var(--text-muted) !important; font-size: 0.75rem !important;">${notif.time}</span>
        </div>
      </div>
    `;
    bodyContainer.appendChild(row);
  });

  refreshIcons();
};

// --- INITIALIZE: GENERAL SETTINGS TAB ---
const initGeneralSettingsTab = () => {
  // Sync current theme and records count in UI
  const currentThemeSpan = document.getElementById('settings-current-theme');
  if (currentThemeSpan) {
    currentThemeSpan.textContent = state.theme === 'light' ? 'Light Mode' : 'Dark Mode';
  }

  const totalRecordsSpan = document.getElementById('settings-total-records');
  if (totalRecordsSpan) {
    const txCount = (state.data?.transactions || []).length;
    totalRecordsSpan.textContent = `${txCount} records`;
  }

  // Bind Theme Toggle in Settings
  const toggleBtn = document.getElementById('settings-theme-toggle');
  if (toggleBtn) {
    const newToggle = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggle, toggleBtn);
    newToggle.addEventListener('click', () => {
      if (elements.themeBtn) {
        elements.themeBtn.click();
      }
      const span = document.getElementById('settings-current-theme');
      if (span) {
        span.textContent = state.theme === 'light' ? 'Light Mode' : 'Dark Mode';
      }
    });
  }

  // Bind Export Backup in Settings
  const exportBtn = document.getElementById('btn-export-backup-settings');
  if (exportBtn) {
    const newExport = exportBtn.cloneNode(true);
    exportBtn.parentNode.replaceChild(newExport, exportBtn);
    newExport.addEventListener('click', () => {
      triggerBackupExport();
    });
  }

  // Bind Import Backup in Settings
  const importInputSettings = document.getElementById('import-file-input-settings');
  if (importInputSettings) {
    importInputSettings.addEventListener('change', (e) => {
      if (state.demoMode) {
        alert('Import is disabled in demo mode.');
        e.target.value = '';
        return;
      }
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.profile && parsed.budgets && parsed.transactions && parsed.subscriptions) {
            await saveSettings(parsed.profile, parsed.budgets);
            for (const tx of parsed.transactions) {
              await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${state.token}`
                },
                body: JSON.stringify(tx)
              });
            }
            for (const sub of parsed.subscriptions) {
              await fetch('/api/subscriptions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${state.token}`
                },
                body: JSON.stringify(sub)
              });
            }
            alert('Database Backup Restored Successfully!');
            window.location.reload();
          } else {
            alert('Invalid backup file format.');
          }
        } catch (err) {
          console.error(err);
          alert('Failed to parse backup file.');
        }
      };
      reader.readAsText(file);
    });
  }

  // Bind Logout / Lock Vault in Settings
  const logoutBtnSettings = document.getElementById('btn-logout-settings');
  if (logoutBtnSettings) {
    const newLogout = logoutBtnSettings.cloneNode(true);
    logoutBtnSettings.parentNode.replaceChild(newLogout, logoutBtnSettings);
    newLogout.addEventListener('click', logout);
  }

  refreshIcons();
};

// --- CUSTOM FILTER BOTTOM SHEET LOGIC ---
const initFilterSheet = () => {
  const sheet = document.getElementById('filter-bottom-sheet');
  const btnTriggerMobileFilter = document.getElementById('btn-trigger-mobile-filter');
  const btnTriggerMobileStatus = document.getElementById('btn-trigger-mobile-status');
  const btnCloseFilterSheet = document.getElementById('btn-close-filter-sheet');
  const btnCancelFilter = document.getElementById('btn-cancel-filter');
  const btnConfirmFilter = document.getElementById('btn-confirm-filter');
  const backdrop = document.getElementById('filter-sheet-backdrop');

  if (!sheet) return;

  const openSheet = () => {
    // Populate dynamic categories list from current transaction state
    const catGroup = document.getElementById('filter-group-category');
    if (catGroup) {
      catGroup.innerHTML = '<button type="button" class="filter-tag" data-value="all">All Categories</button>';
      
      const allCategories = new Set();
      state.data.transactions.forEach(t => allCategories.add(t.category));
      
      allCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-tag';
        btn.setAttribute('data-value', cat);
        btn.innerText = cat;
        catGroup.appendChild(btn);
      });
    }

    // Set active class matching current settings in elements
    const currentCategory = elements.txFilterCategory.value;
    const currentType = elements.txFilterType.value;

    document.querySelectorAll('#filter-group-category .filter-tag').forEach(tag => {
      if (tag.getAttribute('data-value') === currentCategory) tag.classList.add('active');
      else tag.classList.remove('active');
    });

    const flowVal = ['income', 'expense'].includes(currentType) ? currentType : 'all';
    const priorityVal = ['necessary', 'unnecessary'].includes(currentType) ? currentType : 'all';

    document.querySelectorAll('#filter-group-flow .filter-tag').forEach(tag => {
      if (tag.getAttribute('data-value') === flowVal) tag.classList.add('active');
      else tag.classList.remove('active');
    });

    document.querySelectorAll('#filter-group-priority .filter-tag').forEach(tag => {
      if (tag.getAttribute('data-value') === priorityVal) tag.classList.add('active');
      else tag.classList.remove('active');
    });

    // Tag click listeners to toggle active in their respective group
    document.querySelectorAll('.filter-sheet .filter-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const parent = tag.parentNode;
        parent.querySelectorAll('.filter-tag').forEach(sibling => sibling.classList.remove('active'));
        tag.classList.add('active');
      });
    });

    sheet.classList.remove('hidden');
    refreshIcons();
  };

  const closeSheet = () => {
    sheet.classList.add('hidden');
  };

  if (btnTriggerMobileFilter) btnTriggerMobileFilter.addEventListener('click', openSheet);
  if (btnTriggerMobileStatus) btnTriggerMobileStatus.addEventListener('click', openSheet);
  if (btnCloseFilterSheet) btnCloseFilterSheet.addEventListener('click', closeSheet);
  if (btnCancelFilter) btnCancelFilter.addEventListener('click', closeSheet);
  if (backdrop) backdrop.addEventListener('click', closeSheet);

  if (btnConfirmFilter) {
    btnConfirmFilter.addEventListener('click', () => {
      const activeFlowTag = document.querySelector('#filter-group-flow .filter-tag.active');
      const activePriorityTag = document.querySelector('#filter-group-priority .filter-tag.active');
      const activeCategoryTag = document.querySelector('#filter-group-category .filter-tag.active');

      const flowVal = activeFlowTag ? activeFlowTag.getAttribute('data-value') : 'all';
      const priorityVal = activePriorityTag ? activePriorityTag.getAttribute('data-value') : 'all';
      const categoryVal = activeCategoryTag ? activeCategoryTag.getAttribute('data-value') : 'all';

      // Map combined Flow + Priority value to elements.txFilterType
      let finalType = 'all';
      if (flowVal !== 'all') {
        finalType = flowVal; // 'income' or 'expense'
      } else if (priorityVal !== 'all') {
        finalType = priorityVal; // 'necessary' or 'unnecessary'
      }

      // Update native filters
      elements.txFilterCategory.value = categoryVal;
      elements.txFilterType.value = finalType;

      // Update mobile toolbar button text labels
      const txtMobileFilterCategory = document.getElementById('txt-mobile-filter-category');
      const txtMobileFilterStatus = document.getElementById('txt-mobile-filter-status');

      if (txtMobileFilterCategory) {
        txtMobileFilterCategory.innerText = categoryVal === 'all' ? 'All Categories' : categoryVal;
      }

      if (txtMobileFilterStatus) {
        let statusText = 'All Status';
        if (finalType === 'income') statusText = 'Money In';
        else if (finalType === 'expense') statusText = 'Money Out';
        else if (finalType === 'necessary') statusText = 'Needs';
        else if (finalType === 'unnecessary') statusText = 'Wants';
        txtMobileFilterStatus.innerText = statusText;
      }

      // Close and trigger render refresh
      closeSheet();
      renderTransactionsTab();
    });
  }
};

const initMonthPicker = () => {
  const sheet = document.getElementById('month-picker-sheet');
  const backdrop = document.getElementById('month-picker-backdrop');
  const dashBtn = document.getElementById('dashboard-month-picker-btn');
  const historyBtn = document.getElementById('month-selector-btn');
  const closeBtn = document.getElementById('btn-close-month-picker');
  const cancelBtn = document.getElementById('btn-cancel-month-picker');
  const confirmBtn = document.getElementById('btn-confirm-month-picker');
  const prevBtn = document.getElementById('btn-month-prev');
  const nextBtn = document.getElementById('btn-month-next');
  const jumpBtn = document.getElementById('btn-jump-current-month');

  if (!sheet) return;

  const openSheet = () => {
    state.pickerDraftMonth = state.selectedMonth;
    updateMonthPickerLabels();
    sheet.classList.remove('hidden');
    refreshIcons();
  };

  const closeSheet = () => {
    sheet.classList.add('hidden');
    state.pickerDraftMonth = null;
  };

  const shiftDraftMonth = (direction) => {
    const base = state.pickerDraftMonth || state.selectedMonth;
    state.pickerDraftMonth = direction === 'prev'
      ? getPreviousMonthKey(base)
      : getNextMonthKey(base);
    updateMonthPickerLabels();
    refreshIcons();
  };

  if (dashBtn) dashBtn.addEventListener('click', openSheet);
  if (historyBtn) {
    historyBtn.addEventListener('click', openSheet);
    historyBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSheet();
      }
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeSheet);
  if (closeBtn) closeBtn.addEventListener('click', closeSheet);
  if (cancelBtn) cancelBtn.addEventListener('click', closeSheet);
  if (prevBtn) prevBtn.addEventListener('click', () => shiftDraftMonth('prev'));
  if (nextBtn) nextBtn.addEventListener('click', () => shiftDraftMonth('next'));
  if (jumpBtn) {
    jumpBtn.addEventListener('click', () => {
      state.pickerDraftMonth = getCurrentMonthKey();
      updateMonthPickerLabels();
    });
  }
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      setSelectedMonth(state.pickerDraftMonth || state.selectedMonth);
      closeSheet();
    });
  }
};

const initPwa = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
  if ('caches' in window) {
    caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
  }

  initPullToRefresh();
  initBottomNavAutoHide();
};

const initBottomNavAutoHide = () => {
  const scrollEl = document.querySelector('.app-layout .main-content');
  const bottomNav = document.querySelector('.bottom-nav');
  if (!scrollEl || !bottomNav || !elements.appContainer) return;
  if (!window.matchMedia('(max-width: 768px)').matches) return;

  let lastScrollY = scrollEl.scrollTop;
  let ticking = false;

  const setNavVisible = (visible) => {
    bottomNav.classList.toggle('bottom-nav-hidden', !visible);
    elements.appContainer.classList.toggle('nav-collapsed', !visible);
  };

  scrollEl.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const current = scrollEl.scrollTop;
      const delta = current - lastScrollY;

      if (current <= 10) {
        setNavVisible(true);
      } else if (delta > 8) {
        setNavVisible(false);
      } else if (delta < -8) {
        setNavVisible(true);
      }

      lastScrollY = current;
      ticking = false;
    });
  }, { passive: true });
};

const initPullToRefresh = () => {
  const scrollEl = document.querySelector('.app-layout .main-content');
  if (!scrollEl || !window.matchMedia('(max-width: 768px)').matches) return;

  let indicator = scrollEl.querySelector('.pull-refresh-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'pull-refresh-indicator';
    indicator.innerHTML = '<i data-lucide="arrow-down"></i><span>Pull to refresh</span>';
    scrollEl.insertBefore(indicator, scrollEl.firstChild);
    refreshIcons();
  }

  let startY = 0;
  let currentPull = 0;
  let tracking = false;
  const threshold = 72;

  const resetPull = () => {
    tracking = false;
    currentPull = 0;
    scrollEl.style.transform = '';
    indicator.classList.remove('visible', 'ready', 'refreshing');
    indicator.querySelector('span').textContent = 'Pull to refresh';
  };

  scrollEl.addEventListener('touchstart', (e) => {
    if (scrollEl.scrollTop <= 0 && !document.querySelector('.modal-overlay:not(.hidden), .filter-sheet:not(.hidden)')) {
      startY = e.touches[0].clientY;
      tracking = true;
    }
  }, { passive: true });

  scrollEl.addEventListener('touchmove', (e) => {
    if (!tracking) return;
    const pull = e.touches[0].clientY - startY;
    if (pull <= 0 || scrollEl.scrollTop > 0) {
      resetPull();
      return;
    }
    e.preventDefault();
    currentPull = Math.min(pull, 110);
    scrollEl.style.transform = `translateY(${currentPull * 0.45}px)`;
    indicator.classList.add('visible');
    indicator.classList.toggle('ready', currentPull >= threshold);
    indicator.querySelector('span').textContent = currentPull >= threshold ? 'Release to refresh' : 'Pull to refresh';
  }, { passive: false });

  scrollEl.addEventListener('touchend', async () => {
    if (!tracking) return;
    const shouldRefresh = currentPull >= threshold && state.token;
    tracking = false;
    scrollEl.style.transform = '';

    if (shouldRefresh) {
      indicator.classList.add('visible', 'refreshing');
      indicator.classList.remove('ready');
      indicator.querySelector('span').textContent = 'Refreshing…';
      await refreshAppData();
      resetPull();
      refreshIcons();
      return;
    }

    resetPull();
  }, { passive: true });
};

const initMobileRefresh = () => {
  if (!elements.mobileRefreshBtn) return;
  elements.mobileRefreshBtn.addEventListener('click', async () => {
    elements.mobileRefreshBtn.classList.add('spinning');
    await refreshAppData();
    elements.mobileRefreshBtn.classList.remove('spinning');
    refreshIcons();
  });
};

const initChartCalendar = () => {
  const btnTrigger = document.getElementById('btn-chart-calendar');
  const modal = document.getElementById('chart-calendar-modal');
  const backdrop = document.getElementById('chart-calendar-backdrop');
  const closeBtn = document.getElementById('btn-close-calendar-modal');
  const form = document.getElementById('chart-calendar-form');
  const resetBtn = document.getElementById('btn-reset-chart-calendar');
  
  const startDateInput = document.getElementById('chart-start-date');
  const endDateInput = document.getElementById('chart-end-date');

  if (!btnTrigger || !modal) return;

  const openModal = () => {
    modal.classList.remove('hidden');
    
    // Set default dates if not already set
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);
    
    const endStr = now.toISOString().split('T')[0];
    const startStr = `${sixMonthsAgo.getFullYear()}-${String(sixMonthsAgo.getMonth() + 1).padStart(2, '0')}-01`;
    
    if (state.chartDateRange) {
      startDateInput.value = state.chartDateRange.start;
      endDateInput.value = state.chartDateRange.end;
    } else {
      startDateInput.value = startStr;
      endDateInput.value = endStr;
    }
  };

  const closeModal = () => {
    modal.classList.add('hidden');
  };

  btnTrigger.addEventListener('click', openModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      state.chartDateRange = {
        start: startDateInput.value,
        end: endDateInput.value
      };
      closeModal();
      renderTrendChart(state.data.transactions);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.chartDateRange = null;
      closeModal();
      renderTrendChart(state.data.transactions);
    });
  }
};

// Initialize application on page ready
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initSidebarCollapse();
  initThemeToggle();
  initFilterSheet();
  initMonthPicker();
  initChartCalendar();
  initPwa();
  initMobileRefresh();
  syncNotificationToggles();

  // Bind click trigger on Latest Transaction Banner
  const banner = document.getElementById('latest-tx-banner');
  if (banner) {
    banner.addEventListener('click', (e) => {
      if (e.target.closest('.btn-banner-add') || e.target.closest('.btn-add-tx-trigger')) {
        return;
      }
      switchTab('transactions');
    });
  }
});
