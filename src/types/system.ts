export type SystemStatus = "booting" | "locked" | "unlocked";

export type CurrentView = "boot" | "auth" | "dashboard" | "module" | "logs";

export type CursorMode = "hidden" | "tracking" | "locked";

export type CursorState = {
  mode: CursorMode;
  x: number;
  y: number;
  targetId?: string;
};

export type LogType = "role" | "project" | "community" | "education";

export type ModuleRecord = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  status: "active" | "stable" | "archived";
  stack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  bullets: string[];
  imagePlaceholder: string;
  detail: {
    context: string;
    objective: string;
    execution: string;
    impact: string;
    systemLayers: {
      title: string;
      description: string;
    }[];
    outcomes: string[];
    visualNodes: string[];
    relatedLogIds: string[];
  };
};

export type LogRecord = {
  id: string;
  timestamp: string;
  type: LogType;
  title: string;
  description: string;
};
