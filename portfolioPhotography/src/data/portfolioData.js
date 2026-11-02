/**
 * =======================================================================
 * PORTFOLIO DATA CONFIGURATION
 * =======================================================================
 * You can customize the photographer name, copy, project images,
 * categories, bio, services, and contact information directly in this file.
 * All Unsplash URLs can be replaced with your own local or hosted image paths.
 * =======================================================================
 */

export const PORTFOLIO_CONFIG = {
  // -------------------------------------------------------------------
  // 1. IDENTITY & THEME
  // -------------------------------------------------------------------
  photographer: {
    name: "ELENA VANCE",
    pronouns: "she/her",
    role: "Photographer & Visual Director",
    specialties: ["Editorial", "Architecture", "Cinematic Fashion"],
    location: "New York / Paris",
    availability: "Available for global commissions Q1–Q3",
    
    // One-line hero positioning statement
    positioningStatement: "Exploring the quiet dialogue between brutalist geometry, luminous shadow, and the human silhouette.",
    
    // Hero secondary subline
    tagline: "Selected Works · 2021 — 2026",

    // Profile & Bio
    bio: [
      "Elena Vance is an editorial and architectural photographer based between New York and Paris. Trained originally in structural engineering before picking up medium-format film, her practice investigates how built environments shape human gesture and emotion.",
      "Her visual language balances austere minimalism with rich, cinematic tonal ranges. Working primarily with natural dawn light, medium-format digital backs, and archival 35mm grain, she collaborates with forward-thinking fashion houses, architectural studios, and publications worldwide."
    ],

    // Stats displayed in About section
    stats: [
      { label: "Years of Practice", value: "08+" },
      { label: "Global Commissions", value: "140+" },
      { label: "Editorial Features", value: "34" },
      { label: "Monograph Exhibitions", value: "05" }
    ],

    // Photographer Portrait for About Section
    portraitUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1200",
    portraitAlt: "Portrait of Elena Vance holding medium-format camera in studio"
  },

  // -------------------------------------------------------------------
  // 2. HERO 3D GALLERY IMAGES (Used for floating photo planes)
  // -------------------------------------------------------------------
  heroGallery: [
    {
      id: "hero-1",
      title: "Brutalist Dawn",
      category: "Architecture",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900",
      aspectRatio: 0.75, // height / width ratio for 3D plane
      alt: "Monolithic concrete brutalist museum pavilion"
    },
    {
      id: "hero-2",
      title: "Solitude in Noir",
      category: "Editorial",
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
      aspectRatio: 1.25,
      alt: "High fashion model in sculpted black tailoring"
    },
    {
      id: "hero-3",
      title: "Kyoto Atrium",
      category: "Spatial",
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=900",
      aspectRatio: 0.8,
      alt: "Minimalist concrete stairwell with slanting geometric light"
    },
    {
      id: "hero-4",
      title: "Amber Dune Sequence",
      category: "Fine Art",
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=900",
      aspectRatio: 1.1,
      alt: "Warm cinematic desert landscape at twilight"
    },
    {
      id: "hero-5",
      title: "Prismatic Reflections",
      category: "Still Life",
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=900",
      aspectRatio: 0.75,
      alt: "Sculptural glass perfume bottle with iridescent caustic shadows"
    },
    {
      id: "hero-6",
      title: "Copenhagen Shadows",
      category: "Architecture",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900",
      aspectRatio: 1.2,
      alt: "Modern glass skyscraper geometric facets reflecting overcast sky"
    }
  ],

  // -------------------------------------------------------------------
  // 3. SELECTED PROJECTS (6 Full-Feature Projects for Grid & Lightbox)
  // -------------------------------------------------------------------
  projects: [
    {
      id: "monolith-in-concrete",
      title: "Monolith & Mist",
      subtitle: "The Barbican Revisited",
      year: "2025",
      category: "Architecture",
      tags: ["Medium Format", "Monochrome", "Spatial"],
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1400",
      thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      aspectRatio: "aspect-[4/5]",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1600"
      ],
      story: "Commissioned as an archival study of mid-century brutalist housing complexes across Central London and Berlin. Over 28 consecutive dawns before urban traffic awakened, the massive bush-hammered concrete surfaces were documented under heavy Baltic mist, revealing tactile textural rhythms rarely observed by midday dwellers.",
      role: "Lead Photographer & Archival Researcher",
      client: "FRAME Architectural Magazine",
      gear: {
        camera: "Hasselblad 907X 50C",
        lens: "XCD 45mm f/4 P",
        settings: "ISO 100 · f/8.0 · 1/15s (Gitzo Carbon Tripod)"
      },
      location: "London & Berlin · 51.5200° N, 0.0935° W"
    },
    {
      id: "solitude-in-velvet",
      title: "Solitude in Velvet",
      subtitle: "Autumn/Winter Haute Couture",
      year: "2025",
      category: "Editorial",
      tags: ["Haute Couture", "Milan", "Grain"],
      coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=1400",
      thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
      aspectRatio: "aspect-[3/4]",
      gallery: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1600"
      ],
      story: "An introspective editorial campaign exploring stillness inside an abandoned Palazzo in Lake Como. The juxtaposition of structured wool, crushed midnight velvet, and eroding 17th-century frescoes provides an unsettling yet poetic dialogue on permanence.",
      role: "Photographer & Art Direction",
      client: "Acne Studios & Vogue Italia",
      gear: {
        camera: "Leica M11 & Mamiya 7II",
        lens: "Summilux-M 50mm f/1.4 ASPH",
        settings: "ISO 400 · f/2.0 · 1/125s (Kodak Tri-X pushed +1)"
      },
      location: "Lake Como, Italy · 45.9868° N, 9.2572° E"
    },
    {
      id: "the-amber-silence",
      title: "The Amber Silence",
      subtitle: "Atacama High Desert Monograph",
      year: "2024",
      category: "Travel",
      tags: ["Fine Art", "Twilight", "Scale"],
      coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=85&w=1400",
      thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
      aspectRatio: "aspect-[16/10]",
      gallery: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=85&w=1600"
      ],
      story: "Traversing the driest non-polar desert on Earth, this body of work examines atmospheric light refraction at 4,000 meters elevation. The stark absence of vegetation highlights geological foldings that mimic organic human musculature.",
      role: "Solo Field Artist",
      client: "Cereal Magazine Monograph Edition",
      gear: {
        camera: "Fujifilm GFX 100 II",
        lens: "GF 110mm f/2 R LM WR",
        settings: "ISO 80 · f/5.6 · 1/500s"
      },
      location: "San Pedro de Atacama, Chile · 22.9087° S, 68.1997° W"
    },
    {
      id: "kinetic-geometry",
      title: "Kinetic Geometry",
      subtitle: "Spatial Movement in Light & Steel",
      year: "2024",
      category: "Architecture",
      tags: ["Symmetry", "Negative Space", "Nordic"],
      coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=85&w=1400",
      thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      aspectRatio: "aspect-[3/4]",
      gallery: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1600"
      ],
      story: "A commissioned series for the Danish Architecture Center examining how Scandinavian stairwells transform vertical circulation into meditative kinetic choreography. Light penetrates from roof apertures, carving razor-sharp diagonal cuts across matte plaster.",
      role: "Architectural Visualist",
      client: "Danish Architecture Center & Wallpaper*",
      gear: {
        camera: "Sony A7R V (Pixel Shift Multi Shooting)",
        lens: "Voigtländer 21mm f/1.4 Nokton",
        settings: "ISO 100 · f/11 · 1.5s"
      },
      location: "Copenhagen, Denmark · 55.6761° N, 12.5683° E"
    },
    {
      id: "tactile-chroma",
      title: "Tactile Chroma",
      subtitle: "Sculptural Perfumery & Glass",
      year: "2023",
      category: "Product",
      tags: ["Still Life", "Refraction", "Macro"],
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=1400",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      aspectRatio: "aspect-[4/5]",
      gallery: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=1600"
      ],
      story: "Created for a niche Parisian perfumery house, this campaign abandoned standard digital rendering in favor of high-speed macro optics and hand-blown optical crystal prisms. Natural sunlight was directed through distilled botanical oils onto raw basalt stones.",
      role: "Lead Still Life Artist & Lighting Director",
      client: "Maison de L'Ombre, Paris",
      gear: {
        camera: "Hasselblad X2D 100C",
        lens: "XCD 120mm f/3.5 Macro",
        settings: "ISO 64 · f/16 · 1/160s (Broncolor Para 133)"
      },
      location: "Studio Marais, Paris · 48.8566° N, 2.3522° E"
    },
    {
      id: "nocturne-metropolis",
      title: "Nocturne Tokyo",
      subtitle: "Chroma, Mist, and Urban Isolation",
      year: "2023",
      category: "Cinematic",
      tags: ["Night", "35mm Cine Film", "Atmosphere"],
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1400",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      aspectRatio: "aspect-[16/9]",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=1600",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=85&w=1600"
      ],
      story: "A nocturnal expedition through the back-alleys and elevated highways of Shinjuku and Ginza during typhoon season. Shot on Kodak Vision3 500T cinema stock with anamorphic lenses, capturing the damp melancholia of late-night Tokyo commuters.",
      role: "Street Documentarian",
      client: "Kinfolk Japan & Leica Gallery Tokyo",
      gear: {
        camera: "Leica MP 0.72 Film Body",
        lens: "Summicron 35mm f/2 8-Element",
        settings: "Kodak Vision3 500T (ECN-2 Hand Processed)"
      },
      location: "Tokyo, Japan · 35.6762° N, 139.6503° E"
    }
  ],

  // -------------------------------------------------------------------
  // 4. CLIENTS & PUBLICATIONS LIST
  // -------------------------------------------------------------------
  clients: [
    { name: "Vogue Italia", category: "Editorial" },
    { name: "Acne Studios", category: "Campaign" },
    { name: "Architectural Digest", category: "Spatial" },
    { name: "Kinfolk Magazine", category: "Print Feature" },
    { name: "Bottega Veneta", category: "Runway & Lookbook" },
    { name: "Wallpaper* Magazine", category: "Design" },
    { name: "Cereal Magazine", category: "Monograph" },
    { name: "Cartier Maison", category: "Fine Jewellery" },
    { name: "Danish Architecture Center", category: "Exhibition" },
    { name: "Aesop", category: "Spatial Retail" }
  ],

  // -------------------------------------------------------------------
  // 5. SERVICES & COMMISSIONS
  // -------------------------------------------------------------------
  services: [
    {
      id: "srv-1",
      number: "01",
      title: "Editorial & Lookbooks",
      description: "Comprehensive visual narratives for fashion houses, avant-garde labels, and quarterly publications. From concept ideation to film-grain color grading.",
      deliverables: ["Full Art Direction & Moodboards", "Location Scouting & Casting", "Medium-Format & 35mm Delivery", "Archival Master Retouching"],
      timeline: "2 – 4 Weeks"
    },
    {
      id: "srv-2",
      number: "02",
      title: "Architectural & Interior Spatial",
      description: "Rigorous documentation of contemporary structures, brutalist heritage, and luxury residential projects using natural dawn/dusk lighting transitions.",
      deliverables: ["Shift-Lens Geometric Correction", "Day-to-Dusk Lighting Studies", "High-Resolution Print Files", "Publication Licensing Package"],
      timeline: "1 – 3 Weeks"
    },
    {
      id: "srv-3",
      number: "03",
      title: "Commercial Still Life & Objects",
      description: "Sculptural product imagery for fragrance, fine jewelry, and industrial design objects. Emphasizing organic shadow, refraction, and tactile materiality.",
      deliverables: ["Macro Optics & Focus Stacking", "Studio Lighting Design", "E-commerce & OOH Billboard Specs", "Motion Loops / Cinemagraphs"],
      timeline: "1 – 2 Weeks"
    },
    {
      id: "srv-4",
      number: "04",
      title: "Fine Art Prints & Private Monograph",
      description: "Museum-grade limited-edition prints and custom monograph publishing for collectors, gallery exhibitions, and corporate permanent collections.",
      deliverables: ["Hahnemühle Photo Rag Archival Prints", "Signed Certificate of Authenticity", "Custom Hardcover Bookbinding", "Curatorial Essay Collaboration"],
      timeline: "By Consultation"
    }
  ],

  // -------------------------------------------------------------------
  // 6. CONTACT & SOCIALS
  // -------------------------------------------------------------------
  contact: {
    email: "studio@elenavance.photography",
    phone: "+1 (212) 840-9214",
    studioAddress: "48 Mercer Street, Floor 4, Soho, New York, NY 10013",
    secondaryStudio: "12 Rue de Turenne, 75004 Paris, France",
    socials: [
      { name: "Instagram", url: "https://instagram.com", handle: "@elena.vance" },
      { name: "Behance", url: "https://behance.net", handle: "elenavance" },
      { name: "Vimeo", url: "https://vimeo.com", handle: "vancevisuals" },
      { name: "LinkedIn", url: "https://linkedin.com", handle: "elena-vance-photography" }
    ],
    inquiryTypes: [
      "Editorial Commission",
      "Architectural Project",
      "Commercial Campaign",
      "Print Acquisition",
      "Press / Interview"
    ]
  }
};
