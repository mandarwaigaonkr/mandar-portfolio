"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
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
    const cursorRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorState, setCursorState] = useState<"default" | "click" | "hover">("default");

    // Create parallax transforms for floating elements
    const floatingX1 = useTransform(cursorX, [0, window.innerWidth || 1024], [-40, 40]);
    const floatingY1 = useTransform(cursorY, [0, window.innerHeight || 768], [-40, 40]);

    const floatingX2 = useTransform(cursorX, [0, window.innerWidth || 1024], [30, -30]);
    const floatingY2 = useTransform(cursorY, [0, window.innerHeight || 768], [30, -30]);

    const floatingX3 = useTransform(cursorX, [0, window.innerWidth || 1024], [-30, 30]);
    const floatingY3 = useTransform(cursorY, [0, window.innerHeight || 768], [50, -50]);

    useEffect(() => {
        let animationFrameId: number;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            targetX = event.clientX;
            targetY = event.clientY;
            setCursorPos({ x: event.clientX, y: event.clientY });

            // Update vignette position immediately
            if (vignetteRef.current) {
                vignetteRef.current.style.setProperty("--cursor-x", `${event.clientX}px`);
                vignetteRef.current.style.setProperty("--cursor-y", `${event.clientY}px`);
            }

            // Update background gradient
            if (backgroundRef.current) {
                const xPercent = (event.clientX / window.innerWidth) * 100;
                const yPercent = (event.clientY / window.innerHeight) * 100;
                backgroundRef.current.style.setProperty("--gradient-x", `${xPercent}%`);
                backgroundRef.current.style.setProperty("--gradient-y", `${yPercent}%`);
            }

            // Check if hovering interactive elements
            const target = event.target as HTMLElement;
            if (target && (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a") || target.classList.contains("interactive"))) {
                setCursorState("hover");
            } else {
                setCursorState("default");
            }
        };

        const handleMouseDown = () => {
            setCursorState("click");
        };

        const handleMouseUp = () => {
            setCursorState("default");
        };

        const updateCursor = () => {
            // Smooth interpolation for cursor
            const currentX = cursorX.get();
            const currentY = cursorY.get();

            const dx = targetX - currentX;
            const dy = targetY - currentY;

            cursorX.set(currentX + dx * 0.25);
            cursorY.set(currentY + dy * 0.25);

            animationFrameId = requestAnimationFrame(updateCursor);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        animationFrameId = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, [cursorX, cursorY]);

    return (
        <div className={styles.heroContainer} ref={containerRef}>
            {/* Dynamic gradient background synced with cursor */}
            <div className={styles.gradientBg} ref={backgroundRef} />

            {/* Vignette spotlight effect */}
            <div className={styles.vignette} ref={vignetteRef} />

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

            {/* Custom cursor - theme-matched */}
            <motion.div
                className={`${styles.customCursor} ${styles[cursorState]}`}
                ref={cursorRef}
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
        </div>
    );
}
