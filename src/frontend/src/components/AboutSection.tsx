import { Heart, Star, Users } from "lucide-react";
import { useEffect, useRef } from "react";

function useSectionReveal(ref: React.RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

const stats = [
  { icon: Heart, label: "Made with Love", value: "Every Bite" },
  { icon: Star, label: "Happy Customers", value: "1000+" },
  { icon: Users, label: "Years Serving Mumbai", value: "5+" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-fade py-24 md:py-32 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text content */}
            <div>
              <p className="text-primary font-heading font-semibold text-sm tracking-[0.22em] uppercase mb-3">
                Our Story
              </p>

              <h2 className="font-display font-bold text-[clamp(2.2rem,5.5vw,3.8rem)] text-foreground leading-[1.06] tracking-[-0.025em] mb-6">
                Cooking with{" "}
                <span className="text-gradient-warm italic">Passion</span>
                <br />
                <span className="font-normal text-[0.7em] tracking-normal text-muted-foreground not-italic">
                  since Day One
                </span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We are a local food store serving fresh, tasty, and affordable
                food. Our mission is to give you the best flavor with quality
                ingredients and quick service. Every bite is made with care and
                love.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                From our humble beginnings in Kalachowki, Mumbai, we've grown
                into a beloved neighbourhood spot — serving everything from
                crispy momos to loaded burgers, all crafted from recipes passed
                down with love.
              </p>

              {/* Decorative line */}
              <div className="mt-8 flex items-center gap-3">
                <div className="h-0.5 w-12 bg-primary rounded-full" />
                <span className="text-sm font-heading font-semibold text-primary tracking-wider">
                  Annapurna's FoodLab
                </span>
                <div className="h-0.5 w-12 bg-primary rounded-full" />
              </div>
            </div>

            {/* Stats & decorative card */}
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-primary/8 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-accent/20 blur-xl" />

              {/* Stats grid */}
              <div className="relative grid grid-cols-1 gap-4">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover card-hover group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-2xl text-foreground leading-none">
                        {value}
                      </div>
                      <div className="text-sm text-muted-foreground font-heading mt-0.5">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Accent quote card */}
                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
                  <p className="font-display italic text-lg text-foreground leading-snug">
                    "Every plate we serve is a promise — fresh, flavorful, and
                    made with genuine care."
                  </p>
                  <p className="mt-3 text-sm font-heading font-semibold text-primary">
                    — Annapurna's FoodLab Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
