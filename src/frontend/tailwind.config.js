import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Brand tokens
        brand: {
          orange: "oklch(var(--orange) / <alpha-value>)",
          "orange-light": "oklch(var(--orange-light) / <alpha-value>)",
          "orange-dark": "oklch(var(--orange-dark) / <alpha-value>)",
          cream: "oklch(var(--cream) / <alpha-value>)",
          "cream-deep": "oklch(var(--cream-deep) / <alpha-value>)",
          brown: "oklch(var(--brown) / <alpha-value>)",
          "brown-light": "oklch(var(--brown-light) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
        display: ["Fraunces", "serif"],
        heading: ["Cabinet Grotesk", "sans-serif"],
      },
      scale: {
        108: "1.08",
        103: "1.03",
      },
      transitionDuration: {
        350: "350ms",
        400: "400ms",
        600: "600ms",
        700: "700ms",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 oklch(var(--brown) / 0.05)",
        sm: "0 2px 6px 0 oklch(var(--brown) / 0.08)",
        warm: "0 4px 24px oklch(var(--orange) / 0.18), 0 2px 8px oklch(var(--brown) / 0.06)",
        "warm-lg":
          "0 8px 40px oklch(var(--orange) / 0.22), 0 4px 16px oklch(var(--brown) / 0.08)",
        card: "0 2px 16px oklch(var(--brown) / 0.08), 0 1px 4px oklch(var(--brown) / 0.04)",
        "card-hover":
          "0 12px 36px oklch(var(--orange) / 0.2), 0 4px 14px oklch(var(--brown) / 0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
