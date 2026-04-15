"use client";

import { useEffect, useState } from "react";

import { useSystemStore } from "@/store/system-store";

import styles from "./SystemHUD.module.css";

type SystemHUDProps = {
  moduleCount: number;
  currentRole: string;
  labels: {
    systemName: string;
    build: string;
    clearance: string;
    region: string;
  };
};

export function SystemHUD({ currentRole, labels, moduleCount }: SystemHUDProps) {
  const [timestamp, setTimestamp] = useState("");
  const scrollProgress = useSystemStore((state) => state.scrollProgress);
  const expandedModuleId = useSystemStore((state) => state.expandedModuleId);

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "Asia/Kolkata"
      });

      setTimestamp(formatter.format(new Date()));
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={styles.hud}>
      <div className={styles.block}>
        <span>{labels.systemName}</span>
        <strong>{labels.build}</strong>
      </div>
      <div className={styles.block}>
        <span>Clearance</span>
        <strong>{labels.clearance}</strong>
      </div>
      <div className={styles.block}>
        <span>Region</span>
        <strong>{labels.region}</strong>
      </div>
      <div className={styles.block}>
        <span>Modules</span>
        <strong>{moduleCount}</strong>
      </div>
      <div className={styles.block}>
        <span>Rail progress</span>
        <strong>{Math.round(scrollProgress * 100)}%</strong>
      </div>
      <div className={styles.block}>
        <span>Inspection</span>
        <strong>{expandedModuleId ? "Locked" : "Standby"}</strong>
      </div>
      <div className={styles.blockWide}>
        <span>Active role</span>
        <strong>{currentRole}</strong>
      </div>
      <div className={styles.blockWide}>
        <span>Local time</span>
        <strong>{timestamp}</strong>
      </div>
    </div>
  );
}
