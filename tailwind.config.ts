import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#196081ff',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#67b1d6ff',
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'inherit',
              fontWeight: '600',
            },
            h1: {
              fontSize: '1.8rem',
              marginTop: '0',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.5rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.25rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h4: {
              fontSize: '1.15rem',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            ul: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            ol: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            code: {
              color: '#e11d48',
              backgroundColor: '#f1f5f9',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
            },
            blockquote: {
              borderLeftWidth: '4px',
              borderLeftColor: '#cbd5e1',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: '#64748b',
            },
            img: {
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0.5rem',
            },
            table: {
              width: '100%',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            th: {
              textAlign: 'left',
              padding: '0.75rem',
              backgroundColor: '#f1f5f9',
              fontWeight: '600',
            },
            td: {
              padding: '0.75rem',
              borderTop: '1px solid #e2e8f0',
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
