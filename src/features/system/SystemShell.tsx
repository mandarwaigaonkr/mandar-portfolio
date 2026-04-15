"use client";

import { MotionConfig, motion } from "framer-motion";
import { useEffect } from "react";

import { BreachSequence } from "@/features/boot/components/BreachSequence";
import { SystemDashboard } from "@/features/dashboard/components/SystemDashboard";
import { useSystemStore } from "@/store/system-store";
import type { LogRecord, ModuleRecord } from "@/types/system";

type SystemShellProps = {
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

export function SystemShell({ logs, modules, systemMeta }: SystemShellProps) {
  const currentView = useSystemStore((state) => state.currentView);
  const setCursorState = useSystemStore((state) => state.setCursorState);

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      setCursorState({
        x: event.clientX,
        y: event.clientY,
        mode: "tracking"
      });
    };

    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [setCursorState]);

  // Dashboard is always mounted once unlocked — it sits BEHIND the breach panels
  const showDashboard = currentView === "dashboard" || currentView === "module" || currentView === "logs";

  return (
    <main>
      <MotionConfig reducedMotion="user">
        {/* Dashboard renders behind the breach panels */}
        {showDashboard && (
          <motion.div
            key="workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SystemDashboard logs={logs} modules={modules} systemMeta={systemMeta} />
          </motion.div>
        )}

        {/* Breach sequence — renders ON TOP with z-index 10000 */}
        {/* It handles its own split/removal internally */}
        {(currentView === "boot" || showDashboard) && <BreachSequence />}
      </MotionConfig>
    </main>
  );
}
