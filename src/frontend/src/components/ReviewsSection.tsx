import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddReview, useGetReviews } from "@/hooks/useQueries";
import { Loader2, Send, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Review } from "../backend.d";

const FALLBACK_REVIEWS: Review[] = [
  {
    name: "Priya Sharma",
    rating: BigInt(5),
    comment:
      "Absolutely love the momos here! The chilli sauce is perfectly spicy and the wrappers are so soft. Best in Mumbai!",
    timestamp: BigInt(0),
  },
  {
    name: "Rahul Mehta",
    rating: BigInt(5),
    comment:
      "The chicken burger is insane! Juicy patty, fresh veggies — this place never disappoints. My go-to spot for a quick bite.",
    timestamp: BigInt(0),
  },
  {
    name: "Ananya Patel",
    rating: BigInt(4),
    comment:
      "Really affordable and tasty! The cold coffee is a must-try. The staff is super friendly too. Will definitely come back.",
    timestamp: BigInt(0),
  },
  {
    name: "Kartik Joshi",
    rating: BigInt(5),
    comment:
      "Ordered a paneer roll and it was absolutely delicious. Fresh, well-spiced, and great value for money. Highly recommended!",
    timestamp: BigInt(0),
  },
];

function StarRating({
  rating,
  interactive = false,
  onChange,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={
            interactive
              ? "cursor-pointer transition-transform hover:scale-110"
              : "cursor-default"
          }
        >
          <Star
            size={interactive ? 22 : 15}
            className={
              star <= (interactive ? hover || rating : rating)
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30"
            }
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = [
    "bg-amber-100 text-amber-700",
    "bg-orange-100 text-orange-700",
    "bg-red-100 text-red-700",
    "bg-green-100 text-green-700",
    "bg-blue-100 text-blue-700",
  ];
  const colorIdx = review.name.charCodeAt(0) % colors.length;

  return (
    <div className="bg-card rounded-3xl p-6 shadow-card border border-border flex flex-col gap-4 card-hover min-w-[280px]">
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-heading font-bold text-sm flex-shrink-0 ${colors[colorIdx]}`}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-foreground text-sm">
            {review.name}
          </p>
          <StarRating rating={Number(review.rating)} />
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { data: reviews, isLoading } = useGetReviews();
  const addReview = useAddReview();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

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

  const displayReviews =
    reviews && reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error("Please fill in your name and comment.");
      return;
    }
    try {
      await addReview.mutateAsync({ name, rating: BigInt(rating), comment });
      toast.success("Review submitted! Thank you 🙏");
      setName("");
      setRating(5);
      setComment("");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="section-fade py-24 md:py-32 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.22em] uppercase mb-3">
            Customer Reviews
          </p>
          <h2 className="font-display font-bold text-[clamp(2.2rem,5.5vw,3.8rem)] text-foreground leading-[1.06] tracking-[-0.025em] mb-4">
            What Our{" "}
            <span className="text-gradient-warm italic">Customers</span>{" "}
            <span className="font-light">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real reviews from real food lovers in Mumbai.
          </p>
        </div>

        {/* Reviews scrollable row */}
        {isLoading ? (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {Array.from({ length: 3 }, (_, i) => i).map((i) => (
              <div
                key={`review-skeleton-${i}`}
                className="bg-card rounded-3xl p-6 border border-border min-w-[280px] animate-shimmer h-40"
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
            {displayReviews.map((review, i) => (
              <div
                key={`review-${review.name}-${i}`}
                className="snap-start flex-shrink-0 w-[280px] md:w-auto"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        )}

        {/* Leave a Review Form */}
        <div className="mt-16 max-w-lg mx-auto">
          <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
            <h3 className="font-display font-bold text-2xl text-foreground mb-1.5">
              Leave a Review
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Share your experience with us!
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label
                  htmlFor="review-name"
                  className="block text-sm font-heading font-semibold text-foreground mb-1.5"
                >
                  Your Name
                </label>
                <Input
                  id="review-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="rounded-xl border-input"
                  required
                />
              </div>

              <div>
                <p className="block text-sm font-heading font-semibold text-foreground mb-2">
                  Rating
                </p>
                <StarRating rating={rating} interactive onChange={setRating} />
              </div>

              <div>
                <label
                  htmlFor="review-comment"
                  className="block text-sm font-heading font-semibold text-foreground mb-1.5"
                >
                  Your Comment
                </label>
                <Textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={3}
                  className="rounded-xl border-input resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={addReview.isPending}
                className="w-full bg-primary text-primary-foreground rounded-xl font-heading font-bold transition-all hover:scale-[1.02] hover:shadow-warm"
              >
                {addReview.isPending ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {addReview.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
