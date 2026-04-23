"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./LandingHero.module.css";

/* ── Floating code snippets — actual code fragments ── */
const CODE_SNIPPETS = [
    `public class Pipeline {
  private final Queue<Task> tasks;
  public void execute() {
    tasks.forEach(Task::run);
  }
}`,
    `const config = {
  runtime: "edge",
  regions: ["blr-1"],
  timeout: 30_000,
};`,
    `SELECT m.module_id,
       m.status,
       COUNT(*) as ops
FROM modules m
GROUP BY m.module_id;`,
    `interface SystemNode {
  id: string;
  status: "active" | "standby";
  heartbeat: () => void;
}`,
];

type LandingHeroProps = {
    candidate: string;
    designation: string;
    summary: string;
    cursorX: MotionValue<number>;
    cursorY: MotionValue<number>;
};

export function LandingHero({ candidate, designation, summary, cursorX, cursorY }: LandingHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [uptime, setUptime] = useState("00:00:00");
    const startTime = useRef(Date.now());

    // Refs for direct DOM mutation — avoids React re-renders on every mouse move
    const coordsRef1 = useRef<HTMLDivElement>(null);
    const coordsRef2 = useRef<HTMLDivElement>(null);

    // Parallax transforms for floating panels
    const floatingX1 = useTransform(cursorX, [0, typeof window !== "undefined" ? window.innerWidth : 1024], [-40, 40]);
    const floatingY1 = useTransform(cursorY, [0, typeof window !== "undefined" ? window.innerHeight : 768], [-40, 40]);

    const floatingX2 = useTransform(cursorX, [0, typeof window !== "undefined" ? window.innerWidth : 1024], [30, -30]);
    const floatingY2 = useTransform(cursorY, [0, typeof window !== "undefined" ? window.innerHeight : 768], [30, -30]);

    const floatingX3 = useTransform(cursorX, [0, typeof window !== "undefined" ? window.innerWidth : 1024], [-20, 20]);
    const floatingY3 = useTransform(cursorY, [0, typeof window !== "undefined" ? window.innerHeight : 768], [25, -25]);

    /* ── Uptime counter ── */
    useEffect(() => {
        const timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
            const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
            const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
            const s = String(elapsed % 60).padStart(2, "0");
            setUptime(`${h}:${m}:${s}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    /* ── Track cursor for coordinate display via direct DOM mutation (no re-renders) ── */
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const text = `X: ${Math.round(event.clientX)} Y: ${Math.round(event.clientY)}`;
            if (coordsRef1.current) coordsRef1.current.textContent = text;
            if (coordsRef2.current) coordsRef2.current.textContent = text;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className={styles.heroContainer} ref={containerRef}>
            {/* Floating code snippets in background */}
            <div className={styles.codeSnippetsLayer}>
                {CODE_SNIPPETS.map((snippet, idx) => (
                    <div key={idx} className={styles.codeSnippet}>
                        {snippet}
                    </div>
                ))}
            </div>

            {/* Floating tech panels — parallax with cursor */}
            <motion.div
                className={styles.floatingElement}
                style={{ x: floatingX1, y: floatingY1, left: "6%", top: "10%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <div className={styles.techPanel}>
                    <div className={styles.techText}>LAT: 12.9716° N</div>
                    <div className={styles.techText}>LON: 77.5946° E</div>
                    <div className={styles.techText}>SECURE_GRID_99</div>
                </div>
            </motion.div>

            <motion.div
                className={styles.floatingElement}
                style={{ x: floatingX2, y: floatingY2, right: "8%", top: "22%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className={styles.techPanel}>
                    <div className={styles.techLog}>{">>"} sys_uptime: {uptime}</div>
                    <div className={styles.techLog}>{">>"} status: ENCRYPTED</div>
                    <div className={styles.techLog}>{">>"} channel: SECURE</div>
                    <div className={styles.techCoords} ref={coordsRef1}>X: 0 Y: 0</div>
                </div>
            </motion.div>

            <motion.div
                className={styles.floatingElement}
                style={{ x: floatingX3, y: floatingY3, left: "12%", bottom: "15%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <div className={styles.techPanel}>
                    <div className={styles.techCoords} ref={coordsRef2}>X: 0 Y: 0</div>
                </div>
            </motion.div>

            <motion.div
                className={styles.floatingElement}
                style={{ x: floatingX1, y: floatingY2, right: "10%", bottom: "20%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <div className={styles.techPanel}>
                    <div className={styles.techText}>NODE: BLR-PRIME</div>
                    <div className={styles.techText}>BUILD: 0.1.0</div>
                </div>
            </motion.div>

            {/* Corner HUD — Top Left */}
            <div className={`${styles.hudCorner} ${styles.hudTopLeft}`}>
                <span className={styles.hudLabel}>LOCATION</span>
                <span className={styles.hudValue}>BENGALURU, IN</span>
            </div>

            {/* Corner HUD — Top Right */}
            <div className={`${styles.hudCorner} ${styles.hudTopRight}`}>
                <span className={styles.hudLabel}>SYS_UPTIME</span>
                <span className={styles.hudValue}>{uptime}</span>
            </div>

            {/* Corner HUD — Bottom Left */}
            <div className={`${styles.hudCorner} ${styles.hudBottomLeft}`}>
                <span className={styles.hudValue}>
                    <span className={styles.statusDot} />
                    ENCRYPTED
                </span>
            </div>

            {/* Corner HUD — Bottom Right: Heartbeat */}
            <div className={`${styles.hudCorner} ${styles.hudBottomRight}`}>
                <svg
                    className={styles.heartbeatContainer}
                    viewBox="0 0 100 24"
                    preserveAspectRatio="none"
                >
                    <path
                        className={styles.heartbeatPath}
                        d="M0,12 L20,12 L25,4 L30,20 L35,8 L40,16 L45,12 L65,12 L70,2 L75,22 L80,6 L85,18 L90,12 L100,12"
                    />
                </svg>
            </div>

            {/* Center content — Name + Description */}
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
                    <p className={styles.tagline}>{"// SYSTEM ARCHITECT // SEC_LEVEL_09"}</p>
                    <p className={styles.designation}>{designation}</p>
                    <p className={styles.summaryText}>{summary}</p>
                </motion.div>
            </div>
        </div>
    );
}
