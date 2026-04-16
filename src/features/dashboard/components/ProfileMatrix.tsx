"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import { profileMatrixData } from "@/lib/data/profileSections";

import styles from "./ProfileMatrix.module.css";

type ProfileMatrixProps = {
  systemMeta: {
    candidate: string;
    designation: string;
    availability: string;
    currentRole: string;
    summary: string;
    location: string;
  };
};

export function ProfileMatrix({ systemMeta }: ProfileMatrixProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className={styles.section}
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.92 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Post Index Transmission</p>
          <h2 className={styles.title}>PROFILE MATRIX</h2>
        </div>

        <div className={styles.headerMeta}>
          <div className={styles.metaBlock}>
            <span>CASE FILE: {profileMatrixData.caseFileId}</span>
            <span>STATUS: {profileMatrixData.status}</span>
          </div>

          <div className={styles.languageToggle} aria-label="Language modes">
            {profileMatrixData.languageModes.map((mode, index) => (
              <span
                key={mode}
                className={index === 0 ? styles.languageModeActive : styles.languageMode}
              >
                {mode}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.frame}>
        <div className={styles.grid}>
          <aside className={styles.column}>
            <div className={styles.identityPanel}>
              <div className={styles.identityHeader}>
                <h3>{systemMeta.candidate}</h3>
                <p>{systemMeta.designation}</p>
              </div>

              <div className={styles.imageCard}>
                <div className={styles.imageWrap}>
                  <Image
                    src="/images/Mandar1.jpg"
                    alt={`${systemMeta.candidate} profile portrait`}
                    fill
                    sizes="(max-width: 900px) 100vw, 28vw"
                    className={styles.profileImage}
                  />
                  <div className={styles.scanOverlay} />
                  <div className={styles.scanSweep} />
                  <span className={styles.imageTag}>SCAN ACTIVE</span>
                </div>
              </div>

              <div className={styles.identityMetaGrid}>
                {profileMatrixData.identityMeta.map((item) => (
                  <div key={item.label} className={styles.identityMetaItem}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.statusBox}>
                <span className={styles.statusLabel}>Availability</span>
                <strong>{systemMeta.availability}</strong>
                <p>{systemMeta.location}</p>
              </div>
            </div>
          </aside>

          <div className={`${styles.column} ${styles.centerColumn}`}>
            <div className={styles.reportBlock}>
              <div className={styles.reportHeader}>
                <span>{profileMatrixData.reportLabel}</span>
                <span>READ_ONLY</span>
              </div>

              <p className={styles.reportText}>{systemMeta.summary}</p>

              <div className={styles.highlightRow}>
                {profileMatrixData.reportHighlights.map((highlight) => (
                  <span key={highlight} className={styles.highlightTag}>
                    {highlight}
                  </span>
                ))}
              </div>

              <p className={styles.currentRole}>{systemMeta.currentRole}</p>
            </div>

            <div className={styles.logSection}>
              <div className={styles.logBlock}>
                <span className={styles.logLabel}>ACADEMIC_LOG [EDUCATION]</span>
                <div className={styles.logList}>
                  {profileMatrixData.academicLog.map((entry) => (
                    <article key={entry.title} className={styles.logItem}>
                      <div className={styles.logTitleRow}>
                        <strong>{entry.title}</strong>
                        <span>{entry.range}</span>
                      </div>
                      <p>{entry.description}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className={styles.logBlock}>
                <span className={styles.logLabel}>FIELD_OPERATIONS [EXPERIENCE]</span>
                <div className={styles.logList}>
                  {profileMatrixData.experienceLog.map((entry) => (
                    <article key={entry.title} className={styles.logItem}>
                      <div className={styles.logTitleRow}>
                        <strong>{entry.title}</strong>
                        <span>{entry.range}</span>
                      </div>
                      <p>{entry.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className={styles.column}>
            <div className={styles.inventoryPanel}>
              <div className={styles.inventoryHeader}>
                <span>EQUIPMENT_INVENTORY</span>
              </div>

              <div className={styles.skillBlock}>
                <span className={styles.skillLabel}>Hard Skills</span>
                <div className={styles.hardSkillGrid}>
                  {profileMatrixData.hardSkills.map((skill) => (
                    <span key={skill} className={styles.hardSkillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.skillBlock}>
                <span className={styles.skillLabel}>Soft Skills</span>
                <div className={styles.softSkillStack}>
                  {profileMatrixData.softSkills.map((skill) => (
                    <span key={skill} className={styles.softSkillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.alertBox}>
                <div className={styles.alertIcon} aria-hidden="true">
                  <span />
                </div>
                <div>
                  <span className={styles.alertLabel}>{profileMatrixData.alert.label}</span>
                  <strong>{profileMatrixData.alert.title}</strong>
                  <p>{profileMatrixData.alert.detail}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  );
}
