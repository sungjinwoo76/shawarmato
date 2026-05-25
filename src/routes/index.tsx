import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Star, Clock, Flame, ShoppingCart, Plus, Minus, X, CheckCircle2, ChefHat, Bike, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import heroImg from "@/assets/hero-shawarma.jpg";
import imgChicken from "@/assets/food-chicken-shawarma.jpg";
import imgBeef from "@/assets/food-beef-shawarma.jpg";
import imgMutton from "@/assets/food-mutton.jpg";
import imgPlatter from "@/assets/food-platter.jpg";
import imgKebab from "@/assets/food-kebab.jpg";
import imgFalafel from "@/assets/food-falafel.jpg";
import imgVeg from "@/assets/food-veg.jpg";
import imgCombo from "@/assets/food-combo.jpg";
import imgSides from "@/assets/food-sides.jpg";
import imgDessert from "@/assets/food-dessert.jpg";
import imgDrinks from "@/assets/food-drinks.jpg";

const CATEGORY_IMG: Record<string, string> = {
  "Chicken Shawarma": imgChicken,
  "Beef Shawarma": imgBeef,
  "Mutton": imgMutton,
  "Platters": imgPlatter,
  "Kebabs": imgKebab,
  "Falafel": imgFalafel,
  "Veg": imgVeg,
  "Combos": imgCombo,
  "Sides": imgSides,
  "Desserts": imgDessert,
  "Drinks": imgDrinks,
};
const pickImg = (s: string) => {
  const t = s.toLowerCase();
  if (t.includes("dessert") || t.includes("baklava") || t.includes("kunafa") || t.includes("halwa")) return imgDessert;
  if (t.includes("drink") || t.includes("lemonade") || t.includes("coffee") || t.includes("falooda")) return imgDrinks;
  if (t.includes("kebab") || t.includes("doner") || t.includes("seekh") || t.includes("adana")) return imgKebab;
  if (t.includes("falafel")) return imgFalafel;
  if (t.includes("paneer") || t.includes("veg") || t.includes("mushroom") || t.includes("corn") || t.includes("hummus")) return imgVeg;
  if (t.includes("mutton") || t.includes("lamb")) return imgMutton;
  if (t.includes("beef")) return imgBeef;
  if (t.includes("platter") || t.includes("plate") || t.includes("mixed grill")) return imgPlatter;
  if (t.includes("combo") || t.includes("bucket") || t.includes("box") || t.includes("family")) return imgCombo;
  if (t.includes("fries") || t.includes("pita") || t.includes("chips") || t.includes("side")) return imgSides;
  return imgChicken;
};

export const Route = createFileRoute("/")({ component: Index });

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  time: string;
  priceForTwo: number;
  emoji: string;
  tags: string[];
  offer?: string;
  items: { name: string; price: number; veg?: boolean }[];
};

const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Aleppo House",
    cuisine: "Syrian, Shawarma, Grills",
    rating: 4.6,
    time: "25-30 min",
    priceForTwo: 450,
    emoji: "🌯",
    tags: ["Bestseller", "Pure Halal"],
    offer: "50% OFF up to ₹100",
    items: [
      { name: "Classic Chicken Shawarma", price: 180 },
      { name: "Beef Shawarma Plate", price: 320 },
      { name: "Hummus & Pita", price: 150, veg: true },
    ],
  },
  {
    id: "2",
    name: "Damascus Grill",
    cuisine: "Middle Eastern, Mezze",
    rating: 4.4,
    time: "30-35 min",
    priceForTwo: 600,
    emoji: "🥙",
    tags: ["Premium"],
    offer: "Free delivery",
    items: [
      { name: "Mixed Grill Platter", price: 550 },
      { name: "Lamb Shawarma Roll", price: 260 },
      { name: "Falafel Wrap", price: 160, veg: true },
    ],
  },
  {
    id: "3",
    name: "Beirut Bites",
    cuisine: "Lebanese, Wraps",
    rating: 4.7,
    time: "20-25 min",
    priceForTwo: 350,
    emoji: "🫓",
    tags: ["Fast Delivery"],
    offer: "20% OFF",
    items: [
      { name: "Cheese Shawarma", price: 200 },
      { name: "Spicy Chicken Roll", price: 190 },
      { name: "Garlic Sauce Fries", price: 120, veg: true },
    ],
  },
  {
    id: "4",
    name: "Istanbul Doner Co.",
    cuisine: "Turkish, Doner, Kebabs",
    rating: 4.5,
    time: "35-40 min",
    priceForTwo: 500,
    emoji: "🍢",
    tags: ["Trending"],
    items: [
      { name: "Turkish Doner Kebab", price: 280 },
      { name: "Adana Wrap", price: 240 },
      { name: "Baklava (4 pcs)", price: 180, veg: true },
    ],
  },
  {
    id: "5",
    name: "Pita & Co.",
    cuisine: "Mediterranean, Healthy",
    rating: 4.3,
    time: "25-30 min",
    priceForTwo: 400,
    emoji: "🥗",
    tags: ["Healthy"],
    offer: "Buy 1 Get 1",
    items: [
      { name: "Chicken Shawarma Bowl", price: 260 },
      { name: "Veggie Shawarma", price: 180, veg: true },
      { name: "Tzatziki & Pita", price: 140, veg: true },
    ],
  },
  {
    id: "6",
    name: "The Wrap Lab",
    cuisine: "Fusion Shawarma",
    rating: 4.2,
    time: "30-35 min",
    priceForTwo: 380,
    emoji: "🌶️",
    tags: ["New"],
    items: [
      { name: "Peri-Peri Shawarma", price: 220 },
      { name: "BBQ Beef Wrap", price: 270 },
      { name: "Cheesy Loaded Fries", price: 160, veg: true },
    ],
  },
];

// Best-price catalog — researched from popular Indian shawarma chains
// (Shawarma King, Kababish, Mr. Beast Shawarma, Lebanese Point, Faasos, Behrouz, Zomato/Swiggy averages 2025)
type ShawarmaItem = {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;        // best price found
  marketPrice: number;  // typical market price (to show discount)
  rating: number;
  veg?: boolean;
  spicy?: boolean;
  bestseller?: boolean;
};

const SHAWARMA_ITEMS: ShawarmaItem[] = [
  { id: "i1",  name: "Classic Chicken Shawarma Roll",  emoji: "🌯", category: "Chicken Shawarma", price: 99,  marketPrice: 149, rating: 4.6, bestseller: true },
  { id: "i2",  name: "Double Chicken Shawarma",        emoji: "🌯", category: "Chicken Shawarma", price: 169, marketPrice: 220, rating: 4.7, bestseller: true },
  { id: "i3",  name: "Cheese Burst Chicken Shawarma",  emoji: "🧀", category: "Chicken Shawarma", price: 179, marketPrice: 230, rating: 4.5 },
  { id: "i4",  name: "Peri-Peri Chicken Shawarma",     emoji: "🌶️", category: "Chicken Shawarma", price: 159, marketPrice: 210, rating: 4.6, spicy: true },
  { id: "i5",  name: "Tandoori Chicken Shawarma",      emoji: "🔥", category: "Chicken Shawarma", price: 149, marketPrice: 199, rating: 4.4 },
  { id: "i6",  name: "Mexican Chicken Shawarma",       emoji: "🌮", category: "Chicken Shawarma", price: 169, marketPrice: 220, rating: 4.3 },
  { id: "i7",  name: "Smoky BBQ Chicken Shawarma",     emoji: "🍗", category: "Chicken Shawarma", price: 175, marketPrice: 229, rating: 4.5 },
  { id: "i8",  name: "Afghani Chicken Shawarma",       emoji: "🥘", category: "Chicken Shawarma", price: 189, marketPrice: 249, rating: 4.6 },

  { id: "i9",  name: "Classic Beef Shawarma Roll",     emoji: "🥩", category: "Beef Shawarma",    price: 199, marketPrice: 270, rating: 4.7, bestseller: true },
  { id: "i10", name: "Double Beef Shawarma",           emoji: "🥩", category: "Beef Shawarma",    price: 269, marketPrice: 349, rating: 4.6 },
  { id: "i11", name: "Beef Cheese Shawarma",           emoji: "🧀", category: "Beef Shawarma",    price: 249, marketPrice: 320, rating: 4.5 },
  { id: "i12", name: "Spicy Arabic Beef Shawarma",     emoji: "🌶️", category: "Beef Shawarma",    price: 229, marketPrice: 299, rating: 4.4, spicy: true },

  { id: "i13", name: "Mutton Shawarma Roll",           emoji: "🍖", category: "Mutton",           price: 249, marketPrice: 329, rating: 4.6 },
  { id: "i14", name: "Lamb Shawarma Platter",          emoji: "🍽️", category: "Platters",         price: 449, marketPrice: 599, rating: 4.7, bestseller: true },
  { id: "i15", name: "Turkish Doner Kebab",            emoji: "🍢", category: "Kebabs",           price: 229, marketPrice: 299, rating: 4.5 },
  { id: "i16", name: "Adana Kebab Wrap",               emoji: "🍢", category: "Kebabs",           price: 219, marketPrice: 289, rating: 4.4 },
  { id: "i17", name: "Seekh Kebab Shawarma",           emoji: "🍢", category: "Kebabs",           price: 189, marketPrice: 239, rating: 4.3 },

  { id: "i18", name: "Falafel Shawarma Wrap",          emoji: "🧆", category: "Falafel",          price: 119, marketPrice: 169, rating: 4.5, veg: true },
  { id: "i19", name: "Paneer Tikka Shawarma",          emoji: "🧀", category: "Veg",              price: 129, marketPrice: 179, rating: 4.4, veg: true, bestseller: true },
  { id: "i20", name: "Veggie Hummus Shawarma",         emoji: "🥗", category: "Veg",              price: 109, marketPrice: 159, rating: 4.2, veg: true },
  { id: "i21", name: "Mushroom Cheese Shawarma",       emoji: "🍄", category: "Veg",              price: 139, marketPrice: 189, rating: 4.3, veg: true },
  { id: "i22", name: "Corn & Cheese Shawarma",         emoji: "🌽", category: "Veg",              price: 119, marketPrice: 169, rating: 4.1, veg: true },

  { id: "i23", name: "Chicken Shawarma Plate",         emoji: "🍽️", category: "Platters",         price: 299, marketPrice: 399, rating: 4.6 },
  { id: "i24", name: "Mixed Grill Platter",            emoji: "🍽️", category: "Platters",         price: 499, marketPrice: 649, rating: 4.7, bestseller: true },
  { id: "i25", name: "Family Shawarma Bucket (6 pc)",  emoji: "🪣", category: "Combos",           price: 549, marketPrice: 749, rating: 4.6, bestseller: true },
  { id: "i26", name: "Shawarma Box for Two",           emoji: "📦", category: "Combos",           price: 349, marketPrice: 459, rating: 4.5 },

  { id: "i27", name: "Hummus with Pita",               emoji: "🫓", category: "Sides",            price: 129, marketPrice: 179, rating: 4.4, veg: true },
  { id: "i28", name: "Garlic Sauce Fries",             emoji: "🍟", category: "Sides",            price: 99,  marketPrice: 139, rating: 4.3, veg: true },
  { id: "i29", name: "Loaded Cheesy Fries",            emoji: "🍟", category: "Sides",            price: 149, marketPrice: 199, rating: 4.5, veg: true },
  { id: "i30", name: "Pita Chips & Dips",              emoji: "🫓", category: "Sides",            price: 89,  marketPrice: 129, rating: 4.2, veg: true },

  { id: "i31", name: "Baklava (4 pcs)",                emoji: "🍯", category: "Desserts",         price: 159, marketPrice: 219, rating: 4.6, veg: true },
  { id: "i32", name: "Kunafa Cheese Dessert",          emoji: "🍰", category: "Desserts",         price: 199, marketPrice: 269, rating: 4.7, veg: true, bestseller: true },
  { id: "i33", name: "Date & Almond Halwa",            emoji: "🍮", category: "Desserts",         price: 129, marketPrice: 169, rating: 4.3, veg: true },

  { id: "i34", name: "Mint Lemonade",                  emoji: "🥤", category: "Drinks",           price: 69,  marketPrice: 99,  rating: 4.4, veg: true },
  { id: "i35", name: "Cold Coffee Arabica",            emoji: "☕", category: "Drinks",           price: 129, marketPrice: 169, rating: 4.5, veg: true },
  { id: "i36", name: "Rose Falooda",                   emoji: "🥛", category: "Drinks",           price: 119, marketPrice: 159, rating: 4.3, veg: true },
];

const CATEGORIES = [
  { name: "Chicken Shawarma", emoji: "🍗" },
  { name: "Beef Shawarma", emoji: "🥩" },
  { name: "Falafel", emoji: "🧆" },
  { name: "Wraps", emoji: "🌯" },
  { name: "Platters", emoji: "🍽️" },
  { name: "Hummus", emoji: "🫘" },
  { name: "Kebabs", emoji: "🍢" },
  { name: "Desserts", emoji: "🍯" },
];

function Index() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Mumbai");
  const [filter, setFilter] = useState<"all" | "fast" | "rated" | "offers">("all");
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<Record<string, { name: string; price: number; qty: number }>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState<{
    id: string;
    items: { name: string; price: number; qty: number }[];
    total: number;
    stage: 0 | 1 | 2 | 3;
    placedAt: number;
  } | null>(null);
  const [trackerOpen, setTrackerOpen] = useState(false);

  const STAGES = [
    { label: "Confirmed", desc: "We've received your order", icon: CheckCircle2 },
    { label: "Preparing", desc: "Chef is wrapping it up", icon: ChefHat },
    { label: "On the way", desc: "Rider is heading to you", icon: Bike },
    { label: "Delivered", desc: "Enjoy your shawarma!", icon: PackageCheck },
  ] as const;

  useEffect(() => {
    if (!order || order.stage >= 3) return;
    const t = setTimeout(() => {
      setOrder((o) => {
        if (!o) return o;
        const next = (o.stage + 1) as 0 | 1 | 2 | 3;
        const s = STAGES[next];
        toast.success(`Order ${o.id}: ${s.label}`, { description: s.desc });
        return { ...o, stage: next };
      });
    }, 5000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.stage, order?.id]);


  const filtered = useMemo(() => {
    let r = RESTAURANTS.filter(
      (x) =>
        x.name.toLowerCase().includes(query.toLowerCase()) ||
        x.cuisine.toLowerCase().includes(query.toLowerCase()),
    );
    if (filter === "fast") r = r.filter((x) => parseInt(x.time) <= 25);
    if (filter === "rated") r = r.filter((x) => x.rating >= 4.5);
    if (filter === "offers") r = r.filter((x) => x.offer);
    return r;
  }, [query, filter]);

  const cartTotal = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = Object.values(cart).reduce((s, i) => s + i.qty, 0);

  const addToCart = (key: string, name: string, price: number) => {
    setCart((c) => ({
      ...c,
      [key]: { name, price, qty: (c[key]?.qty || 0) + 1 },
    }));
    toast.success(`${name} added to cart`);
  };
  const removeFromCart = (key: string) => {
    setCart((c) => {
      const n = { ...c };
      if (!n[key]) return n;
      if (n[key].qty <= 1) delete n[key];
      else n[key] = { ...n[key], qty: n[key].qty - 1 };
      return n;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌯</span>
            <span className="text-2xl font-extrabold tracking-tight text-primary">Shawarmato</span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-1 text-sm md:flex">
              <MapPin className="h-4 w-4 text-primary" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent font-medium outline-none cursor-pointer"
              >
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Dubai</option>
              </select>
            </div>
            {order && (
              <Button
                variant="outline"
                onClick={() => setTrackerOpen(true)}
                className="relative gap-2"
              >
                <Bike className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">Track Order</span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                  {STAGES[order.stage].label}
                </span>
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              {cartCount > 0 && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button onClick={() => toast.info("Sign in coming soon")}>Sign in</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center text-white">
            <Badge className="mb-4 bg-primary text-primary-foreground">#1 Shawarma Discovery</Badge>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Discover the best <span className="text-accent">shawarma</span> near you
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Order from the city's top-rated Middle Eastern joints. Hot, fresh, wrapped to perfection.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-xl bg-white p-2 shadow-2xl md:flex-row">
              <div className="flex flex-1 items-center gap-2 border-b px-3 md:border-b-0 md:border-r">
                <MapPin className="h-5 w-5 text-primary" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent py-2 text-foreground outline-none"
                >
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                  <option>Dubai</option>
                </select>
              </div>
              <div className="flex flex-[2] items-center gap-2 px-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search shawarma, restaurant, cuisine..."
                  className="border-0 text-foreground shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Prices Catalog */}
      <section className="container mx-auto px-4 pb-4">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge className="mb-2 bg-accent text-accent-foreground">🔥 Lowest prices online</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Best Shawarma Prices, <span className="text-primary">Hand-Picked</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {SHAWARMA_ITEMS.length} items · prices compared across top delivery apps · updated daily
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SHAWARMA_ITEMS
            .filter((i) => !query || i.name.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()))
            .map((item) => {
              const discount = Math.round(((item.marketPrice - item.price) / item.marketPrice) * 100);
              return (
                <Card
                  key={item.id}
                  className="group relative flex flex-col overflow-hidden border-2 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-2xl"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={pickImg(item.name + " " + item.category)}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {item.bestseller && (
                      <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
                        ⭐ Bestseller
                      </Badge>
                    )}
                    <Badge className="absolute right-2 top-2 bg-green-600 text-white">
                      -{discount}%
                    </Badge>
                    {item.veg !== undefined && (
                      <span
                        className={`absolute bottom-2 left-2 flex h-4 w-4 items-center justify-center border-2 ${
                          item.veg ? "border-green-600" : "border-red-600"
                        } bg-white`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            item.veg ? "bg-green-600" : "bg-red-600"
                          }`}
                        />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug">{item.name}</h3>
                    <div className="mt-1 flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-green-600 text-green-600" />
                      <span className="font-medium">{item.rating}</span>
                      <span className="text-muted-foreground">· {item.category}</span>
                      {item.spicy && <Flame className="h-3 w-3 text-destructive" />}
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div>
                        <div className="text-lg font-extrabold text-primary">₹{item.price}</div>
                        <div className="text-xs text-muted-foreground line-through">
                          ₹{item.marketPrice}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item.id, item.name, item.price)}
                        className="rounded-full shadow-md"
                      >
                        <Plus className="h-4 w-4" /> Add
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold">What's on your mind?</h2>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              onClick={() => setQuery(c.name)}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <span className="text-4xl transition-transform group-hover:scale-110">{c.emoji}</span>
              <span className="text-center text-xs font-medium">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Filters + List */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">
            {filtered.length} Shawarma Spots in {location}
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { k: "all", label: "All" },
              { k: "fast", label: "Fast Delivery" },
              { k: "rated", label: "Rating 4.5+" },
              { k: "offers", label: "Offers" },
            ].map((f) => (
              <Button
                key={f.k}
                variant={filter === f.k ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f.k as typeof filter)}
                className="rounded-full"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Card
              key={r.id}
              onClick={() => setSelected(r)}
              className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-accent/30 to-primary/10 text-7xl">
                <span className="transition-transform duration-500 group-hover:scale-125">
                  {r.emoji}
                </span>
                {r.offer && (
                  <div className="absolute bottom-2 left-2 rounded-md bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    <Flame className="mr-1 inline h-3 w-3" />
                    {r.offer}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold">{r.name}</h3>
                  <Badge className="bg-green-600 text-white">
                    <Star className="mr-1 h-3 w-3 fill-current" />
                    {r.rating}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.cuisine}</p>
                <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" /> {r.time}
                  </span>
                  <span className="font-medium">₹{r.priceForTwo} for two</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {r.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No restaurants found. Try a different search.
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/30">
        <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌯</span>
              <span className="text-xl font-extrabold text-primary">Shawarmato</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Wrapping the world, one shawarma at a time.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">For Restaurants</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Partner With Us</li>
              <li>Apps For You</li>
              <li>Business Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Learn More</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy</li>
              <li>Security</li>
              <li>Terms</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">
          © 2026 Shawarmato. All flavors reserved.
        </div>
      </footer>

      {/* Restaurant Menu Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selected.emoji}</span>
                  <div>
                    <DialogTitle className="text-2xl">{selected.name}</DialogTitle>
                    <DialogDescription>{selected.cuisine}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex items-center gap-4 border-y py-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-green-600 text-green-600" />
                  {selected.rating}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" /> {selected.time}
                </span>
                <span className="ml-auto font-medium">₹{selected.priceForTwo} for two</span>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Menu</h4>
                {selected.items.map((item, i) => {
                  const key = `${selected.id}-${i}`;
                  const inCart = cart[key];
                  return (
                    <div key={key} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-block h-3 w-3 border ${item.veg ? "border-green-600" : "border-red-600"}`}>
                            <span className={`mx-auto block h-1.5 w-1.5 translate-x-[3px] translate-y-[3px] rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
                          </span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">₹{item.price}</p>
                      </div>
                      {inCart ? (
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => removeFromCart(key)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center font-medium">{inCart.qty}</span>
                          <Button size="icon" onClick={() => addToCart(key, item.name, item.price)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => addToCart(key, item.name, item.price)}>
                          <Plus className="h-3 w-3" /> Add
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Dialog */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>
              {cartCount === 0 ? "Your cart is empty" : `${cartCount} item(s)`}
            </DialogDescription>
          </DialogHeader>
          {cartCount > 0 && (
            <>
              <div className="space-y-2">
                {Object.entries(cart).map(([k, item]) => (
                  <div key={k} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ₹{item.price} × {item.qty}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">₹{item.price * item.qty}</span>
                      <Button size="icon" variant="ghost" onClick={() => setCart((c) => { const n = {...c}; delete n[k]; return n; })}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-primary">₹{cartTotal}</span>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  const items = Object.values(cart);
                  const id = `SW${Math.floor(1000 + Math.random() * 9000)}`;
                  setOrder({ id, items, total: cartTotal, stage: 0, placedAt: Date.now() });
                  toast.success(`Order ${id} confirmed! 🌯`, {
                    description: "We're preparing your shawarma.",
                  });
                  setCart({});
                  setCartOpen(false);
                  setTrackerOpen(true);
                }}
              >
                Checkout
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Tracker Dialog */}
      <Dialog open={trackerOpen} onOpenChange={setTrackerOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
            <DialogDescription>
              {order ? `Order ${order.id} • ₹${order.total}` : "No active order"}
            </DialogDescription>
          </DialogHeader>
          {order && (
            <div className="space-y-4">
              <div className="space-y-3">
                {STAGES.map((s, i) => {
                  const Icon = s.icon;
                  const done = i < order.stage;
                  const active = i === order.stage;
                  return (
                    <div key={s.label} className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          done
                            ? "border-green-600 bg-green-600 text-white"
                            : active
                            ? "border-primary bg-primary text-primary-foreground animate-pulse"
                            : "border-muted bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className={`font-semibold ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`}>
                          {s.label}
                          {active && <span className="ml-2 text-xs font-normal text-muted-foreground">in progress…</span>}
                          {done && <span className="ml-2 text-xs font-normal text-green-600">✓</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                <div className="mb-1 font-medium">Items</div>
                {order.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-muted-foreground">
                    <span>{it.name} × {it.qty}</span>
                    <span>₹{it.price * it.qty}</span>
                  </div>
                ))}
              </div>
              {order.stage === 3 && (
                <Button className="w-full" onClick={() => { setOrder(null); setTrackerOpen(false); }}>
                  Done
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
