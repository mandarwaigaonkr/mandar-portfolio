"use client";

import Link from "next/link";

import { useSystemStore } from "@/store/system-store";
import type { ModuleRecord, SystemStatus } from "@/types/system";

import styles from "./SystemStatusOverlay.module.css";

type SystemStatusOverlayProps = {
  modules: ModuleRecord[];
  systemStatus: SystemStatus;
};

export function SystemStatusOverlay({
  modules,
  systemStatus
}: SystemStatusOverlayProps) {
  const activeLogFilter = useSystemStore((state) => state.activeLogFilter);
  const activeModule = useSystemStore((state) => state.activeModule);
  const currentView = useSystemStore((state) => state.currentView);
  const expandedModuleId = useSystemStore((state) => state.expandedModuleId);
  const closeLogsView = useSystemStore((state) => state.closeLogsView);
  const closeModuleView = useSystemStore((state) => state.closeModuleView);
  const openLogsView = useSystemStore((state) => state.openLogsView);
  const openModuleView = useSystemStore((state) => state.openModuleView);
  const resetToAuth = useSystemStore((state) => state.resetToAuth);

  const activeModuleRecord = modules.find((module) => module.id === activeModule) ?? null;

  return (
    <aside className={styles.overlay}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>System status overlay</p>
        <div className={styles.stateRow}>
          <span>Session</span>
          <strong>{systemStatus}</strong>
        </div>
        <div className={styles.stateRow}>
          <span>View</span>
          <strong>{currentView}</strong>
        </div>
        <div className={styles.stateRow}>
          <span>Log filter</span>
          <strong>{activeLogFilter}</strong>
        </div>
        <div className={styles.stateRow}>
          <span>Active module</span>
          <strong>{activeModuleRecord?.title ?? "No lock"}</strong>
        </div>

        <div className={styles.controls}>
          {currentView === "logs" ? (
            <button onClick={closeLogsView} type="button">
              Return to Dashboard
            </button>
          ) : (
            <button onClick={openLogsView} type="button">
              Open Logs Workspace
            </button>
          )}

          {expandedModuleId ? (
            <button onClick={closeModuleView} type="button">
              Close Module Detail
            </button>
          ) : activeModuleRecord ? (
            <button onClick={() => openModuleView(activeModuleRecord.id)} type="button">
              Open Active Module
            </button>
          ) : null}

          <Link href="/logs">Logs Route</Link>
          <button onClick={resetToAuth} type="button">
            Reset Session
          </button>
        </div>
      </div>
    </aside>
  );
}
