export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  sizes: string[];
  colors: string[];
  badge?: string;
  isActive?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Apex Racer Pro",
    brand: "SpeedForce",
    category: "Men",
    price: 10799,
    rating: 4.8,
    reviews: 234,
    image: "/assets/generated/shoe-mens-1.dim_400x400.jpg",
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Black", "Orange"],
  },
  {
    id: 2,
    name: "Court Dominator X",
    brand: "AirStrike",
    category: "Men",
    price: 12449,
    rating: 4.6,
    reviews: 189,
    image: "/assets/generated/shoe-mens-2.dim_400x400.jpg",
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Red", "Black"],
  },
  {
    id: 3,
    name: "Velocity Max",
    brand: "SpeedForce",
    category: "Men",
    price: 9129,
    rating: 4.7,
    reviews: 312,
    image: "/assets/generated/shoe-mens-3.dim_400x400.jpg",
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Gray", "Green"],
  },
  {
    id: 4,
    name: "FlexFlow Trainer",
    brand: "LunaFit",
    category: "Women",
    price: 9959,
    rating: 4.9,
    reviews: 421,
    image: "/assets/generated/shoe-womens-1.dim_400x400.jpg",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["White", "Pink"],
  },
  {
    id: 5,
    name: "Grace Runner",
    brand: "LunaFit",
    category: "Women",
    price: 8299,
    rating: 4.5,
    reviews: 156,
    image: "/assets/generated/shoe-womens-2.dim_400x400.jpg",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Rose Gold", "White"],
  },
  {
    id: 6,
    name: "Urban Glide",
    brand: "StreetKing",
    category: "Lifestyle",
    price: 7469,
    rating: 4.4,
    reviews: 98,
    image: "/assets/generated/shoe-lifestyle-1.dim_400x400.jpg",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White"],
  },
  {
    id: 7,
    name: "KidSprint Jr.",
    brand: "SpeedForce",
    category: "Kids",
    price: 5809,
    rating: 4.8,
    reviews: 203,
    image: "/assets/generated/shoe-kids-1.dim_400x400.jpg",
    sizes: ["3", "4", "5", "6", "7"],
    colors: ["Blue", "Yellow"],
  },
  {
    id: 8,
    name: "Turbo Lite Elite",
    brand: "AirStrike",
    category: "Sale",
    price: 6639,
    rating: 4.3,
    reviews: 67,
    image: "/assets/generated/shoe-mens-1.dim_400x400.jpg",
    sizes: ["8", "9", "10", "11"],
    colors: ["Black"],
  },
];

export const categories = [
  "NEW ARRIVALS",
  "MEN",
  "WOMEN",
  "KIDS",
  "SALE",
  "BRANDS",
];
export const brands = ["SpeedForce", "AirStrike", "LunaFit", "StreetKing"];
