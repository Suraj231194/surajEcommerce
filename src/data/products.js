// Comprehensive product data for e-commerce platform
// 10-15 categories with 40-50 products each with full specifications

// Categories
export const categories = [
  {
    id: 1,
    name: "Mobile Phones",
    slug: "mobile-phones",
    description: "Latest smartphones from top brands with cutting-edge technology",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    subcategories: ["Flagship", "Mid-Range", "Budget", "Gaming Phones", "Foldable"]
  },
  {
    id: 2,
    name: "Laptops & Computers",
    slug: "laptops-computers",
    description: "Powerful laptops and desktops for work and gaming",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    subcategories: ["Gaming Laptops", "Business Laptops", "Ultrabooks", "2-in-1", "Desktops"]
  },
  {
    id: 3,
    name: "Tablets & E-readers",
    slug: "tablets-ereaders",
    description: "Portable tablets and e-readers for entertainment and productivity",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    subcategories: ["Android Tablets", "iPads", "E-readers", "Kids Tablets", "Drawing Tablets"]
  },
  {
    id: 4,
    name: "Headphones & Audio",
    slug: "headphones-audio",
    description: "Premium audio equipment for immersive sound experience",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    subcategories: ["Over-Ear", "In-Ear", "True Wireless", "Gaming Headsets", "Speakers"]
  },
  {
    id: 5,
    name: "Cameras & Photography",
    slug: "cameras-photography",
    description: "Professional cameras and accessories for stunning photography",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    subcategories: ["DSLR", "Mirrorless", "Action Cameras", "Drones", "Camera Accessories"]
  },
  {
    id: 6,
    name: "Men's Fashion",
    slug: "mens-fashion",
    description: "Stylish clothing and accessories for men",
    imageUrl: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400",
    subcategories: ["T-Shirts", "Shirts", "Jeans", "Jackets", "Formal Wear", "Ethnic Wear"]
  },
  {
    id: 7,
    name: "Women's Fashion",
    slug: "womens-fashion",
    description: "Trendy apparel and accessories for women",
    imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400",
    subcategories: ["Dresses", "Tops", "Jeans", "Sarees", "Kurtis", "Western Wear"]
  },
  {
    id: 8,
    name: "Kids' Fashion",
    slug: "kids-fashion",
    description: "Comfortable and colorful clothing for kids",
    imageUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400",
    subcategories: ["Boys Clothing", "Girls Clothing", "Baby Clothing", "School Uniforms", "Accessories"]
  },
  {
    id: 9,
    name: "Footwear",
    slug: "footwear",
    description: "Quality footwear for every occasion",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    subcategories: ["Sports Shoes", "Casual Shoes", "Formal Shoes", "Sandals", "Boots"]
  },
  {
    id: 10,
    name: "Watches & Accessories",
    slug: "watches-accessories",
    description: "Premium watches and fashion accessories",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    subcategories: ["Smart Watches", "Analog Watches", "Digital Watches", "Luxury Watches", "Accessories"]
  },
  {
    id: 11,
    name: "Home Appliances",
    slug: "home-appliances",
    description: "Essential appliances for modern homes",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    subcategories: ["Refrigerators", "Washing Machines", "Air Conditioners", "Microwaves", "Vacuum Cleaners"]
  },
  {
    id: 12,
    name: "Books & Media",
    slug: "books-media",
    description: "Books, audiobooks, and digital media",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    subcategories: ["Fiction", "Non-Fiction", "Academic", "Comics", "Audiobooks"]
  },
  {
    id: 13,
    name: "Sports & Fitness",
    slug: "sports-fitness",
    description: "Sports equipment and fitness gear",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    subcategories: ["Gym Equipment", "Sports Gear", "Outdoor Sports", "Yoga & Meditation", "Supplements"]
  },
  {
    id: 14,
    name: "Toys & Games",
    slug: "toys-games",
    description: "Fun toys and games for all ages",
    imageUrl: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400",
    subcategories: ["Action Figures", "Board Games", "Video Games", "Educational Toys", "Outdoor Toys"]
  },
  {
    id: 15,
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    description: "Beauty products and personal care essentials",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Men's Grooming"]
  }
];

// Brand lists for each category
const mobileBrands = ["Apple", "Samsung", "OnePlus", "Google", "Xiaomi", "Oppo", "Vivo", "Realme", "Nothing", "Motorola"];
const laptopBrands = ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Microsoft", "Razer", "LG"];
const tabletBrands = ["Apple", "Samsung", "Lenovo", "Microsoft", "Amazon", "Xiaomi", "Huawei", "OnePlus"];
const audioBrands = ["Sony", "Bose", "JBL", "Sennheiser", "Apple", "Samsung", "Beats", "Audio-Technica", "Skullcandy", "Marshall"];
const cameraBrands = ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic", "GoPro", "DJI", "Olympus"];
const fashionBrands = ["Nike", "Adidas", "Puma", "H&M", "Zara", "Levis", "Tommy Hilfiger", "Calvin Klein", "Gucci", "Ralph Lauren"];
const watchBrands = ["Apple", "Samsung", "Fossil", "Casio", "Titan", "Rolex", "Omega", "Seiko", "Tag Heuer", "Garmin"];
const applianceBrands = ["Samsung", "LG", "Whirlpool", "Haier", "Bosch", "Philips", "Panasonic", "Dyson", "IFB"];
const bookPublishers = ["Penguin", "HarperCollins", "Random House", "Simon & Schuster", "Macmillan", "Scholastic"];
const sportsBrands = ["Nike", "Adidas", "Puma", "Under Armour", "Reebok", "Decathlon", "Yonex", "Wilson"];
const toyBrands = ["LEGO", "Hasbro", "Mattel", "Nintendo", "PlayStation", "Xbox", "Hot Wheels", "Nerf"];
const beautyBrands = ["L'Oreal", "Maybelline", "MAC", "Lakme", "Nivea", "The Body Shop", "Neutrogena", "Clinique"];

// Helper function to generate products
function generateProducts(
  categoryId,
  categorySlug,
  subcategories,
  brands,
  nameTemplates,
  specGenerator,
  basePrice,
  priceVariance,
  count = 60
) {
  const products = [];

  // Simple seeded random function
  const seededRandom = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const seed = categoryId * 10000 + i;
    const brand = brands[i % brands.length];
    const subcategory = subcategories[i % subcategories.length];
    const nameTemplate = nameTemplates[i % nameTemplates.length];

    // Use seeded random for deterministic values
    const modelNumber = String(Math.floor(seededRandom(seed) * 900) + 100);
    const name = `${brand} ${nameTemplate} ${modelNumber}`;

    const price = basePrice + Math.floor(seededRandom(seed + 1) * priceVariance);
    const discountPercent = seededRandom(seed + 2) > 0.3 ? Math.floor(seededRandom(seed + 3) * 30) + 5 : 0;
    const discountPrice = discountPercent > 0 ? Math.floor(price * (1 - discountPercent / 100)) : price;

    products.push({
      id: categoryId * 1000 + i + 1,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: `Premium ${nameTemplate.toLowerCase()} from ${brand}. Features cutting-edge technology and exceptional build quality. Perfect for everyday use with outstanding performance and reliability.`,
      price,
      discountPrice,
      categoryId,
      categorySlug,
      subcategory,
      brand,
      stock: Math.floor(seededRandom(seed + 4) * 100) + 5,
      ratingAvg: Math.round((3.5 + seededRandom(seed + 5) * 1.5) * 10) / 10,
      reviewCount: Math.floor(seededRandom(seed + 6) * 5000) + 50,
      specifications: specGenerator(brand, i),
      images: [
        `https://picsum.photos/seed/${categorySlug}-${i}-1/600/600`,
        `https://picsum.photos/seed/${categorySlug}-${i}-2/600/600`,
        `https://picsum.photos/seed/${categorySlug}-${i}-3/600/600`,
        `https://picsum.photos/seed/${categorySlug}-${i}-4/600/600`,
      ],
      isFeatured: i < 8
    });
  }

  return products;
}

// Mobile Phones (Category 1)
const mobileProducts = generateProducts(
  1, "mobile-phones",
  categories[0].subcategories,
  mobileBrands,
  ["Galaxy Pro", "iPhone Ultra", "Pixel Pro", "Nord CE", "Redmi Note", "Find X", "V Series", "GT Neo", "Phone", "Edge"],
  (brand, i) => ({
    "Display": `${6.1 + (i % 5) * 0.2}" ${["AMOLED", "Super AMOLED", "LTPO OLED", "ProMotion"][i % 4]}`,
    "Processor": ["Snapdragon 8 Gen 3", "Apple A17 Pro", "Dimensity 9300", "Exynos 2400"][i % 4],
    "RAM": `${[8, 12, 16, 8, 12][i % 5]} GB`,
    "Storage": `${[128, 256, 512, 256, 128][i % 5]} GB`,
    "Battery": `${4500 + (i % 5) * 200} mAh`,
    "Camera": `${[50, 108, 200, 64, 48][i % 5]} MP Triple Camera`,
    "OS": brand === "Apple" ? "iOS 17" : "Android 14",
    "5G": true,
    "Fast Charging": `${[65, 100, 120, 67, 80][i % 5]}W`,
    "Water Resistance": ["IP68", "IP67", "IP54", "IP68"][i % 4],
    "Weight": `${175 + (i % 10) * 5}g`,
    "Colors": ["Phantom Black", "Titanium Blue", "Natural Silver", "Deep Purple"][i % 4]
  }),
  25000, 75000, 60
);

// Laptops (Category 2)
const laptopProducts = generateProducts(
  2, "laptops-computers",
  categories[1].subcategories,
  laptopBrands,
  ["MacBook Pro", "XPS", "ThinkPad", "ROG Strix", "Predator", "Swift", "Surface", "Blade", "Gram", "ZenBook"],
  (brand, i) => ({
    "Display": `${[13.3, 14, 15.6, 16, 17.3][i % 5]}" ${["4K OLED", "2.5K IPS", "FHD IPS", "QHD+", "Retina"][i % 5]}`,
    "Processor": ["Intel Core i9-13900H", "Apple M3 Pro", "AMD Ryzen 9 7945HX", "Intel Core i7-13700H"][i % 4],
    "RAM": `${[16, 32, 64, 16, 32][i % 5]} GB DDR5`,
    "Storage": `${[512, 1024, 2048, 512, 1024][i % 5]} GB NVMe SSD`,
    "Graphics": ["NVIDIA RTX 4090", "Apple M3 GPU", "AMD RX 7900M", "Intel Iris Xe", "NVIDIA RTX 4070"][i % 5],
    "Battery Life": `${[8, 12, 18, 10, 14][i % 5]} hours`,
    "Weight": `${1.2 + (i % 5) * 0.3} kg`,
    "OS": brand === "Apple" ? "macOS Sonoma" : "Windows 11 Pro",
    "Ports": "USB-C, HDMI, SD Card, Thunderbolt 4",
    "Keyboard": "Backlit with numeric keypad",
    "Webcam": ["1080p", "4K", "720p", "1080p IR"][i % 4]
  }),
  45000, 150000, 60
);

// Tablets (Category 3)
const tabletProducts = generateProducts(
  3, "tablets-ereaders",
  categories[2].subcategories,
  tabletBrands,
  ["iPad Pro", "Galaxy Tab", "Tab P", "Surface Pro", "Fire HD", "Pad", "MatePad", "Pad 2"],
  (brand, i) => ({
    "Display": `${[10.9, 11, 12.4, 12.9, 8.3][i % 5]}" ${["Liquid Retina", "Super AMOLED", "LCD", "OLED"][i % 4]}`,
    "Processor": ["Apple M2", "Snapdragon 8 Gen 2", "MediaTek Dimensity", "Intel Core i5"][i % 4],
    "RAM": `${[8, 16, 12, 8, 6][i % 5]} GB`,
    "Storage": `${[128, 256, 512, 1024, 64][i % 5]} GB`,
    "Battery": `${7000 + (i % 5) * 500} mAh`,
    "Camera": `${[12, 13, 8, 10][i % 4]} MP`,
    "OS": brand === "Apple" ? "iPadOS 17" : brand === "Microsoft" ? "Windows 11" : "Android 13",
    "Stylus Support": i % 3 !== 2,
    "Keyboard Support": true,
    "Weight": `${450 + (i % 5) * 50}g`,
    "Connectivity": ["WiFi + 5G", "WiFi Only", "WiFi + LTE"][i % 3]
  }),
  15000, 80000, 60
);

// Headphones & Audio (Category 4)
const audioProducts = generateProducts(
  4, "headphones-audio",
  categories[3].subcategories,
  audioBrands,
  ["WH-1000XM", "QuietComfort", "Tune", "Momentum", "AirPods", "Galaxy Buds", "Studio", "ATH-M", "Crusher", "Major"],
  (brand, i) => ({
    "Type": ["Over-Ear", "In-Ear", "True Wireless", "On-Ear"][i % 4],
    "Driver Size": `${[40, 50, 11, 30][i % 4]}mm`,
    "Frequency Response": "20Hz - 40kHz",
    "Impedance": `${[32, 47, 16, 38][i % 4]} Ohm`,
    "Noise Cancellation": ["Active", "Passive", "Adaptive", "None"][i % 4],
    "Battery Life": `${[30, 24, 8, 40][i % 4]} hours`,
    "Bluetooth": "5.3",
    "Codec Support": "AAC, LDAC, aptX HD",
    "Water Resistance": ["IPX4", "IPX7", "None", "IPX5"][i % 4],
    "Microphone": "Built-in with noise reduction",
    "Weight": `${[250, 280, 5, 200][i % 4]}g`,
    "Foldable": i % 2 === 0
  }),
  2000, 30000, 60
);

// Cameras (Category 5)
const cameraProducts = generateProducts(
  5, "cameras-photography",
  categories[4].subcategories,
  cameraBrands,
  ["EOS R", "Z Series", "Alpha", "X-T", "Lumix", "HERO", "Mavic", "OM-D"],
  (brand, i) => ({
    "Sensor": ["Full Frame", "APS-C", "Micro 4/3", "1-inch"][i % 4],
    "Megapixels": `${[45, 61, 33, 24, 26][i % 5]} MP`,
    "Video": ["8K 30fps", "4K 120fps", "4K 60fps", "6K 30fps"][i % 4],
    "ISO Range": "100 - 102400",
    "Autofocus Points": `${[693, 1053, 759, 425][i % 4]}`,
    "Continuous Shooting": `${[20, 30, 12, 15][i % 4]} fps`,
    "Stabilization": "5-axis IBIS",
    "LCD": `${[3, 3.2, 3.5][i % 3]}" Tilting Touchscreen`,
    "Viewfinder": "OLED EVF",
    "Weather Sealing": i % 3 !== 2,
    "Memory Card": "CFexpress / SD UHS-II",
    "Weight": `${450 + (i % 5) * 100}g`
  }),
  35000, 200000, 60
);

// Men's Fashion (Category 6)
const mensFashionProducts = generateProducts(
  6, "mens-fashion",
  categories[5].subcategories,
  fashionBrands,
  ["Classic Fit", "Slim Fit", "Athletic", "Vintage", "Modern", "Essential", "Premium", "Urban", "Sport", "Elite"],
  (brand, i) => ({
    "Material": ["100% Cotton", "Cotton Blend", "Polyester", "Linen", "Denim", "Wool"][i % 6],
    "Fit": ["Regular", "Slim", "Relaxed", "Athletic"][i % 4],
    "Size": "S, M, L, XL, XXL",
    "Care": "Machine Washable",
    "Pattern": ["Solid", "Striped", "Checked", "Printed", "Plain"][i % 5],
    "Collar": ["Round Neck", "V-Neck", "Polo", "Mandarin", "Spread"][i % 5],
    "Sleeve": ["Full Sleeve", "Half Sleeve", "Sleeveless"][i % 3],
    "Occasion": ["Casual", "Formal", "Party", "Sports", "Daily"][i % 5],
    "Season": ["All Season", "Summer", "Winter", "Monsoon"][i % 4],
    "Country of Origin": "India"
  }),
  500, 5000, 60
);

// Women's Fashion (Category 7)
const womensFashionProducts = generateProducts(
  7, "womens-fashion",
  categories[6].subcategories,
  fashionBrands,
  ["Floral", "Elegant", "Chic", "Bohemian", "Contemporary", "Classic", "Trendy", "Designer", "Casual", "Premium"],
  (brand, i) => ({
    "Material": ["Georgette", "Cotton", "Silk", "Chiffon", "Rayon", "Crepe"][i % 6],
    "Fit": ["Regular", "A-Line", "Fitted", "Flared"][i % 4],
    "Size": "XS, S, M, L, XL",
    "Care": "Dry Clean Only",
    "Pattern": ["Floral", "Solid", "Printed", "Embroidered", "Plain"][i % 5],
    "Neckline": ["Round", "V-Neck", "Square", "Boat", "Off-Shoulder"][i % 5],
    "Sleeve Length": ["Full", "3/4th", "Short", "Sleeveless"][i % 4],
    "Occasion": ["Casual", "Party", "Festive", "Office", "Wedding"][i % 5],
    "Length": ["Mini", "Midi", "Maxi", "Knee Length"][i % 4],
    "Country of Origin": "India"
  }),
  600, 8000, 60
);

// Kids' Fashion (Category 8)
const kidsFashionProducts = generateProducts(
  8, "kids-fashion",
  categories[7].subcategories,
  ["Carter's", "H&M Kids", "Zara Kids", "Gap Kids", "Marks & Spencer", "United Colors", "Max Kids", "Hopscotch"],
  ["Playful", "Comfort", "Active", "Party", "School", "Casual", "Summer", "Winter", "Festival", "Sports"],
  (brand, i) => ({
    "Material": ["100% Cotton", "Cotton Blend", "Organic Cotton", "Polyester"][i % 4],
    "Age Group": ["0-2 Years", "2-4 Years", "4-6 Years", "6-8 Years", "8-12 Years"][i % 5],
    "Size": "1Y, 2Y, 3Y, 4Y, 5Y, 6Y, 7Y, 8Y",
    "Care": "Machine Washable",
    "Pattern": ["Cartoon Print", "Solid", "Striped", "Character", "Plain"][i % 5],
    "Closure": ["Button", "Zipper", "Elastic", "Velcro"][i % 4],
    "Occasion": ["Casual", "Party", "School", "Play", "Festival"][i % 5],
    "Season": ["All Season", "Summer", "Winter"][i % 3],
    "Safety": "Skin-Friendly, Non-Toxic Dyes",
    "Country of Origin": "India"
  }),
  300, 2000, 60
);

// Footwear (Category 9)
const footwearProducts = generateProducts(
  9, "footwear",
  categories[8].subcategories,
  ["Nike", "Adidas", "Puma", "Reebok", "Skechers", "Clarks", "Woodland", "Red Tape", "Bata", "Metro"],
  ["Air Max", "Ultraboost", "RS-X", "Classic", "Go Walk", "Desert Boot", "Trekker", "Oxford", "Power", "Comfort"],
  (brand, i) => ({
    "Upper Material": ["Mesh", "Leather", "Synthetic", "Canvas", "Knit"][i % 5],
    "Sole Material": ["Rubber", "EVA", "Phylon", "TPU", "Leather"][i % 5],
    "Closure": ["Lace-Up", "Slip-On", "Velcro", "Buckle", "Zipper"][i % 5],
    "Size": "UK 6-12",
    "Width": ["Regular", "Wide"][i % 2],
    "Heel Height": `${[0, 1, 2, 3, 0][i % 5]} inch`,
    "Arch Support": ["Medium", "High", "Low"][i % 3],
    "Cushioning": ["Memory Foam", "Gel", "Air", "EVA"][i % 4],
    "Water Resistant": i % 3 === 0,
    "Weight": `${280 + (i % 5) * 30}g per shoe`,
    "Style": ["Sports", "Casual", "Formal", "Outdoor", "Party"][i % 5]
  }),
  1500, 12000, 60
);

// Watches (Category 10)
const watchProducts = generateProducts(
  10, "watches-accessories",
  categories[9].subcategories,
  watchBrands,
  ["Watch SE", "Galaxy Watch", "Gen 6", "G-Shock", "Bolt", "Submariner", "Speedmaster", "Presage", "Carrera", "Fenix"],
  (brand, i) => ({
    "Display Type": ["AMOLED", "LCD", "Analog", "Digital", "Hybrid"][i % 5],
    "Case Size": `${[40, 42, 44, 46, 38][i % 5]}mm`,
    "Case Material": ["Stainless Steel", "Titanium", "Aluminum", "Ceramic", "Resin"][i % 5],
    "Band Material": ["Silicone", "Leather", "Metal", "Nylon", "Rubber"][i % 5],
    "Water Resistance": `${[50, 100, 200, 30, 50][i % 5]}m`,
    "Battery Life": brand === "Apple" || brand === "Samsung" ? `${[18, 40, 24, 36][i % 4]} hours` : "2-5 years",
    "Features": ["Heart Rate", "GPS", "SpO2", "Sleep Tracking", "NFC"].slice(0, 3 + (i % 3)).join(", "),
    "Compatibility": brand === "Apple" ? "iOS" : "Android & iOS",
    "Weight": `${32 + (i % 5) * 10}g`,
    "Warranty": `${[1, 2, 5, 2][i % 4]} Year`
  }),
  2000, 50000, 60
);

// Home Appliances (Category 11)
const applianceProducts = generateProducts(
  11, "home-appliances",
  categories[10].subcategories,
  applianceBrands,
  ["Frost Free", "Front Load", "Split AC", "Solo", "Cyclone", "Smart", "Pro", "Ultra", "Max", "Premium"],
  (brand, i) => ({
    "Type": ["Refrigerator", "Washing Machine", "Air Conditioner", "Microwave", "Vacuum"][i % 5],
    "Capacity": `${[260, 7, 1.5, 28, 2][i % 5]} ${["L", "kg", "Ton", "L", "L"][i % 5]}`,
    "Energy Rating": `${[5, 4, 5, 3, 4][i % 5]} Star`,
    "Power Consumption": `${[150, 500, 1200, 800, 1400][i % 5]}W`,
    "Technology": ["Inverter", "Direct Drive", "Digital Inverter", "Convection", "Cyclonic"][i % 5],
    "Color": ["Silver", "White", "Black", "Grey", "Red"][i % 5],
    "Smart Features": i % 2 === 0 ? "WiFi, App Control" : "None",
    "Noise Level": `${[35, 52, 26, 45, 72][i % 5]} dB`,
    "Warranty": `${[2, 10, 5, 1, 2][i % 5]} Years`,
    "Installation": ["Free", "Paid", "Free"][i % 3]
  }),
  8000, 60000, 60
);

// Books (Category 12)
const bookProducts = generateProducts(
  12, "books-media",
  categories[11].subcategories,
  bookPublishers,
  ["The Art of", "Journey to", "Secrets of", "Understanding", "Mastering", "Guide to", "History of", "Future of", "Essential", "Complete"],
  (brand, i) => ({
    "Format": ["Paperback", "Hardcover", "Kindle", "Audiobook"][i % 4],
    "Pages": `${200 + (i % 10) * 50}`,
    "Language": ["English", "Hindi", "English", "English", "Hindi"][i % 5],
    "Publisher": brand,
    "ISBN": `978-${1000000000 + (i * 123456789) % 9000000000}`,
    "Genre": ["Fiction", "Self-Help", "Business", "Science", "History", "Biography"][i % 6],
    "Author": ["James Clear", "Robert Kiyosaki", "Stephen Hawking", "Yuval Harari", "Michelle Obama"][i % 5],
    "Edition": `${1 + (i % 3)} Edition`,
    "Publication Year": `${2020 + (i % 5)}`,
    "Dimensions": "8 x 5 x 1 inches",
    "Weight": `${300 + (i % 5) * 100}g`
  }),
  200, 2000, 60
);

// Sports & Fitness (Category 13)
const sportsProducts = generateProducts(
  13, "sports-fitness",
  categories[12].subcategories,
  sportsBrands,
  ["Pro Series", "Elite", "Competition", "Training", "Performance", "Champion", "Victory", "Power", "Speed", "Flex"],
  (brand, i) => ({
    "Type": ["Dumbbell", "Yoga Mat", "Treadmill", "Cricket Bat", "Tennis Racket", "Football"][i % 6],
    "Material": ["Cast Iron", "NBR Foam", "Steel", "English Willow", "Graphite", "PU Leather"][i % 6],
    "Weight": `${[5, 1, 120, 1.2, 0.3, 0.45][i % 6]} kg`,
    "Size": ["Standard", "6mm Thick", "Foldable", "Short Handle", "27 inch", "Size 5"][i % 6],
    "Usage": ["Gym", "Home", "Outdoor", "Indoor"][i % 4],
    "Skill Level": ["Beginner", "Intermediate", "Professional"][i % 3],
    "Gender": ["Unisex", "Men", "Women", "Unisex"][i % 4],
    "Warranty": `${[1, 6, 2, 1, 1][i % 5]} ${["Year", "Months", "Years", "Year", "Year"][i % 5]}`,
    "Includes": ["Carrying Case", "Strap", "None", "Cover", "Grip Tape"][i % 5]
  }),
  500, 50000, 60
);

// Toys & Games (Category 14)
const toyProducts = generateProducts(
  14, "toys-games",
  categories[13].subcategories,
  toyBrands,
  ["Building Set", "Action Hero", "Racing", "Adventure", "Creative", "Classic", "Pro", "Ultimate", "Super", "Mega"],
  (brand, i) => ({
    "Type": ["Building Blocks", "Action Figure", "Board Game", "Video Game", "Remote Control"][i % 5],
    "Age Group": ["3+", "6+", "8+", "10+", "12+", "16+"][i % 6],
    "Pieces": brand === "LEGO" ? `${100 + (i % 10) * 50}` : "N/A",
    "Players": ["1", "1-4", "2-6", "1-2", "1"][i % 5],
    "Material": ["ABS Plastic", "PVC", "Cardboard", "Electronic", "Die-Cast"][i % 5],
    "Battery Required": i % 2 === 0 ? "Yes (Included)" : "No",
    "Educational": i % 3 === 0,
    "Skill Development": ["Motor Skills", "Creativity", "Strategy", "Hand-Eye Coordination", "Problem Solving"][i % 5],
    "Safety": "BIS Certified, Non-Toxic",
    "Dimensions": `${10 + (i % 5) * 5} x ${8 + (i % 3) * 4} x ${5 + (i % 4) * 2} cm`
  }),
  300, 8000, 60
);

// Beauty & Personal Care (Category 15)
const beautyProducts = generateProducts(
  15, "beauty-personal-care",
  categories[14].subcategories,
  beautyBrands,
  ["Hydra", "Glow", "Matte", "Natural", "Essential", "Pure", "Radiant", "Youth", "Deep", "Ultra"],
  (brand, i) => ({
    "Type": ["Moisturizer", "Foundation", "Shampoo", "Perfume", "Face Wash", "Serum", "Lipstick"][i % 7],
    "Skin Type": ["All Skin", "Oily", "Dry", "Combination", "Sensitive"][i % 5],
    "Volume": `${[50, 30, 200, 100, 100, 30, 4][i % 7]} ${["ml", "ml", "ml", "ml", "ml", "ml", "g"][i % 7]}`,
    "Key Ingredients": ["Vitamin C", "Hyaluronic Acid", "Retinol", "Niacinamide", "Aloe Vera"][i % 5],
    "Benefits": ["Hydration", "Anti-Aging", "Brightening", "Cleansing", "Moisturizing"][i % 5],
    "SPF": i % 3 === 0 ? "SPF 30" : "None",
    "Fragrance": ["Floral", "Citrus", "Woody", "Fresh", "Unscented"][i % 5],
    "Paraben Free": true,
    "Cruelty Free": i % 2 === 0,
    "Shelf Life": "24 months",
    "Country of Origin": ["France", "USA", "India", "Korea", "Japan"][i % 5]
  }),
  200, 3000, 60
);

// Combine all products
export const allProducts = [
  ...mobileProducts,
  ...laptopProducts,
  ...tabletProducts,
  ...audioProducts,
  ...cameraProducts,
  ...mensFashionProducts,
  ...womensFashionProducts,
  ...kidsFashionProducts,
  ...footwearProducts,
  ...watchProducts,
  ...applianceProducts,
  ...bookProducts,
  ...sportsProducts,
  ...toyProducts,
  ...beautyProducts
];

const CATEGORY_NAME_BY_SLUG = Object.fromEntries(
  categories.map((category) => [category.slug, category.name.toLowerCase()])
);

const DEAL_TERMS = ["deal", "deals", "discount", "offer", "offers", "sale", "flash"];
const TRENDING_TERMS = ["trending", "popular", "hot", "top picks"];
const BEST_SELLER_TERMS = ["best seller", "bestseller", "top rated", "recommended"];

function matchesIntent(query, terms) {
  return terms.some((term) => query.includes(term));
}

function getDiscountScore(product) {
  if (!product.price) {
    return 0;
  }
  return ((product.price - product.discountPrice) / product.price) * 100;
}

export function getDealProducts(limit = 120) {
  return [...allProducts]
    .sort((a, b) => getDiscountScore(b) - getDiscountScore(a))
    .slice(0, limit);
}

export function getTrendingProducts(limit = 120) {
  return [...allProducts]
    .sort((a, b) => b.ratingAvg * b.reviewCount - a.ratingAvg * a.reviewCount)
    .slice(0, limit);
}

export function getBestSellerProducts(limit = 120) {
  return [...allProducts]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

// Get products by category
export function getProductsByCategory(categorySlug) {
  return allProducts.filter(p => p.categorySlug === categorySlug);
}

// Get product by slug
export function getProductBySlug(slug) {
  return allProducts.find(p => p.slug === slug);
}

// Get product by ID
export function getProductById(id) {
  return allProducts.find(p => p.id === id);
}

// Get featured products
export function getFeaturedProducts() {
  return allProducts.filter(p => p.isFeatured).slice(0, 20);
}

// Search products
export function searchProducts(query) {
  const lowerQuery = String(query || "").toLowerCase().trim();

  if (!lowerQuery) {
    return allProducts;
  }

  if (matchesIntent(lowerQuery, DEAL_TERMS)) {
    return getDealProducts(180);
  }

  if (matchesIntent(lowerQuery, TRENDING_TERMS)) {
    return getTrendingProducts(180);
  }

  if (matchesIntent(lowerQuery, BEST_SELLER_TERMS)) {
    return getBestSellerProducts(180);
  }

  const tokens = lowerQuery.split(/\s+/).filter(Boolean);

  const results = allProducts
    .map((product) => {
      const name = product.name.toLowerCase();
      const brand = product.brand.toLowerCase();
      const description = product.description.toLowerCase();
      const subcategory = String(product.subcategory || "").toLowerCase();
      const categoryName = CATEGORY_NAME_BY_SLUG[product.categorySlug] || "";
      const categorySlug = String(product.categorySlug || "").toLowerCase();

      let score = 0;

      if (name.includes(lowerQuery)) score += 16;
      if (brand.includes(lowerQuery)) score += 10;
      if (subcategory.includes(lowerQuery)) score += 10;
      if (categoryName.includes(lowerQuery) || categorySlug.includes(lowerQuery)) score += 8;
      if (description.includes(lowerQuery)) score += 6;

      tokens.forEach((token) => {
        if (name.includes(token)) score += 4;
        if (brand.includes(token)) score += 3;
        if (subcategory.includes(token)) score += 3;
        if (categoryName.includes(token) || categorySlug.includes(token)) score += 2;
        if (description.includes(token)) score += 1;
      });

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.product.reviewCount - a.product.reviewCount;
    })
    .map((item) => item.product);

  return results;
}

// Filter products
export function filterProducts(
  categorySlug,
  filters,
  sortBy
) {
  let filtered = categorySlug
    ? allProducts.filter(p => p.categorySlug === categorySlug)
    : allProducts;

  if (filters?.brands?.length) {
    filtered = filtered.filter(p => filters.brands.includes(p.brand));
  }

  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter(p => p.discountPrice >= filters.minPrice);
  }

  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.discountPrice <= filters.maxPrice);
  }

  if (filters?.minRating !== undefined) {
    filtered = filtered.filter(p => p.ratingAvg >= filters.minRating);
  }

  if (filters?.subcategories?.length) {
    filtered = filtered.filter(p => filters.subcategories.includes(p.subcategory));
  }

  if (sortBy) {
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.ratingAvg - a.ratingAvg);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const discA = ((a.price - a.discountPrice) / a.price) * 100;
          const discB = ((b.price - b.discountPrice) / b.price) * 100;
          return discB - discA;
        });
        break;
    }
  }

  return filtered;
}

// Get all brands for a category
export function getBrandsByCategory(categorySlug) {
  const products = getProductsByCategory(categorySlug);
  return [...new Set(products.map(p => p.brand))];
}

// Get price range for a category
export function getPriceRange(categorySlug) {
  const products = categorySlug
    ? getProductsByCategory(categorySlug)
    : allProducts;

  if (products.length === 0) return { min: 0, max: 100000 };

  const prices = products.map(p => p.discountPrice);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

// Get category by slug
export function getCategoryBySlug(slug) {
  return categories.find(c => c.slug === slug);
}


