"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

import { useSystemStore } from "@/store/system-store";
import type { LogRecord, LogType, ModuleRecord } from "@/types/system";

import styles from "./SystemLogs.module.css";

const logTypeOrder: Array<LogType | "all"> = [
  "all",
  "role",
  "project",
  "community",
  "education"
];

const logTypeLabel: Record<LogType | "all", string> = {
  all: "All",
  role: "Roles",
  project: "Projects",
  community: "Community",
  education: "Education"
};

type SystemLogsProps = {
  logs: LogRecord[];
  mode: "embedded" | "page";
  modules: ModuleRecord[];
  onClose?: () => void;
};

export function SystemLogs({ logs, mode, modules, onClose }: SystemLogsProps) {
  const activeLogFilter = useSystemStore((state) => state.activeLogFilter);
  const openModuleView = useSystemStore((state) => state.openModuleView);
  const setActiveLogFilter = useSystemStore((state) => state.setActiveLogFilter);

  const filteredLogs = useMemo(
    () =>
      activeLogFilter === "all"
        ? logs
        : logs.filter((log) => log.type === activeLogFilter),
    [activeLogFilter, logs]
  );

  const countsByType = useMemo(
    () =>
      logs.reduce<Record<LogType, number>>(
        (accumulator, log) => {
          accumulator[log.type] += 1;
          return accumulator;
        },
        {
          role: 0,
          project: 0,
          community: 0,
          education: 0
        }
      ),
    [logs]
  );

  const relatedModulesByLog = useMemo(() => {
    const entries: Array<[string, ModuleRecord[]]> = logs.map((log) => [
      log.id,
      modules.filter((module) => module.detail.relatedLogIds.includes(log.id))
    ]);

    return new Map<string, ModuleRecord[]>(entries);
  }, [logs, modules]);

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className={styles.surface}
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className={styles.topBar}>
        <div>
          <p className={styles.eyebrow}>
            {mode === "embedded" ? "Execution history workspace" : "Dedicated logs route"}
          </p>
          <h2>System logs and operational history.</h2>
          <p className={styles.intro}>
            This workspace consolidates experience across internships, project builds,
            education, and technical community work into a structured event stream.
          </p>
        </div>

        <div className={styles.actions}>
          {mode === "embedded" ? (
            <>
              <button onClick={onClose} type="button">
                Return to Dashboard
              </button>
              <Link href="/logs">Open Standalone Route</Link>
            </>
          ) : (
            <Link href="/">Return to Control Network</Link>
          )}
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <span>Total entries</span>
          <strong>{logs.length}</strong>
        </div>
        <div className={styles.metricCard}>
          <span>Roles</span>
          <strong>{countsByType.role}</strong>
        </div>
        <div className={styles.metricCard}>
          <span>Projects</span>
          <strong>{countsByType.project}</strong>
        </div>
        <div className={styles.metricCard}>
          <span>Community</span>
          <strong>{countsByType.community}</strong>
        </div>
        <div className={styles.metricCard}>
          <span>Education</span>
          <strong>{countsByType.education}</strong>
        </div>
      </div>

      <div className={styles.filterBar}>
        {logTypeOrder.map((type) => (
          <button
            className={type === activeLogFilter ? styles.filterActive : styles.filterButton}
            key={type}
            onClick={() => setActiveLogFilter(type)}
            type="button"
          >
            {logTypeLabel[type]}
          </button>
        ))}
      </div>

      <div className={styles.timeline}>
        {filteredLogs.map((log) => {
          const relatedModules = relatedModulesByLog.get(log.id) ?? [];

          return (
            <article className={styles.logCard} key={log.id}>
              <div className={styles.logHeader}>
                <div>
                  <span>{log.timestamp}</span>
                  <strong>{log.title}</strong>
                </div>
                <p>{logTypeLabel[log.type]}</p>
              </div>

              <p className={styles.description}>{log.description}</p>

              {relatedModules.length > 0 ? (
                <div className={styles.related}>
                  <span>Related modules</span>
                  <div className={styles.moduleLinks}>
                    {relatedModules.map((module) =>
                      mode === "embedded" ? (
                        <button
                          className={styles.linkChip}
                          key={module.id}
                          onClick={() => openModuleView(module.id)}
                          type="button"
                        >
                          {module.title}
                        </button>
                      ) : (
                        <Link className={styles.linkChip} href={`/module/${module.id}`} key={module.id}>
                          {module.title}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}
