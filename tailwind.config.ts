import type { Config } from "tailwindcss";
export default { content:["./app/**/*.tsx","./components/**/*.tsx","./sections/**/*.tsx"],
theme:{extend:{colors:{bg:"#070B14",card:"#111827",accent:"#FC6B35",muted:"#AAB4C8"},
fontFamily:{sans:["var(--font-ar)","var(--font-en)","sans-serif"]}}},plugins:[]} satisfies Config;
