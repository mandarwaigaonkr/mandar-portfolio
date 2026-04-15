"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./EvidenceBoard.module.css";

type ViewMode = "list" | "slider";

interface Evidence {
    id: string;
    type: "project" | "report" | "internship";
    title: string;
    subtitle: string;
    label: string;
    year?: string;
    client?: string;
    duration?: string;
    tags: string[];
    metadata: Record<string, string>;
    description: string;
    technicalAnalysis: string;
    image?: string;
    color: string;
}

const EVIDENCE_DATA: Evidence[] = [
    {
        id: "1",
        type: "project",
        title: "Célia",
        subtitle: "Interactive Installation",
        label: "EVIDENCE #01",
        year: "2024",
        client: "Cultural Institution",
        duration: "4 months",
        tags: ["3D", "Interactive", "Installation"],
        metadata: {
            TYPE: "Interactive Installation",
            APPROACH: "Immersive Experience",
            CLIENT: "Cultural Client",
            TIMELINE: "Jan - Apr 2024",
            STATUS: "Completed",
        },
        description: "An immersive interactive installation exploring the intersection of digital and physical space. This project combines motion tracking, projection mapping, and real-time interaction.",
        technicalAnalysis: "Custom motion tracking pipeline using depth sensors and WebGL visualization. Real-time particle system with 60fps performance optimization.",
        color: "#7fe7d6",
    },
    {
        id: "2",
        type: "project",
        title: "J. Pancras",
        subtitle: "Portfolio Experience",
        label: "EVIDENCE #02",
        year: "2023",
        client: "Creative Studio",
        duration: "6 months",
        tags: ["WebGL", "Portfolio", "3D"],
        metadata: {
            TYPE: "Web Experience",
            APPROACH: "3D Portfolio",
            CLIENT: "Design Studio",
            TIMELINE: "Jun - Nov 2023",
            STATUS: "Active",
        },
        description: "A sophisticated 3D web portfolio showcasing creative work with advanced graphics and interactive elements. Features real-time shader effects and smooth navigation.",
        technicalAnalysis: "Three.js implementation with custom shader development. GLSL post-processing for dynamic visual effects. Optimized for cross-browser performance.",
        color: "#a8e6ff",
    },
    {
        id: "3",
        type: "project",
        title: "2026 Greetings",
        subtitle: "Design System",
        label: "EVIDENCE #03",
        year: "2025",
        client: "Tech Company",
        duration: "3 months",
        tags: ["Design System", "Research", "Animation"],
        metadata: {
            TYPE: "Design Research",
            APPROACH: "Systemic Design",
            CLIENT: "Technology Partner",
            TIMELINE: "Oct - Dec 2024",
            STATUS: "In Progress",
        },
        description: "A comprehensive design system exploration for future interaction paradigms. Investigates new approaches to user experience design and visual communication.",
        technicalAnalysis: "Component architecture using React + Framer Motion. CSS variable theming system with dynamic color management. Performance monitoring and optimization suite.",
        color: "#7fe7d6",
    },
    {
        id: "4",
        type: "internship",
        title: "Internship: Genesi",
        subtitle: "Web Development",
        label: "INTERNSHIP #01",
        year: "2024",
        client: "Genesi Studio",
        duration: "3 months",
        tags: ["JavaScript", "React", "Web"],
        metadata: {
            ROLE: "Frontend Developer",
            COMPANY: "Genesi Studio",
            TIMELINE: "Summer 2024",
            SKILLS: "React, Next.js, TypeScript",
        },
        description: "Summer internship focused on frontend development and UI implementation. Collaborated on responsive web design and component optimization.",
        technicalAnalysis: "Built reusable component library. Implemented responsive design patterns. Optimized bundle size and improved Lighthouse scores by 35%.",
        color: "#a8e6ff",
    },
];

// Smooth spring transition for modal
const overlayTransition = {
    type: "spring" as const,
    damping: 30,
    stiffness: 300,
    mass: 0.8,
};

const contentStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.15,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.02,
            staggerDirection: -1,
        },
    },
};

const contentItem = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", damping: 25, stiffness: 250 },
    },
    exit: {
        opacity: 0,
        y: -8,
        filter: "blur(4px)",
        transition: { duration: 0.15 },
    },
};

export function EvidenceBoard() {
    const [viewMode, setViewMode] = useState<ViewMode>("slider");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedEvidence = selectedId ? EVIDENCE_DATA.find(e => e.id === selectedId) : null;

    // Toggle body scroll lock when modal is open
    useEffect(() => {
        if (selectedEvidence) {
            // Save scroll position before locking
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflow = "";
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
            }
        }

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflow = "";
        };
    }, [selectedEvidence]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedId) {
                setSelectedId(null);
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [selectedId]);

    const handleClose = useCallback(() => {
        setSelectedId(null);
    }, []);

    return (
        <div className={styles.boardContainer} ref={containerRef}>
            {/* Header with toggle */}
            <div className={styles.boardHeader}>
                <div className={styles.titleSection}>
                    <h2 className={styles.boardTitle}>EVIDENCE BOARD</h2>
                    <p className={styles.boardSubtitle}>SCANNING ACTIVE</p>
                </div>

                <div className={styles.viewToggle}>
                    <button
                        className={`${styles.toggleBtn} ${viewMode === "list" ? styles.active : ""}`}
                        onClick={() => setViewMode("list")}
                    >
                        ≡ LIST
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${viewMode === "slider" ? styles.active : ""}`}
                        onClick={() => setViewMode("slider")}
                    >
                        ⊞ SLIDER
                    </button>
                </div>
            </div>

            {/* Evidence cards */}
            <div className={`${styles.listContainer} ${styles[viewMode]}`}>
                {viewMode === "slider" ? (
                    <div className={styles.sliderWrapper}>
                        <div className={styles.slider}>
                            {EVIDENCE_DATA.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layoutId={`card-container-${item.id}`}
                                    className={styles.sliderCard}
                                    onClick={() => setSelectedId(item.id)}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <motion.div
                                        layoutId={`card-image-${item.id}`}
                                        className={styles.cardImage}
                                        style={{ background: item.color }}
                                    >
                                        <div className={styles.cardImagePlaceholder}>IMAGE</div>
                                    </motion.div>
                                    <div className={styles.cardContent}>
                                        <motion.span layoutId={`card-label-${item.id}`} className={styles.cardLabel}>
                                            {item.label}
                                        </motion.span>
                                        <motion.h4 layoutId={`card-title-${item.id}`} className={styles.cardTitle}>
                                            {item.title}
                                        </motion.h4>
                                        <p className={styles.cardSubtitle}>{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className={styles.scrollIndicator}>⟨ SCROLL ⟩</div>
                    </div>
                ) : (
                    <div className={styles.listWrapper}>
                        {EVIDENCE_DATA.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layoutId={`card-container-${item.id}`}
                                className={styles.listItem}
                                onClick={() => setSelectedId(item.id)}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.3 }}
                                whileHover={{ x: 10 }}
                            >
                                <motion.div
                                    layoutId={`card-image-${item.id}`}
                                    className={styles.listItemImage}
                                    style={{ background: item.color }}
                                >
                                    <div className={styles.listItemPlaceholder}>IMG</div>
                                </motion.div>
                                <div className={styles.listItemContent}>
                                    <motion.span layoutId={`card-label-${item.id}`} className={styles.listItemLabel}>
                                        {item.label}
                                    </motion.span>
                                    <motion.h4 layoutId={`card-title-${item.id}`} className={styles.listItemTitle}>
                                        {item.title}
                                    </motion.h4>
                                    <p className={styles.listItemSubtitle}>{item.subtitle}</p>
                                    {item.year && <span className={styles.listItemYear}>{item.year}</span>}
                                </div>
                                <div className={styles.listItemArrow}>→</div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal overlay */}
            <AnimatePresence>
                {selectedEvidence && (
                    <>
                        {/* Backdrop with blur */}
                        <motion.div
                            className={styles.backdrop}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={handleClose}
                        />

                        {/* Detail modal */}
                        <div className={styles.detailContainer} onClick={handleClose}>
                            <motion.div
                                layoutId={`card-container-${selectedEvidence.id}`}
                                className={styles.detailContent}
                                onClick={(e) => e.stopPropagation()}
                                transition={overlayTransition}
                            >
                                <button
                                    className={styles.backBtn}
                                    onClick={handleClose}
                                >
                                    ← BACK
                                </button>

                                <motion.div
                                    variants={contentStagger}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <motion.div className={styles.detailHeader} variants={contentItem}>
                                        <motion.span
                                            layoutId={`card-label-${selectedEvidence.id}`}
                                            className={styles.detailLabel}
                                        >
                                            {selectedEvidence.label}
                                        </motion.span>
                                        <motion.h3
                                            layoutId={`card-title-${selectedEvidence.id}`}
                                            className={styles.detailTitle}
                                        >
                                            {selectedEvidence.title}
                                        </motion.h3>
                                    </motion.div>

                                    <div className={styles.detailGrid}>
                                        <motion.div className={styles.leftColumn} variants={contentItem}>
                                            <div className={styles.metadataBox}>
                                                <h4 className={styles.sectionTitle}>METADATA</h4>
                                                {Object.entries(selectedEvidence.metadata).map(([key, value]) => (
                                                    <div key={key} className={styles.metadataItem}>
                                                        <span className={styles.metaKey}>{key}</span>
                                                        <span className={styles.metaValue}>{value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={styles.tagsBox}>
                                                <h4 className={styles.sectionTitle}>TAGS</h4>
                                                <div className={styles.tagsList}>
                                                    {selectedEvidence.tags.map(tag => (
                                                        <span key={tag} className={styles.tag}>{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div className={styles.rightColumn} variants={contentItem}>
                                            <motion.div
                                                layoutId={`card-image-${selectedEvidence.id}`}
                                                className={styles.imagePlaceholder}
                                                transition={overlayTransition}
                                            >
                                                <div className={styles.placeholderText}>Image Placeholder</div>
                                            </motion.div>

                                            <motion.div variants={contentItem}>
                                                <h4 className={styles.sectionTitle}>MISSION REPORT</h4>
                                                <p className={styles.description}>{selectedEvidence.description}</p>
                                            </motion.div>

                                            <motion.div variants={contentItem}>
                                                <h4 className={styles.sectionTitle}>TECHNICAL ANALYSIS</h4>
                                                <p className={styles.description}>{selectedEvidence.technicalAnalysis}</p>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
