import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const scroll = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={scroll}
          className="md:hidden"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            background: "linear-gradient(135deg, #7B4FFF, #00E5FF)",
            padding: 16,
            color: "#050508",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textAlign: "center",
            border: "none",
          }}
        >
          Solicitar consulta gratuita →
        </motion.button>
      )}
    </AnimatePresence>
  );
};