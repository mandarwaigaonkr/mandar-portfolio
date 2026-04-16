"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

import styles from "./BackgroundArtifacts.module.css";

const ARTIFACT_DATA = [
  { content: `fn execute_cmd() -> Result<()> {\n    let buffer = 0x8F2A;\n}`, top: "6%", left: "4%", speed: -50 },
  { content: `struct Route {\n    id: u32,\n    path: Vec<u8>,\n}`, top: "14%", right: "8%", speed: 120 },
  { content: `0x7FFF9820: FF 00 1A 2B\n0x7FFF9828: 00 00 00 00`, top: "25%", left: "12%", speed: -80 },
  { content: `[ + ] TARGET VECTOR LOCKED\n    ALT: 8900m`, top: "36%", right: "5%", speed: 60 },
  { content: `export const config = {\n  runtime: "edge",\n};`, top: "45%", left: "5%", speed: -100 },
  { content: `#define MAX_CONNECTIONS 1024\nstatic void* _sys_init();`, top: "54%", right: "12%", speed: 90 },
  { content: `0x00000000 7f 45 4c 46 02 | .ELF |`, top: "65%", left: "8%", speed: -70 },
  { content: `SYS_OPT: OK\nNODE_A: ONLINE\nNODE_B: STANDBY`, top: "72%", right: "6%", speed: 110 },
  { content: `import { createServer } from 'node:http';`, top: "82%", left: "15%", speed: -60 },
  { content: `while (true) {\n  await dispatch();\n}`, top: "88%", right: "7%", speed: 80 },
  { content: `// END OF TRANSMISSION`, top: "96%", left: "10%", speed: -40 },
];

export function BackgroundArtifacts() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.container} aria-hidden="true">
      {/* 1. Dynamic SVG Data Radars (Sync entirely to scroll depth) */}
      <RadarArtifact scrollYProgress={scrollYProgress} top="18%" left="82%" />
      <DataPipelineArtifact scrollYProgress={scrollYProgress} top="60%" left="6%" />
      <RadarArtifact scrollYProgress={scrollYProgress} top="84%" right="10%" />

      {/* 2. Text/Code Arrays with dynamic skew and pulse fading */}
      {ARTIFACT_DATA.map((artifact, index) => (
        <ArtifactNode key={index} artifact={artifact} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

function ArtifactNode({
  artifact,
  scrollYProgress,
}: {
  artifact: typeof ARTIFACT_DATA[0];
  scrollYProgress: MotionValue<number>;
}) {
  const yDrift = useTransform(scrollYProgress, [0, 1], [0, artifact.speed]);

  // DYNAMIC STATE 1: Text pulses exactly in time with the scroll percentages
  const opacityPulse = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.08, 0.35, 0.05, 0.45, 0.08]
  );

  // DYNAMIC STATE 2: Fast-moving artifacts will skew dramatically as they accelerate past the viewport
  const dynamicSkew = useTransform(scrollYProgress, [0, 1], [0, artifact.speed > 80 ? 15 : -10]);

  return (
    <motion.div
      className={styles.artifact}
      style={{
        left: artifact.left,
        right: artifact.right,
        top: artifact.top,
        y: yDrift,
        opacity: opacityPulse,
        skewX: dynamicSkew,
      }}
    >
      <span className={styles.crosshairTopLeft}>+</span>
      <pre className={styles.artifactText}>{artifact.content}</pre>
      <span className={styles.crosshairBottomRight}>+</span>
    </motion.div>
  );
}

// ======================== NEW: DYNAMIC SVG WIDGETS =========================
// These geometric structures do not just float—they structurally draw and rotate natively hooked to the scroll wheel.

function RadarArtifact({ scrollYProgress, top, left, right }: any) {
  const rotateOuter = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const rotateInner = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const drawLine = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.1]);

  return (
    <motion.div className={styles.svgWidget} style={{ top, left, right, opacity: radarOpacity }}>
      <svg width="120" height="120" viewBox="0 0 100 100">
        <motion.circle cx="50" cy="50" r="45" strokeDasharray="4 8" stroke="var(--signal-primary)" strokeWidth="1" fill="none" style={{ rotate: rotateOuter, originX: "50px", originY: "50px" }} />
        <motion.circle cx="50" cy="50" r="30" stroke="var(--signal-primary)" strokeWidth="1.5" fill="none" style={{ pathLength: drawLine }} />
        <motion.rect x="40" y="40" width="20" height="20" fill="none" stroke="var(--signal-primary)" strokeWidth="0.8" style={{ rotate: rotateInner, originX: "50px", originY: "50px" }} />
        {/* Targeting center tick */}
        <circle cx="50" cy="50" r="2" fill="rgba(0, 245, 255, 0.6)" />
      </svg>
      <span className={styles.widgetLabel}>SYS_RADAR [ACTIVE]</span>
    </motion.div>
  );
}

function DataPipelineArtifact({ scrollYProgress, top, left, right }: any) {
  // A structural geometric pipeline whose lines populate precisely as you scroll down
  const drawPipeline = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const drawDots = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <motion.div className={styles.svgWidget} style={{ top, left, right }}>
      <svg width="40" height="200" viewBox="0 0 40 200">
        {/* Background track */}
        <path d="M 20 0 L 20 40 L 35 60 L 35 140 L 5 160 L 5 200" stroke="rgba(255, 255, 255, 0.05)" fill="none" strokeWidth="2" />
        
        {/* Dynamic bright pipeline that draws on scroll */}
        <motion.path 
          d="M 20 0 L 20 40 L 35 60 L 35 140 L 5 160 L 5 200" 
          stroke="var(--signal-primary)" fill="none" strokeWidth="2" 
          style={{ pathLength: drawPipeline }} 
        />
        
        {/* Nodes that populate near the end of the scroll */}
        <motion.circle cx="20" cy="40" r="4" fill="var(--signal-danger)" style={{ scale: drawDots }} />
        <motion.circle cx="35" cy="140" r="4" fill="var(--signal-danger)" style={{ scale: drawDots }} />
      </svg>
      <span className={styles.widgetLabel}>DATA_PL</span>
    </motion.div>
  );
}
