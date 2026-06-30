export const CATEGORIES = [
  { id: 'for-you', name: 'For You', icon: 'Crosshair', image: null },
  { id: 'uniforms', name: 'Uniforms', icon: 'Shirt', image: 'https://via.placeholder.com/150/4B5320/FFFFFF?text=Uniforms' },
  { id: 'tactical-gear', name: 'Tactical Gear', icon: 'ShieldCheck', image: 'https://via.placeholder.com/150/4B5320/FFFFFF?text=Tactical' },
  { id: 'footwear', name: 'Footwear', icon: 'Activity', image: 'https://via.placeholder.com/150/4B5320/FFFFFF?text=Footwear' },
  { id: 'headgear', name: 'Headgear', icon: 'User', image: 'https://via.placeholder.com/150/4B5320/FFFFFF?text=Headgear' },
  { id: 'badges', name: 'Badges', icon: 'Award', image: 'https://via.placeholder.com/150/4B5320/FFFFFF?text=Badges' },
  { id: 'survival', name: 'Survival', icon: 'Compass', image: 'https://via.placeholder.com/150/4B5320/FFFFFF?text=Survival' },
  { id: 'accessories', name: 'Accessories', icon: 'Package', image: 'https://via.placeholder.com/150/4B5320/FFFFFF?text=Accessories' },
];

export const BANNERS = [
  { id: 1, isMockGradient: true, text: "LAKSHYA EXCLUSIVE\nPremium Gear" },
  { id: 2, isMockGradient: true, text: "NEW ARRIVALS\nTactical Equipment" },
  { id: 3, isMockGradient: true, text: "DISCOUNT ZONE\nUp to 50% Off" }
];

export const VALUE_PROPS = [
  { id: 1, title: "Free Delivery", desc: "No min. order", icon: "Truck" },
  { id: 2, title: "Easy Returns", desc: "7 days easy", icon: "RotateCcw" },
  { id: 3, title: "Secure Payment", desc: "100% safe", icon: "ShieldCheck" },
  { id: 4, title: "Best Price", desc: "Promise", icon: "Award" },
];

export const CRAZY_DEALS = [
  {
    id: 'deal-1',
    name: 'Tactical Combat Boots',
    discount: '-20%',
    price: 2499,
    originalPrice: 3199,
    rating: 4.8,
    type: 'footwear',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Combat+Boots',
    desc: 'Durable, waterproof tactical boots for rugged terrain.'
  },
  {
    id: 'deal-2',
    name: 'Camo Field Jacket',
    discount: '-30%',
    price: 1899,
    originalPrice: 2799,
    rating: 4.9,
    type: 'uniform',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Camo+Jacket',
    desc: 'Standard issue camouflage jacket with multiple utility pockets.'
  },
  {
    id: 'deal-3',
    name: 'Heavy Duty Rucksack',
    discount: '-15%',
    price: 3299,
    originalPrice: 3899,
    rating: 4.7,
    type: 'gear',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Rucksack',
    desc: '50L military-grade rucksack with hydration pack compatibility.'
  },
  {
    id: 'deal-4',
    name: 'Military Compass',
    discount: '-40%',
    price: 599,
    originalPrice: 999,
    rating: 4.5,
    type: 'survival',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Compass',
    desc: 'Lensatic tactical compass for land navigation.'
  },
  {
    id: 'deal-5',
    name: 'Officer Peak Cap',
    discount: '-10%',
    price: 899,
    originalPrice: 999,
    rating: 4.8,
    type: 'headgear',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Peak+Cap',
    desc: 'Official uniform peak cap with insignia.'
  },
  {
    id: 'deal-6',
    name: 'Tactical Gloves',
    discount: '-25%',
    price: 699,
    originalPrice: 949,
    rating: 4.6,
    type: 'accessories',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Gloves',
    desc: 'Hard-knuckle protective tactical gloves.'
  },
  {
    id: 'deal-7',
    name: 'Survival Paracord',
    discount: '-50%',
    price: 299,
    originalPrice: 599,
    rating: 4.9,
    type: 'survival',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Paracord',
    desc: '100ft heavy-duty 550 paracord.'
  },
  {
    id: 'deal-8',
    name: 'Rank Epaulettes',
    discount: '-15%',
    price: 399,
    originalPrice: 469,
    rating: 4.7,
    type: 'badges',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Epaulettes',
    desc: 'Standard officer rank epaulettes (Pair).'
  },
  {
    id: 'deal-9',
    name: 'Army T-Shirt',
    discount: '-20%',
    price: 499,
    originalPrice: 629,
    rating: 4.8,
    type: 'uniform',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Army+Tee',
    desc: 'Olive green breathable cotton t-shirt.'
  },
  {
    id: 'deal-10',
    name: 'Tactical Flashlight',
    discount: '-30%',
    price: 899,
    originalPrice: 1299,
    rating: 4.6,
    type: 'gear',
    image: 'https://via.placeholder.com/400/4B5320/FFFFFF?text=Flashlight',
    desc: 'High-lumen waterproof tactical LED flashlight.'
  }
];

export const NOTIFICATIONS = [
  {
    id: 1,
    title: "Order Delivered!",
    message: "Your order for Tactical Combat Boots has been delivered successfully.",
    time: "2 hours ago",
    read: false,
    type: "order"
  },
  {
    id: 2,
    title: "New Arrivals Alert 🔥",
    message: "Fresh stock of winter tactical gear has arrived. Shop now!",
    time: "5 hours ago",
    read: false,
    type: "promo"
  },
  {
    id: 3,
    title: "Price Drop on your Wishlist",
    message: "Heavy Duty Rucksack is now available at 15% off.",
    time: "1 day ago",
    read: true,
    type: "wishlist"
  }
];
