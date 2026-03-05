import { MirrorLocation, ArtisanProduct, StateProfile, ScenicRoute, HistoricalSite, HiddenGem, ThemeConfig, VibeType } from './types';

export const MIRROR_DATA: MirrorLocation[] = [
  {
    id: '1',
    worldName: 'Switzerland',
    worldImage: 'https://picsum.photos/id/1036/800/600',
    worldPrice: 250000,
    bharatName: 'Gulmarg, Kashmir',
    bharatImage: 'https://picsum.photos/id/1018/800/600',
    bharatPrice: 35000,
    description: "Why cross oceans when the Meadows of Heaven are here? Experience snow-capped peaks and gondola rides.",
    savings: 215000,
    tags: ['Snow', 'Mountains', 'Luxury'],
    vibe: 'nature'
  },
  {
    id: '2',
    worldName: 'Venice, Italy',
    worldImage: 'https://picsum.photos/id/1040/800/600',
    worldPrice: 180000,
    bharatName: 'Alappuzha, Kerala',
    bharatImage: 'https://picsum.photos/id/1039/800/600',
    bharatPrice: 12000,
    description: "The Venice of the East. Living on water, canal networks, and houseboats.",
    savings: 168000,
    tags: ['Water', 'Romance', 'Relaxation'],
    vibe: 'nature'
  },
  {
    id: '3',
    worldName: 'Grand Canyon, USA',
    worldImage: 'https://picsum.photos/id/1015/800/600',
    worldPrice: 300000,
    bharatName: 'Gandikota, Andhra Pradesh',
    bharatImage: 'https://picsum.photos/id/1016/800/600',
    bharatPrice: 15000,
    description: "Massive river gorges and red stone architecture. The hidden Grand Canyon of India.",
    savings: 285000,
    tags: ['Adventure', 'History', 'Gorge'],
    vibe: 'adventure'
  },
  {
    id: '4',
    worldName: 'Japan (Cherry Blossoms)',
    worldImage: 'https://picsum.photos/id/1011/800/600',
    worldPrice: 220000,
    bharatName: 'Shillong, Meghalaya',
    bharatImage: 'https://picsum.photos/id/1012/800/600',
    bharatPrice: 20000,
    description: "Pink floral mist in the hills. Witness the India International Cherry Blossom Festival.",
    savings: 200000,
    tags: ['Nature', 'Flowers', 'Hills'],
    vibe: 'nature'
  },
  {
    id: '5',
    worldName: 'Sahara Desert',
    worldImage: 'https://picsum.photos/id/1043/800/600',
    worldPrice: 150000,
    bharatName: 'Jaisalmer, Rajasthan',
    bharatImage: 'https://picsum.photos/id/1044/800/600',
    bharatPrice: 18000,
    description: "Infinite golden dunes, camel safaris, and ancient forts.",
    savings: 132000,
    tags: ['Desert', 'Culture', 'Forts'],
    vibe: 'heritage'
  }
];

// --- TRUE COLOR ATMOSPHERE & SOUND MAPPING ---
export const VIBE_THEMES: Record<VibeType, ThemeConfig> = {
  nature: {
    vibe: 'nature',
    primary: '#065F46', // Emerald Green
    secondary: '#34D399',
    bgGradient: 'from-[#064E3B] to-[#022C22]',
    soundUrl: 'forest_ambience'
  },
  beach: {
    vibe: 'beach',
    primary: '#005F73', // Peacock Blue / Ocean
    secondary: '#0EA5E9',
    bgGradient: 'from-[#0C4A6E] to-[#082F49]',
    soundUrl: 'ocean_waves'
  },
  mountain: {
    vibe: 'mountain',
    primary: '#E9D8A6', // Dusty Gold / Snow Glow
    secondary: '#FDE68A',
    bgGradient: 'from-[#1E293B] to-[#0F172A]',
    soundUrl: 'mountain_wind'
  },
  spiritual: {
    vibe: 'spiritual',
    primary: '#EE9B00', // Saffron / Marigold
    secondary: '#FCD34D',
    bgGradient: 'from-[#431407] to-[#1a0f00]',
    soundUrl: 'temple_bells'
  },
  wildlife: {
    vibe: 'wildlife',
    primary: '#94D2BD', // Jungle Mist
    secondary: '#2DD4BF',
    bgGradient: 'from-[#14532D] to-[#052E16]',
    soundUrl: 'jungle_sounds'
  },
  adventure: {
    vibe: 'adventure',
    primary: '#9B2226', // Adrenaline Red
    secondary: '#F87171',
    bgGradient: 'from-[#7F1D1D] to-[#450A0A]',
    soundUrl: 'wind_rush'
  },
  heritage: {
    vibe: 'heritage',
    primary: '#CA8A04', // Ancient Gold
    secondary: '#FACC15',
    bgGradient: 'from-[#422006] to-[#251000]',
    soundUrl: 'history_echo'
  }
};

export const ARTISAN_PRODUCTS: ArtisanProduct[] = [
  {
    id: 'a1',
    name: 'Pashmina Shawl',
    district: 'Kashmir',
    type: 'Clothing',
    price: 5500,
    story: 'Hand-woven by families for generations in the high Himalayas.',
    image: 'https://picsum.photos/id/22/300/300',
    giTag: true,
    makerName: 'Ahmed Bhatt',
    makerVerified: true,
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4', // Placeholder video
    makerImage: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  {
    id: 'a2',
    name: 'Blue Pottery',
    district: 'Jaipur',
    type: 'Home Decor',
    price: 1200,
    story: 'Turquoise glazed pottery using a unique Egyptian paste technique.',
    image: 'https://picsum.photos/id/24/300/300',
    giTag: true,
    makerName: 'Leela Devi',
    makerVerified: true,
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4', 
    makerImage: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  {
    id: 'a3',
    name: 'Channapatna Toys',
    district: 'Karnataka',
    type: 'Toys',
    price: 800,
    story: 'Eco-friendly wooden toys colored with natural vegetable dyes.',
    image: 'https://picsum.photos/id/26/300/300',
    giTag: true,
    makerName: 'Raju Gowda',
    makerVerified: true,
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    makerImage: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
];

export const SEASONS = {
  spring: { color: 'text-pink-400', bg: 'from-pink-900 to-cosmos', icon: '🌸', message: "Valley of Flowers blooms. Perfect for wildlife." },
  summer: { color: 'text-yellow-400', bg: 'from-orange-900 to-cosmos', icon: '☀️', message: "Escape to the hills of Himachal or North East." },
  monsoon: { color: 'text-emerald-400', bg: 'from-emerald-900 to-cosmos', icon: '🌧️', message: "Western Ghats come alive. Visit Meghalaya." },
  autumn: { color: 'text-orange-400', bg: 'from-red-900 to-cosmos', icon: '🍂', message: "Festival season. Golden skies over Punjab." },
  winter: { color: 'text-cyan-200', bg: 'from-slate-800 to-cosmos', icon: '❄️', message: "Snow in North. Perfect sun in Rajasthan & Goa." },
};

export const SCENIC_ROUTES: ScenicRoute[] = [
  {
    id: 'r1',
    name: 'Kalka-Shimla Toy Train',
    type: 'train',
    start: 'Kalka',
    end: 'Shimla',
    duration: '5h 30m',
    description: 'A UNESCO World Heritage ride through 103 tunnels and misty pine forests.',
    image: 'https://images.unsplash.com/photo-1596522566671-55896d862419?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'r2',
    name: 'Manali-Leh Highway',
    type: 'road',
    start: 'Manali',
    end: 'Leh',
    duration: '18h (2 Days)',
    description: 'The ultimate road trip crossing high-altitude passes like Rohtang and Taglang La.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'r3',
    name: 'Konkan Railway',
    type: 'train',
    start: 'Mumbai',
    end: 'Goa',
    duration: '9h',
    description: 'Breathtaking views of the Western Ghats, waterfalls, and long tunnels.',
    image: 'https://images.unsplash.com/photo-1517330357046-3ab5a5dd42a1?auto=format&fit=crop&q=80&w=1000'
  }
];

export const BUDGET_TIERS = [
  { type: 'Backpacker', range: '₹2,000–3,000', desc: 'Hostels, Local Buses, Street Food' },
  { type: 'Mid-Range', range: '₹4,500–7,000', desc: 'Heritage Hotels, 3AC Trains, Cafes' },
  { type: 'Luxury', range: '₹10,000+', desc: 'Palaces, Private Cabs, Fine Dining' },
];

export const SAFETY_CONTACTS = {
  emergency: '112',
  touristHelpline: '1800-11-1363',
  womenHelpline: '1091',
  tourismEmail: 'info@incredibleindia.org'
};

export const HISTORICAL_SITES: HistoricalSite[] = [
  { id: 'h1', name: 'Dholavira', year: -2600, era: 'ancient', cx: 120, cy: 220, description: 'Harappan Metropolis' },
  { id: 'h2', name: 'Lothal', year: -2400, era: 'ancient', cx: 130, cy: 240, description: 'World\'s earliest known dock' },
  { id: 'h3', name: 'Sanchi Stupa', year: -300, era: 'golden', cx: 200, cy: 250, description: 'Ashokan Buddhist Complex' },
  { id: 'h4', name: 'Nalanda Univ', year: 400, era: 'golden', cx: 280, cy: 230, description: 'Ancient seat of learning' },
  { id: 'h5', name: 'Thanjavur Temple', year: 1010, era: 'medieval', cx: 220, cy: 420, description: 'Chola Architecture Marvel' },
  { id: 'h6', name: 'Taj Mahal', year: 1632, era: 'medieval', cx: 180, cy: 200, description: 'Mughal Masterpiece' },
];

export const HIDDEN_GEMS: HiddenGem[] = [
  { id: 'hg1', name: 'Living Root Bridges', location: 'Meghalaya', cx: 330, cy: 240, description: 'Bio-engineering by Khasi tribes' },
  { id: 'hg2', name: 'Loktak Lake', location: 'Manipur', cx: 340, cy: 250, description: 'Floating Phumdis' },
  { id: 'hg3', name: 'Unakoti', location: 'Tripura', cx: 320, cy: 260, description: 'Angkor Wat of North-East' },
  { id: 'hg4', name: 'Gandikota', location: 'Andhra', cx: 210, cy: 350, description: 'Grand Canyon of India' },
  { id: 'hg5', name: 'Dhanushkodi', location: 'Tamil Nadu', cx: 230, cy: 460, description: 'Ghost Town' },
];

// Simplified SVG Paths for demonstration
export const STATE_DATA: StateProfile[] = [
  {
    id: 'rj',
    name: 'Rajasthan',
    nickname: 'Land of Kings',
    description: 'The jewel of Bharat\'s desert heritage. Home to massive forts, vibrant turbans, and the endless Thar.',
    climate: 'Arid / Hot',
    bestTime: 'October - March',
    landmarks: ['Amber Fort', 'Thar Desert', 'Lake Pichola'],
    animType: 'heat',
    color: '#F59E0B', // Amber
    path: 'M 120 180 L 160 160 L 200 170 L 220 220 L 180 250 L 140 240 L 120 180 Z',
    viewBox: '100 150 150 120',
    districts: [
      { 
        id: 'jpr', 
        name: 'Jaipur', 
        cx: 65, 
        cy: 40, 
        description: 'The Pink City',
        safety: { soloTraveler: 85, family: 95, senior: 90, lastVerified: '2h ago' },
        experiences: [
           { id: 'e1', userId: 'u1', userName: 'Anjali S.', userBadge: 'Desi Explorer', type: 'do', content: 'Visit Amber Fort at sunrise. The light hitting the yellow sandstone is magical and there are fewer crowds.', districtId: 'jpr', locationName: 'Amber Fort', timestamp: '3h ago', helpfulCount: 45 },
           { id: 'e2', userId: 'u2', userName: 'Mike T.', userBadge: 'None', type: 'dont', content: 'Don\'t buy gemstones from the main road guides. Go to Johari Bazaar for authentic deals.', districtId: 'jpr', locationName: 'Johari Bazaar', timestamp: '1d ago', helpfulCount: 120 },
           { id: 'e3', userId: 'u3', userName: 'Rahul V.', userBadge: 'Local Legend', type: 'tip', content: 'Try the Lassi at Lassiwala on MI Road. It runs out by 2 PM!', districtId: 'jpr', locationName: 'MI Road', timestamp: '5h ago', helpfulCount: 89, relatedPlaceId: 'jpr_1' }
        ],
        famousFoods: [
          {
            id: 'jpr_1',
            name: 'Pyaz Kachori',
            type: 'snack',
            legend: 'Created by Jodhpur sweet makers, perfected in Jaipur.',
            famousShop: 'Rawat Mishthan Bhandar',
            tasteProfile: ['spicy', 'savory'],
            spiceLevel: 4,
            image: 'https://picsum.photos/seed/kachori/200/200'
          },
          {
            id: 'jpr_2',
            name: 'Ghevar',
            type: 'sweet',
            legend: 'A honeycomb disc made for the monsoon festival of Teej.',
            famousShop: 'LMB Hotel',
            tasteProfile: ['sweet'],
            spiceLevel: 0,
            image: 'https://picsum.photos/seed/ghevar/200/200'
          }
        ],
        artisanProducts: [
           {
             id: 'jpr_a1',
             name: 'Blue Pottery',
             district: 'Jaipur',
             type: 'Decor',
             price: 1500,
             story: 'The art of blue glaze on clay, kept alive by generations.',
             image: 'https://picsum.photos/seed/pottery/300/300',
             giTag: true,
             makerName: 'Leela Devi',
             makerVerified: true,
             videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
             makerImage: 'https://randomuser.me/api/portraits/women/32.jpg'
           }
        ],
        language: {
            name: 'Dhundari / Hindi',
            scriptName: 'Devanagari',
            scriptSample: 'जयपुर',
            hello: { original: 'Khamma Ghani', english: 'Hello', pronunciation: 'Kha-mma Gha-ni' },
            cost: { original: 'Kai bhaav che?', english: 'How much is this?', pronunciation: 'Kai bhaav che' },
            help: { original: 'Madad karo', english: 'Help me', pronunciation: 'Ma-dad ka-ro' },
            thankYou: { original: 'Dhanyavad', english: 'Thank you', pronunciation: 'Dhan-ya-vad' }
        },
        knowledge: [
           {
             id: 'k1',
             title: 'Jantar Mantar',
             type: 'science',
             description: 'An ancient open-air astronomical observatory.',
             content: 'Constructed by Rajput king Sawai Jai Singh II, it features the world’s largest stone sundial, measuring time to an accuracy of 2 seconds.'
           },
           {
             id: 'k2',
             title: 'Vedic Mathematics',
             type: 'science',
             description: 'Ancient system of fast calculation.',
             content: 'Did you know? You can multiply 98 x 97 in your head using the "Base Method" from the Vedas. (100-2)x(100-3) = 9506.'
           }
        ],
        games: [
          { id: 'g1', name: 'Chaupar', origin: 'Ancient Bharat', description: 'A cross-and-circle strategy game mentioned in the Mahabharata.', type: 'strategy' }
        ],
        festivals: [
           { id: 'f1', name: 'Elephant Festival', month: 'March', type: 'fair', iconType: 'camel', description: 'Elephants decorated in jewelry and colors.', bestTime: 'Holi Eve' }
        ]
      },
      { 
        id: 'jsl', 
        name: 'Jaisalmer', 
        cx: 20, 
        cy: 50, 
        description: 'The Golden City',
        safety: { soloTraveler: 70, family: 85, senior: 75, lastVerified: '1d ago' },
        experiences: [
           { id: 'e4', userId: 'u4', userName: 'Sarah K.', userBadge: 'Pathbreaker', type: 'mirror_compare', content: 'I\'ve seen the Sahara, but the living fort of Jaisalmer rising from the dust is something else entirely. It feels like a fantasy novel.', districtId: 'jsl', locationName: 'Jaisalmer Fort', timestamp: '2d ago', helpfulCount: 230 }
        ],
        famousFoods: [
          {
            id: 'jsl_1',
            name: 'Ker Sangri',
            type: 'meal',
            legend: 'Desert berries and beans cooked with yogurt and spices.',
            famousShop: 'Desert Boy\'s Dhani',
            tasteProfile: ['tangy', 'spicy'],
            spiceLevel: 3,
            image: 'https://picsum.photos/seed/ker/200/200',
            recipe: {
               id: 'rec_ks',
               title: 'Ker Sangri Sabzi',
               ingredients: ['Ker berries', 'Sangri beans', 'Yogurt', 'Red Chillies'],
               steps: ['Soak beans overnight', 'Boil with salt', 'Cook spices in oil', 'Add beans and yogurt'],
               difficulty: 'Medium'
            }
          }
        ],
        language: {
            name: 'Marwari',
            scriptName: 'Devanagari',
            scriptSample: 'जैसलमेर',
            hello: { original: 'Ram Ram Sa', english: 'Hello (Respectful)', pronunciation: 'Ram Ram Sa' },
            cost: { original: 'Katra rupya?', english: 'How much money?', pronunciation: 'Ka-tra ru-pya' },
            help: { original: 'Madad', english: 'Help', pronunciation: 'Ma-dad' },
            thankYou: { original: 'Aabhar', english: 'Thank you', pronunciation: 'Aa-bhar' }
        },
        festivals: [
           { id: 'f2', name: 'Desert Festival', month: 'February', type: 'fair', iconType: 'camel', description: 'Camel races, turban tying, and folk music on the dunes.', bestTime: 'Feb 12-14' }
        ]
      },
      { 
        id: 'udp', 
        name: 'Udaipur', 
        cx: 50, 
        cy: 80, 
        description: 'City of Lakes',
        safety: { soloTraveler: 90, family: 98, senior: 95, lastVerified: '4h ago' },
        famousFoods: [
           {
            id: 'udp_1',
            name: 'Dal Baati Churma',
            type: 'meal',
            legend: 'The warrior\'s meal - baked wheat balls with spicy lentils.',
            famousShop: 'Krishna Dal Bati',
            tasteProfile: ['spicy', 'sweet', 'savory'],
            spiceLevel: 3,
            image: 'https://picsum.photos/seed/dalbati/200/200'
          }
        ],
        language: {
            name: 'Mewari',
            scriptName: 'Devanagari',
            scriptSample: 'उदयपुर',
            hello: { original: 'Jai Mewar', english: 'Hail Mewar (Greeting)', pronunciation: 'Jai May-war' },
            cost: { original: 'Kitro mulya hai?', english: 'What is the price?', pronunciation: 'Kit-ro mul-ya hai' },
            help: { original: 'Sahayata', english: 'Help', pronunciation: 'Sa-ha-ya-ta' },
            thankYou: { original: 'Dhanyavad', english: 'Thank you', pronunciation: 'Dhan-ya-vad' }
        }
      }
    ]
  },
  {
    id: 'kl',
    name: 'Kerala',
    nickname: 'God\'s Own Country',
    description: 'A tropical paradise of backwaters, tea gardens, and ancient Ayurveda traditions.',
    climate: 'Tropical / Wet',
    bestTime: 'September - March',
    landmarks: ['Alleppey Backwaters', 'Munnar', 'Varkala'],
    animType: 'rain',
    color: '#10B981', // Emerald
    path: 'M 180 400 L 200 410 L 210 460 L 190 480 L 170 450 L 180 400 Z',
    viewBox: '160 390 60 100',
    districts: [
      { 
        id: 'alp', 
        name: 'Alappuzha', 
        cx: 40, 
        cy: 50, 
        description: 'Backwater Haven',
        safety: { soloTraveler: 80, family: 90, senior: 80, lastVerified: '6h ago' },
        experiences: [
           { id: 'e5', userId: 'u5', userName: 'Priya M.', userBadge: 'Local Guru', type: 'tip', content: 'Skip the big houseboats. Hire a small \'Shikara\' for 3 hours at sunset. You can go into narrow canals where big boats can\'t.', districtId: 'alp', locationName: 'Punnamada Lake', timestamp: '12h ago', helpfulCount: 340 }
        ],
        famousFoods: [
          {
            id: 'alp_1',
            name: 'Karimeen Pollichathu',
            type: 'meal',
            legend: 'Pearl Spot fish marinated and baked in banana leaves.',
            famousShop: 'Kuttanad Shappu',
            tasteProfile: ['spicy', 'tangy'],
            spiceLevel: 5,
            image: 'https://picsum.photos/seed/fish/200/200',
            recipe: {
               id: 'rec_kp',
               title: 'Karimeen Pollichathu',
               ingredients: ['Pearl Spot Fish', 'Banana Leaf', 'Ginger Garlic Paste', 'Shallots'],
               steps: ['Marinate fish', 'Fry lightly', 'Make masala paste', 'Wrap fish in leaf with masala', 'Roast'],
               difficulty: 'Hard'
            }
          }
        ],
        artisanProducts: [
           {
             id: 'alp_a1',
             name: 'Coir Handicrafts',
             district: 'Alappuzha',
             type: 'Decor',
             price: 450,
             story: 'Weaving wonders from coconut husk fiber.',
             image: 'https://picsum.photos/seed/coir/300/300',
             giTag: true,
             makerName: 'Venu Nair',
             makerVerified: true,
             videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
             makerImage: 'https://randomuser.me/api/portraits/men/50.jpg'
           }
        ],
        language: {
            name: 'Malayalam',
            scriptName: 'Malayalam',
            scriptSample: 'ആലപ്പുഴ',
            hello: { original: 'Namaskaram', english: 'Hello', pronunciation: 'Na-mas-ka-ram' },
            cost: { original: 'Ethra roopa?', english: 'How much money?', pronunciation: 'Eth-ra roo-pa' },
            help: { original: 'Sahayikku', english: 'Help me', pronunciation: 'Sa-ha-yik-ku' },
            thankYou: { original: 'Nanni', english: 'Thank you', pronunciation: 'Nan-ni' }
        },
        festivals: [
           { id: 'f3', name: 'Nehru Trophy Boat Race', month: 'August', type: 'fair', iconType: 'boat', description: 'The famous Snake Boat races on Punnamada Lake.', bestTime: 'Second Saturday of Aug' }
        ]
      },
      { 
        id: 'mun', 
        name: 'Munnar', 
        cx: 70, 
        cy: 30, 
        description: 'Tea Hills',
        safety: { soloTraveler: 88, family: 92, senior: 70, lastVerified: '1w ago' },
        famousFoods: [
          {
            id: 'mun_1',
            name: 'Appam & Stew',
            type: 'meal',
            legend: 'Fluffy rice pancakes with mild coconut vegetable stew.',
            famousShop: 'Saravana Bhavan',
            tasteProfile: ['savory', 'sweet'],
            spiceLevel: 1,
            image: 'https://picsum.photos/seed/appam/200/200'
          }
        ],
        language: {
            name: 'Malayalam / Tamil',
            scriptName: 'Malayalam',
            scriptSample: 'മൂന്നാർ',
            hello: { original: 'Namaskaram', english: 'Hello', pronunciation: 'Na-mas-ka-ram' },
            cost: { original: 'Ithinu ethraya?', english: 'How much for this?', pronunciation: 'Ithi-nu eth-ra-ya' },
            help: { original: 'Sahayikku', english: 'Help', pronunciation: 'Sa-ha-yik-ku' },
            thankYou: { original: 'Nanni', english: 'Thank you', pronunciation: 'Nan-ni' }
        },
        knowledge: [
           {
             id: 'k3',
             title: 'Kalaripayattu',
             type: 'art',
             description: 'The Mother of all Martial Arts.',
             content: 'Originating in Kerala, it inspired Kung Fu. It combines combat training with Ayurveda and meditation.'
           },
           {
             id: 'k4',
             title: 'Ayurveda',
             type: 'science',
             description: 'The Science of Life.',
             content: 'Kerala is the hub of authentic Ayurveda, focusing on balance between Vata, Pitta, and Kapha.'
           }
        ],
        games: [
          { id: 'g2', name: 'Pallanguzhi', origin: 'South Bharat', description: 'A traditional mancala game played with seeds or shells to improve math skills.', type: 'strategy' }
        ]
      },
      { 
        id: 'koc', 
        name: 'Kochi', 
        cx: 30, 
        cy: 40, 
        description: 'Queen of Arabian Sea',
        safety: { soloTraveler: 85, family: 90, senior: 90, lastVerified: '3h ago' },
        famousFoods: [
          {
            id: 'koc_1',
            name: 'Puttu & Kadala',
            type: 'meal',
            legend: 'Steamed rice cylinders with black chickpea curry.',
            famousShop: 'Dhe Puttu',
            tasteProfile: ['savory', 'spicy'],
            spiceLevel: 3,
            image: 'https://picsum.photos/seed/puttu/200/200'
          }
        ],
        language: {
            name: 'Malayalam',
            scriptName: 'Malayalam',
            scriptSample: 'കൊച്ചി',
            hello: { original: 'Namaskaram', english: 'Hello', pronunciation: 'Na-mas-ka-ram' },
            cost: { original: 'Vela ethraya?', english: 'What is the price?', pronunciation: 'Ve-la eth-ra-ya' },
            help: { original: 'Sahayam venam', english: 'I need help', pronunciation: 'Sa-ha-yam ve-nam' },
            thankYou: { original: 'Nanni', english: 'Thank you', pronunciation: 'Nan-ni' }
        },
        festivals: [
          { id: 'f4', name: 'Cochin Carnival', month: 'December', type: 'fair', iconType: 'color', description: 'A vibrant parade reflecting the Portuguese and Dutch history.', bestTime: 'New Year' }
        ]
      }
    ]
  },
  {
    id: 'jk',
    name: 'Jammu & Kashmir',
    nickname: 'Paradise on Earth',
    description: 'Crown of Bharat. Snow-capped peaks, Dal Lake, and spiritual serenity.',
    climate: 'Alpine / Cold',
    bestTime: 'April - October',
    landmarks: ['Dal Lake', 'Gulmarg', 'Vaishno Devi'],
    animType: 'snow',
    color: '#60A5FA', // Blue
    path: 'M 180 60 L 220 40 L 260 60 L 240 100 L 200 110 L 180 60 Z',
    viewBox: '170 30 100 90',
    districts: [
      { 
        id: 'sgr', 
        name: 'Srinagar', 
        cx: 40, 
        cy: 60, 
        description: 'Summer Capital',
        safety: { soloTraveler: 75, family: 90, senior: 80, lastVerified: '5h ago' },
        famousFoods: [
           {
            id: 'sgr_1',
            name: 'Rogan Josh',
            type: 'meal',
            legend: 'Aromatic lamb curry introduced by the Mughals.',
            famousShop: 'Ahdoos',
            tasteProfile: ['spicy', 'savory'],
            spiceLevel: 4,
            image: 'https://picsum.photos/seed/rogan/200/200'
          },
          {
            id: 'sgr_2',
            name: 'Kahwa',
            type: 'beverage',
            legend: 'Saffron tea with almonds and cardamom to keep you warm.',
            famousShop: 'Chai Jaai',
            tasteProfile: ['sweet', 'savory'],
            spiceLevel: 0,
            image: 'https://picsum.photos/seed/kahwa/200/200'
          }
        ],
        artisanProducts: [
           {
             id: 'sgr_a1',
             name: 'Pashmina Shawl',
             district: 'Srinagar',
             type: 'Clothing',
             price: 12000,
             story: 'Soft wool from the Changthangi goat, woven by hand.',
             image: 'https://picsum.photos/seed/pashmina/300/300',
             giTag: true,
             makerName: 'Gulzar Ahmed',
             makerVerified: true,
             videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
             makerImage: 'https://randomuser.me/api/portraits/men/60.jpg'
           }
        ],
        language: {
            name: 'Kashmiri (Koshur)',
            scriptName: 'Perso-Arabic',
            scriptSample: 'سري نگر',
            hello: { original: 'Adaab / Salaam', english: 'Hello', pronunciation: 'A-daab' },
            cost: { original: 'Yi katsas chhu?', english: 'How much is this?', pronunciation: 'Yi kat-sas chhu' },
            help: { original: 'Madath', english: 'Help', pronunciation: 'Ma-dath' },
            thankYou: { original: 'Shukriya', english: 'Thank you', pronunciation: 'Shuk-ri-ya' }
        },
        festivals: [
          { id: 'f5', name: 'Tulip Festival', month: 'April', type: 'art', iconType: 'color', description: 'Asia’s largest Tulip Garden comes alive in full bloom.', bestTime: 'April 1-15' }
        ]
      },
      { 
        id: 'leh', 
        name: 'Leh', 
        cx: 80, 
        cy: 40, 
        description: 'High Desert',
        permitRequired: true,
        safety: { soloTraveler: 90, family: 85, senior: 60, lastVerified: '3d ago' },
        famousFoods: [
          {
            id: 'leh_1',
            name: 'Thukpa',
            type: 'meal',
            legend: 'Tibetan noodle soup perfect for cold nights.',
            famousShop: 'The Tibetan Kitchen',
            tasteProfile: ['savory', 'spicy'],
            spiceLevel: 2,
            image: 'https://picsum.photos/seed/thukpa/200/200'
          }
        ],
        language: {
            name: 'Ladakhi (Bhoti)',
            scriptName: 'Tibetan',
            scriptSample: 'གླེ་',
            hello: { original: 'Julley', english: 'Hello/Goodbye', pronunciation: 'Joo-lay' },
            cost: { original: 'Gomo tsam in?', english: 'How much?', pronunciation: 'Go-mo tsam in' },
            help: { original: 'Rog ram', english: 'Help', pronunciation: 'Rog-ram' },
            thankYou: { original: 'Thuk je che', english: 'Thank you', pronunciation: 'Thuk-jay-chay' }
        },
        festivals: [
          { id: 'f6', name: 'Hemis Festival', month: 'June', type: 'temple', iconType: 'bell', description: 'Masked dances celebrating the birth of Guru Padmasambhava.', bestTime: 'Late June' }
        ]
      },
      { 
        id: 'gul', 
        name: 'Gulmarg', 
        cx: 20, 
        cy: 50, 
        description: 'Skiing Hub',
        famousFoods: [],
        language: {
            name: 'Kashmiri',
            scriptName: 'Perso-Arabic',
            scriptSample: 'گلمرگ',
            hello: { original: 'Salaam', english: 'Hello', pronunciation: 'Sa-laam' },
            cost: { original: 'Katsas?', english: 'How much?', pronunciation: 'Kat-sas' },
            help: { original: 'Madad', english: 'Help', pronunciation: 'Ma-dath' },
            thankYou: { original: 'Shukriya', english: 'Thank you', pronunciation: 'Shuk-ri-ya' }
        }
      }
    ]
  }
];