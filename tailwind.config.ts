import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          hover: "var(--color-accent-hover)",
          active: "var(--color-accent-active)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        grey: {
          50: "var(--color-grey-50)",
          100: "var(--color-grey-100)",
          200: "var(--color-grey-200)",
          300: "var(--color-grey-300)",
          400: "var(--color-grey-400)",
          500: "var(--color-grey-500)",
          600: "var(--color-grey-600)",
          700: "var(--color-grey-700)",
          800: "var(--color-grey-800)",
          900: "var(--color-grey-900)",
        },
        labels: {
          primary: "var(--color-labels-primary)",
          secondary: "var(--color-labels-secondary)",
          tertiary: "var(--color-labels-tertiary)",
          quaternary: "var(--color-labels-quaternary)",
        },
        success: "var(--color-success)",
        error: "var(--color-error)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      fontSize: {
        h1: [
          "var(--font-h1-size)",
          {
            lineHeight: "var(--font-h1-line-height)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        h2: [
          "var(--font-h2-size)",
          {
            lineHeight: "var(--font-h2-line-height)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        h3: [
          "var(--font-h3-size)",
          {
            lineHeight: "var(--font-h3-line-height)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        h4: [
          "var(--font-h4-size)",
          {
            lineHeight: "var(--font-h4-line-height)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        h5: [
          "var(--font-h5-size)",
          {
            lineHeight: "var(--font-h5-line-height)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        h6: [
          "var(--font-h6-size)",
          {
            lineHeight: "var(--font-h6-line-height)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        subtitle1: [
          "var(--font-subtitle1-size)",
          {
            lineHeight: "var(--font-subtitle1-line-height)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        subtitle2: [
          "var(--font-subtitle2-size)",
          {
            lineHeight: "var(--font-subtitle2-line-height)",
            fontWeight: "var(--font-weight-semibold)",
          },
        ],
        body1: [
          "var(--font-body1-size)",
          {
            lineHeight: "var(--font-body1-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        body2: [
          "var(--font-body2-size)",
          {
            lineHeight: "var(--font-body2-line-height)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        body3: [
          "var(--font-body3-size)",
          {
            lineHeight: "var(--font-body3-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        body4: [
          "var(--font-body4-size)",
          {
            lineHeight: "var(--font-body4-line-height)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        caption1: [
          "var(--font-caption1-size)",
          {
            lineHeight: "var(--font-caption1-line-height)",
            fontWeight: "var(--font-weight-regular)",
          },
        ],
        caption2: [
          "var(--font-caption2-size)",
          {
            lineHeight: "var(--font-caption2-line-height)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
        caption3: [
          "var(--font-caption3-size)",
          {
            lineHeight: "var(--font-caption3-line-height)",
            fontWeight: "var(--font-weight-medium)",
          },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
