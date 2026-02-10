export interface MirrorLocation {
  id: string;
  worldName: string;
  worldImage: string;
  worldPrice: number;
  bharatName: string;
  bharatImage: string;
  bharatPrice: number;
  description: string;
  savings: number;
  tags: string[];
  vibe: VibeType;
}

export interface ArtisanProduct {
  id: string;
  name: string;
  district: string;
  type: string;
  price: number;
  story: string;
  image: string;
  giTag: boolean;
  // Karigar Fields
  makerName?: string;
  makerImage?: string;
  makerVerified?: boolean;
  videoUrl?: string; // Behind the scenes
  coordinates?: { lat: number; lng: number };
}

export type Season = 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter';
export type VibeType = 'beach' | 'mountain' | 'wildlife' | 'spiritual' | 'heritage' | 'nature' | 'adventure';

export interface ThemeConfig {
  vibe: VibeType;
  primary: string; // The "True Color"
  secondary: string;
  bgGradient: string;
  soundUrl: string; // Placeholder for soundscape
}

export interface UserProfile {
  name: string;
  email: string;
  vibe: VibeType;
  currency: 'INR' | 'USD' | 'EUR';
  totalBudget: number;
  spent: number;
  level: number; // 1-5 based on visits
  badges: string[];
  // Patron Stats
  impactStats?: {
    familiesSupported: number;
    localShopsVisited: number;
    recipesCollected: number;
    travelersHelped: number; // For Bharat Anubhav impact
  };
}

export interface UserBudget {
  total: number;
  spent: number;
  categories: {
    travel: number;
    stay: number;
    food: number;
    shopping: number; // Vocal for Local
  };
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface FoodItem {
  id: string;
  name: string;
  type: 'snack' | 'meal' | 'sweet' | 'beverage';
  legend: string;
  famousShop: string;
  tasteProfile: ('spicy' | 'sweet' | 'tangy' | 'savory')[];
  spiceLevel: number; // 1-5
  image: string;
  recipe?: Recipe; // Digital Recipe Card
}

export interface Phrase {
  original: string;
  english: string;
  pronunciation: string; // Phonetic
}

export interface LanguageProfile {
  name: string;
  scriptName: string;
  scriptSample: string; // Visual representation
  hello: Phrase;
  cost: Phrase;
  help: Phrase;
  thankYou: Phrase;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  type: 'science' | 'art' | 'philosophy';
  description: string;
  content: string; // The "fact" or "lesson"
  image?: string;
}

export interface GameItem {
  id: string;
  name: string;
  origin: string;
  description: string;
  type: 'strategy' | 'physical' | 'memory';
}

export interface FestivalItem {
  id: string;
  name: string;
  month: string;
  type: 'temple' | 'harvest' | 'fair' | 'art';
  iconType: 'bell' | 'boat' | 'camel' | 'lamp' | 'color';
  description: string;
  bestTime: string;
}

export interface YatraItem {
  id: string;
  title: string;
  category: 'food' | 'place' | 'culture' | 'fabric';
  location: string;
  image?: string;
  requiresPermit?: boolean;
  day?: number; // Day 1, 2, 3...
  estimatedCost?: number;
}

export interface ScenicRoute {
  id: string;
  name: string;
  type: 'train' | 'road';
  start: string;
  end: string;
  duration: string;
  description: string;
  image: string;
  videoUrl?: string;
}

export interface HistoricalSite {
  id: string;
  name: string;
  year: number; // Negative for BCE
  era: 'ancient' | 'golden' | 'medieval' | 'modern';
  cx: number;
  cy: number;
  description: string;
}

export interface HiddenGem {
  id: string;
  name: string;
  location: string;
  cx: number;
  cy: number;
  description: string;
}

// --- Bharat Anubhav (Experience Feed) ---

export type PostType = 'do' | 'dont' | 'tip' | 'mirror_compare' | 'safety';
export type UserBadgeType = 'Desi Explorer' | 'Local Legend' | 'Pathbreaker' | 'Local Guru' | 'None';

export interface ExperiencePost {
  id: string;
  userId: string;
  userName: string;
  userBadge: UserBadgeType;
  type: PostType;
  content: string;
  districtId: string;
  locationName: string;
  timestamp: string; // e.g., "2 hours ago"
  helpfulCount: number;
  tags?: string[];
  relatedPlaceId?: string; // For "While you're there" AI prompt
}

export interface SafetyStats {
  soloTraveler: number; // 0-100 confidence
  family: number;
  senior: number;
  lastVerified: string;
}

// --- State Explorer Types ---

export interface DistrictProfile {
  id: string;
  name: string;
  cx: number; // Relative coordinate X for the map (0-100)
  cy: number; // Relative coordinate Y for the map (0-100)
  description: string;
  famousFoods: FoodItem[];
  permitRequired?: boolean;
  language: LanguageProfile;
  knowledge?: KnowledgeItem[]; // Gyaan
  games?: GameItem[]; // Traditional Games
  festivals?: FestivalItem[]; // Utsav
  artisanProducts?: ArtisanProduct[]; // Swadeshi Shopping
  experiences?: ExperiencePost[]; // Bharat Anubhav
  safety?: SafetyStats; // Community Safety Meter
}

export interface StateProfile {
  id: string;
  name: string;
  nickname: string;
  description: string;
  climate: string;
  bestTime: string;
  landmarks: string[];
  districts: DistrictProfile[];
  path: string; // SVG Path Data
  viewBox: string; // SVG ViewBox for the isolated state view
  color: string;
  animType: 'snow' | 'rain' | 'heat' | 'waves' | 'none';
}