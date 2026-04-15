"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import { LandingHero } from "./LandingHero";
import { SystemLogs } from "@/features/logs/components/SystemLogs";
import { ModuleDetailView } from "@/features/modules/components/ModuleDetailView";
import { ModuleSlider } from "@/features/modules/components/ModuleSlider";
import { useSystemStore } from "@/store/system-store";
import type { LogRecord, ModuleRecord } from "@/types/system";

import styles from "./SystemDashboard.module.css";

type SystemDashboardProps = {
  modules: ModuleRecord[];
  logs: LogRecord[];
  systemMeta: {
    candidate: string;
    designation: string;
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

export function SystemDashboard({ logs, modules, systemMeta }: SystemDashboardProps) {
  const primaryModule = modules[1] ?? modules[0];
  const currentView = useSystemStore((state) => state.currentView);
  const expandedModuleId = useSystemStore((state) => state.expandedModuleId);
  const closeLogsView = useSystemStore((state) => state.closeLogsView);
  const closeModuleView = useSystemStore((state) => state.closeModuleView);
  const logsRef = useRef<HTMLDivElement | null>(null);

  const detailModule = useMemo(
    () => modules.find((module) => module.id === expandedModuleId) ?? null,
    [expandedModuleId, modules]
  );

  useEffect(() => {
    if (currentView !== "logs") {
      return;
    }

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    logsRef.current?.scrollIntoView({
      behavior,
      block: "start"
    });
  }, [currentView]);

  return (
    <section className={styles.shell}>
      <LandingHero
        candidate={systemMeta.candidate}
        designation={systemMeta.designation}
        summary={systemMeta.summary}
      />

      <div className={styles.inner}>
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.sectionLabel}>Primary interaction layer</p>
            <h2>Vertical input now drives the module network horizontally.</h2>
          </div>
          <p className={styles.sectionCopy}>
            This section pins the interface and maps browser scroll progress into a
            controlled lateral sweep across executable modules. Hover can temporarily
            override focus for inspection without breaking the underlying scroll state.
          </p>
        </div>

        <ModuleSlider logs={logs} modules={modules} />

        <AnimatePresence>
          {detailModule ? (
            <ModuleDetailView
              key={detailModule.id}
              logs={logs}
              mode="embedded"
              module={detailModule}
              onClose={closeModuleView}
            />
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {currentView === "logs" ? (
            <motion.div
              key="logs-surface"
              ref={logsRef}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 28 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <SystemLogs
                logs={logs}
                mode="embedded"
                modules={modules}
                onClose={closeLogsView}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className={styles.grid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span>Execution history</span>
              <strong>{logs.length}</strong>
            </div>
            <div className={styles.logList}>
              {logs.slice(0, 4).map((log) => (
                <div className={styles.logItem} key={log.id}>
                  <span>{log.timestamp}</span>
                  <strong>{log.title}</strong>
                  <p>{log.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.stack}>
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span>Operator status</span>
                <strong>Available</strong>
              </div>
              <p className={styles.availability}>{systemMeta.availability}</p>
              <div className={styles.placeholder}>PROFILE_IMAGE_PLACEHOLDER</div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span>Phase status</span>
                <strong>Phase 5</strong>
              </div>
              <p className={styles.availability}>
                Logs workspace, status overlay, routeable logs page, and reduced-motion
                handling are active. The system build is now functionally complete.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
