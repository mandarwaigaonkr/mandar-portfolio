"use client";

import { create } from "zustand";

import type { CurrentView, CursorState, LogType, SystemStatus } from "@/types/system";

type SystemStore = {
  systemStatus: SystemStatus;
  currentView: CurrentView;
  activeModule: string | null;
  hoveredModule: string | null;
  expandedModuleId: string | null;
  activeLogFilter: LogType | "all";
  cursorState: CursorState;
  scrollProgress: number;
  bootProgress: number;
  setSystemStatus: (status: SystemStatus) => void;
  setCurrentView: (view: CurrentView) => void;
  setActiveModule: (moduleId: string | null) => void;
  setHoveredModule: (moduleId: string | null) => void;
  setExpandedModuleId: (moduleId: string | null) => void;
  setActiveLogFilter: (logType: LogType | "all") => void;
  setCursorState: (cursorState: Partial<CursorState>) => void;
  setScrollProgress: (progress: number) => void;
  setBootProgress: (progress: number) => void;
  openLogsView: () => void;
  closeLogsView: () => void;
  openModuleView: (moduleId: string) => void;
  closeModuleView: () => void;
  unlockSystem: () => void;
  resetToAuth: () => void;
};

const initialCursorState: CursorState = {
  mode: "tracking",
  x: 0,
  y: 0
};

export const useSystemStore = create<SystemStore>((set) => ({
  systemStatus: "booting",
  currentView: "boot",
  activeModule: null,
  hoveredModule: null,
  expandedModuleId: null,
  activeLogFilter: "all",
  cursorState: initialCursorState,
  scrollProgress: 0,
  bootProgress: 0,
  setSystemStatus: (systemStatus) => set({ systemStatus }),
  setCurrentView: (currentView) => set({ currentView }),
  setActiveModule: (activeModule) => set({ activeModule }),
  setHoveredModule: (hoveredModule) => set({ hoveredModule }),
  setExpandedModuleId: (expandedModuleId) => set({ expandedModuleId }),
  setActiveLogFilter: (activeLogFilter) => set({ activeLogFilter }),
  setCursorState: (cursorState) =>
    set((state) => ({ cursorState: { ...state.cursorState, ...cursorState } })),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setBootProgress: (bootProgress) => set({ bootProgress }),
  openLogsView: () =>
    set({
      currentView: "logs",
      expandedModuleId: null,
      hoveredModule: null
    }),
  closeLogsView: () =>
    set({
      currentView: "dashboard"
    }),
  openModuleView: (moduleId) =>
    set({
      activeModule: moduleId,
      expandedModuleId: moduleId,
      currentView: "module"
    }),
  closeModuleView: () =>
    set({
      expandedModuleId: null,
      currentView: "dashboard"
    }),
  unlockSystem: () =>
    set({
      systemStatus: "unlocked",
      currentView: "dashboard"
    }),
  resetToAuth: () =>
    set({
      systemStatus: "locked",
      currentView: "auth",
      activeModule: null,
      hoveredModule: null,
      expandedModuleId: null,
      activeLogFilter: "all"
    })
}));
