"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

import { useSystemStore } from "@/store/system-store";

import styles from "./AuthGate.module.css";

const accessCode = "MANDAR-GRID";

type AuthGateProps = {
  systemMeta: {
    candidate: string;
    designation: string;
    location: string;
    availability: string;
    summary: string;
    labels: {
      systemName: string;
      build: string;
      clearance: string;
      region: string;
    };
  };
};

export function AuthGate({ systemMeta }: AuthGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const unlockSystem = useSystemStore((state) => state.unlockSystem);
  const [firstName, ...restName] = systemMeta.candidate.toUpperCase().split(" ");
  const lastName = restName.join(" ");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim().toUpperCase() !== accessCode) {
      setError("Access key rejected. Use the demo key displayed in the operator hint.");
      return;
    }

    setError("");
    unlockSystem();
  };

  return (
    <section className={styles.shell}>
      <motion.div
        className={styles.stage}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className={styles.topBar}>
          <div className={styles.topCluster}>
            <span>{systemMeta.labels.systemName}</span>
            <span>{systemMeta.labels.build}</span>
          </div>
          <div className={styles.topCluster}>
            <span>{systemMeta.location}</span>
            <span>{systemMeta.labels.clearance}</span>
          </div>
        </div>

        <div className={styles.leftRail}>
          <strong>M.</strong>
          <span>ENTRY NODE</span>
        </div>

        <div className={styles.rightRail}>
          <span>AUTH</span>
          <span>EN</span>
        </div>

        <div className={styles.signalCard}>
          <span className={styles.cardLabel}>Region / Status</span>
          <strong>{systemMeta.labels.region}</strong>
          <p>Secure access layer active. Operator profile available on authorization.</p>
        </div>

        <div className={styles.assetCard}>
          <span className={styles.cardLabel}>Visual Node</span>
          <div className={styles.assetPlaceholder}>PROFILE_IMAGE_PLACEHOLDER</div>
        </div>

        <div className={styles.identity}>
          <div>
            <p className={styles.eyebrow}>SECURE ACCESS / OPERATOR PROFILE</p>
            <div className={styles.nameField}>
              <div className={styles.nameGlow} />
              <h1>
                <span>{firstName}</span>
                <span>{lastName}</span>
              </h1>
            </div>
            <p className={styles.roleLine}>{systemMeta.designation}</p>
            <p className={styles.summary}>{systemMeta.summary}</p>
            <p className={styles.availability}>{systemMeta.availability}</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <span className={styles.cardLabel}>Authentication Layer</span>
            <strong>Request Session Access</strong>
          </div>
          <label htmlFor="access-key">Operator access key</label>
          <div className={styles.inputRow}>
            <input
              id="access-key"
              autoComplete="off"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Enter access key"
            />
            <button type="submit">Authorize Session</button>
          </div>
          <div className={styles.formMeta}>
            <p className={styles.hint}>Demo key: {accessCode}</p>
            <p className={styles.hint}>Role: systems-facing software engineer in training</p>
          </div>
          {error ? <p className={styles.error}>{error}</p> : null}
        </form>
      </motion.div>
    </section>
  );
}
