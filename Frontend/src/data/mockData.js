import imgTee from '../assets/CrazyDeals/CrazyDeals2.jpg';
import imgNecklace from '../assets/CrazyDeals/CrazyDeals3.jpg';
import imgWatch from '../assets/CrazyDeals/CrazyDeals4.jpg';
import imgTint from '../assets/CrazyDeals/CrazyDeals5.jpg';

export const CATEGORIES = [
  { id: 'for-you', name: 'For You', icon: 'ShoppingBag' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles' },
  { id: 'gifting', name: 'Gifting', icon: 'Gift' },
  { id: 'electronics', name: 'Electronics', icon: 'Monitor' },
  { id: 'jewellery', name: 'Jewellery', icon: 'Gem' },
  { id: 'toys', name: 'Toys', icon: 'Gamepad2' },
  { id: 'stationery', name: 'Stationery', icon: 'PenTool' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'electrical', name: 'Electrical', icon: 'Zap' },
];

export const BANNERS = [
  {
    id: 1,
    title: "NOT JUST A GIFT,",
    subtitle: "IT'S A FEELING 💖",
    desc: "Surprise. Smile. Repeat.",
    cta: "SHOP NOW",
    bg: "bg-amber-50/80 border-amber-100",
    textColor: "text-amber-950",
    image: "hero",
  },
  {
    id: 2,
    title: "TODAY'S SPECIAL",
    subtitle: "CRAZY DEALS 🔥",
    desc: "Up to 50% off on premium items.",
    cta: "EXPLORE NOW",
    bg: "bg-orange-50/80 border-orange-100",
    textColor: "text-orange-950",
    image: "deals",
  }
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
    name: 'Oversized Tee',
    discount: '-40%',
    price: 599,
    originalPrice: 999,
    rating: 4.8,
    type: 'tee',
    image: imgTee,
    desc: 'Vintage oversized comfort fit raglan tee'
  },
  {
    id: 'deal-2',
    name: 'Layered Necklace',
    discount: '-30%',
    price: 699,
    originalPrice: 999,
    rating: 4.5,
    type: 'necklace',
    image: imgNecklace,
    desc: 'Elegant gold plated multi-layer charm necklace'
  },
  {
    id: 'deal-3',
    name: 'Vintage Watch',
    discount: '-50%',
    price: 1499,
    originalPrice: 2999,
    rating: 4.9,
    type: 'watch',
    image: imgWatch,
    desc: 'Classic luxury gold chain wristwatch & bracelet set'
  },
  {
    id: 'deal-4',
    name: 'Benetint Lip Tint',
    discount: '-35%',
    price: 1299,
    originalPrice: 1999,
    rating: 4.7,
    type: 'tint',
    image: imgTint,
    desc: 'Iconic rose-tinted liquid lip & cheek stain'
  }
];

export const PLAY_AND_WIN = [
  {
    id: 'game-1',
    name: 'Spin & Win',
    desc: 'Win Coins Daily',
    icon: 'Compass',
    color: 'bg-rose-50 text-rose-500 border-rose-100',
    hoverColor: 'hover:bg-rose-100 hover:border-rose-200'
  },
  {
    id: 'game-2',
    name: 'Daily Quiz',
    desc: 'Test Your Brain',
    icon: 'HelpCircle',
    color: 'bg-orange-50 text-orange-500 border-orange-100',
    hoverColor: 'hover:bg-orange-100 hover:border-orange-200'
  },
  {
    id: 'game-3',
    name: 'Scratch Card',
    desc: 'Scratch & Earn',
    icon: 'Layers',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    hoverColor: 'hover:bg-amber-100 hover:border-amber-200'
  },
  {
    id: 'game-4',
    name: 'Treasure Hunt',
    desc: 'Find & Win',
    icon: 'MapPin',
    color: 'bg-sky-50 text-sky-500 border-sky-100',
    hoverColor: 'hover:bg-sky-100 hover:border-sky-200'
  }
];
