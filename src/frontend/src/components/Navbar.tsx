import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-warm border-b border-border py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/assets/generated/logo-transparent.dim_300x300.png"
            alt="Annapurna's FoodLab Logo"
            className="w-10 h-10 object-contain rounded-xl"
          />
          <div className="flex flex-col leading-none">
            <span
              className={`font-display font-bold text-base transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Annapurna's
            </span>
            <span
              className={`font-heading font-semibold text-xs tracking-widest uppercase transition-colors duration-300 ${
                isScrolled ? "text-primary" : "text-amber-300"
              }`}
            >
              FoodLab
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`px-4 py-2 rounded-full text-sm font-medium font-heading transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                isScrolled ? "text-foreground" : "text-white hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 font-heading font-semibold text-sm shadow-warm transition-all duration-200 hover:shadow-warm-lg hover:scale-105"
          >
            Order Now
          </Button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${
            isScrolled
              ? "text-foreground hover:bg-muted"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass border-t border-border mx-4 mt-2 rounded-2xl px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-medium font-heading text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="mt-2 bg-primary text-primary-foreground rounded-xl font-heading font-semibold"
          >
            Order Now
          </Button>
        </div>
      </div>
    </header>
  );
}
