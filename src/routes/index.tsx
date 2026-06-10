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

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { name: "keywords", content: "shawarmato, shawarma, shawarma delivery, order shawarma, best shawarma, chicken shawarma, beef shawarma, kebab delivery, middle eastern food, shawarmato app, shawarmato online" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "application-name", content: "Shawarmato" },
      { name: "apple-mobile-web-app-title", content: "Shawarmato" },
      { property: "og:url", content: "https://shawarmato.lovable.app/" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/452d709e-d1cb-4593-b3a8-f22a1f3cee90" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/452d709e-d1cb-4593-b3a8-f22a1f3cee90" },
    ],
    links: [
      { rel: "canonical", href: "https://shawarmato.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://shawarmato.lovable.app/#org",
              name: "Shawarmato",
              alternateName: ["Shawarma to", "Shawarmato App"],
              url: "https://shawarmato.lovable.app/",
              logo: "https://shawarmato.lovable.app/favicon.ico",
              sameAs: ["https://shawarmato.lovable.app/"],
            },
            {
              "@type": "WebSite",
              "@id": "https://shawarmato.lovable.app/#website",
              name: "Shawarmato",
              url: "https://shawarmato.lovable.app/",
              publisher: { "@id": "https://shawarmato.lovable.app/#org" },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://shawarmato.lovable.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "FoodEstablishment",
              name: "Shawarmato",
              servesCuisine: ["Middle Eastern", "Shawarma", "Lebanese", "Turkish"],
              priceRange: "₹₹",
              url: "https://shawarmato.lovable.app/",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "12483",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
});

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
  const [slide, setSlide] = useState(0);
  const SLIDE_LABELS = ["Hero", "Why us", "Magic", "Menu", "Build", "Founders", "FAQs", "Order"] as const;
  const totalSlides = SLIDE_LABELS.length;
  const goSlide = (n: number) => setSlide(Math.max(0, Math.min(totalSlides - 1, n)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") goSlide(slide + 1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") goSlide(slide - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slide]);

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

      {/* ============ SLIDE DECK ============ */}
      <main className="relative" style={{ minHeight: "calc(100vh - 130px)" }}>
        {/* Slide stage */}
        <div key={slide} className="animate-float-up">
          {slide === 0 && (
            <SlideHero location={location} liveOrders={liveOrders} onOrder={() => goSlide(3)} onBuild={() => goSlide(4)} />
          )}
          {slide === 1 && (
            <SlideWhyUs reviewIdx={reviewIdx} setReviewIdx={setReviewIdx} dealLeft={dealLeft} fmtTime={fmtTime} />
          )}
          {slide === 2 && <SlideMagic />}
          {slide === 3 && (
            <SlideMenu
              activeCat={activeCat} setActiveCat={setActiveCat}
              filteredItems={filteredItems} cart={cart}
              addToCart={addToCart} removeFromCart={removeFromCart}
              liveOrders={liveOrders} location={location}
            />
          )}
          {slide === 4 && <BuilderSection id="builder" addToCart={addToCart} />}
          {slide === 5 && <SlideFounders />}
          {slide === 6 && <SlideFAQs />}
          {slide === 7 && (
            <SlideOrderCTA
              cartCount={cartCount} cartTotal={cartTotal}
              onOpenCart={() => setCartOpen(true)} onMenu={() => goSlide(3)}
              rewardProgress={rewardProgress} amountToReward={amountToReward}
              rewardUnlocked={rewardUnlocked}
            />
          )}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => goSlide(slide - 1)}
          disabled={slide === 0}
          aria-label="Previous slide"
          className="fixed left-3 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card/90 backdrop-blur shadow-warm transition-all hover:border-primary hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>
        <button
          onClick={() => goSlide(slide + 1)}
          disabled={slide === totalSlides - 1}
          aria-label="Next slide"
          className="fixed right-3 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card/90 backdrop-blur shadow-warm transition-all hover:border-primary hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed animate-pulse-ring"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>

        {/* Bottom dot rail */}
        <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2 rounded-full border bg-card/90 px-3 py-2 backdrop-blur shadow-soft">
          {SLIDE_LABELS.map((label, i) => (
            <button
              key={label}
              onClick={() => goSlide(i)}
              aria-label={`Go to ${label}`}
              className={`group flex items-center gap-1.5 rounded-full transition-all ${
                i === slide ? "bg-primary px-3 py-1.5 text-primary-foreground shadow-warm" : "h-2 w-2 bg-muted-foreground/30 hover:bg-primary/60"
              }`}
            >
              {i === slide && <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>}
            </button>
          ))}
          <span className="ml-1 text-[10px] font-bold text-muted-foreground tabular-nums">{slide + 1}/{totalSlides}</span>
        </div>
      </main>


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

const FOUNDERS = [
  {
    name: "Kareem Al-Shafi",
    role: "Co-founder · Head Chef",
    img: founder1,
    quote: "I learned to wrap shawarma from my grandfather in Aleppo at age 9. Every roll we serve carries that fire.",
    bio: "Trained under masters in Aleppo, Beirut and Istanbul. Spent 11 years perfecting a single garlic toum recipe before opening Shawarmato.",
    badge: "20 years on the spit",
  },
  {
    name: "Aanya Mehra",
    role: "Co-founder · CEO",
    img: founder2,
    quote: "I quit a corporate job after eating Kareem's shawarma on a side street in Beirut. Some flavors deserve a movement.",
    bio: "Former product lead at a top food-tech unicorn. Obsessed with making world-class food affordable and 10-minute-fast.",
    badge: "Built 0→1M users",
  },
];

const FAQS = [
  { q: "What makes Shawarmato's shawarma different?", a: "We slow-roast our meats on a real vertical spit for 6+ hours, marinate overnight in 14 spices, and toast every wrap on a stone griddle. No microwaves. No shortcuts. Ever." },
  { q: "Is the meat actually halal?", a: "Yes, 100%. Every supplier is certified by the Halal Authority of India and audited monthly. Certificates are displayed at every kitchen." },
  { q: "How is 10-minute express delivery possible?", a: "Cloud kitchens in 2 km radius of every major neighborhood, riders waiting before you even tap order, and pre-prepped wraps that finish on demand. If we're late beyond 30 min, it's free." },
  { q: "Can I really build my own shawarma?", a: "Absolutely. Pick wrap → protein → cheese → veggies → sauces → spice. Your exact instructions print at the chef's station. Price updates live as you build." },
  { q: "What is the ₹1000 reward?", a: "Spend ₹1000 in a single order and unlock free Baklava + free delivery + 10% off your entire cart. Stackable with any active flash deal." },
  { q: "Do you have vegetarian and vegan options?", a: "Yes — falafel, paneer, mushroom-cheese, hummus, and a fully vegan saj-wrap line. All marked with a green dot." },
  { q: "What if I don't love my order?", a: "Tap 'Not happy' inside the order tracker within 30 minutes. We refund instantly — no questions, no forms. Happens to ~0.3% of orders." },
  { q: "Where do you deliver?", a: "Currently Mumbai, Delhi, Bangalore and Dubai. New cities every month — vote for yours on the founders page." },
];

// ============ SLIDE COMPONENTS ============

function SlideHero({ location, liveOrders, onOrder, onBuild }: { location: string; liveOrders: number; onOrder: () => void; onBuild: () => void }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 130px)" }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, oklch(0.18 0.025 40 / 0.94) 0%, oklch(0.18 0.025 40 / 0.7) 50%, oklch(0.18 0.025 40 / 0.35) 100%)" }} />
      <div className="container relative mx-auto flex flex-col justify-center px-4 py-12 md:py-16" style={{ minHeight: "calc(100vh - 130px)" }}>
        <div className="max-w-3xl text-cream">
          <Badge className="mb-4 bg-accent/20 text-accent border border-accent/40 backdrop-blur w-fit">
            <Sparkles className="mr-1 h-3 w-3" /> #1 Shawarma destination in {location}
          </Badge>
          <h1 className="text-balance text-5xl font-black leading-[1] md:text-7xl lg:text-8xl">
            <span className="block text-cream/95">Crave it.</span>
            <span className="block text-fancy drop-shadow-[0_2px_30px_rgba(255,120,60,0.45)]">Unwrap heaven.</span>
          </h1>
          <p className="mt-6 max-w-xl text-xl font-semibold text-cream/90 tracking-tight">
            Slow-roasted shawarma, <span className="italic text-accent">obsessively</span> crafted by chefs from Aleppo, Beirut & Istanbul.
          </p>
          <p className="mt-3 max-w-xl text-base text-cream/75 leading-relaxed">
            Charcoal-kissed meats. Pillowy pita. Sauces stolen from <span className="text-accent font-semibold">Beirut grandmothers</span>. On your doorstep in 30 minutes — or it's <span className="font-bold text-cream">on the house</span>.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="shadow-warm text-base font-bold animate-pulse-ring" onClick={onOrder}>
              <Flame className="h-4 w-4" /> Order now in {location}
            </Button>
            <Button size="lg" variant="outline" className="border-cream/40 bg-cream/10 text-cream hover:bg-cream/20 backdrop-blur" onClick={onBuild}>
              <ChefHat className="h-4 w-4" /> Build Your Own →
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">{[1,2,3,4].map(i => <div key={i} className="h-8 w-8 rounded-full border-2 border-cream bg-gradient-warm" />)}</div>
              <span className="text-cream/90"><b className="text-cream">1.2M+</b> happy customers</span>
            </div>
            <div className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" /><b>4.8</b> · 240K reviews</div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--success)" }} /></span>
              <span className="text-cream/90"><b>{liveOrders}</b> ordering right now</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 text-cream/60 text-xs uppercase tracking-widest font-bold animate-pulse">
          ← → use arrow keys · 8 slides of pure crave →
        </div>
      </div>
    </section>
  );
}

function SlideWhyUs({ reviewIdx, setReviewIdx, dealLeft, fmtTime }: { reviewIdx: number; setReviewIdx: (n: number) => void; dealLeft: number; fmtTime: (s: number) => string }) {
  const stats = [
    { icon: Zap,   value: "10",      unit: "min",   label: "Express delivery",  tint: "from-amber-400 to-orange-500" },
    { icon: Users, value: "1.2M+",   unit: "",      label: "Happy customers",   tint: "from-rose-400 to-red-600" },
    { icon: Star,  value: "4.8",     unit: "★",     label: "Avg rating",         tint: "from-yellow-400 to-amber-500" },
    { icon: Award, value: "100%",    unit: "",      label: "Halal certified",   tint: "from-emerald-400 to-teal-600" },
  ];
  return (
    <section className="container mx-auto px-4 py-10" style={{ minHeight: "calc(100vh - 130px)" }}>
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 bg-accent/20 text-accent-foreground border border-accent/40">Real proof · zero fluff</Badge>
        <h2 className="text-balance text-4xl md:text-6xl font-black tracking-tight">Why 1.2 million people <span className="text-fancy">never go back</span></h2>
        <p className="mt-3 text-muted-foreground">Numbers we update live. Reviews we don't filter.</p>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <Card key={i} className="border-2 bg-gradient-card p-5 text-center hover:-translate-y-1 hover:border-primary transition-all">
            <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.tint} text-white shadow-lg`}>
              <s.icon className="h-7 w-7 animate-icon-pop" strokeWidth={2.5} />
            </div>
            <div className="text-4xl font-black tabular-nums">{s.value}<span className="text-2xl text-primary">{s.unit}</span></div>
            <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-6">
        <Card className="relative overflow-hidden border-2 p-8 text-center shadow-soft bg-gradient-card">
          <div className="absolute top-3 left-3 text-8xl leading-none opacity-10">"</div>
          <div key={reviewIdx} className="animate-float-up relative">
            <div className="flex justify-center gap-0.5 text-accent">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <p className="mt-4 text-xl font-medium text-balance leading-relaxed">"{REVIEWS[reviewIdx].text}"</p>
            <div className="mt-4 text-sm">
              <div className="font-bold">{REVIEWS[reviewIdx].name}</div>
              <div className="text-muted-foreground">{REVIEWS[reviewIdx].order} · verified order</div>
            </div>
            <div className="mt-5 flex justify-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setReviewIdx(i)} className={`h-1.5 rounded-full transition-all ${i === reviewIdx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`} />
              ))}
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-hero text-cream shadow-warm">
          <div className="p-6 space-y-4">
            <Badge className="bg-cream/20 text-cream border-cream/30 backdrop-blur w-fit">⚡ FLASH DEAL</Badge>
            <div className="text-3xl font-black leading-tight">Up to <span className="text-accent">45% OFF</span> on every shawarma under ₹200</div>
            <div className="flex items-center gap-3 rounded-xl bg-charcoal/40 p-3 backdrop-blur">
              <Timer className="h-6 w-6 text-accent" />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider font-bold text-cream/70">Ends in</div>
                <div className="font-mono text-3xl font-black text-cream tabular-nums">{fmtTime(dealLeft)}</div>
              </div>
            </div>
            <div className="text-xs text-cream/70">Stock refreshed daily. Once it's gone, it's gone.</div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function SlideMagic() {
  const features = [
    { icon: Tv,     title: "Live Flame Cam",        sub: "Watch your shawarma roast in real time on our kitchen livestream — yes, actually.", tint: "from-orange-500 to-red-600" },
    { icon: Gift,   title: "₹1000 Magic Club",      sub: "Cross ₹1000 and free Baklava + free delivery + 10% OFF appear instantly. No code.", tint: "from-amber-400 to-orange-500" },
    { icon: Smile,  title: "Pay-After-Bite",        sub: "First-time? Take one bite. If you don't smile, we eat the bill. Literally.", tint: "from-rose-400 to-pink-600" },
    { icon: Phone,  title: "Midnight Hotline",      sub: "Craving at 2 AM? Our chef answers a real phone and wraps one for you.", tint: "from-indigo-500 to-purple-600" },
    { icon: Trophy, title: "Streak Rewards",        sub: "Order 3 weeks in a row → unlock the Secret Menu (off-menu chef specials).", tint: "from-yellow-400 to-amber-600" },
    { icon: Lock,   title: "Locked Recipe Vault",   sub: "Crack 5 Secret Menu items → join the Vault. Lifetime 20% off. ~847 members.", tint: "from-emerald-500 to-teal-600" },
  ];
  return (
    <section className="container mx-auto px-4 py-10" style={{ minHeight: "calc(100vh - 130px)" }}>
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 bg-primary text-primary-foreground shadow-warm"><Sparkles className="mr-1 h-3 w-3" /> THE MAGIC</Badge>
        <h2 className="text-balance text-4xl md:text-6xl font-black tracking-tight">Six things no one else <span className="text-fancy">dares to do</span></h2>
        <p className="mt-3 text-muted-foreground">We didn't build a delivery app. We built obsession.</p>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <Card key={i} className="group relative overflow-hidden border-2 bg-gradient-card p-6 transition-all hover:-translate-y-2 hover:border-primary hover:shadow-warm">
            <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${f.tint} opacity-15 blur-2xl transition-opacity group-hover:opacity-30`} />
            <div className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.tint} text-white shadow-lg`}>
              <f.icon className="h-7 w-7 animate-icon-pop" strokeWidth={2.5} />
            </div>
            <h3 className="relative text-xl font-black tracking-tight">{f.title}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{f.sub}</p>
            <div className="relative mt-3 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Only at Shawarmato →
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function SlideMenu({ activeCat, setActiveCat, filteredItems, cart, addToCart, removeFromCart, liveOrders, location }: {
  activeCat: string; setActiveCat: (s: string) => void; filteredItems: ShawarmaItem[];
  cart: Record<string, { qty: number }>;
  addToCart: (k: string, name: string, price: number, note?: string) => void;
  removeFromCart: (k: string) => void;
  liveOrders: number; location: string;
}) {
  return (
    <section className="container mx-auto px-4 py-8" style={{ minHeight: "calc(100vh - 130px)" }}>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <Badge className="mb-2 bg-accent/20 text-accent-foreground border border-accent/40">What's cravin'?</Badge>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            {activeCat === "All" ? "Best shawarmas" : activeCat} <span className="text-primary">in {location}</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{filteredItems.length} items · best prices guaranteed</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
          <TrendingUp className="h-4 w-4 text-success" />
          <span className="font-semibold">{liveOrders}</span>
          <span className="text-muted-foreground">orders / hour</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
        <CategoryChip name="All" icon="🔥" count={SHAWARMA_ITEMS.length} active={activeCat === "All"} onClick={() => setActiveCat("All")} />
        {CATEGORIES.map((c) => (
          <CategoryChip key={c.name} name={c.name} icon={c.icon} count={c.count} active={activeCat === c.name} onClick={() => setActiveCat(c.name)} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 max-h-[55vh] overflow-y-auto pr-1 pb-20">
        {filteredItems.map((item) => <ItemCard key={item.id} item={item} qty={cart[item.id]?.qty || 0} onAdd={() => addToCart(item.id, item.name, item.price)} onRemove={() => removeFromCart(item.id)} />)}
      </div>
    </section>
  );
}

function SlideFounders() {
  return (
    <section className="container mx-auto px-4 py-10" style={{ minHeight: "calc(100vh - 130px)" }}>
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 bg-primary text-primary-foreground">THE HUMANS</Badge>
        <h2 className="text-balance text-4xl md:text-6xl font-black tracking-tight">Two obsessed humans, <span className="text-fancy">one perfect roll</span></h2>
        <p className="mt-3 text-muted-foreground">We won't pretend a brand made this. We did. And we'd love you to know us.</p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {FOUNDERS.map((f) => (
          <Card key={f.name} className="group relative overflow-hidden border-2 bg-gradient-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-warm">
            <div className="relative h-64 overflow-hidden">
              <img src={f.img} alt={f.name} loading="lazy" width={768} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <Badge className="absolute top-3 right-3 bg-accent text-charcoal font-bold">{f.badge}</Badge>
              <div className="absolute bottom-3 left-4 right-4 text-cream">
                <div className="text-2xl font-black leading-tight">{f.name}</div>
                <div className="text-xs uppercase tracking-widest font-semibold text-accent">{f.role}</div>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <p className="italic text-base font-medium text-balance leading-relaxed text-foreground/90">"{f.quote}"</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.bio}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 mx-auto max-w-3xl text-center text-sm text-muted-foreground italic">
        Want to meet us? We do a free Saturday kitchen tour every weekend. Bring a friend, leave with a recipe.
      </div>
    </section>
  );
}

function SlideFAQs() {
  return (
    <section className="container mx-auto px-4 py-10" style={{ minHeight: "calc(100vh - 130px)" }}>
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 bg-accent/20 text-accent-foreground border border-accent/40">Honest answers</Badge>
        <h2 className="text-balance text-4xl md:text-6xl font-black tracking-tight">The questions <span className="text-fancy">everyone whispers</span></h2>
        <p className="mt-3 text-muted-foreground">No legalese. Real talk from the founders.</p>
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-2">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border-2 bg-gradient-card px-5 transition-all hover:border-primary/40 data-[state=open]:border-primary/60 data-[state=open]:shadow-warm">
              <AccordionTrigger className="text-left text-base font-bold hover:no-underline py-4">
                <span className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-black text-primary-foreground">{i + 1}</span>
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground pl-9 pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function SlideOrderCTA({ cartCount, cartTotal, onOpenCart, onMenu, rewardProgress, amountToReward, rewardUnlocked }: {
  cartCount: number; cartTotal: number; onOpenCart: () => void; onMenu: () => void;
  rewardProgress: number; amountToReward: number; rewardUnlocked: boolean;
}) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 130px)" }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.18 0.025 40 / 0.95) 0%, oklch(0.18 0.025 40 / 0.85) 100%)" }} />
      <div className="container relative mx-auto flex flex-col items-center justify-center px-4 py-12 text-center text-cream" style={{ minHeight: "calc(100vh - 130px)" }}>
        <div className="text-7xl mb-4 animate-confetti-burst">🌯</div>
        <Badge className="mb-4 bg-accent text-charcoal font-bold">YOUR MOMENT</Badge>
        <h2 className="text-balance text-5xl md:text-7xl font-black leading-[1] max-w-3xl">
          One tap. <span className="text-fancy">28 minutes.</span><br />Pure joy at your door.
        </h2>
        <p className="mt-5 text-lg text-cream/85 max-w-xl">
          Your shawarma is one click away. Free Baklava is one ₹1000 cart away. Your future regret is one closed tab away.
        </p>

        {cartCount > 0 ? (
          <div className="mt-8 w-full max-w-md rounded-2xl border-2 border-cream/20 bg-charcoal/60 p-5 backdrop-blur">
            <div className="text-sm text-cream/70 uppercase tracking-wider font-bold">Cart ready</div>
            <div className="mt-1 text-4xl font-black text-cream">{cartCount} items · ₹{cartTotal}</div>
            {!rewardUnlocked && (
              <>
                <div className="mt-3 text-xs text-cream/80">Add ₹{amountToReward} more → 🎁 Free Baklava + 🚚 Free Delivery + 10% OFF</div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream/15">
                  <div className="h-full rounded-full bg-gradient-warm transition-all duration-500" style={{ width: `${rewardProgress}%` }} />
                </div>
              </>
            )}
            {rewardUnlocked && (
              <div className="mt-3 text-sm font-bold text-accent">🎉 Reward unlocked — Free Baklava, Free Delivery, 10% OFF applied</div>
            )}
            <Button size="lg" className="mt-4 w-full shadow-warm text-base font-bold animate-pulse-ring" onClick={onOpenCart}>
              <ShoppingCart className="h-4 w-4" /> Checkout · ₹{cartTotal}
            </Button>
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button size="lg" className="shadow-warm text-base font-bold animate-pulse-ring" onClick={onMenu}>
              <Flame className="h-4 w-4" /> Browse the menu
            </Button>
            <Button size="lg" variant="outline" className="border-cream/40 bg-cream/10 text-cream hover:bg-cream/20 backdrop-blur" onClick={onOpenCart}>
              <ShoppingCart className="h-4 w-4" /> Open cart
            </Button>
          </div>
        )}

        <div className="mt-12 grid grid-cols-3 gap-6 text-center max-w-lg">
          {[
            { v: "10min", l: "express" },
            { v: "4.8★",  l: "rated" },
            { v: "100%",  l: "halal" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-black text-accent">{s.v}</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-cream/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
