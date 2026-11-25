import type { Config } from "tailwindcss";
export default { darkMode:"class", content:["./app/**/*.tsx","./components/**/*.tsx","./sections/**/*.tsx"],
theme:{extend:{colors:{bg:"rgb(var(--color-bg) / <alpha-value>)",card:"rgb(var(--color-card) / <alpha-value>)",accent:"rgb(var(--color-accent) / <alpha-value>)",muted:"rgb(var(--color-muted) / <alpha-value>)",white:"rgb(var(--color-foreground) / <alpha-value>)",onaccent:"rgb(var(--color-onaccent) / <alpha-value>)"},
fontFamily:{sans:["var(--font-ar)","var(--font-en)","sans-serif"]}}},plugins:[]} satisfies Config;
