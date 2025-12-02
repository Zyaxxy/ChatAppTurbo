import type { Config } from "tailwindcss";

const config: Config = {
    // 1. Define paths to scan. 
    // CRITICAL: We include the relative path to packages/ui so Tailwind generates CSS for those components.
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: "#D4AF37",
                silver: "#C0C0C0",
                bg: "#050505",
            },
            fontFamily: {
                // Ensure these match the CSS variables you set in apps/web/src/app/layout.tsx
                serifHeading: ["var(--font-playfair)"],
                serifBody: ["var(--font-merriweather)"],
                playfair: ["var(--font-playfair)"],
            },
            animation: {
                "fade-up": "fadeUp 1s ease-out forwards",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
