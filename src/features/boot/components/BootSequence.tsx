"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

import { useSystemStore } from "@/store/system-store";

import styles from "./BootSequence.module.css";

const bootTasks = [
  "Initializing secure access channel",
  "Resolving module registry",
  "Verifying enterprise runtime",
  "Loading execution history",
  "Preparing operator interface"
];

type BootSequenceProps = {
  systemMeta: {
    candidate: string;
    currentRole: string;
    labels: {
      systemName: string;
      build: string;
      clearance: string;
      region: string;
    };
  };
};

export function BootSequence({ systemMeta }: BootSequenceProps) {
  const bootProgress = useSystemStore((state) => state.bootProgress);
  const setBootProgress = useSystemStore((state) => state.setBootProgress);
  const setSystemStatus = useSystemStore((state) => state.setSystemStatus);
  const setCurrentView = useSystemStore((state) => state.setCurrentView);

  useEffect(() => {
    let progress = 0;
    const timer = window.setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 8;
      const nextProgress = Math.min(progress, 100);
      setBootProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setSystemStatus("unlocked");
          setCurrentView("dashboard");
        }, 420);
      }
    }, 280);

    return () => window.clearInterval(timer);
  }, [setBootProgress, setCurrentView, setSystemStatus]);

  const completedTasks = useMemo(
    () => Math.min(bootTasks.length, Math.floor((bootProgress / 100) * bootTasks.length)),
    [bootProgress]
  );

  return (
    <section className={styles.shell}>
      <div className={styles.frame}>
        <div className={styles.header}>
          <span>{systemMeta.labels.systemName}</span>
          <span>{systemMeta.labels.build}</span>
        </div>

        <div className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>SYSTEM BOOTSTRAP</p>
            <h1>Secured interface initialization in progress.</h1>
            <p className={styles.summary}>
              Preparing access controls, operator identity data, module registry, and
              execution telemetry for {systemMeta.candidate}.
            </p>
          </div>
          <div className={styles.roleBlock}>
            <span>ACTIVE ROLE</span>
            <strong>{systemMeta.currentRole}</strong>
          </div>
        </div>

        <div className={styles.progressPanel}>
          <div className={styles.progressMeta}>
            <span>BOOT PROGRESS</span>
            <strong>{bootProgress}%</strong>
          </div>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${bootProgress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 26 }}
            />
          </div>
        </div>

        <div className={styles.taskGrid}>
          {bootTasks.map((task, index) => {
            const status =
              index < completedTasks ? "COMPLETED" : index === completedTasks ? "PROCESSING" : "QUEUED";

            return (
              <div className={styles.task} key={task}>
                <span>{task}</span>
                <strong>{status}</strong>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
