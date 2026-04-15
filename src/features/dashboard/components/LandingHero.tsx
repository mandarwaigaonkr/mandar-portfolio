"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import styles from "./LandingHero.module.css";

type LandingHeroProps = {
    candidate: string;
    designation: string;
    summary: string;
};

export function LandingHero({ candidate, designation, summary }: LandingHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const vignetteRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePos({ x: event.clientX, y: event.clientY });

            // Update vignette position
            if (vignetteRef.current) {
                vignetteRef.current.style.setProperty("--cursor-x", `${event.clientX}px`);
                vignetteRef.current.style.setProperty("--cursor-y", `${event.clientY}px`);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className={styles.heroContainer} ref={containerRef}>
            {/* Vignette spotlight effect */}
            <div className={styles.vignette} ref={vignetteRef} />

            {/* Floating background images */}
            <motion.div
                className={styles.floatingImage}
                style={{ left: "10%", top: "15%" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <div className={styles.imagePlaceholder}>IMAGE_01</div>
            </motion.div>

            <motion.div
                className={styles.floatingImage}
                style={{ right: "15%", top: "30%" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <div className={styles.imagePlaceholder}>IMAGE_02</div>
            </motion.div>

            <motion.div
                className={styles.floatingImage}
                style={{ left: "20%", bottom: "20%" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.55, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <div className={styles.imagePlaceholder}>IMAGE_03</div>
            </motion.div>

            <motion.div
                className={styles.floatingImage}
                style={{ right: "10%", bottom: "25%" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className={styles.imagePlaceholder}>IMAGE_04</div>
            </motion.div>

            {/* Center content */}
            <div className={styles.centerContent}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className={styles.name}>{candidate}</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <p className={styles.designation}>{designation}</p>
                    <p className={styles.summaryText}>{summary}</p>
                </motion.div>
            </div>

            {/* Custom cursor */}
            <motion.div
                className={styles.customCursor}
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />
        </div>
    );
}
