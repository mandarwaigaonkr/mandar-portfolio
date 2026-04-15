"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect } from "react";

import { AuthGate } from "@/features/auth/components/AuthGate";
import { BootSequence } from "@/features/boot/components/BootSequence";
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

  return (
    <main>
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          {currentView === "boot" ? (
            <motion.div
              key="boot"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <BootSequence systemMeta={systemMeta} />
            </motion.div>
          ) : null}

          {currentView === "auth" ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <AuthGate systemMeta={systemMeta} />
            </motion.div>
          ) : null}

          {currentView === "dashboard" ||
          currentView === "module" ||
          currentView === "logs" ? (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <SystemDashboard logs={logs} modules={modules} systemMeta={systemMeta} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </MotionConfig>
    </main>
  );
}
