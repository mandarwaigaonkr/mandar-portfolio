import type { Metadata } from "next";

import { SystemLogs } from "@/features/logs/components/SystemLogs";
import { logs } from "@/lib/data/logs";
import { modules } from "@/lib/data/modules";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "System Logs | Mandar Secure Access Network",
  description:
    "Execution history, internships, projects, and technical community activity for Mandar Waigaonkar."
};

export default function LogsPage() {
  return (
    <main className={styles.page}>
      <SystemLogs logs={logs} mode="page" modules={modules} />
    </main>
  );
}
