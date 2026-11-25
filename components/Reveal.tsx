"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: reduceMotion ? 0 : 0.6 }}>{children}</motion.div>;
}
