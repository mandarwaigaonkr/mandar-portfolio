"use client";

import { LandingHero } from "./LandingHero";
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
  return (
    <section className={styles.shell}>
      <LandingHero
        candidate={systemMeta.candidate}
        designation={systemMeta.designation}
        summary={systemMeta.summary}
      />

      <div className={styles.inner}>
        {/* Content below landing page hidden for now - will be implemented based on future instructions */}
      </div>
    </section>
  );
}
