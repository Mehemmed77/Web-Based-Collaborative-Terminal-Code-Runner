import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  color?: string
}

export default function TypingText({ text, color }: TypingTextProps) {
  const [displayed, setDisplayed] = useState<string>("");

  useEffect(() => {
    let i = 1;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i++));
      if (i === text.length + 1) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography color={`${color ? color : "white"}`}>{displayed}</Typography>
    </motion.span>
  );
}
