import { allProducts } from "../data/products.js";

const BANNER_GRADIENTS = [
  { from: "#0f172a", to: "#1d4ed8" },
  { from: "#1f2937", to: "#0ea5e9" },
  { from: "#0b1324", to: "#7c3aed" },
  { from: "#111827", to: "#ea580c" },
  { from: "#172554", to: "#0891b2" },
  { from: "#1e1b4b", to: "#c026d3" },
];

const BADGE_SETS = [
  ["Top Rated", "Fast Shipping", "Nexora Assured"],
  ["Verified Seller", "Express Dispatch"],
  ["Trusted Store", "Easy Returns", "Secure Payments"],
  ["Top Rated", "24x7 Support"],
];

function toSellerSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function hashString(value) {
  return String(value).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function between(seed, min, max) {
  const range = max - min + 1;
  return min + (seed % range);
}

const sellers = (() => {
  const grouped = new Map();

  allProducts.forEach((product) => {
    if (!grouped.has(product.brand)) {
      grouped.set(product.brand, []);
    }
    grouped.get(product.brand).push(product);
  });

  return [...grouped.entries()].map(([brand, products], index) => {
    const seed = hashString(brand);
    const ratingAvg = Math.round((4 + (seed % 8) / 10) * 10) / 10;
    const reviewCount = between(seed * 3, 800, 28000);
    const followers = between(seed * 5, 1200, 220000);
    const responseRate = between(seed * 7, 89, 99);
    const yearsOnPlatform = between(seed, 2, 11);
    const shipTimeDays = between(seed * 11, 1, 3);
    const gradients = BANNER_GRADIENTS[index % BANNER_GRADIENTS.length];
    const badges = BADGE_SETS[index % BADGE_SETS.length];
    const categorySet = [...new Set(products.map((product) => product.categorySlug))];

    return {
      id: `seller-${toSellerSlug(brand)}`,
      brand,
      slug: toSellerSlug(brand),
      name: `${brand} Official Store`,
      about: `${brand} official marketplace store with authentic products, verified quality checks and fast dispatch.`,
      ratingAvg,
      reviewCount,
      followers,
      responseRate,
      yearsOnPlatform,
      shipTimeDays,
      badges,
      categories: categorySet,
      bannerFrom: gradients.from,
      bannerTo: gradients.to,
    };
  });
})();

const sellersBySlug = new Map(sellers.map((seller) => [seller.slug, seller]));
const sellersByBrand = new Map(sellers.map((seller) => [seller.brand, seller]));

export function getAllSellers() {
  return [...sellers].sort((a, b) => b.followers - a.followers);
}

export function getSellerBySlug(slug) {
  return sellersBySlug.get(slug);
}

export function getSellerByBrand(brand) {
  return sellersByBrand.get(brand);
}

export function getProductsBySellerSlug(slug) {
  const seller = getSellerBySlug(slug);
  if (!seller) {
    return [];
  }
  return allProducts.filter((product) => product.brand === seller.brand);
}

