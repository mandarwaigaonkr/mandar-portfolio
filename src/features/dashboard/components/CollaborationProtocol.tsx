"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { collaborationProtocolData } from "@/lib/data/profileSections";

import styles from "./CollaborationProtocol.module.css";

export function CollaborationProtocol() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Locked-Axis Diagonal Parallax
  // We translate X from 0 to -20% along the rotated belt container to slow down the scroll
  const beltX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  
  // Opacity: fade in as approaching center, fade out when passing
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.01, 0.12, 0.01]);
  
  // Vector guide scaling
  const vectorScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  // Generate an array for the infinite mechanical belt
  const watermarks = Array(6).fill(collaborationProtocolData.watermark);

  return (
    <motion.section
      ref={sectionRef}
      className={styles.section}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        className={styles.vectorGuide}
        style={{ scaleX: vectorScale, rotate: -25 }}
      />
      
      <div className={styles.watermarkRail}>
        <motion.div className={styles.watermarkBelt} style={{ x: beltX, opacity }}>
          {watermarks.map((text, i) => (
            <span key={i} className={styles.watermark} aria-hidden="true">
              {text} <span className={styles.watermarkSeparator}>///</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className={styles.stack}>
        <span className={styles.status}>
          <span className={styles.statusDot} />
          {collaborationProtocolData.status}
        </span>

        <h2 className={styles.heading}>{collaborationProtocolData.heading}</h2>
        <h3 className={styles.subheading}>{collaborationProtocolData.subheading}</h3>

        <button type="button" className={`${styles.actionButton} interactive`}>
          {collaborationProtocolData.primaryAction}
        </button>

        <div className={styles.linkRow}>
          {collaborationProtocolData.links.map((link) => (
            <button key={link} type="button" className={`${styles.linkChip} interactive`}>
              {link}
            </button>
          ))}
        </div>

        <button type="button" className={`${styles.resumeButton} interactive`}>
          {collaborationProtocolData.secondaryAction}
        </button>

        <p className={styles.footerLine}>
          &copy; {new Date().getFullYear()} Mandar Waigaonkar. All Rights Reserved.
        </p>
      </div>
    </motion.section>
  );
}
