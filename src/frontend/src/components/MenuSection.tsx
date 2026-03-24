import { Skeleton } from "@/components/ui/skeleton";
import { MenuCategory, useGetMenuItemsByCategory } from "@/hooks/useQueries";
import { ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "../backend.d";

type Category = "all" | MenuCategory;

const categories: { label: string; value: Category; emoji: string }[] = [
  { label: "All", value: "all", emoji: "🍽️" },
  { label: "Burgers", value: MenuCategory.burgers, emoji: "🍔" },
  { label: "Pizza", value: MenuCategory.pizza, emoji: "🍕" },
  { label: "Momos", value: MenuCategory.momos, emoji: "🥟" },
  { label: "Rolls", value: MenuCategory.rolls, emoji: "🌯" },
  { label: "Cold Drinks", value: MenuCategory.coldDrinks, emoji: "🥤" },
];

const categoryImages: Record<string, string> = {
  burgers: "/assets/generated/menu-burger.dim_400x300.jpg",
  pizza: "/assets/generated/menu-pizza.dim_400x300.jpg",
  momos: "/assets/generated/menu-momos.dim_400x300.jpg",
  rolls: "/assets/generated/menu-roll.dim_400x300.jpg",
  coldDrinks: "/assets/generated/menu-drinks.dim_400x300.jpg",
};

const categoryImages2: Record<string, string> = {
  burgers: "/assets/generated/menu-burger2.dim_400x300.jpg",
};

function getImageForItem(item: MenuItem, index: number): string {
  const cat = item.category as string;
  if (cat === "burgers" && index % 2 === 1) {
    return (
      categoryImages2.burgers ||
      categoryImages[cat] ||
      "/assets/generated/hero-food.dim_1400x800.jpg"
    );
  }
  return categoryImages[cat] || "/assets/generated/hero-food.dim_1400x800.jpg";
}

// Warm gradient per category — makes each card feel distinct
const categoryGradients: Record<string, string> = {
  burgers: "from-amber-900/80 via-orange-800/60 to-amber-600/20",
  pizza: "from-red-900/80 via-rose-800/60 to-orange-600/20",
  momos: "from-emerald-900/80 via-teal-800/60 to-green-600/20",
  rolls: "from-orange-900/80 via-amber-800/60 to-yellow-600/20",
  coldDrinks: "from-sky-900/80 via-blue-800/60 to-cyan-600/20",
};

const categoryBadgeColors: Record<string, string> = {
  burgers: "bg-amber-400/90 text-amber-950",
  pizza: "bg-red-400/90 text-red-950",
  momos: "bg-emerald-400/90 text-emerald-950",
  rolls: "bg-orange-400/90 text-orange-950",
  coldDrinks: "bg-sky-400/90 text-sky-950",
};

const categoryLabels: Record<string, string> = {
  burgers: "Burger",
  pizza: "Pizza",
  momos: "Momos",
  rolls: "Roll",
  coldDrinks: "Cold Drink",
};

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const imgSrc = getImageForItem(item, index);
  const catKey = item.category as string;
  const gradientClass =
    categoryGradients[catKey] ||
    "from-stone-900/80 via-stone-800/60 to-stone-600/20";
  const badgeClass =
    categoryBadgeColors[catKey] || "bg-stone-300/90 text-stone-900";
  const catLabel = categoryLabels[catKey] || catKey;

  return (
    <article
      className="group relative bg-card rounded-[1.5rem] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015]"
      style={{
        boxShadow:
          "0 2px 12px oklch(0.22 0.04 55 / 0.08), 0 1px 3px oklch(0.22 0.04 55 / 0.06)",
      }}
    >
      {/* ── Image area — 16:11 ratio ── */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/11" }}
      >
        <img
          src={imgSrc}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />

        {/* Permanent bottom-gradient for name readability on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
        />

        {/* Static light vignette at bottom always */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge — pill floating top-left */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-[5px] rounded-full text-[11px] font-heading font-bold tracking-wide backdrop-blur-sm ${badgeClass}`}
          >
            {catLabel}
          </span>
        </div>

        {/* Price — appears on hover at image bottom-right */}
        <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm text-foreground text-sm font-heading font-extrabold shadow-md tracking-tight">
            ₹{item.priceInr.toString()}
          </span>
        </div>

        {/* Name reveal on hover — slides up from image bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
          <p className="text-white font-heading font-bold text-base leading-tight line-clamp-1 drop-shadow-lg">
            {item.name}
          </p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-heading font-bold text-[1.05rem] text-foreground leading-snug mb-1 group-hover:text-primary transition-colors duration-200">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-[0.82rem] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Footer row */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          {/* Price — always visible in body */}
          <div className="flex items-baseline gap-0.5">
            <span className="font-display font-bold text-[1.6rem] leading-none text-primary tracking-tight">
              ₹{item.priceInr.toString()}
            </span>
          </div>

          {/* Order CTA */}
          <a
            href={`https://wa.me/918686161678?text=Hi%2C%20I%20would%20like%20to%20order%20${encodeURIComponent(item.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-[0.78rem] font-heading font-bold transition-all duration-200 hover:bg-primary/80 hover:scale-105 active:scale-95"
            style={{
              boxShadow: "0 3px 10px oklch(0.62 0.18 46 / 0.35)",
            }}
          >
            <ShoppingBag size={13} />
            Order
          </a>
        </div>
      </div>

      {/* Subtle card border glow on hover */}
      <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-border group-hover:ring-primary/25 transition-all duration-400 pointer-events-none" />
    </article>
  );
}

function MenuCardSkeleton() {
  return (
    <div className="bg-card rounded-[1.5rem] overflow-hidden border border-border">
      <Skeleton
        className="w-full animate-shimmer"
        style={{ aspectRatio: "16/11" }}
      />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4 animate-shimmer rounded-lg" />
        <Skeleton className="h-3.5 w-full animate-shimmer rounded-lg" />
        <Skeleton className="h-3.5 w-2/3 animate-shimmer rounded-lg" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-8 w-14 animate-shimmer rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-xl animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const { data: menuItems, isLoading } =
    useGetMenuItemsByCategory(activeCategory);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="section-fade py-24 md:py-32 bg-muted/20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          {/* Eyebrow — different from other sections: larger, looser */}
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.25em] uppercase mb-3">
            What We're Cooking
          </p>
          <h2 className="font-display font-bold text-[clamp(2.4rem,6vw,4rem)] text-foreground leading-[1.08] tracking-[-0.025em] mb-4">
            Our <span className="text-gradient-warm italic">Menu</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            Fresh, flavorful, and made-to-order. Explore our full spread.
          </p>
        </div>

        {/* Category filter — pill tabs with emoji */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200 border ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
              style={
                activeCategory === cat.value
                  ? { boxShadow: "0 4px 14px oklch(0.62 0.18 46 / 0.35)" }
                  : {}
              }
            >
              <span aria-hidden="true">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {isLoading ? (
            Array.from({ length: 6 }, (_, i) => i).map((i) => (
              <MenuCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : menuItems && menuItems.length > 0 ? (
            menuItems.map((item, i) => (
              <MenuCard key={`${item.name}-${i}`} item={item} index={i} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center py-20 gap-4">
              <span className="text-5xl">🍽️</span>
              <p className="text-muted-foreground font-heading text-lg">
                No items in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
