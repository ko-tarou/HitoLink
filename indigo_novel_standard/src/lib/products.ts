// Product data from indigo1998.com - Shop Pro image URL format
const IMG_BASE = "https://img13.shop-pro.jp/PA01278/378/product";
const STORE_URL = "https://indigo1998.com";

export function getProductImageUrl(pid: string, size: "main" | "thumb" = "main") {
  const suffix = size === "thumb" ? "_th" : "";
  return `${IMG_BASE}/${pid}${suffix}.jpg`;
}

export function getProductUrl(pid: string) {
  return `${STORE_URL}/?pid=${pid}`;
}

// Featured NEW ARRIVAL products from indigo1998.com
export const NEW_ARRIVAL_PRODUCTS = [
  { pid: "190135366", name: "ZUCCINI sweat", brand: "KEIMEN", price: "16,500" },
  { pid: "190135361", name: "BROCCOLI sweat", brand: "KEIMEN", price: "16,500" },
  { pid: "190135360", name: "Easy belt", brand: "KEIMEN", price: "11,880" },
  { pid: "190140357", name: '"NARROW ROPE"', brand: "B:TOGETHER", price: "9,900" },
  { pid: "189965438", name: "College Logo L/S T-shirt", brand: "Hollywood Ranch Market", price: "22,000" },
  { pid: "189954208", name: "SNOOPY / SD Cozy Monday Crew Sweat", brand: "STANDARD CALIFORNIA", price: "27,500" },
  { pid: "189167103", name: "AN406 SIDE LIB SWEAT PARKA", brand: "ANACHRONORM", price: "28,600" },
  { pid: "189854058", name: "Digs Crew Half", brand: "SASSAFRAS", price: "44,000" },
  { pid: "189768205", name: "H-90T SD", brand: "BRIEFING", price: "93,500" },
];

// Products for Collection Bento grid (by category)
export const COLLECTION_PRODUCTS = {
  mens: [
    { pid: "189167103", name: "SIDE LIB SWEAT PARKA", brand: "ANACHRONORM" },
    { pid: "189954208", name: "Cozy Monday Crew Sweat", brand: "STANDARD CALIFORNIA" },
  ],
  womens: [
    { pid: "189854058", name: "Digs Crew Half", brand: "SASSAFRAS" },
    { pid: "189448760", name: "LOVE ZEBRA Pants", brand: "Bohemians" },
  ],
  kids: [
    { pid: "189966464", name: "ぬいぐるみ 25cm", brand: "NICI×SANTA CRUZ" },
    { pid: "189966431", name: "キーホルダー 10cm", brand: "NICI×SANTA CRUZ" },
  ],
  goods: [
    { pid: "189768205", name: "H-90T SD", brand: "BRIEFING" },
    { pid: "190185901", name: "ウォレット", brand: "IL BISONTE" },
  ],
};

export const ONLINE_STORE_URL = STORE_URL;
