/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            'desktop': {max: "1536px"},
            'laptop': {max: "1280px"},
            'tablet': {max: "1024px"},
            'largePhone': {max: "768px"},
            'phone': {max: "640px"},
            'smallPhone': {max: "480px"},
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: "#3B82F6",
                secondary: "#06B6D4",
                background: "#0F172A",
                surface: "#1E293B",
                textPrimary: "#E2E8F0",
                textSecondary: "#94A3B8",
                border: "#334155",
                error: "#EF4444",
                success: "#22C55E",
                warning: "#EAB308",
            },
        },
    },
    plugins: [],
};