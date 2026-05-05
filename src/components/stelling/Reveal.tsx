import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
}

export const Reveal = ({ children, delay = 0, x = 0, y = 24 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);