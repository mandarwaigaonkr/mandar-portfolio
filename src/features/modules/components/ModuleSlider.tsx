"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { useSystemStore } from "@/store/system-store";
import type { LogRecord, ModuleRecord } from "@/types/system";

import { ConnectionTrace } from "./ConnectionTrace";
import { ModuleCard } from "./ModuleCard";
import { ModuleExecutionPanel } from "./ModuleExecutionPanel";
import styles from "./ModuleSlider.module.css";

type ModuleSliderProps = {
  logs: LogRecord[];
  modules: ModuleRecord[];
};

export function ModuleSlider({ logs, modules }: ModuleSliderProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const hoveredModule = useSystemStore((state) => state.hoveredModule);
  const activeModule = useSystemStore((state) => state.activeModule);
  const expandedModuleId = useSystemStore((state) => state.expandedModuleId);
  const closeModuleView = useSystemStore((state) => state.closeModuleView);
  const openModuleView = useSystemStore((state) => state.openModuleView);
  const setHoveredModule = useSystemStore((state) => state.setHoveredModule);
  const setActiveModule = useSystemStore((state) => state.setActiveModule);
  const setScrollProgress = useSystemStore((state) => state.setScrollProgress);

  const [maxOffset, setMaxOffset] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const railWidth = railRef.current?.scrollWidth ?? 0;
      setMaxOffset(Math.max(0, railWidth - viewportWidth));
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    if (railRef.current) {
      resizeObserver.observe(railRef.current);
    }

    window.addEventListener("resize", updateMeasurements);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxOffset]);
  const springX = useSpring(x, {
    damping: 26,
    stiffness: 110,
    mass: 0.28
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.round(latest * Math.max(0, modules.length - 1));
    const nextActive = modules[nextIndex]?.id ?? null;
    if (!hoveredModule && !expandedModuleId) {
      setActiveModule(nextActive);
    }
  });

  useEffect(() => {
    if (!activeModule && modules.length > 0) {
      setActiveModule(modules[0].id);
    }
  }, [activeModule, modules, setActiveModule]);

  const focusedModule = useMemo(
    () =>
      modules.find((module) => module.id === hoveredModule) ??
      modules.find((module) => module.id === activeModule) ??
      modules[0],
    [activeModule, hoveredModule, modules]
  );

  const executionModule = useMemo(
    () =>
      modules.find((module) => module.id === expandedModuleId) ??
      focusedModule,
    [expandedModuleId, focusedModule, modules]
  );

  const traceTarget =
    (focusedModule && cardRefs.current[focusedModule.id]) ??
    (executionModule && cardRefs.current[executionModule.id]) ??
    null;

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.sticky}>
        <div className={styles.viewport} ref={viewportRef}>
          <ConnectionTrace
            anchorRef={anchorRef}
            containerRef={viewportRef}
            targetElement={traceTarget}
          />

          <div className={styles.infoPanel}>
            <div className={styles.infoHeader}>
              <span>Module sweep</span>
              <strong>{focusedModule?.index ?? "00"}</strong>
            </div>
            <div className={styles.signalLock}>
              <div className={styles.anchorNode} ref={anchorRef} />
              <span>
                {expandedModuleId
                  ? "Execution trace locked"
                  : hoveredModule
                    ? "Signal trace redirected"
                    : "Signal trace synchronized"}
              </span>
            </div>
            <h2>{focusedModule?.title}</h2>
            <p className={styles.infoSummary}>{focusedModule?.summary}</p>

            <div className={styles.metrics}>
              {focusedModule?.metrics.map((metric) => (
                <div className={styles.metric} key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>

            <div className={styles.bullets}>
              {focusedModule?.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}
            </div>

            <ModuleExecutionPanel
              isExpanded={Boolean(expandedModuleId && executionModule)}
              module={executionModule}
              onToggle={() => {
                if (expandedModuleId) {
                  closeModuleView();
                  return;
                }

                if (!focusedModule) {
                  return;
                }

                openModuleView(focusedModule.id);
              }}
            />

            <div className={styles.logPreview}>
              <div className={styles.infoHeader}>
                <span>Recent logs</span>
                <strong>{logs.length}</strong>
              </div>
              {logs.slice(0, 3).map((log) => (
                <div className={styles.logItem} key={log.id}>
                  <span>{log.timestamp}</span>
                  <strong>{log.title}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.railWindow}>
            <motion.div className={styles.rail} ref={railRef} style={{ x: springX }}>
              {modules.map((module) => (
                <ModuleCard
                  isActive={focusedModule?.id === module.id}
                  isExpanded={expandedModuleId === module.id}
                  key={module.id}
                  module={module}
                  onInspect={(moduleId) => {
                    if (expandedModuleId === moduleId) {
                      closeModuleView();
                      return;
                    }

                    openModuleView(moduleId);
                  }}
                  onHoverStart={(moduleId) => {
                    setHoveredModule(moduleId);
                    setActiveModule(moduleId);
                  }}
                  onHoverEnd={() => setHoveredModule(null)}
                  registerCardRef={(moduleId, node) => {
                    cardRefs.current[moduleId] = node;
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
