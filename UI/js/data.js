/**
 * Nexora E-Commerce Mock Data Store
 * Realistic Indian E-commerce catalog inspired by Flipkart, Amazon, Myntra & Meesho
 * All original illustrations, brands, and copyright-free assets
 */

export const CATEGORIES = [
  {
    id: 'mobiles',
    name: 'Mobiles & Tech',
    icon: 'smartphone',
    discount: 'Up to 45% Off',
    subcategories: [
      { name: 'Flagship Smartphones', link: '#category' },
      { name: 'Budget 5G Phones', link: '#category' },
      { name: 'Tablets & iPads', link: '#category' },
      { name: 'Smartwatches & Bands', link: '#category' },
      { name: 'Power Banks & Cables', link: '#category' }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    icon: 'shirt',
    discount: 'Min 50% Off',
    subcategories: [
      { name: "Men's Casual Shirts", link: '#category' },
      { name: "Women's Kurtas & Sarees", link: '#category' },
      { name: 'Athleisure & Joggers', link: '#category' },
      { name: 'Footwear & Sneakers', link: '#category' },
      { name: 'Handbags & Backpacks', link: '#category' }
    ]
  },
  {
    id: 'electronics',
    name: 'Audio & Gadgets',
    icon: 'headphones',
    discount: 'Up to 70% Off',
    subcategories: [
      { name: 'Active Noise Cancelling', link: '#category' },
      { name: 'True Wireless Earbuds', link: '#category' },
      { name: 'Bluetooth Soundbars', link: '#category' },
      { name: 'Gaming Peripherals', link: '#category' },
      { name: 'DSLR & Vlogging Mics', link: '#category' }
    ]
  },
  {
    id: 'appliances',
    name: 'Appliances',
    icon: 'tv',
    discount: 'Up to 55% Off',
    subcategories: [
      { name: '4K Smart OLED TVs', link: '#category' },
      { name: 'Inverter Air Conditioners', link: '#category' },
      { name: 'Front Load Washers', link: '#category' },
      { name: 'Double Door Refrigerators', link: '#category' },
      { name: 'Microwaves & Ovens', link: '#category' }
    ]
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    icon: 'home',
    discount: 'Up to 60% Off',
    subcategories: [
      { name: 'Ergonomic Work Chairs', link: '#category' },
      { name: 'Cookware & Non-Stick Sets', link: '#category' },
      { name: 'Bedding & Pure Cotton Sets', link: '#category' },
      { name: 'Smart Ambient Lighting', link: '#category' },
      { name: 'Wall Decor & Clocks', link: '#category' }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Grooming',
    icon: 'sparkles',
    discount: 'Buy 1 Get 1 Free',
    subcategories: [
      { name: 'Organic Skincare Serums', link: '#category' },
      { name: 'Luxury Perfumes & Mist', link: '#category' },
      { name: 'Hair Straighteners & Dryers', link: '#category' },
      { name: "Men's Beard Care Kits", link: '#category' },
      { name: 'Sun protection SPF 50', link: '#category' }
    ]
  },
  {
    id: 'grocery',
    name: 'Supermarket',
    icon: 'shopping-bag',
    discount: 'Flat ₹100 Off',
    subcategories: [
      { name: 'Organic Dry Fruits & Nuts', link: '#category' },
      { name: 'Cold Pressed Edible Oils', link: '#category' },
      { name: 'Artisan Indian Spices', link: '#category' },
      { name: 'Breakfast Cereals & Oats', link: '#category' },
      { name: 'Beverages & Green Tea', link: '#category' }
    ]
  }
];

export const PRODUCTS = [
  {
    id: 'nx-prod-101',
    title: 'AuraWave SoundPro ANC Wireless Over-Ear Headphones (40h Battery, Dual Pairing)',
    brand: 'AuraWave',
    category: 'electronics',
    rating: 4.6,
    ratingCount: 18450,
    reviewCount: 3240,
    price: 3499,
    mrp: 9999,
    discount: 65,
    assured: true,
    bestseller: true,
    flashDeal: true,
    inStock: true,
    stockLeft: 7,
    deliveryDays: 'Tomorrow, 8 PM',
    colors: ['#0f172a', '#e2e8f0', '#1e3a8a'],
    colorNames: ['Midnight Obsidian', 'Arctic White', 'Royal Indigo'],
    sizes: ['Standard Fit'],
    specs: {
      'Driver Size': '40mm Neodymium Titanium Drivers',
      'Battery Life': 'Up to 40 Hours with ANC On (60h ANC Off)',
      'Charging Time': '10 min quick charge for 5 hours playback (Type-C)',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm AUX Cable included',
      'Warranty': '1 Year Domestic Replacement Warranty'
    },
    highlights: [
      'Industry-leading Hybrid Active Noise Cancellation up to 38dB',
      'Custom tuned 40mm dynamic drivers for rich punchy Indian bass',
      'Multi-point connection allows seamless switching between laptop and smartphone',
      'Ergonomic memory foam ear cushions with cooling protein leather',
      'Voice Assistant support (Siri, Google Assistant)'
    ],
    description: 'Experience studio-grade acoustics tuned specifically for audiophiles and working professionals. The AuraWave SoundPro combines advanced hybrid noise cancelling algorithms with 40mm titanium diaphragm drivers to deliver ultra-crisp highs and profound bass extension.',
    images: [
      'headphone-1',
      'headphone-2',
      'headphone-3',
      'headphone-4'
    ]
  },
  {
    id: 'nx-prod-102',
    title: 'Veloce 5G Ultra Pro Smartphone (12GB RAM, 256GB Storage, 120Hz AMOLED, 68W Dart Charge)',
    brand: 'Veloce',
    category: 'mobiles',
    rating: 4.5,
    ratingCount: 29840,
    reviewCount: 5120,
    price: 24999,
    mrp: 32999,
    discount: 24,
    assured: true,
    bestseller: true,
    flashDeal: false,
    inStock: true,
    stockLeft: 12,
    deliveryDays: 'Tomorrow, 11 AM',
    colors: ['#1e293b', '#059669', '#3b82f6'],
    colorNames: ['Cosmic Graphite', 'Emerald Forest', 'Skyline Blue'],
    sizes: ['128GB Storage', '256GB Storage', '512GB Storage'],
    specs: {
      'Display': '6.78-inch FHD+ 120Hz Curved AMOLED with HDR10+',
      'Processor': 'Octa-core 4nm Flagship 5G Chipset',
      'Rear Camera': '108MP OIS Primary + 13MP Ultra-wide + 2MP Macro',
      'Front Camera': '32MP AI Portrait Selfie',
      'Battery': '5000 mAh with 68W Fast Charger in box'
    },
    highlights: [
      '108MP Flagship Sensor with Optical Image Stabilization for shake-free night photos',
      'Curved 120Hz AMOLED panel with 1600 nits peak outdoor brightness',
      'Dual stereo speakers certified by Dolby Atmos audio',
      'Clean OS with zero bloatware and 3 years of promised Android OS upgrades'
    ],
    description: 'The Veloce 5G Ultra Pro redefines premium smartphone experiences with its featherlight ergonomic chassis, vibrant 120Hz curved AMOLED panel, and blazing 68W charging that hits 60% in just 18 minutes.',
    images: ['phone-1', 'phone-2', 'phone-3', 'phone-4']
  },
  {
    id: 'nx-prod-103',
    title: 'UrbanWeave Premium Pure Cotton Casual Oxford Shirt with Breathable Weave',
    brand: 'UrbanWeave',
    category: 'fashion',
    rating: 4.4,
    ratingCount: 8940,
    reviewCount: 940,
    price: 899,
    mrp: 2499,
    discount: 64,
    assured: true,
    bestseller: false,
    flashDeal: true,
    inStock: true,
    stockLeft: 22,
    deliveryDays: '2 Days Express',
    colors: ['#1e40af', '#ffffff', '#e2e8f0'],
    colorNames: ['Classic Navy', 'Crisp White', 'Silver Mist'],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    specs: {
      'Fabric': '100% Combed Premium Long-Staple Cotton',
      'Fit': 'Contemporary Slim Fit',
      'Collar': 'Button-Down Oxford Collar',
      'Wash Care': 'Gentle Machine Wash in cold water'
    },
    highlights: [
      'High-grade pre-shrunk cotton that stays crisp throughout workday commutes',
      'Reinforced gusset stitching for durable longevity',
      'Mother of pearl styled resilient buttons',
      'Breathable weave ideal for warm and humid tropical climates'
    ],
    description: 'Engineered for versatility from Monday boardroom presentations to weekend casual brunches, the UrbanWeave Oxford Shirt features a structured weave that drapes naturally without wrinkling easily.',
    images: ['shirt-1', 'shirt-2', 'shirt-3']
  },
  {
    id: 'nx-prod-104',
    title: 'ErgoForm SpineAlign High-Back Mesh Ergonomic Office Chair with 3D Armrests',
    brand: 'ErgoForm',
    category: 'home',
    rating: 4.7,
    ratingCount: 5210,
    reviewCount: 880,
    price: 9499,
    mrp: 18999,
    discount: 50,
    assured: true,
    bestseller: true,
    flashDeal: false,
    inStock: true,
    stockLeft: 5,
    deliveryDays: '3 Days Express',
    colors: ['#0f172a', '#475569'],
    colorNames: ['Deep Onyx', 'Slate Carbon'],
    sizes: ['Standard High-Back'],
    specs: {
      'Mechanism': 'Multi-angle Synchronous Tilt Lock (90° - 135°)',
      'Gas Lift': 'Class 4 BIFMA Certified Heavy Duty Cylinder',
      'Weight Capacity': 'Tested for up to 140 kg',
      'Castors': '60mm Smooth-rolling PU Castors (Floor-safe)'
    },
    highlights: [
      'Dynamic lumbar support automatically adapts to the curvature of your lower spine',
      'Korea-imported high tensile mesh for optimal airflow during 10+ hour sessions',
      '3D adjustable armrests (Height, Angle, and Fore-Aft slide)',
      '3 Years Comprehensive On-Site Warranty'
    ],
    description: 'Eliminate posture fatigue with the ErgoForm SpineAlign chair. Designed in consultation with orthopaedic specialists, every contour is engineered to support natural lumbar lordosis and cervical spine alignment.',
    images: ['chair-1', 'chair-2', 'chair-3']
  },
  {
    id: 'nx-prod-105',
    title: 'OptiView 55-inch CinemaVision 4K Ultra HD Smart QLED TV with Dolby Vision Atmos',
    brand: 'OptiView',
    category: 'appliances',
    rating: 4.6,
    ratingCount: 14200,
    reviewCount: 2190,
    price: 36999,
    mrp: 64999,
    discount: 43,
    assured: true,
    bestseller: false,
    flashDeal: true,
    inStock: true,
    stockLeft: 8,
    deliveryDays: 'Tomorrow, 2 PM',
    colors: ['#0f172a'],
    colorNames: ['Bezel-less Titanium'],
    sizes: ['43 Inch', '50 Inch', '55 Inch', '65 Inch'],
    specs: {
      'Resolution': '4K Ultra HD (3840 x 2160) QLED Panel',
      'Refresh Rate': '120Hz MEMC Smooth Motion',
      'Sound Output': '40W Quad Speakers with Dolby Atmos & DTS:X',
      'Smart TV OS': 'Google TV with Hands-free Voice Search',
      'Ports': '3 HDMI 2.1 (eARC) + 2 USB Ports + Optical + Dual-band Wi-Fi'
    },
    highlights: [
      'Quantum Dot Color technology delivering 1.07 Billion cinematic true-to-life shades',
      'Dolby Vision IQ dynamically adapts scene lighting to ambient room sensors',
      'Auto Low Latency Mode (ALLM) and Variable Refresh Rate for next-gen console gaming',
      'Free standard wall-mount installation within 24 hours of delivery'
    ],
    description: 'Transform your living room into an IMAX cinematic theater. The OptiView CinemaVision QLED showcases 100% color volume and localized dimming contrast that makes dark scenes genuinely ink-black.',
    images: ['tv-1', 'tv-2', 'tv-3']
  },
  {
    id: 'nx-prod-106',
    title: 'GlowBotanica 10% Vitamin C + Ferulic Acid Brightening Face Serum (30ml)',
    brand: 'GlowBotanica',
    category: 'beauty',
    rating: 4.5,
    ratingCount: 16750,
    reviewCount: 1820,
    price: 499,
    mrp: 999,
    discount: 50,
    assured: true,
    bestseller: true,
    flashDeal: false,
    inStock: true,
    stockLeft: 45,
    deliveryDays: 'Tomorrow, 5 PM',
    colors: ['#f59e0b'],
    colorNames: ['Amber Glass Vial'],
    sizes: ['30ml Standard', '50ml Value Pack'],
    specs: {
      'Key Actives': '10% Ethyl Ascorbic Acid + 0.5% Ferulic Acid + Hyaluronic Acid',
      'Skin Type': 'Suitable for All Skin Types (Dermatologically Tested)',
      'Free From': 'Parabens, Sulphates, Mineral Oil & Artificial Fragrance',
      'pH Level': 'Skin-friendly 3.8'
    },
    highlights: [
      'Clinically proven to fade post-acne dark spots and hyperpigmentation in 4 weeks',
      'Ferulic acid stabilizes Vitamin C to maintain 100% active potency without oxidation',
      'Lightweight water-gel texture absorbs instantly without oily residue',
      'Certified cruelty-free and 100% vegan formulation'
    ],
    description: 'Awaken luminous, radiant skin with GlowBotanica’s potent antioxidant serum. Ethyl Ascorbic acid is a non-irritating derivative that boosts collagen synthesis and evens complexion tone effortlessly.',
    images: ['serum-1', 'serum-2']
  },
  {
    id: 'nx-prod-107',
    title: 'PulseFit Pro Stainless Steel Smartwatch with Bluetooth Calling & AMOLED Display',
    brand: 'PulseFit',
    category: 'electronics',
    rating: 4.3,
    ratingCount: 22100,
    reviewCount: 3100,
    price: 1999,
    mrp: 6999,
    discount: 71,
    assured: true,
    bestseller: true,
    flashDeal: true,
    inStock: true,
    stockLeft: 18,
    deliveryDays: 'Tomorrow, 8 PM',
    colors: ['#020617', '#94a3b8', '#d97706'],
    colorNames: ['Jet Black Steel', 'Silver Mesh', 'Champagne Gold'],
    sizes: ['46mm Dial'],
    specs: {
      'Display': '1.43-inch Always-on Super AMOLED (466x466 px)',
      'Battery Life': 'Up to 7 Days Typical Usage (3 Days with BT Calling)',
      'Water Resistance': 'IP68 Certified Dust and Water Resistant',
      'Sensors': 'Optical Heart Rate, SpO2 Blood Oxygen, Sleep Quality Tracker'
    },
    highlights: [
      'Direct crystal clear Bluetooth calling with AI environmental noise reduction mic',
      'Over 110+ sports modes including Cricket, Running, Cycling, and Badminton',
      'Stainless steel unibody bezel with scratch-resistant 2.5D sapphire glass',
      'Over 200+ customizable cloud watch faces via mobile app'
    ],
    description: 'Merge luxury watch design with state-of-the-art biometrics. PulseFit Pro pairs an aircraft-grade stainless steel casing with a radiant AMOLED screen for seamless connectivity at your wrist.',
    images: ['watch-1', 'watch-2', 'watch-3']
  },
  {
    id: 'nx-prod-108',
    title: 'Aeroflex Pro Nitro Cushion Performance Running Shoes for Men (Ultra-Lightweight)',
    brand: 'Aeroflex',
    category: 'fashion',
    rating: 4.6,
    ratingCount: 11400,
    reviewCount: 1650,
    price: 1799,
    mrp: 4499,
    discount: 60,
    assured: true,
    bestseller: false,
    flashDeal: false,
    inStock: true,
    stockLeft: 14,
    deliveryDays: 'Tomorrow, 4 PM',
    colors: ['#2563eb', '#0f172a', '#dc2626'],
    colorNames: ['Cobalt Royal', 'Shadow Black', 'Solar Crimson'],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specs: {
      'Sole Material': 'Supercritical Nitro-Infused Foam Midsole',
      'Upper Material': 'Engineered Seamless Jacquard Mesh',
      'Drop': '8mm Heel-to-Toe Drop for natural stride transition',
      'Weight': '210 grams (Single shoe UK 8)'
    },
    highlights: [
      'Nitrogen-infused foam delivers 78% energy rebound on each pavement strike',
      'Anatomical heel cup prevents Achilles tendon strain and heel slippage',
      'High-traction rubber pods positioned at key wear zones for wet pavement grip',
      'Washable antimicrobial Ortholite cushioned insole'
    ],
    description: 'Engineered for road runners, marathon enthusiasts, and gym goers alike. Aeroflex Nitro shoes feature featherweight nitrogen cushioning that absorbs impact shock while propelling you into your next stride.',
    images: ['shoe-1', 'shoe-2', 'shoe-3']
  }
];

export const USER_PROFILE = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.in',
  phone: '+91 98765 43210',
  tier: 'Nexora Gold Elite',
  superCoins: 480,
  avatar: 'AS',
  addresses: [
    {
      id: 'addr-1',
      name: 'Aarav Sharma',
      tag: 'HOME',
      isDefault: true,
      phone: '+91 98765 43210',
      addressLine: 'Flat 402, Skyline Heights, 18th Cross, 5th Main, HSR Layout Sector 3',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102',
      landmark: 'Near BDA Complex'
    },
    {
      id: 'addr-2',
      name: 'Aarav Sharma',
      tag: 'OFFICE',
      isDefault: false,
      phone: '+91 98765 43210',
      addressLine: '7th Floor, Infinity Tech Park, Outer Ring Road, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      landmark: 'Opposite EcoSpace'
    }
  ],
  orders: [
    {
      orderId: 'NX-892410-IN',
      date: '21 Nov 2026',
      total: 3499,
      status: 'Out for Delivery',
      currentStep: 3, // 1: Confirmed, 2: Shipped, 3: Out for Delivery, 4: Delivered
      estimatedDelivery: 'Today by 8:00 PM',
      items: [
        {
          productId: 'nx-prod-101',
          title: 'AuraWave SoundPro ANC Wireless Over-Ear Headphones',
          color: 'Midnight Obsidian',
          qty: 1,
          price: 3499
        }
      ]
    },
    {
      orderId: 'NX-773194-IN',
      date: '14 Nov 2026',
      total: 1799,
      status: 'Delivered',
      currentStep: 4,
      estimatedDelivery: 'Delivered on 16 Nov 2026',
      items: [
        {
          productId: 'nx-prod-108',
          title: 'Aeroflex Pro Nitro Cushion Performance Running Shoes',
          color: 'Cobalt Royal',
          size: 'UK 9',
          qty: 1,
          price: 1799
        }
      ]
    }
  ],
  savedCards: [
    { id: 'card-1', bank: 'HDFC Bank', type: 'Credit Card', number: '•••• •••• •••• 4289', expiry: '08/29' },
    { id: 'card-2', bank: 'ICICI Bank', type: 'Debit Card', number: '•••• •••• •••• 8912', expiry: '11/30' }
  ],
  savedUpi: [
    { id: 'upi-1', app: 'Google Pay', handle: 'aarav@okhdfcbank', isPrimary: true },
    { id: 'upi-2', app: 'PhonePe', handle: '9876543210@ybl', isPrimary: false }
  ]
};

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Priya Sundaram',
    rating: 5,
    date: '18 Nov 2026',
    verified: true,
    city: 'Chennai',
    title: 'Exceeded all expectations! Mind-blowing sound quality',
    comment: 'The active noise cancellation cuts out bus engine rumbling and office background chatter completely. The bass has genuine punch without muffling vocals. Delivered in under 24 hours!',
    helpfulCount: 142
  },
  {
    id: 'rev-2',
    author: 'Vikramaditya Roy',
    rating: 5,
    date: '12 Nov 2026',
    verified: true,
    city: 'Mumbai',
    title: 'Value for money deal of the year',
    comment: 'Ordered during the flash sale at 65% off. Quality feels like a 15k headphone. Bluetooth multipoint works seamlessly between my MacBook and phone.',
    helpfulCount: 89
  },
  {
    id: 'rev-3',
    author: 'Neha Deshmukh',
    rating: 4,
    date: '05 Nov 2026',
    verified: true,
    city: 'Pune',
    title: 'Very comfortable for long work calls',
    comment: 'Earcups are super plush. Battery easily lasts 4-5 full workdays on a single charge. Highly recommend to anyone doing remote work.',
    helpfulCount: 67
  }
];

export const COUPONS = [
  { code: 'NEXORA500', discount: 500, minOrder: 2999, description: 'Flat ₹500 instant off on electronics over ₹2,999' },
  { code: 'FESTIVE10', discountPercent: 10, maxDiscount: 1000, minOrder: 1499, description: '10% instant discount up to ₹1,000 on festive orders' },
  { code: 'FIRSTORDER', discount: 200, minOrder: 999, description: 'Flat ₹200 off for newly registered Nexora members' }
];
