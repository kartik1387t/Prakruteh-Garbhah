import { MirrorLocation, ArtisanProduct } from './types';

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

export const ARTISAN_PRODUCTS: ArtisanProduct[] = [
  {
    id: 'a1',
    name: 'Pashmina Shawl',
    district: 'Kashmir',
    type: 'Clothing',
    price: 5500,
    story: 'Hand-woven by families for generations in the high Himalayas.',
    image: 'https://picsum.photos/id/22/300/300',
    giTag: true
  },
  {
    id: 'a2',
    name: 'Blue Pottery',
    district: 'Jaipur',
    type: 'Home Decor',
    price: 1200,
    story: 'Turquoise glazed pottery using a unique Egyptian paste technique.',
    image: 'https://picsum.photos/id/24/300/300',
    giTag: true
  },
  {
    id: 'a3',
    name: 'Channapatna Toys',
    district: 'Karnataka',
    type: 'Toys',
    price: 800,
    story: 'Eco-friendly wooden toys colored with natural vegetable dyes.',
    image: 'https://picsum.photos/id/26/300/300',
    giTag: true
  }
];

export const SEASONS = {
  spring: { color: 'text-green-400', bg: 'from-green-900 to-cosmos', icon: '🌸' },
  summer: { color: 'text-yellow-400', bg: 'from-orange-900 to-cosmos', icon: '☀️' },
  monsoon: { color: 'text-blue-400', bg: 'from-blue-900 to-cosmos', icon: '🌧️' },
  autumn: { color: 'text-red-400', bg: 'from-red-900 to-cosmos', icon: '🍂' },
  winter: { color: 'text-white', bg: 'from-gray-800 to-cosmos', icon: '❄️' },
};