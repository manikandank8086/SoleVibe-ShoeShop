export const shopConfig = {
  shopName: "SoleVibe",
  tagline: "Step Into Style",
  whatsappNumber: "+919876543210", // Default WhatsApp number (customizable)
  currency: "$",
  contact: {
    phone: "+91 98765 43210",
    email: "support@solevibe.com",
    address: "102, Premium Fashion Avenue, Sector 5, New Delhi, India",
    whatsappLink: "https://wa.me/919876543210"
  },
  socials: {
    instagram: "https://instagram.com/solevibe",
    facebook: "https://facebook.com/solevibe",
    twitter: "https://twitter.com/solevibe"
  },
  categories: [
    { id: "running", name: "Running Shoes", count: 2, image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600" },
    { id: "sneakers", name: "Sneakers", count: 3, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600" },
    { id: "sports", name: "Sports Shoes", count: 1, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=600" },
    { id: "casual", name: "Casual Shoes", count: 2, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600" }
  ],
  brands: ["Nike", "Adidas", "Puma"],
  products: [
    {
      id: "1",
      name: "Nike Air Max Aura",
      brand: "Nike",
      price: 160,
      category: "sneakers",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
      description: "Step into cloud-like comfort with the Nike Air Max Aura. Featuring the iconic Air Sole unit and a breathable engineered mesh upper, this shoe provides premium cushioning and an athletic silhouette that stands out on any occasion.",
      colors: ["Orange/Black", "Red/White", "Grey/Neon"],
      sizes: [7, 8, 9, 10, 11],
      isTrending: true,
      isNew: false
    },
    {
      id: "2",
      name: "Adidas UltraBoost Prime",
      brand: "Adidas",
      price: 190,
      category: "running",
      tag: "Limited Stock",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200",
      description: "Designed for energy return and peak running efficiency. The Adidas UltraBoost Prime is built with a responsive Boost midsole and a lightweight Primeknit upper that wraps your foot in supportive, adaptive comfort.",
      colors: ["Core Black", "Cloud White", "Solar Red"],
      sizes: [8, 9, 10, 11],
      isTrending: true,
      isNew: false
    },
    {
      id: "3",
      name: "Puma RS-X Cyber",
      brand: "Puma",
      price: 120,
      category: "sneakers",
      tag: "New",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200",
      description: "Futuristic retro style meets supreme cushioning. The Puma RS-X Cyber features a bold multi-layered leather design, neon contrast blocks, and a chunky Running System sole for all-day comfort and premium street style.",
      colors: ["Cyber Pink/Cyan", "Black/Yellow", "White/Violet"],
      sizes: [7, 8, 9, 10],
      isTrending: false,
      isNew: true
    },
    {
      id: "4",
      name: "Nike Air Jordan Retro",
      brand: "Nike",
      price: 180,
      category: "sneakers",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200",
      description: "The absolute icon of basketball culture and streetwear. The Air Jordan Retro combines high-top stability, genuine leather overlays, and classic encapsulated Air cushioning for unmatched durability and style.",
      colors: ["Classic Black/White", "Chicago Red", "Shadow Grey"],
      sizes: [8, 9, 10, 11, 12],
      isTrending: true,
      isNew: false
    },
    {
      id: "5",
      name: "Adidas AlphaBounce Edge",
      brand: "Adidas",
      price: 130,
      category: "sports",
      tag: "30% OFF",
      originalPrice: 185,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200",
      description: "Designed for intensive training, gym workouts, and dynamic movements. The AlphaBounce Edge utilizes an elastic Bounce cushioning midsole coupled with a zoned supportive upper for high stability in all directions.",
      colors: ["Gold/White", "Triple Black", "Royal Blue"],
      sizes: [7, 8, 9, 10, 11],
      isTrending: true,
      isNew: false
    },
    {
      id: "6",
      name: "Puma Volt Racer",
      brand: "Puma",
      price: 95,
      category: "running",
      tag: "New",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200",
      description: "Ultra-lightweight racer engineered for record-breaking speed. Features a highly flexible, breathable mesh upper, neon volt coloring, and a high-abrasion rubber outsole for exceptional grip on road and track.",
      colors: ["Volt Green/Silver", "Neon Blue/White", "Grey/Lime"],
      sizes: [8, 9, 10],
      isTrending: false,
      isNew: true
    },
    {
      id: "7",
      name: "Nike Court Legacy",
      brand: "Nike",
      price: 85,
      category: "casual",
      tag: "Free Delivery",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200",
      description: "Paying tribute to its history in tennis culture, the Nike Court Legacy blends classic sporty aesthetics with a modern, street-ready construction. Clean canvas trim and durable rubber outsoles make it a daily essential.",
      colors: ["Off-White", "Triple White", "Black Canvas"],
      sizes: [7, 8, 9, 10, 11],
      isTrending: false,
      isNew: false
    },
    {
      id: "8",
      name: "Adidas Swift Run Plus",
      brand: "Adidas",
      price: 105,
      category: "casual",
      tag: "Free Delivery",
      image: "https://images.unsplash.com/photo-1463100099907-44d12ba71103?q=80&w=1200",
      description: "The go-to everyday running sneaker. Soft knit fabric upper hugs your foot like a sock, while a lightweight EVA midsole delivers effortless, cushion-soft comfort for all-day errands.",
      colors: ["Cloud Grey", "Navy Blue", "Pure Black"],
      sizes: [8, 9, 10, 11],
      isTrending: false,
      isNew: false
    }
  ]
};
