import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModuleDetailView } from "@/features/modules/components/ModuleDetailView";
import { logs } from "@/lib/data/logs";
import { getModuleById, modules } from "@/lib/data/modules";

import styles from "./page.module.css";

type ModulePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return modules.map((module) => ({
    slug: module.id
  }));
}

export function generateMetadata({ params }: ModulePageProps): Metadata {
  const moduleRecord = getModuleById(params.slug);

  if (!moduleRecord) {
    return {
      title: "Module Not Found | Mandar Secure Access Network"
    };
  }

  return {
    title: `${moduleRecord.title} | Mandar Secure Access Network`,
    description: moduleRecord.summary
  };
}

export default function ModulePage({ params }: ModulePageProps) {
  const moduleRecord = getModuleById(params.slug);

  if (!moduleRecord) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <ModuleDetailView logs={logs} mode="page" module={moduleRecord} />
    </main>
  );
}
