"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { ModuleRecord } from "@/types/system";

import styles from "./ModuleExecutionPanel.module.css";

type ModuleExecutionPanelProps = {
  module: ModuleRecord | undefined;
  isExpanded: boolean;
  onToggle: () => void;
};

export function ModuleExecutionPanel({
  isExpanded,
  module,
  onToggle
}: ModuleExecutionPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <span className={styles.label}>Execution panel</span>
          <strong>{module?.title ?? "No module selected"}</strong>
        </div>
        <button onClick={onToggle} type="button">
          {isExpanded ? "Collapse" : "Inspect"}
        </button>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {isExpanded && module ? (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className={styles.body}
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            key={module.id}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className={styles.summary}>{module.summary}</p>

            <div className={styles.stack}>
              {module.stack.map((item) => (
                <span className={styles.stackChip} key={item}>
                  {item}
                </span>
              ))}
            </div>

            <div className={styles.bullets}>
              {module.bullets.map((bullet) => (
                <p key={bullet}>{bullet}</p>
              ))}
            </div>

            <div className={styles.statusRow}>
              <span>Execution lock active</span>
              <strong>{module.status}</strong>
            </div>
          </motion.div>
        ) : (
          <motion.p
            animate={{ opacity: 1, height: "auto" }}
            className={styles.collapsedState}
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            key="collapsed"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            Lock onto a module to inspect its stack, execution profile, and open the
            dedicated module detail surface.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
