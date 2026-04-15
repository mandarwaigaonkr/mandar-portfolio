"use client";

import { motion } from "framer-motion";

import { classNames } from "@/lib/utils/classNames";
import type { ModuleRecord } from "@/types/system";

import styles from "./ModuleCard.module.css";

type ModuleCardProps = {
  module: ModuleRecord;
  isActive: boolean;
  isExpanded: boolean;
  onInspect: (moduleId: string) => void;
  onHoverStart: (moduleId: string) => void;
  onHoverEnd: () => void;
  registerCardRef: (moduleId: string, node: HTMLElement | null) => void;
};

export function ModuleCard({
  isActive,
  isExpanded,
  module,
  onInspect,
  onHoverEnd,
  onHoverStart,
  registerCardRef
}: ModuleCardProps) {
  return (
    <motion.article
      className={classNames(styles.card, isActive && styles.cardActive)}
      ref={(node) => registerCardRef(module.id, node)}
      onHoverStart={() => onHoverStart(module.id)}
      onHoverEnd={onHoverEnd}
      onFocus={() => onHoverStart(module.id)}
      onBlur={onHoverEnd}
      onClick={() => onInspect(module.id)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.35, once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      tabIndex={0}
    >
      <div className={styles.frameTop}>
        <span>{module.index}</span>
        <span>{module.status}</span>
      </div>

      <div className={styles.body}>
        <div>
          <p className={styles.label}>Executable module</p>
          <h2>{module.title}</h2>
          <p className={styles.subtitle}>{module.subtitle}</p>
          <p className={styles.summary}>{module.summary}</p>
        </div>

        <div className={styles.imagePlaceholder}>{module.imagePlaceholder}</div>
      </div>

      <div className={styles.metrics}>
        {module.metrics.map((metric) => (
          <div className={styles.metric} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.inspectButton} type="button">
          {isExpanded ? "Inspection Locked" : "Inspect Module"}
        </button>
      </div>
    </motion.article>
  );
}
