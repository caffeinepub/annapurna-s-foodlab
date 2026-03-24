import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { MenuSection } from "./components/MenuSection";
import { Navbar } from "./components/Navbar";
import { ReviewsSection } from "./components/ReviewsSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { useInitializeMenuItems } from "./hooks/useQueries";

function App() {
  // Initialize menu items on load
  useInitializeMenuItems();

  // Update meta tags
  useEffect(() => {
    document.title = "Annapurna's FoodLab — Fresh, Tasty & Made with Love";
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Annapurna's FoodLab — Mumbai's favourite street food store. Burgers, pizza, momos, rolls, cold drinks & more. Fresh, affordable, and made with love in Kalachowki.",
    );
    setMeta(
      "og:title",
      "Annapurna's FoodLab — Fresh, Tasty & Made with Love",
      true,
    );
    setMeta(
      "og:description",
      "Mumbai's favourite street food store serving fresh momos, burgers, rolls, pizza & more at Kalachowki.",
      true,
    );
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Annapurna's FoodLab");
    setMeta(
      "twitter:description",
      "Fresh street food in Mumbai. Order momos, burgers, pizza & rolls.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <WhyChooseUs />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
