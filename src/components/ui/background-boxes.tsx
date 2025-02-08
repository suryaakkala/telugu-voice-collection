"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(30).fill(1); // Constrain number of rows
  const cols = new Array(20).fill(1); // Constrain number of columns

  const colors = [
    "rgb(125 211 252)", // sky-300
    "rgb(249 168 212)", // pink-300
    "rgb(134 239 172)", // green-300
    "rgb(253 224 71)",  // yellow-300
    "rgb(252 165 165)", // red-300
    "rgb(216 180 254)", // purple-300
    "rgb(147 197 253)", // blue-300
    "rgb(165 180 252)", // indigo-300
    "rgb(196 181 253)", // violet-300
  ];

   // Framer motion animation variants
   const boxVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { backgroundColor: "rgb(134 239 172)", transition: { duration: 0.2 } },
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-wrap justify-center items-center",
        className
      )}
      style={{
        transform: "scale(1)",
      }}
      {...rest}
    >
      {rows.map((_, i) => (
        <div key={`row-${i}`} className="flex">
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              className="w-10 h-10 border border-slate-700"
              variants={boxVariants}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
