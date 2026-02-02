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
  vibe: 'spiritual' | 'nature' | 'adventure' | 'heritage';
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
}

export type Season = 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter';

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