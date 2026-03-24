import { Clock, Heart, MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-16 mt-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/generated/logo-transparent.dim_300x300.png"
                alt="Annapurna's FoodLab"
                className="w-12 h-12 object-contain rounded-xl brightness-200 contrast-50"
              />
              <div>
                <div className="font-display font-bold text-lg text-background/90 leading-none">
                  Annapurna's
                </div>
                <div className="font-heading font-semibold text-xs tracking-widest uppercase text-primary/80">
                  FoodLab
                </div>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-5">
              Fresh, tasty, and made with love. Serving Mumbai's favourite
              street food since day one.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/918686161678?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background/10 hover:bg-green-500/80 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp
                  size={18}
                  className="text-background/70 hover:text-white"
                />
              </a>
              <a
                href="tel:08686161678"
                className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary/80 flex items-center justify-center transition-colors"
                aria-label="Call us"
              >
                <Phone size={16} className="text-background/70" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-background/90 mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-background/60 hover:text-primary transition-colors text-sm font-sans"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-background/90 mb-5 tracking-wide">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <MapPin
                  size={16}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <address className="not-italic text-background/60 text-sm leading-relaxed">
                  Shop no 7, Modi sheth chawal,
                  <br />
                  GD Ambekar Marg, Kalachowki,
                  <br />
                  Mumbai, Maharashtra 400033
                </address>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a
                  href="tel:08686161678"
                  className="text-background/60 hover:text-primary text-sm transition-colors"
                >
                  086 8616 1678
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Clock size={16} className="text-primary flex-shrink-0" />
                <span className="text-background/60 text-sm">
                  Mon–Sun: 10:00 AM – 10:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex items-center justify-center text-sm text-background/40">
          <p className="flex items-center gap-1.5">
            Made with <Heart size={13} className="text-red-400 fill-red-400" />{" "}
            in Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}
