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
                  toast.success("Order placed! 🌯");
                  setCart({});
                  setCartOpen(false);
                }}
              >
                Checkout
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
