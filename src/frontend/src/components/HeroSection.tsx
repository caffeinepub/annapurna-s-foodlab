import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [
      badgeRef.current,
      headingRef.current,
      subRef.current,
      ctaRef.current,
    ];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      setTimeout(
        () => {
          if (!el) return;
          el.style.transition =
            "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        },
        150 + i * 160,
      );
    });
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-food.dim_1400x800.jpg"
          alt="Delicious food at Annapurna's FoodLab"
          className="w-full h-full object-cover scale-105"
        />
        {/* Rich multi-layer overlay — bottom-heavy for text contrast, warm lateral tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/50 via-transparent to-transparent" />
        {/* Vignette edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,black/40_100%)]" />
      </div>

      {/* Warm atmospheric glows */}
      <div className="absolute top-1/3 right-[15%] w-80 h-80 rounded-full bg-amber-400/8 blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-1/4 left-[10%] w-56 h-56 rounded-full bg-orange-500/12 blur-2xl animate-float pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Content — offset slightly upward from center for visual weight */}
      <div
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center"
        style={{ paddingBottom: "6rem" }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 border border-amber-400/35 bg-amber-500/12 backdrop-blur-md"
        >
          <Sparkles size={13} className="text-amber-300" />
          <span className="text-amber-200/90 text-[11px] font-heading font-semibold tracking-[0.18em] uppercase">
            Mumbai's Favourite Street Food
          </span>
        </div>

        {/* Headline — Fraunces with optical weight variation */}
        <h1
          ref={headingRef}
          className="font-display font-bold text-[clamp(2.8rem,9vw,6.5rem)] text-white leading-[1.0] tracking-[-0.02em] mb-7 max-w-4xl"
        >
          {/* Line 1 — lighter optical weight */}
          <span className="block text-white/85 font-normal text-[0.72em] tracking-[0.06em] uppercase font-heading mb-1 text-sm sm:text-base">
            Fresh · Tasty · Homemade
          </span>
          {/* Main statement */}
          <span className="block">Made with </span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(110deg, oklch(0.88 0.16 70), oklch(0.75 0.20 46), oklch(0.60 0.22 38))",
            }}
          >
            Love ❤️
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-white/70 text-lg sm:text-xl font-sans mb-10 max-w-md mx-auto leading-relaxed tracking-wide"
        >
          Delicious food delivered to your doorstep —
          <br className="hidden sm:block" />
          <span className="text-amber-300/90 font-medium">
            {" "}
            fresh ingredients
          </span>
          , made with heart.
        </p>

        {/* CTA pair */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Button
            type="button"
            onClick={() => scrollTo("contact")}
            size="lg"
            className="group relative overflow-hidden bg-amber-500 hover:bg-amber-400 text-white font-heading font-bold text-base px-9 py-6 rounded-2xl border-0 transition-all duration-300 hover:scale-[1.04] min-w-[160px]"
            style={{
              boxShadow:
                "0 8px 32px oklch(0.62 0.18 46 / 0.55), 0 2px 8px oklch(0.45 0.15 40 / 0.3)",
            }}
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              Order Now
              <ArrowDown
                size={15}
                className="group-hover:translate-y-0.5 transition-transform"
              />
            </span>
          </Button>
          <Button
            type="button"
            onClick={() => scrollTo("menu")}
            size="lg"
            variant="outline"
            className="bg-white/8 hover:bg-white/16 text-white border-white/25 hover:border-white/50 font-heading font-bold text-base px-9 py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] min-w-[160px]"
          >
            View Menu
          </Button>
        </div>

        {/* Scroll cue — a subtle pulsing chevron outside the text flow */}
        <button
          type="button"
          onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/35 hover:text-amber-300/80 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-heading tracking-[0.22em] uppercase">
            Scroll
          </span>
          <span className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </button>
      </div>
    </section>
  );
}
