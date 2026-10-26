// Shoe Catalog Data
const PRODUCTS = [
  {
    id: 1,
    name: "Air Max Pulse Inferno",
    brand: "Nike",
    category: "running",
    gender: "men",
    price: 179,
    originalPrice: 219,
    rating: 4.9,
    reviewsCount: 184,
    badge: "Trending 🔥",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    description: "Engineered with double-press air cushioning and high-tensile mesh upper. Delivers ultimate energy return for both street dominance and marathon velocity.",
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: [
      { name: "Crimson Red", hex: "#ef4444" },
      { name: "Stealth Black", hex: "#111827" },
      { name: "Ghost White", hex: "#f3f4f6" }
    ],
    features: ["Dual-pressure Air Sole", "Breathable Engineered Mesh", "Reflective 3M Accents", "Carbon Composite Shank"],
    inStock: true
  },
  {
    id: 2,
    name: "Jordan Retro 1 High OG",
    brand: "Jordan",
    category: "basketball",
    gender: "unisex",
    price: 195,
    originalPrice: 235,
    rating: 4.95,
    reviewsCount: 312,
    badge: "Bestseller ⭐",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80",
    description: "The silhouette that reshaped sneaker culture. Premium full-grain tumbled leather paired with authentic court traction and encapsulated air shock absorption.",
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: [
      { name: "Chicago Red & White", hex: "#b91c1c" },
      { name: "Royal Obsidian", hex: "#1e3a8a" },
      { name: "Shadow Grey", hex: "#4b5563" }
    ],
    features: ["Genuine Tumbled Leather", "High-top Padded Collar", "Encapsulated Nike Air Unit", "Pivot Circle Traction"],
    inStock: true
  },
  {
    id: 3,
    name: "Ultraboost Light Speed",
    brand: "Adidas",
    category: "running",
    gender: "women",
    price: 165,
    originalPrice: 190,
    rating: 4.8,
    reviewsCount: 145,
    badge: "New Release ⚡",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
    description: "Experience 30% lighter Boost material for explosive energy turnover. Continental™ natural rubber outsole provides razor-sharp wet and dry grip.",
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
    colors: [
      { name: "Solar Neon Pink", hex: "#ec4899" },
      { name: "Cloud White", hex: "#f9fafb" },
      { name: "Core Black", hex: "#1f2937" }
    ],
    features: ["Light Boost Pellet Midsole", "Primeknit+ Sock Fit", "Linear Energy Push System", "Continental™ Rubber Grip"],
    inStock: true
  },
  {
    id: 4,
    name: "NB 990v5 Heritage Craft",
    brand: "New Balance",
    category: "streetwear",
    gender: "unisex",
    price: 185,
    originalPrice: 210,
    rating: 4.85,
    reviewsCount: 98,
    badge: "Limited Drop 💎",
    badgeType: "limited",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
    description: "Timeless grey suede meets ENCAP midsole technology. The quintessential dad-shoe elevated to luxury streetwear royalty with unmatched all-day comfort.",
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11],
    colors: [
      { name: "Heritage Castlerock", hex: "#6b7280" },
      { name: "Navy Classic", hex: "#1e3a5f" }
    ],
    features: ["Pigskin Suede & Mesh", "ENCAP Midsole Cushioning", "Ortholite Premium Insole", "Blown Rubber Outsole"],
    inStock: true
  },
  {
    id: 5,
    name: "Off-Grid Street Zoom",
    brand: "Nike",
    category: "streetwear",
    gender: "men",
    price: 210,
    originalPrice: 260,
    rating: 4.9,
    reviewsCount: 167,
    badge: "Sale -20% 🏷️",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=80",
    description: "Deconstructed architectural design with industrial zip-tie aesthetics, translucent mesh paneling, and an oversized lugged midsole.",
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: [
      { name: "Sail Bone", hex: "#f3ede2" },
      { name: "Industrial Volt", hex: "#84cc16" },
      { name: "Midnight Onyx", hex: "#0f172a" }
    ],
    features: ["Deconstructed Upper", "ZoomX Kinetic Foam", "Multi-surface Lug Pattern", "Padded Gusseted Tongue"],
    inStock: true
  },
  {
    id: 6,
    name: "RS-X Cybernetic Nitro",
    brand: "Puma",
    category: "lifestyle",
    gender: "women",
    price: 135,
    originalPrice: 160,
    rating: 4.75,
    reviewsCount: 88,
    badge: "Hot Pick 🔥",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    description: "Retro-future chunky sneaker packed with bold geometric color blocking and Nitro foam injection for plush shock absorption.",
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
    colors: [
      { name: "Cyberpunk Glow", hex: "#06b6d4" },
      { name: "Triple Black", hex: "#0a0a0a" },
      { name: "Coral Sunset", hex: "#f43f5e" }
    ],
    features: ["Chunky RS Silhouette", "Nitro Infused Midsole", "Layered Nubuck & Suede", "TPU Heel Clip Support"],
    inStock: true
  },
  {
    id: 7,
    name: "Dunk Low Pastel Prism",
    brand: "Nike",
    category: "lifestyle",
    gender: "women",
    price: 140,
    originalPrice: 175,
    rating: 4.88,
    reviewsCount: 220,
    badge: "Bestseller ⭐",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    description: "Playful pastel multi-tones over smooth premium leather. A versatile icon tailored for casual elegance and statement street fashion.",
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
    colors: [
      { name: "Pastel Sorbet", hex: "#a78bfa" },
      { name: "Mint Breeze", hex: "#6ee7b7" },
      { name: "Pale Ivory", hex: "#fef3c7" }
    ],
    features: ["Supple Leather Paneling", "Low-cut Padded Collar", "Foam Insole Cushioning", "Durable Rubber Cupsole"],
    inStock: true
  },
  {
    id: 8,
    name: "Stealth Void Phantom",
    brand: "Salomon",
    category: "streetwear",
    gender: "men",
    price: 225,
    originalPrice: 250,
    rating: 4.92,
    reviewsCount: 76,
    badge: "Limited Drop 💎",
    badgeType: "limited",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    description: "Blackout technical footwear designed for technical trail runs and high-fashion gorpcore enthusiasts. Quicklace system with GORE-TEX waterproof shell.",
    sizes: [8, 8.5, 9, 9.5, 10, 11, 12],
    colors: [
      { name: "Phantom Black", hex: "#18181b" },
      { name: "Dark Olive Slate", hex: "#3f4f34" }
    ],
    features: ["GORE-TEX Weatherproofing", "Quicklace™ One-pull Tightening", "Contagrip® Mud Traction", "Agile Chassis System"],
    inStock: true
  },
  {
    id: 9,
    name: "Gel-Kayano 14 Metallic",
    brand: "Asics",
    category: "running",
    gender: "unisex",
    price: 170,
    originalPrice: 195,
    rating: 4.87,
    reviewsCount: 119,
    badge: "Trending 🔥",
    badgeType: "trending",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80",
    description: "Y2K running aesthetics revived. Featuring signature GEL cushioning pods in the forefoot and rearfoot for maximum impact deflection.",
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: [
      { name: "Emerald & Silver", hex: "#10b981" },
      { name: "Pure Silver Metallic", hex: "#9ca3af" }
    ],
    features: ["Signature Visible GEL Pods", "TRUSSTIC System Stability", "Open Mesh Breathability", "Y2K Metallic Overlays"],
    inStock: true
  },
  {
    id: 10,
    name: "Skate Vintage Old School",
    brand: "Vans",
    category: "lifestyle",
    gender: "unisex",
    price: 85,
    originalPrice: 105,
    rating: 4.7,
    reviewsCount: 290,
    badge: "Sale -20% 🏷️",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80",
    description: "The indestructible skate park icon. Reinforced canvas & suede sidewalls with vulcanized waffle outsole for pristine board feel.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: [
      { name: "Mustard Gold", hex: "#d97706" },
      { name: "True Black", hex: "#18181b" },
      { name: "Navy Blue", hex: "#1e3a8a" }
    ],
    features: ["Reinforced DURACAP Underlays", "PopCush Impact Cushions", "Original Waffle Sole", "Suede & Heavy Canvas"],
    inStock: true
  },
  {
    id: 11,
    name: "Terrascope Mountain X",
    brand: "Salomon",
    category: "running",
    gender: "men",
    price: 199,
    originalPrice: 230,
    rating: 4.84,
    reviewsCount: 64,
    badge: "New Release ⚡",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
    description: "Rugged high-mileage mountain runner crafted with dynamic color-blocking, reinforced toe caps, and all-weather mud shedding cleats.",
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: [
      { name: "Alpine Multi-Color", hex: "#0284c7" },
      { name: "Forest Camo", hex: "#365314" }
    ],
    features: ["Energy Surge Foam", "Reinforced Protective Mudguard", "SensiFit Midfoot Cradling", "Anti-debris Mesh"],
    inStock: true
  },
  {
    id: 12,
    name: "Court Minimalist Nubuck",
    brand: "Adidas",
    category: "lifestyle",
    gender: "unisex",
    price: 120,
    originalPrice: 145,
    rating: 4.79,
    reviewsCount: 153,
    badge: "Bestseller ⭐",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&auto=format&fit=crop&q=80",
    description: "Clean minimalist design with earthy tan nubuck. Effortlessly pairs with tailored trousers, selvedge denim, or modern streetwear.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 11],
    colors: [
      { name: "Raw Desert Tan", hex: "#d4a373" },
      { name: "Chalk White", hex: "#f4f1ea" }
    ],
    features: ["Velvety Nubuck Leather", "Subtle Perforated 3-Stripes", "Padded Ortholite Sockliner", "Gum Rubber Outsole"],
    inStock: true
  }
];

// Available coupon codes
const PROMO_CODES = {
  "SNEAKER20": { discountPercent: 20, description: "20% Off Your Entire Order" },
  "KICK10": { discountPercent: 10, description: "10% Welcome Discount" },
  "FREESHIP": { freeShipping: true, description: "Free Express Shipping" }
};
