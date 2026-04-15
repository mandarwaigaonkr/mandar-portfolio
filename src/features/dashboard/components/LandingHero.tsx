"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import styles from "./LandingHero.module.css";

type LandingHeroProps = {
    candidate: string;
    designation: string;
    summary: string;
    cursorX: MotionValue<number>;
    cursorY: MotionValue<number>;
};

export function LandingHero({ candidate, designation, summary, cursorX, cursorY }: LandingHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // Create parallax transforms for floating elements
    const floatingX1 = useTransform(cursorX, [0, typeof window !== "undefined" ? window.innerWidth : 1024], [-40, 40]);
    const floatingY1 = useTransform(cursorY, [0, typeof window !== "undefined" ? window.innerHeight : 768], [-40, 40]);

    const floatingX2 = useTransform(cursorX, [0, typeof window !== "undefined" ? window.innerWidth : 1024], [30, -30]);
    const floatingY2 = useTransform(cursorY, [0, typeof window !== "undefined" ? window.innerHeight : 768], [30, -30]);

    const floatingX3 = useTransform(cursorX, [0, typeof window !== "undefined" ? window.innerWidth : 1024], [-30, 30]);
    const floatingY3 = useTransform(cursorY, [0, typeof window !== "undefined" ? window.innerHeight : 768], [50, -50]);

    // Track raw cursor position for the coordinate display
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setCursorPos({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className={styles.heroContainer} ref={containerRef}>
            {/* Floating tech elements */}
            <motion.div
                className={styles.floatingElement}
                style={{ x: floatingX1, y: floatingY1, left: "8%", top: "12%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <div className={styles.techPanel}>
                    <div className={styles.techText}>LAT: 48.8566 N</div>
                    <div className={styles.techText}>LON: 2.3522 E</div>
                    <div className={styles.techText}>SECURE_GRID_99</div>
                </div>
            </motion.div>

            <motion.div
                className={styles.floatingElement}
                style={{ x: floatingX2, y: floatingY2, right: "12%", top: "25%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <div className={styles.techPanel}>
                    <div className={styles.techLog}>&gt;&gt; analyzing logic_</div>
                    <div className={styles.techLog}>&gt;&gt; bug eliminated</div>
                    <div className={styles.techLog}>&gt;&gt; system optimized</div>
                    <div className={styles.techCoords}>X: {Math.round(cursorPos.x)} Y: {Math.round(cursorPos.y)}</div>
                </div>
            </motion.div>

            <motion.div
                className={styles.floatingElement}
                style={{ x: floatingX3, y: floatingY3, left: "15%", bottom: "18%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <div className={styles.techPanel}>
                    <div className={styles.techCoords}>X: {Math.round(cursorPos.x)} Y: {Math.round(cursorPos.y)}</div>
                </div>
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
        </div>
    );
}
