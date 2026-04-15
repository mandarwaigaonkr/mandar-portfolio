import { logs } from "@/lib/data/logs";
import { modules } from "@/lib/data/modules";
import { systemMeta } from "@/lib/data/systemMeta";
import { SystemShell } from "@/features/system/SystemShell";

export default function HomePage() {
  return <SystemShell logs={logs} modules={modules} systemMeta={systemMeta} />;
}
