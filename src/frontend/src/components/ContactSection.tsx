import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useQueries";
import {
  Clock,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const submitContact = useSubmitContactForm();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitContact.mutateAsync({ name, phone, message });
      toast.success("Message sent! We'll get back to you soon 🙏");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error(
        "Failed to send message. Please try again or WhatsApp us directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-fade py-24 md:py-32 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.22em] uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-display font-bold text-[clamp(2.2rem,5.5vw,3.8rem)] text-foreground leading-[1.06] tracking-[-0.025em] mb-4">
            Order or <span className="text-gradient-warm italic">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Reach out to place an order, ask a question, or just say hi!
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle size={20} className="text-primary" />
              <h3 className="font-heading font-bold text-xl text-foreground">
                Send us a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-heading font-semibold text-foreground mb-1.5"
                >
                  Your Name
                </label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Mehta"
                  className="rounded-xl border-input"
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-sm font-heading font-semibold text-foreground mb-1.5"
                >
                  Phone Number
                </label>
                <Input
                  id="contact-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  type="tel"
                  className="rounded-xl border-input"
                  required
                  autoComplete="tel"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-heading font-semibold text-foreground mb-1.5"
                >
                  Message / Order Details
                </label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi! I'd like to order..."
                  rows={4}
                  className="rounded-xl border-input resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitContact.isPending}
                className="w-full bg-primary text-primary-foreground rounded-xl font-heading font-bold transition-all hover:scale-[1.02] hover:shadow-warm"
              >
                {submitContact.isPending ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {submitContact.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Info Side */}
          <div className="flex flex-col gap-5">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918686161678?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-3xl bg-green-500 hover:bg-green-400 text-white shadow-warm-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-warm-lg group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <SiWhatsapp size={28} className="text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg">
                  Order on WhatsApp
                </div>
                <div className="text-green-100 text-sm">
                  Tap to chat & place your order instantly
                </div>
              </div>
              <div className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </a>

            {/* Call Now */}
            <a
              href="tel:08686161678"
              className="flex items-center gap-4 p-6 rounded-3xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg">Call Now</div>
                <div className="text-primary-foreground/70 text-sm">
                  086 8616 1678
                </div>
              </div>
              <div className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </a>

            {/* Address */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-card flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-heading font-bold text-foreground mb-1.5">
                  Our Location
                </div>
                <address className="not-italic text-muted-foreground text-sm leading-relaxed">
                  Shop no 7, Modi sheth chawal,
                  <br />
                  GD Ambekar Marg, Ambewadi,
                  <br />
                  Kalachowki, Mumbai,
                  <br />
                  Maharashtra 400033
                </address>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-card flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-heading font-bold text-foreground mb-1.5">
                  Opening Hours
                </div>
                <div className="text-muted-foreground text-sm leading-relaxed">
                  <div className="flex justify-between gap-8">
                    <span>Monday – Sunday</span>
                    <span className="font-medium text-foreground">
                      10:00 AM – 10:00 PM
                    </span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-heading font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    Open Today
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
