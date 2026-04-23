"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

import { CollaborationProtocol } from "./CollaborationProtocol";
import { BackgroundArtifacts } from "./BackgroundArtifacts";
import { LandingHero } from "./LandingHero";
import { EvidenceBoard } from "./EvidenceBoard";
import { ProfileMatrix } from "./ProfileMatrix";
import type { LogRecord, ModuleRecord } from "@/types/system";

import styles from "./SystemDashboard.module.css";

type SystemDashboardProps = {
  modules: ModuleRecord[];
  logs: LogRecord[];
  systemMeta: {
    candidate: string;
    designation: string;
    location: string;
    availability: string;
    currentRole: string;
    summary: string;
    labels: {
      systemName: string;
      build: string;
      clearance: string;
      region: string;
    };
  };
};

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function SystemDashboard({ logs, modules, systemMeta }: SystemDashboardProps) {
  const vignetteRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [cursorState, setCursorState] = useState<"default" | "click" | "hover">("default");
  const [isTouch, setIsTouch] = useState(false);

  // Ref-based cursor state to avoid re-renders on every mouse move
  const cursorStateRef = useRef<"default" | "click" | "hover">("default");

  const updateCursorState = useCallback((newState: "default" | "click" | "hover") => {
    if (cursorStateRef.current !== newState) {
      cursorStateRef.current = newState;
      setCursorState(newState);
    }
  }, []);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    // Skip all cursor tracking on touch devices
    if (isTouch) return;

    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      // Update vignette position — uses CSS custom properties for zero-layout-cost
      if (vignetteRef.current) {
        vignetteRef.current.style.setProperty("--cursor-x", `${event.clientX}px`);
        vignetteRef.current.style.setProperty("--cursor-y", `${event.clientY}px`);
      }

      // Update gradient background
      if (gradientRef.current) {
        const xPercent = (event.clientX / window.innerWidth) * 100;
        const yPercent = (event.clientY / window.innerHeight) * 100;
        gradientRef.current.style.setProperty("--gradient-x", `${xPercent}%`);
        gradientRef.current.style.setProperty("--gradient-y", `${yPercent}%`);
      }

      // Detect interactive elements for cursor state — only update React state on actual change
      const target = event.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("interactive"))
      ) {
        updateCursorState("hover");
      } else {
        updateCursorState("default");
      }
    };

    const handleMouseDown = () => updateCursorState("click");
    const handleMouseUp = () => updateCursorState("default");

    const handleScroll = () => {
      const vh = window.innerHeight;
      const ratio = Math.min(window.scrollY / vh, 1);

      // Dynamically update the vignette radius via CSS custom property
      // Starts at 910px at top, expands to 1600px as you scroll down
      const radius = 910 + ratio * 690;
      if (vignetteRef.current) {
        vignetteRef.current.style.setProperty("--vignette-radius", `${radius}px`);
      }

      // Also expand the gradient glow radius
      const gradientRadius = 600 + ratio * 500;
      if (gradientRef.current) {
        gradientRef.current.style.setProperty("--gradient-radius", `${gradientRadius}px`);
      }
    };

    const updateCursor = () => {
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateCursor);

    // Initial measurement
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX, cursorY, isTouch, updateCursorState]);

  return (
    <section className={styles.shell}>
      {/* Universal gradient background — follows cursor across the entire page */}
      <div className={styles.gradientBg} ref={gradientRef} />

      {/* Universal vignette spotlight — follows cursor, radius grows on scroll */}
      <div className={styles.vignette} ref={vignetteRef} />
      <BackgroundArtifacts />

      {/* Page content */}
      <LandingHero
        candidate={systemMeta.candidate}
        designation={systemMeta.designation}
        summary={systemMeta.summary}
        cursorX={cursorX}
        cursorY={cursorY}
      />

      <EvidenceBoard />

      <div className={styles.innerWide}>
        <ProfileMatrix systemMeta={systemMeta} />
      </div>

      <CollaborationProtocol />

      {/* Universal custom cursor — visible across the entire page, hidden on touch */}
      {!isTouch && (
        <motion.div
          className={`${styles.customCursor} ${styles[cursorState]}`}
          style={{
            x: cursorX,
            y: cursorY,
          }}
        />
      )}
    </section>
  );
}
