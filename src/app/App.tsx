import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function App() {
  const [phase, setPhase] = useState(0);
  const boxSize = 300;
  const beadSize = 16;
  const duration = 4;

  const phases = [
    { label: "Breathe In", color: "#00f0ff" },
    { label: "Hold", color: "#00ff88" },
    { label: "Breathe Out", color: "#ff00ff" },
    { label: "Hold", color: "#ffaa00" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, duration * 1000);
    return () => clearInterval(timer);
  }, []);

  const getBeadPosition = () => {
    const offset = beadSize / 2;
    switch (phase) {
      case 0: // Top edge, left to right
        return { x: [0, boxSize], y: [0, 0] };
      case 1: // Right edge, top to bottom
        return { x: [boxSize, boxSize], y: [0, boxSize] };
      case 2: // Bottom edge, right to left
        return { x: [boxSize, 0], y: [boxSize, boxSize] };
      case 3: // Left edge, bottom to top
        return { x: [0, 0], y: [boxSize, 0] };
      default:
        return { x: [0, 0], y: [0, 0] };
    }
  };

  const currentPhase = phases[phase];
  const beadPosition = getBeadPosition();

  return (
    <div className="size-full flex flex-col items-center justify-center bg-black">
      <div className="relative" style={{ width: boxSize, height: boxSize }}>
        {/* Neon Box */}
        <div
          className="absolute inset-0 border-4 rounded-sm"
          style={{
            borderColor: currentPhase.color,
            boxShadow: `0 0 20px ${currentPhase.color}, inset 0 0 20px ${currentPhase.color}`,
            transition: "all 0.5s ease",
          }}
        />

        {/* Animated Bead */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: beadSize,
            height: beadSize,
            backgroundColor: currentPhase.color,
            boxShadow: `0 0 20px ${currentPhase.color}`,
            left: -beadSize / 2,
            top: -beadSize / 2,
          }}
          animate={{
            x: beadPosition.x,
            y: beadPosition.y,
          }}
          transition={{
            duration: duration,
            ease: "linear",
          }}
          key={phase}
        />
      </div>

      {/* Phase Label */}
      <motion.div
        className="mt-16 text-4xl font-light tracking-wider"
        style={{
          color: currentPhase.color,
          textShadow: `0 0 20px ${currentPhase.color}`,
        }}
        key={phase}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentPhase.label}
      </motion.div>
    </div>
  );
}