import { Leaf, ShieldCheck, Tag, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We source the freshest vegetables, meats, and spices daily from local markets to ensure every dish bursts with real flavour.",
    color: "text-green-600",
    bg: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Hot food delivered lightning-fast to your doorstep. We know hunger can't wait, and neither should you.",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: Tag,
    title: "Affordable Prices",
    description:
      "Great food shouldn't break the bank. Our menu is crafted to offer the best value without compromising on taste.",
    color: "text-primary",
    bg: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Kitchen",
    description:
      "Cleanliness is at the heart of everything we do. Our kitchen is regularly sanitised and follows all food safety standards.",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-fade py-24 md:py-32 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.22em] uppercase mb-3">
            Why Choose Us?
          </p>
          <h2 className="font-display font-bold text-[clamp(2.2rem,5.5vw,3.8rem)] text-foreground leading-[1.06] tracking-[-0.025em] mb-4">
            The <span className="text-gradient-warm italic">FoodLab</span>{" "}
            <span className="font-light">Difference</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We don't just make food — we craft experiences, one bite at a time.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map(
            ({ icon: Icon, title, description, color, bg, iconBg }) => (
              <div
                key={title}
                className={`group p-6 rounded-3xl border ${bg} card-hover flex flex-col gap-4`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={26} className={color} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
