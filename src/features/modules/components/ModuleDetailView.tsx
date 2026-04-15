"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { classNames } from "@/lib/utils/classNames";
import type { LogRecord, ModuleRecord } from "@/types/system";

import styles from "./ModuleDetailView.module.css";

type ModuleDetailViewProps = {
  logs: LogRecord[];
  mode: "embedded" | "page";
  module: ModuleRecord;
  onClose?: () => void;
};

export function ModuleDetailView({
  logs,
  mode,
  module,
  onClose
}: ModuleDetailViewProps) {
  const relatedLogs = logs.filter((log) => module.detail.relatedLogIds.includes(log.id));

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className={classNames(
        styles.surface,
        mode === "embedded" ? styles.embedded : styles.pageMode
      )}
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      <div className={styles.topBar}>
        <div>
          <p className={styles.eyebrow}>
            {mode === "embedded" ? "Module detail surface" : "Dedicated module route"}
          </p>
          <h2>{module.title}</h2>
          <p className={styles.subtitle}>{module.subtitle}</p>
        </div>

        <div className={styles.actions}>
          {mode === "embedded" ? (
            <>
              <button onClick={onClose} type="button">
                Return to Rail
              </button>
              <Link href={`/module/${module.id}`}>Open Standalone Route</Link>
            </>
          ) : (
            <Link href="/">Return to Control Network</Link>
          )}
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.metaRow}>
            <span>Module {module.index}</span>
            <span>Status {module.status}</span>
          </div>
          <p className={styles.summary}>{module.summary}</p>
          <div className={styles.stack}>
            {module.stack.map((item) => (
              <span className={styles.stackChip} key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.visualFrame}>{module.imagePlaceholder}</div>
      </div>

      <div className={styles.storyGrid}>
        <article className={styles.storyCard}>
          <span>Operational context</span>
          <p>{module.detail.context}</p>
        </article>
        <article className={styles.storyCard}>
          <span>Objective</span>
          <p>{module.detail.objective}</p>
        </article>
        <article className={styles.storyCard}>
          <span>Execution</span>
          <p>{module.detail.execution}</p>
        </article>
        <article className={styles.storyCard}>
          <span>Impact</span>
          <p>{module.detail.impact}</p>
        </article>
      </div>

      <div className={styles.layersSection}>
        <div className={styles.sectionHeader}>
          <span>System layers</span>
          <strong>{module.detail.systemLayers.length}</strong>
        </div>
        <div className={styles.layerGrid}>
          {module.detail.systemLayers.map((layer) => (
            <article className={styles.layerCard} key={layer.title}>
              <strong>{layer.title}</strong>
              <p>{layer.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.lowerGrid}>
        <div className={styles.panel}>
          <div className={styles.sectionHeader}>
            <span>Visual asset nodes</span>
            <strong>{module.detail.visualNodes.length}</strong>
          </div>
          <div className={styles.visualGrid}>
            {module.detail.visualNodes.map((node) => (
              <div className={styles.visualNode} key={node}>
                {node}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.sectionHeader}>
            <span>Execution outcomes</span>
            <strong>{module.detail.outcomes.length}</strong>
          </div>
          <div className={styles.outcomeList}>
            {module.detail.outcomes.map((outcome) => (
              <p key={outcome}>{outcome}</p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.sectionHeader}>
          <span>Related logs</span>
          <strong>{relatedLogs.length}</strong>
        </div>
        <div className={styles.logList}>
          {relatedLogs.map((log) => (
            <div className={styles.logItem} key={log.id}>
              <span>{log.timestamp}</span>
              <strong>{log.title}</strong>
              <p>{log.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
