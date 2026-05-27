import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search, MapPin, Star, Flame, ShoppingCart, Plus, Minus,
  CheckCircle2, ChefHat, Bike, PackageCheck, Zap, Timer, Users, Sparkles,
  Award, TrendingUp, Heart, Leaf, ChevronLeft, ChevronRight, Tv, Phone,
  Gift, Lock, Smile, Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
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
import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.jpg";

const pickImg = (s: string) => {
  const t = s.toLowerCase();
  if (t.includes("dessert") || t.includes("baklava") || t.includes("kunafa") || t.includes("halwa")) return imgDessert;
  if (t.includes("drink") || t.includes("lemonade") || t.includes("coffee") || t.includes("falooda") || t.includes("ayran")) return imgDrinks;
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

type ShawarmaItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  marketPrice: number;
  rating: number;
  reviews: number;
  veg?: boolean;
  spicy?: boolean;
  bestseller?: boolean;
  scarce?: number; // "only N left at this price"
};

const SHAWARMA_ITEMS: ShawarmaItem[] = [
  { id: "i1",  name: "Classic Chicken Shawarma Roll",  category: "Chicken", price: 99,  marketPrice: 149, rating: 4.6, reviews: 12483, bestseller: true, scarce: 9 },
  { id: "i2",  name: "Double Chicken Shawarma",        category: "Chicken", price: 169, marketPrice: 220, rating: 4.7, reviews: 8214,  bestseller: true },
  { id: "i3",  name: "Cheese Burst Chicken Shawarma",  category: "Chicken", price: 179, marketPrice: 230, rating: 4.5, reviews: 5621 },
  { id: "i4",  name: "Peri-Peri Chicken Shawarma",     category: "Chicken", price: 159, marketPrice: 210, rating: 4.6, reviews: 4982, spicy: true, scarce: 6 },
  { id: "i5",  name: "Tandoori Chicken Shawarma",      category: "Chicken", price: 149, marketPrice: 199, rating: 4.4, reviews: 3120 },
  { id: "i6",  name: "Smoky BBQ Chicken Shawarma",     category: "Chicken", price: 175, marketPrice: 229, rating: 4.5, reviews: 2870 },
  { id: "i7",  name: "Afghani Chicken Shawarma",       category: "Chicken", price: 189, marketPrice: 249, rating: 4.6, reviews: 2102 },
  { id: "i8",  name: "Lebanese Garlic Chicken",        category: "Chicken", price: 165, marketPrice: 219, rating: 4.7, reviews: 1840 },

  { id: "i9",  name: "Classic Beef Shawarma Roll",     category: "Beef", price: 199, marketPrice: 270, rating: 4.7, reviews: 6492, bestseller: true },
  { id: "i10", name: "Double Beef Shawarma",           category: "Beef", price: 269, marketPrice: 349, rating: 4.6, reviews: 3210 },
  { id: "i11", name: "Beef Cheese Shawarma",           category: "Beef", price: 249, marketPrice: 320, rating: 4.5, reviews: 2150, scarce: 4 },
  { id: "i12", name: "Spicy Arabic Beef Shawarma",     category: "Beef", price: 229, marketPrice: 299, rating: 4.4, reviews: 1820, spicy: true },

  { id: "i13", name: "Mutton Shawarma Roll",           category: "Mutton", price: 249, marketPrice: 329, rating: 4.6, reviews: 1680 },
  { id: "i14", name: "Lamb Shawarma Platter",          category: "Platters", price: 449, marketPrice: 599, rating: 4.7, reviews: 980, bestseller: true },
  { id: "i15", name: "Turkish Doner Kebab",            category: "Kebabs", price: 229, marketPrice: 299, rating: 4.5, reviews: 2210 },
  { id: "i16", name: "Adana Kebab Wrap",               category: "Kebabs", price: 219, marketPrice: 289, rating: 4.4, reviews: 1430 },
  { id: "i17", name: "Seekh Kebab Shawarma",           category: "Kebabs", price: 189, marketPrice: 239, rating: 4.3, reviews: 1180 },

  { id: "i18", name: "Falafel Shawarma Wrap",          category: "Veg", price: 119, marketPrice: 169, rating: 4.5, reviews: 3982, veg: true },
  { id: "i19", name: "Paneer Tikka Shawarma",          category: "Veg", price: 129, marketPrice: 179, rating: 4.4, reviews: 5210, veg: true, bestseller: true },
  { id: "i20", name: "Veggie Hummus Shawarma",         category: "Veg", price: 109, marketPrice: 159, rating: 4.2, reviews: 1840, veg: true },
  { id: "i21", name: "Mushroom Cheese Shawarma",       category: "Veg", price: 139, marketPrice: 189, rating: 4.3, reviews: 1230, veg: true },
  { id: "i22", name: "Corn & Cheese Shawarma",         category: "Veg", price: 119, marketPrice: 169, rating: 4.1, reviews: 980, veg: true },

  { id: "i23", name: "Chicken Shawarma Plate",         category: "Platters", price: 299, marketPrice: 399, rating: 4.6, reviews: 1820 },
  { id: "i24", name: "Mixed Grill Platter",            category: "Platters", price: 499, marketPrice: 649, rating: 4.7, reviews: 1240, bestseller: true },
  { id: "i25", name: "Family Shawarma Bucket (6 pc)",  category: "Combos", price: 549, marketPrice: 749, rating: 4.6, reviews: 980, bestseller: true, scarce: 3 },
  { id: "i26", name: "Shawarma Box for Two",           category: "Combos", price: 349, marketPrice: 459, rating: 4.5, reviews: 1450 },

  { id: "i27", name: "Hummus with Pita",               category: "Sides", price: 129, marketPrice: 179, rating: 4.4, reviews: 2120, veg: true },
  { id: "i28", name: "Garlic Sauce Fries",             category: "Sides", price: 99,  marketPrice: 139, rating: 4.3, reviews: 3210, veg: true },
  { id: "i29", name: "Loaded Cheesy Fries",            category: "Sides", price: 149, marketPrice: 199, rating: 4.5, reviews: 4120, veg: true, bestseller: true },
  { id: "i30", name: "Pita Chips & Dips",              category: "Sides", price: 89,  marketPrice: 129, rating: 4.2, reviews: 1480, veg: true },

  { id: "i31", name: "Baklava (4 pcs)",                category: "Desserts", price: 159, marketPrice: 219, rating: 4.6, reviews: 1820, veg: true },
  { id: "i32", name: "Kunafa Cheese Dessert",          category: "Desserts", price: 199, marketPrice: 269, rating: 4.7, reviews: 1240, veg: true, bestseller: true },
  { id: "i33", name: "Date & Almond Halwa",            category: "Desserts", price: 129, marketPrice: 169, rating: 4.3, reviews: 820, veg: true },

  { id: "i34", name: "Mint Lemonade",                  category: "Drinks", price: 69,  marketPrice: 99,  rating: 4.4, reviews: 5210, veg: true },
  { id: "i35", name: "Cold Coffee Arabica",            category: "Drinks", price: 129, marketPrice: 169, rating: 4.5, reviews: 2120, veg: true },
  { id: "i36", name: "Rose Falooda",                   category: "Drinks", price: 119, marketPrice: 159, rating: 4.3, reviews: 1180, veg: true },
  { id: "i37", name: "Turkish Ayran",                  category: "Drinks", price: 79,  marketPrice: 119, rating: 4.2, reviews: 640, veg: true },
];

const CATEGORIES = [
  { name: "Chicken",  icon: "🍗", count: 8 },
  { name: "Beef",     icon: "🥩", count: 4 },
  { name: "Mutton",   icon: "🍖", count: 1 },
  { name: "Veg",      icon: "🌱", count: 5 },
  { name: "Kebabs",   icon: "🍢", count: 3 },
  { name: "Platters", icon: "🍽️", count: 3 },
  { name: "Combos",   icon: "📦", count: 2 },
  { name: "Sides",    icon: "🍟", count: 4 },
  { name: "Desserts", icon: "🍯", count: 3 },
  { name: "Drinks",   icon: "🥤", count: 4 },
];

// ============ BUILD-YOUR-OWN SHAWARMA ============
type Option = { id: string; label: string; price: number; emoji?: string; spicy?: boolean; veg?: boolean };

const BUILDER = {
  base: {
    title: "1. Choose your wrap",
    required: true,
    multi: false,
    options: [
      { id: "pita",    label: "Soft Pita",            price: 99,  emoji: "🫓", veg: true },
      { id: "tortilla",label: "Mexican Tortilla",     price: 109, emoji: "🌯", veg: true },
      { id: "saj",     label: "Lebanese Saj (thin)",  price: 119, emoji: "🥙", veg: true },
      { id: "bowl",    label: "Rice Bowl (no wrap)",  price: 129, emoji: "🍚", veg: true },
    ] as Option[],
  },
  protein: {
    title: "2. Pick your protein",
    required: true,
    multi: false,
    options: [
      { id: "chicken", label: "Grilled Chicken",     price: 80 },
      { id: "beef",    label: "Slow-Roast Beef",     price: 130 },
      { id: "mutton",  label: "Spiced Mutton",       price: 160 },
      { id: "shrimp",  label: "Garlic Shrimp",       price: 180 },
      { id: "falafel", label: "Crispy Falafel",      price: 60, veg: true },
      { id: "paneer",  label: "Tandoori Paneer",     price: 70, veg: true },
    ] as Option[],
  },
  cheese: {
    title: "3. Add cheese",
    required: false,
    multi: true,
    options: [
      { id: "mozz",    label: "Mozzarella",          price: 40, veg: true },
      { id: "ched",    label: "Cheddar",             price: 35, veg: true },
      { id: "feta",    label: "Crumbled Feta",       price: 50, veg: true },
    ] as Option[],
  },
  veggies: {
    title: "4. Load the veggies (free up to 4)",
    required: false,
    multi: true,
    options: [
      { id: "lettuce", label: "Lettuce",             price: 0, veg: true },
      { id: "tomato",  label: "Tomato",              price: 0, veg: true },
      { id: "onion",   label: "Pickled Onion",       price: 0, veg: true },
      { id: "cucum",   label: "Cucumber",            price: 0, veg: true },
      { id: "olive",   label: "Black Olives",        price: 20, veg: true },
      { id: "jalap",   label: "Jalapeños",           price: 15, veg: true, spicy: true },
      { id: "pepper",  label: "Roasted Peppers",     price: 25, veg: true },
    ] as Option[],
  },
  sauces: {
    title: "5. Pick your sauces",
    required: false,
    multi: true,
    options: [
      { id: "garlic",  label: "Toum Garlic",         price: 20, veg: true },
      { id: "tahini",  label: "Tahini",              price: 20, veg: true },
      { id: "harissa", label: "Spicy Harissa",       price: 25, veg: true, spicy: true },
      { id: "tzatz",   label: "Tzatziki",            price: 25, veg: true },
      { id: "bbq",     label: "Smoky BBQ",           price: 20, veg: true },
      { id: "hummus",  label: "Hummus drizzle",      price: 25, veg: true },
    ] as Option[],
  },
  spice: {
    title: "6. Spice level",
    required: true,
    multi: false,
    options: [
      { id: "mild",   label: "Mild 🌶",              price: 0 },
      { id: "med",    label: "Medium 🌶🌶",          price: 0, spicy: true },
      { id: "hot",    label: "Fire 🌶🌶🌶",          price: 10, spicy: true },
      { id: "insane", label: "Chef's Inferno 🔥",    price: 25, spicy: true },
    ] as Option[],
  },
  extras: {
    title: "7. Make it a meal",
    required: false,
    multi: true,
    options: [
      { id: "fries",   label: "Garlic Fries",        price: 79, veg: true },
      { id: "lemon",   label: "Mint Lemonade",       price: 59, veg: true },
      { id: "baklava", label: "Baklava (2 pc)",      price: 89, veg: true },
      { id: "hummus2", label: "Side Hummus + Pita",  price: 99, veg: true },
    ] as Option[],
  },
} as const;

type BuilderKey = keyof typeof BUILDER;
const BUILDER_KEYS: BuilderKey[] = ["base", "protein", "cheese", "veggies", "sauces", "spice", "extras"];

function Index() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Mumbai");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [cart, setCart] = useState<Record<string, { name: string; price: number; qty: number; note?: string }>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState<{
    id: string; items: { name: string; price: number; qty: number; note?: string }[];
    total: number; stage: 0 | 1 | 2 | 3; placedAt: number;
  } | null>(null);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [greetingOpen, setGreetingOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");

  // ====== Pop sound (WebAudio, no asset) ======
  const playPop = () => {
    try {
      const AC: typeof AudioContext =
        (window as unknown as { AudioContext: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const now = ctx.currentTime;
      // little two-note "ding-pop"
      [
        { f: 880, t: 0,    d: 0.12, v: 0.18 },
        { f: 1320, t: 0.09, d: 0.18, v: 0.22 },
      ].forEach(({ f, t, d, v }) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(f, now + t);
        o.frequency.exponentialRampToValueAtTime(f * 0.6, now + t + d);
        g.gain.setValueAtTime(0.0001, now + t);
        g.gain.exponentialRampToValueAtTime(v, now + t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, now + t + d);
        o.connect(g).connect(ctx.destination);
        o.start(now + t);
        o.stop(now + t + d + 0.02);
      });
      setTimeout(() => ctx.close(), 600);
    } catch { /* silent */ }
  };

  // ====== Psychology widgets state ======
  const [liveOrders, setLiveOrders] = useState(247);
  const [dealLeft, setDealLeft] = useState(15 * 60); // 15 min flash deal
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveOrders((n) => Math.max(180, Math.min(420, n + Math.floor(Math.random() * 7) - 3)));
    }, 2500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setDealLeft((s) => (s <= 0 ? 15 * 60 : s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setReviewIdx((i) => (i + 1) % REVIEWS.length), 4500);
    return () => clearInterval(t);
  }, []);

  // ====== Order tracker ======
  const STAGES = [
    { label: "Confirmed",  desc: "We've received your order",   icon: CheckCircle2 },
    { label: "Preparing",  desc: "Chef is wrapping it up",      icon: ChefHat },
    { label: "On the way", desc: "Rider is heading to you",     icon: Bike },
    { label: "Delivered",  desc: "Enjoy your shawarma!",        icon: PackageCheck },
  ] as const;

  useEffect(() => {
    if (!order || order.stage >= 3) return;
    const t = setTimeout(() => {
      setOrder((o) => {
        if (!o) return o;
        const next = (o.stage + 1) as 0 | 1 | 2 | 3;
        toast.success(`Order ${o.id}: ${STAGES[next].label}`, { description: STAGES[next].desc });
        return { ...o, stage: next };
      });
    }, 5000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.stage, order?.id]);

  // ====== Catalog filter ======
  const filteredItems = useMemo(() => {
    return SHAWARMA_ITEMS.filter((i) => {
      const q = query.toLowerCase();
      const matchQ = !q || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
      const matchC = activeCat === "All" || i.category === activeCat;
      return matchQ && matchC;
    });
  }, [query, activeCat]);

  // ====== Cart math ======
  const cartSubtotal = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const REWARD_THRESHOLD = 1000;
  const rewardUnlocked = cartSubtotal >= REWARD_THRESHOLD;
  const rewardDiscount = rewardUnlocked ? Math.round(cartSubtotal * 0.1) : 0;
  const deliveryFee = rewardUnlocked || cartSubtotal === 0 ? 0 : 49;
  const cartTotal = Math.max(0, cartSubtotal - rewardDiscount + deliveryFee);
  const rewardProgress = Math.min(100, (cartSubtotal / REWARD_THRESHOLD) * 100);
  const amountToReward = Math.max(0, REWARD_THRESHOLD - cartSubtotal);

  const addToCart = (key: string, name: string, price: number, note?: string) => {
    setCart((c) => {
      const prevSub = Object.values(c).reduce((s, i) => s + i.price * i.qty, 0);
      const next = { ...c, [key]: { name, price, qty: (c[key]?.qty || 0) + 1, note: note ?? c[key]?.note } };
      const nextSub = prevSub + price;
      if (prevSub < REWARD_THRESHOLD && nextSub >= REWARD_THRESHOLD) {
        playPop();
        setTimeout(() => {
          toast.success("🎉 Reward unlocked!", {
            description: "Free Baklava + Free Delivery + 10% OFF applied!",
          });
        }, 100);
      }
      return next;
    });
    toast.success(`${name} added`, { description: note ? "Custom build sent to chef 👨‍🍳" : undefined });
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

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />

      {/* ============ TOP UTILITY BAR ============ */}
      <div className="bg-charcoal text-cream">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-1.5 text-[11px] sm:text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-accent" /> 10-min express delivery</span>
            <span className="hidden md:flex items-center gap-1"><Award className="h-3 w-3 text-accent" /> 100% Halal certified</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 font-medium">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--success)" }} /></span>
            <span><b>{liveOrders}</b> people ordering right now</span>
          </div>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-xl shadow-warm">🌯</div>
            <div className="leading-none">
              <div className="text-xl font-black tracking-tight">Shawarmato</div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-primary">est. arabia</div>
            </div>
          </a>

          <button className="hidden lg:flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-left text-sm hover:border-primary transition-colors">
            <MapPin className="h-4 w-4 text-primary" />
            <div className="leading-tight">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase">Deliver to</div>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="bg-transparent font-bold outline-none cursor-pointer">
                <option>Mumbai</option><option>Delhi</option><option>Bangalore</option><option>Dubai</option>
              </select>
            </div>
          </button>

          <div className="hidden md:flex flex-1 items-center gap-2 rounded-xl border-2 bg-card px-4 py-2 focus-within:border-primary transition-colors">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search "chicken shawarma", "falafel"…' className="border-0 shadow-none p-0 focus-visible:ring-0 text-sm" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {order && (
              <Button variant="outline" onClick={() => setTrackerOpen(true)} className="relative gap-2 border-primary/40">
                <Bike className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline text-xs font-semibold">{STAGES[order.stage].label}</span>
              </Button>
            )}
            <Button onClick={() => setCartOpen(true)} className="relative shadow-warm">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 rounded-full bg-cream px-2 py-0.5 text-xs font-bold text-primary">{cartCount}</span>
              )}
            </Button>
          </div>
        </div>
        {/* mobile search */}
        <div className="md:hidden border-t px-4 py-2">
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search shawarma…" className="border-0 shadow-none p-0 focus-visible:ring-0 text-sm" />
          </div>
        </div>
      </header>

      {/* ============ REWARD STRIP ============ */}
      <div className="overflow-hidden bg-gradient-warm text-cream">
        <div className="container mx-auto flex items-center gap-6 px-4 py-2 text-xs font-bold whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee gap-12">
            {[1,2].map(k => (
              <div key={k} className="flex items-center gap-8">
                <span>🔥 FLASH DEAL ends in {fmtTime(dealLeft)}</span>
                <span>🎁 Spend ₹1000 → Free Baklava + Free Delivery + 10% OFF</span>
                <span>⚡ Express 10-min delivery in {location}</span>
                <span>👑 4.8★ rated by 1.2M+ shawarma lovers</span>
                <span>🌯 36+ legendary recipes from Aleppo, Beirut & Istanbul</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, oklch(0.18 0.025 40 / 0.92) 0%, oklch(0.18 0.025 40 / 0.6) 50%, oklch(0.18 0.025 40 / 0.3) 100%)" }} />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl text-cream animate-float-up">
            <Badge className="mb-4 bg-accent/20 text-accent border border-accent/40 backdrop-blur">
              <Sparkles className="mr-1 h-3 w-3" /> #1 Shawarma destination in {location}
            </Badge>
            <h1 className="text-balance text-5xl font-black leading-[1.02] md:text-7xl">
              <span className="block text-cream/95">Crave it.</span>
              <span className="block text-fancy drop-shadow-[0_2px_20px_rgba(255,120,60,0.35)]">Unwrap heaven.</span>
              <span className="mt-2 block text-2xl md:text-3xl font-semibold text-cream/80 tracking-tight">
                Slow-roasted shawarma, <span className="italic text-accent">obsessively</span> crafted.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-cream/85 leading-relaxed">
              Charcoal-kissed meats. Pillowy pita. Sauces stolen from <span className="text-accent font-semibold">Beirut grandmothers</span>. On your doorstep in 30 minutes — or it's <span className="font-bold text-cream">on the house</span>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="shadow-warm" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>
                <Flame className="h-4 w-4" /> Order in {location}
              </Button>
              <Button size="lg" variant="outline" className="border-cream/40 bg-cream/10 text-cream hover:bg-cream/20 backdrop-blur" onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })}>
                <ChefHat className="h-4 w-4" /> Build Your Own
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2"><div className="flex -space-x-2">{[1,2,3,4].map(i => <div key={i} className="h-7 w-7 rounded-full border-2 border-cream bg-gradient-warm" />)}</div><span><b>1.2M+</b> happy customers</span></div>
              <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /><b>4.8</b> · 240K reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="border-b bg-gradient-to-b from-card to-background">
        <div className="container mx-auto grid grid-cols-2 gap-3 px-4 py-8 md:grid-cols-4 md:gap-5">
          {[
            { icon: Zap,    title: "10-min express",  sub: "or it's on us",       tint: "from-amber-400 to-orange-500", glow: "shadow-[0_8px_30px_-8px_rgba(251,146,60,0.55)]" },
            { icon: Award,  title: "100% Halal",      sub: "certified daily",     tint: "from-emerald-400 to-teal-600", glow: "shadow-[0_8px_30px_-8px_rgba(20,184,166,0.5)]" },
            { icon: Users,  title: "1.2M+ fans",      sub: "served worldwide",    tint: "from-rose-400 to-red-600",     glow: "shadow-[0_8px_30px_-8px_rgba(244,63,94,0.55)]" },
            { icon: Heart,  title: "98% love it",     sub: "real verified ❤",     tint: "from-pink-400 to-fuchsia-600", glow: "shadow-[0_8px_30px_-8px_rgba(217,70,239,0.55)]" },
          ].map((t, i) => (
            <div
              key={i}
              className={`group relative flex items-center gap-3 rounded-2xl border-2 bg-gradient-card p-3 md:p-4 transition-all hover:-translate-y-1 hover:border-primary ${t.glow}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${t.tint} text-white shadow-lg`}>
                <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <t.icon className="h-7 w-7 animate-icon-pop drop-shadow" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <div className="text-base font-black tracking-tight">{t.title}</div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FLASH DEAL ============ */}
      <section className="container mx-auto px-4 pt-10">
        <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-card shadow-warm">
          <div className="flex flex-col md:flex-row items-center gap-6 p-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero text-3xl shadow-warm animate-pulse-ring">⚡</div>
            <div className="flex-1">
              <Badge className="mb-2 bg-primary text-primary-foreground">FLASH DEAL</Badge>
              <h3 className="text-2xl font-black">Today only: every shawarma under ₹200 — up to <span className="text-primary">45% OFF</span></h3>
              <p className="mt-1 text-sm text-muted-foreground">Hand-picked by our chefs. Stock refreshed daily. Once it's gone, it's gone.</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border-2 border-primary bg-primary/5 px-5 py-3">
              <Timer className="h-5 w-5 text-primary" />
              <div className="leading-tight">
                <div className="text-[10px] font-bold uppercase text-muted-foreground">Ends in</div>
                <div className="font-mono text-2xl font-black text-primary tabular-nums">{fmtTime(dealLeft)}</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ============ BUILD YOUR OWN SHAWARMA ============ */}
      <BuilderSection id="builder" addToCart={addToCart} />

      {/* ============ CATEGORIES ============ */}
      <section className="container mx-auto px-4 py-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <Badge className="mb-2 bg-accent/20 text-accent-foreground border border-accent/40">What's cravin'?</Badge>
            <h2 className="text-3xl font-black tracking-tight">Shop by category</h2>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          <CategoryChip name="All" icon="🔥" count={SHAWARMA_ITEMS.length} active={activeCat === "All"} onClick={() => setActiveCat("All")} />
          {CATEGORIES.map((c) => (
            <CategoryChip key={c.name} name={c.name} icon={c.icon} count={c.count} active={activeCat === c.name} onClick={() => setActiveCat(c.name)} />
          ))}
        </div>
      </section>

      {/* ============ CATALOG ============ */}
      <section id="catalog" className="container mx-auto px-4 pb-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              {activeCat === "All" ? "Best shawarmas" : activeCat} <span className="text-primary">in {location}</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredItems.length} items · best prices guaranteed · live updated
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="font-semibold">{liveOrders}</span>
            <span className="text-muted-foreground">orders in the last hour</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => <ItemCard key={item.id} item={item} qty={cart[item.id]?.qty || 0} onAdd={() => addToCart(item.id, item.name, item.price)} onRemove={() => removeFromCart(item.id)} />)}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No items found. Try another search.</div>
        )}
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-3 bg-accent/20 text-accent-foreground border border-accent/40">Real reviews · verified orders</Badge>
            <h2 className="text-3xl font-black tracking-tight">Loved by shawarma fanatics</h2>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <Card className="relative overflow-hidden border-2 p-8 text-center shadow-soft">
              <div className="absolute top-3 left-3 text-7xl leading-none opacity-10">"</div>
              <div key={reviewIdx} className="animate-float-up">
                <div className="flex justify-center gap-0.5 text-accent">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="mt-4 text-lg font-medium text-balance">"{REVIEWS[reviewIdx].text}"</p>
                <div className="mt-4 text-sm">
                  <div className="font-bold">{REVIEWS[reviewIdx].name}</div>
                  <div className="text-muted-foreground">{REVIEWS[reviewIdx].order} · verified order</div>
                </div>
              </div>
            </Card>
            <div className="mt-4 flex justify-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setReviewIdx(i)} className={`h-1.5 rounded-full transition-all ${i === reviewIdx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-charcoal text-cream">
        <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-xl shadow-warm">🌯</div>
              <span className="text-xl font-black">Shawarmato</span>
            </div>
            <p className="mt-3 text-sm text-cream/70">Wrapping the world, one shawarma at a time. Since 2026.</p>
          </div>
          {[
            { h: "Company", l: ["About Us", "Careers", "Press", "Blog"] },
            { h: "For chefs", l: ["Partner with us", "Restaurant app", "Become a rider"] },
            { h: "Learn more", l: ["Privacy", "Terms", "Contact", "Help"] },
          ].map((c) => (
            <div key={c.h}>
              <h4 className="mb-3 font-bold">{c.h}</h4>
              <ul className="space-y-2 text-sm text-cream/70">{c.l.map(x => <li key={x} className="hover:text-accent cursor-pointer transition-colors">{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/60">© 2026 Shawarmato · All flavors reserved.</div>
      </footer>

      {/* ============ CART ============ */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Your cart</DialogTitle>
            <DialogDescription>{cartCount === 0 ? "Your cart is empty" : `${cartCount} item(s)`}</DialogDescription>
          </DialogHeader>
          {cartCount > 0 ? (
            <>
              <div className={`rounded-xl border-2 p-3 ${rewardUnlocked ? "border-success bg-success/10" : "border-primary/30 bg-primary/5"}`}>
                {rewardUnlocked ? (
                  <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--success)" }}>🎉 Reward unlocked: Free Baklava + Free Delivery + 10% OFF</div>
                ) : (
                  <div className="text-sm font-medium">Add <span className="font-bold text-primary">₹{amountToReward}</span> more to unlock <span className="font-semibold"> 🥮 Free Baklava + 🚚 Free Delivery + 10% OFF</span></div>
                )}
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-warm transition-all duration-500" style={{ width: `${rewardProgress}%` }} />
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(cart).map(([k, item]) => (
                  <div key={k} className="flex items-center gap-3 rounded-lg border p-3">
                    <img src={pickImg(item.name)} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{item.name}</div>
                      {item.note && <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.note}</div>}
                      <div className="text-xs text-muted-foreground mt-1">₹{item.price} × {item.qty}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-full border-2 border-primary">
                        <button onClick={() => removeFromCart(k)} className="px-2 py-1 text-primary"><Minus className="h-3 w-3" /></button>
                        <span className="w-6 text-center text-sm font-bold text-primary">{item.qty}</span>
                        <button onClick={() => addToCart(k, item.name, item.price, item.note)} className="px-2 py-1 text-primary"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                ))}
                {rewardUnlocked && (
                  <div className="flex items-center gap-3 rounded-lg border-2 border-dashed p-3" style={{ borderColor: "var(--success)", background: "color-mix(in oklab, var(--success) 8%, transparent)" }}>
                    <img src={imgDessert} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-bold text-sm" style={{ color: "var(--success)" }}>Baklava (Complimentary) 🎁</div>
                      <div className="text-xs" style={{ color: "var(--success)" }}>Our gift for ordering ₹1000+</div>
                    </div>
                    <span className="font-bold text-sm" style={{ color: "var(--success)" }}>FREE</span>
                  </div>
                )}
              </div>
              <div className="space-y-1 border-t pt-3 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cartSubtotal}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className={deliveryFee === 0 ? "font-bold" : ""} style={deliveryFee === 0 ? { color: "var(--success)" } : undefined}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
                {rewardDiscount > 0 && (
                  <div className="flex justify-between font-bold" style={{ color: "var(--success)" }}><span>Reward discount (10%)</span><span>−₹{rewardDiscount}</span></div>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-primary">₹{cartTotal}</span>
                </div>
              </div>
              <Button size="lg" className="w-full shadow-warm text-base font-bold animate-pulse-ring" onClick={() => {
                const items = Object.values(cart);
                const id = `SW${Math.floor(1000 + Math.random() * 9000)}`;
                playPop();
                setOrder({ id, items, total: cartTotal, stage: 0, placedAt: Date.now() });
                toast.success(`Order ${id} confirmed! 🌯`, { description: "Chef is on it." });
                setCart({});
                setCartOpen(false);
                setGreetingOpen(true);
              }}>
                <Sparkles className="h-4 w-4" /> Place order · ₹{cartTotal}
              </Button>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="text-6xl">🛒</div>
              <p className="mt-3 text-muted-foreground">Add some shawarmas to get started</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ============ ORDER TRACKER ============ */}
      <Dialog open={trackerOpen} onOpenChange={setTrackerOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order tracking</DialogTitle>
            <DialogDescription>{order ? `Order ${order.id} • ₹${order.total}` : "No active order"}</DialogDescription>
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
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${done ? "border-transparent text-cream" : active ? "border-primary bg-primary text-primary-foreground animate-pulse" : "border-muted bg-muted text-muted-foreground"}`} style={done ? { background: "var(--success)" } : undefined}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className={`font-bold ${active ? "text-primary" : done ? "" : "text-muted-foreground"}`} style={done ? { color: "var(--success)" } : undefined}>
                          {s.label}
                          {active && <span className="ml-2 text-xs font-normal text-muted-foreground">in progress…</span>}
                          {done && <span className="ml-2 text-xs font-normal">✓</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                <div className="mb-1 font-bold">Items</div>
                {order.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-muted-foreground"><span>{it.name} × {it.qty}</span><span>₹{it.price * it.qty}</span></div>
                ))}
              </div>
              {order.stage === 3 && <Button className="w-full" onClick={() => { setOrder(null); setTrackerOpen(false); }}>Done</Button>}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ============ GREETING ============ */}
      <Dialog open={greetingOpen} onOpenChange={setGreetingOpen}>
        <DialogContent className="max-w-md overflow-hidden border-2 border-primary/30 bg-gradient-card">
          <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-warm opacity-30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-gradient-hero opacity-25 blur-3xl" />
          <DialogHeader className="relative">
            <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-hero text-5xl shadow-warm animate-confetti-burst">
              🌯
            </div>
            <DialogTitle className="text-center text-3xl font-black">
              <span className="text-fancy">Shukran{customerName ? `, ${customerName}` : ""}!</span>
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {order ? (
                <>Order <b className="text-primary">{order.id}</b> is sizzling on the grill. Our chef just smiled. 👨‍🍳</>
              ) : "Your order is in good hands."}
            </DialogDescription>
          </DialogHeader>
          <div className="relative space-y-3">
            <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-3 text-center text-sm">
              <div className="font-bold text-primary">A little secret from us 🤫</div>
              <div className="mt-1 text-muted-foreground">
                "The best shawarma is the one shared. Tag <b>@shawarmato</b> for a chance to win <b>free shawarma for a month</b>."
              </div>
            </div>
            {!customerName && (
              <Input
                placeholder="What should we call you? (optional)"
                onChange={(e) => setCustomerName(e.target.value.trim())}
                className="text-center font-semibold"
              />
            )}
            <Button
              size="lg"
              className="w-full shadow-warm"
              onClick={() => { setGreetingOpen(false); setTrackerOpen(true); }}
            >
              <Bike className="h-4 w-4" /> Track my shawarma
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Estimated arrival in <b className="text-foreground">28–32 min</b> · Keep the napkins ready 😋
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ Sub-components ============
function CategoryChip({ name, icon, count, active, onClick }: { name: string; icon: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex shrink-0 flex-col items-center gap-1 rounded-2xl border-2 px-5 py-3 transition-all min-w-[90px] ${active ? "border-primary bg-primary/10 shadow-warm -translate-y-0.5" : "border-border bg-card hover:border-primary/40 hover:-translate-y-0.5"}`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-bold">{name}</span>
      <span className="text-[10px] text-muted-foreground">{count} items</span>
    </button>
  );
}

function ItemCard({ item, qty, onAdd, onRemove }: { item: ShawarmaItem; qty: number; onAdd: () => void; onRemove: () => void }) {
  const discount = Math.round(((item.marketPrice - item.price) / item.marketPrice) * 100);
  return (
    <Card className="group relative flex flex-col overflow-hidden border-2 bg-gradient-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-warm">
      <div className="relative h-40 overflow-hidden">
        <img src={pickImg(item.name + " " + item.category)} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {item.bestseller && <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground shadow-warm">⭐ Bestseller</Badge>}
        <Badge className="absolute right-2 top-2 text-white shadow-warm" style={{ background: "var(--success)" }}>-{discount}%</Badge>
        {item.veg !== undefined && (
          <span className={`absolute bottom-2 left-2 flex h-4 w-4 items-center justify-center border-2 ${item.veg ? "border-green-600" : "border-red-600"} bg-white`}>
            <span className={`h-2 w-2 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
          </span>
        )}
        {item.scarce && (
          <Badge className="absolute bottom-2 right-2 bg-charcoal text-cream text-[10px] backdrop-blur">🔥 Only {item.scarce} left</Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug">{item.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs">
          <div className="flex items-center gap-0.5 rounded px-1.5 py-0.5 text-white font-bold" style={{ background: "var(--success)" }}>
            <Star className="h-2.5 w-2.5 fill-current" />
            {item.rating}
          </div>
          <span className="text-muted-foreground">({(item.reviews / 1000).toFixed(1)}k)</span>
          {item.spicy && <Flame className="h-3 w-3 text-destructive" />}
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <div className="text-lg font-black text-primary">₹{item.price}</div>
            <div className="text-xs text-muted-foreground line-through">₹{item.marketPrice}</div>
          </div>
          {qty > 0 ? (
            <div className="flex items-center rounded-full border-2 border-primary shadow-warm">
              <button onClick={onRemove} className="px-2 py-1 text-primary"><Minus className="h-3 w-3" /></button>
              <span className="w-5 text-center text-sm font-bold text-primary">{qty}</span>
              <button onClick={onAdd} className="px-2 py-1 text-primary"><Plus className="h-3 w-3" /></button>
            </div>
          ) : (
            <Button size="sm" onClick={onAdd} className="rounded-full shadow-warm"><Plus className="h-4 w-4" /> Add</Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function BuilderSection({ id, addToCart }: { id: string; addToCart: (k: string, name: string, price: number, note?: string) => void }) {
  const [sel, setSel] = useState<Record<BuilderKey, string[]>>({
    base: ["pita"], protein: ["chicken"], cheese: [], veggies: ["lettuce", "tomato", "onion"], sauces: ["garlic"], spice: ["med"], extras: [],
  });

  const toggle = (k: BuilderKey, optId: string) => {
    const group = BUILDER[k];
    setSel((s) => {
      const cur = s[k];
      if (!group.multi) return { ...s, [k]: [optId] };
      return { ...s, [k]: cur.includes(optId) ? cur.filter(x => x !== optId) : [...cur, optId] };
    });
  };

  // Live price: sum of selected option prices, with first 4 veggies free
  const { price, summary, allVeg, anySpicy, missing } = useMemo(() => {
    let total = 0;
    const parts: string[] = [];
    let veg = true;
    let spicy = false;
    const miss: string[] = [];

    for (const k of BUILDER_KEYS) {
      const g = BUILDER[k];
      const picked = sel[k];
      if (g.required && picked.length === 0) miss.push(g.title);
      const opts = g.options.filter(o => picked.includes(o.id));
      let groupNames: string[] = [];
      let veggieCounter = 0;
      for (const o of opts) {
        let add = o.price;
        if (k === "veggies") {
          veggieCounter += 1;
          if (veggieCounter <= 4 && o.price === 0) add = 0;
        }
        total += add;
        groupNames.push(o.label);
        if (o.veg === false || (k === "protein" && !o.veg)) veg = false;
        if (o.spicy) spicy = true;
      }
      // proteins without explicit veg flag are non-veg
      if (k === "protein" && opts.some(o => !o.veg)) veg = false;
      if (groupNames.length) parts.push(groupNames.join(" + "));
    }
    return { price: total, summary: parts.join(" · "), allVeg: veg, anySpicy: spicy, missing: miss };
  }, [sel]);

  const sendToChef = () => {
    if (missing.length) {
      toast.error("Pick required items", { description: missing.join(", ") });
      return;
    }
    const name = `Custom Shawarma — ${BUILDER.protein.options.find(o => o.id === sel.protein[0])?.label ?? ""} in ${BUILDER.base.options.find(o => o.id === sel.base[0])?.label ?? ""}`;
    const key = `custom-${Date.now()}`;
    addToCart(key, name, price, summary);
  };

  return (
    <section id={id} className="bg-gradient-to-b from-background to-secondary/40 border-y">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <Badge className="mb-3 bg-primary text-primary-foreground shadow-warm">
            <ChefHat className="mr-1 h-3 w-3" /> CHEF'S TABLE
          </Badge>
          <h2 className="text-balance text-4xl font-black tracking-tight md:text-5xl">
            Build your <span className="bg-gradient-warm bg-clip-text text-transparent">dream shawarma</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Wrap. Protein. Sauces. Spice. Make it yours — our chef wraps it exactly the way you want, and the price updates live.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {BUILDER_KEYS.map((k) => {
              const g = BUILDER[k];
              return (
                <div key={k}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <h3 className="text-lg font-bold">{g.title}</h3>
                    <span className="text-xs text-muted-foreground">{g.multi ? "Pick any" : "Pick one"}{g.required ? " · required" : ""}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.options.map((o) => {
                      const active = sel[k].includes(o.id);
                      return (
                        <button key={o.id} onClick={() => toggle(k, o.id)} className={`group relative flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground shadow-warm -translate-y-0.5" : "border-border bg-card hover:border-primary/40"}`}>
                          {o.emoji && <span>{o.emoji}</span>}
                          <span>{o.label}</span>
                          {o.price > 0 && <span className={`text-xs font-bold ${active ? "text-primary-foreground/90" : "text-primary"}`}>+₹{o.price}</span>}
                          {o.price === 0 && k === "veggies" && <span className={`text-[10px] font-bold ${active ? "text-primary-foreground/80" : "text-success"}`} style={!active ? { color: "var(--success)" } : undefined}>FREE</span>}
                          {o.spicy && <Flame className="h-3 w-3" />}
                          {active && <CheckCircle2 className="h-3 w-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live price card — sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-card shadow-warm">
              <div className="relative h-40 overflow-hidden">
                <img src={imgChicken} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-cream">
                  <div className="text-xs uppercase tracking-wider font-bold opacity-80">Your creation</div>
                  <div className="text-lg font-black leading-tight">Custom Shawarma</div>
                </div>
                <div className="absolute top-3 right-3 flex gap-1">
                  {allVeg && <Badge className="bg-success text-white" style={{ background: "var(--success)" }}><Leaf className="mr-1 h-3 w-3" />Veg</Badge>}
                  {anySpicy && <Badge className="bg-destructive text-destructive-foreground"><Flame className="mr-1 h-3 w-3" />Spicy</Badge>}
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Chef's notes</div>
                  <p className="mt-1 text-sm leading-relaxed line-clamp-4 min-h-[60px]">{summary || "Start picking to see your build…"}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Live price</span>
                    <span className="text-[10px] text-muted-foreground">updates as you build</span>
                  </div>
                  <div className="mt-1 flex items-end gap-2">
                    <div className="text-4xl font-black text-primary tabular-nums">₹{price}</div>
                    {price > 0 && <div className="text-sm text-muted-foreground line-through pb-1">₹{Math.round(price * 1.3)}</div>}
                  </div>
                  {price > 0 && <div className="text-xs font-semibold" style={{ color: "var(--success)" }}>You save ₹{Math.round(price * 0.3)} vs market</div>}
                </div>

                {missing.length > 0 && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-2 text-xs text-destructive font-medium">
                    Still need: {missing.join(", ")}
                  </div>
                )}

                <Button size="lg" className="w-full shadow-warm" onClick={sendToChef} disabled={missing.length > 0}>
                  <ChefHat className="h-4 w-4" /> Send to Chef · ₹{price}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">Your exact instructions go straight to the kitchen 👨‍🍳</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ DATA ============
const REVIEWS = [
  { name: "Priya M.", order: "Double Chicken Shawarma", text: "Hands-down the best shawarma I've had outside Dubai. The garlic toum is unreal." },
  { name: "Arjun K.", order: "Custom Build · Beef + Saj", text: "The 'build your own' feature is genius. Got it exactly the way I wanted, ready in 25 minutes." },
  { name: "Sara A.", order: "Family Bucket (6 pc)", text: "Ordered for a dinner party — everyone went silent. That's how good it was." },
  { name: "Rohan T.", order: "Peri-Peri Chicken", text: "Crisp wrap, juicy meat, BURN. Exactly what a Friday night needs." },
  { name: "Meera S.", order: "Falafel Wrap + Hummus", text: "Best veg shawarma in town. The falafel is crisp outside, fluffy inside." },
];
