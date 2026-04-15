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
    category: string;
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
        label: "MODULE #01",
        category: "3D EXPERIENCE",
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
        description:
            "An immersive interactive installation exploring the intersection of digital and physical space. This project combines motion tracking, projection mapping, and real-time interaction.",
        technicalAnalysis:
            "Custom motion tracking pipeline using depth sensors and WebGL visualization. Real-time particle system with 60fps performance optimization.",
        color: "#7fe7d6",
    },
    {
        id: "2",
        type: "project",
        title: "J. Pancras",
        subtitle: "Portfolio Experience",
        label: "MODULE #02",
        category: "PORTFOLIO",
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
        description:
            "A sophisticated 3D web portfolio showcasing creative work with advanced graphics and interactive elements. Features real-time shader effects and smooth navigation.",
        technicalAnalysis:
            "Three.js implementation with custom shader development. GLSL post-processing for dynamic visual effects. Optimized for cross-browser performance.",
        color: "#a8e6ff",
    },
    {
        id: "3",
        type: "project",
        title: "2026 Greetings",
        subtitle: "Design System",
        label: "MODULE #03",
        category: "3D EXPERIENCE",
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
        description:
            "A comprehensive design system exploration for future interaction paradigms. Investigates new approaches to user experience design and visual communication.",
        technicalAnalysis:
            "Component architecture using React + Framer Motion. CSS variable theming system with dynamic color management. Performance monitoring and optimization suite.",
        color: "#7fe7d6",
    },
    {
        id: "4",
        type: "internship",
        title: "Internship: Genesi",
        subtitle: "Web Development",
        label: "MODULE #04",
        category: "SHOWCASE WEBSITE",
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
        description:
            "Summer internship focused on frontend development and UI implementation. Collaborated on responsive web design and component optimization.",
        technicalAnalysis:
            "Built reusable component library. Implemented responsive design patterns. Optimized bundle size and improved Lighthouse scores by 35%.",
        color: "#a8e6ff",
    },
];

/* ─── Animation presets ─── */
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
        transition: { staggerChildren: 0.04, delayChildren: 0.15 },
    },
    exit: {
        opacity: 0,
        transition: { staggerChildren: 0.02, staggerDirection: -1 },
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

/* ─── Component ─── */
export function EvidenceBoard() {
    const [viewMode, setViewMode] = useState<ViewMode>("slider");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const selectedEvidence = selectedId
        ? EVIDENCE_DATA.find((e) => e.id === selectedId)
        : null;

    /* ── Arrow navigation for slider ── */
    const scrollBy = useCallback((direction: number) => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.querySelector(`.${styles.sliderCard}`)?.clientWidth ?? 220;
        scrollRef.current.scrollBy({
            left: direction * (cardWidth + 12),
            behavior: "smooth",
        });
    }, []);

    /* ── Scroll lock for modal ── */
    useEffect(() => {
        if (selectedEvidence) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";
        } else {
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

    /* ── Escape to close modal ── */
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedId) setSelectedId(null);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [selectedId]);

    const handleClose = useCallback(() => setSelectedId(null), []);

    return (
        <div className={styles.boardContainer}>
            {/* ── Header ── */}
            <div className={styles.boardHeader}>
                <h2 className={styles.boardTitle}>MODULE INDEX</h2>

                <div className={styles.headerRight}>
                    <span className={styles.sectorLabel}>
                        SECTOR: WEB
                        <br />
                        SCANNING: ACTIVE
                    </span>
                </div>
            </div>

            {/* ── Controls row ── */}
            <div className={styles.controlsRow}>
                <div className={styles.viewToggle}>
                    <button
                        className={`${styles.toggleBtn} ${viewMode === "slider" ? styles.active : ""}`}
                        onClick={() => setViewMode("slider")}
                    >
                        <span className={styles.toggleIcon}>⊞</span> SLIDER
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${viewMode === "list" ? styles.active : ""}`}
                        onClick={() => setViewMode("list")}
                    >
                        <span className={styles.toggleIcon}>≡</span> LIST
                    </button>
                </div>

                {viewMode === "slider" && (
                    <div className={styles.navArrows}>
                        <button
                            className={styles.navBtn}
                            onClick={() => scrollBy(-1)}
                            aria-label="Previous"
                        >
                            ‹
                        </button>
                        <button
                            className={styles.navBtn}
                            onClick={() => scrollBy(1)}
                            aria-label="Next"
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>

            {/* ── View content ── */}
            <AnimatePresence mode="wait">
                {viewMode === "slider" ? (
                    /* ════════ SLIDER VIEW ════════ */
                    <motion.div
                        key="slider"
                        className={styles.sliderViewport}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <div className={styles.sliderTrack} ref={scrollRef}>
                            {EVIDENCE_DATA.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    className={styles.sliderCard}
                                    layoutId={`card-container-${item.id}`}
                                    onClick={() => setSelectedId(item.id)}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: idx * 0.06,
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    whileHover={{ y: -6 }}
                                >
                                    {/* Vertical category label on right edge */}
                                    <span className={styles.sliderCategoryVertical}>
                                        {item.category}
                                    </span>

                                    {/* Red dot accent */}
                                    <div className={styles.sliderDotAccent}>
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    {/* Card image area */}
                                    <motion.div
                                        layoutId={`card-image-${item.id}`}
                                        className={styles.sliderMedia}
                                        style={{ background: item.color }}
                                    >
                                        <div className={styles.sliderMediaLabel}>IMAGE</div>
                                    </motion.div>

                                    {/* Bottom info */}
                                    <div className={styles.sliderInfo}>
                                        <motion.span
                                            layoutId={`card-label-${item.id}`}
                                            className={styles.sliderLabel}
                                        >
                                            {item.label}
                                        </motion.span>
                                        <motion.h3
                                            layoutId={`card-title-${item.id}`}
                                            className={styles.sliderTitle}
                                        >
                                            {item.title}
                                        </motion.h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* ════════ LIST VIEW ════════ */
                    <motion.div
                        key="list"
                        className={styles.listView}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {EVIDENCE_DATA.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layoutId={`card-container-${item.id}`}
                                className={styles.listRow}
                                onClick={() => setSelectedId(item.id)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: idx * 0.06,
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {/* Background image placeholder */}
                                <motion.div
                                    layoutId={`card-image-${item.id}`}
                                    className={styles.listRowBg}
                                    style={{ background: item.color }}
                                />
                                <div className={styles.listRowOverlay} />

                                {/* Left: accent + label + title */}
                                <div className={styles.listLeft}>
                                    <div className={styles.listDotAccent}>
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <div className={styles.listTextBlock}>
                                        <motion.span
                                            layoutId={`card-label-${item.id}`}
                                            className={styles.listLabel}
                                        >
                                            {item.label}
                                        </motion.span>
                                        <motion.h4
                                            layoutId={`card-title-${item.id}`}
                                            className={styles.listTitle}
                                        >
                                            {item.title}
                                        </motion.h4>
                                    </div>
                                </div>

                                {/* Right: category + CTA */}
                                <div className={styles.listRight}>
                                    <span className={styles.listCategory}>{item.category}</span>
                                    <span className={styles.listCta}>| CLICK TO INSPECT |</span>
                                    <span className={styles.listArrow}>→</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Detail Modal Overlay ── */}
            <AnimatePresence>
                {selectedEvidence && (
                    <>
                        <motion.div
                            className={styles.backdrop}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={handleClose}
                        />

                        <div className={styles.detailContainer} onClick={handleClose}>
                            <motion.div
                                layoutId={`card-container-${selectedEvidence.id}`}
                                className={styles.detailContent}
                                onClick={(e) => e.stopPropagation()}
                                transition={overlayTransition}
                            >
                                <button className={styles.backBtn} onClick={handleClose}>
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
                                                {Object.entries(selectedEvidence.metadata).map(
                                                    ([key, value]) => (
                                                        <div key={key} className={styles.metadataItem}>
                                                            <span className={styles.metaKey}>{key}</span>
                                                            <span className={styles.metaValue}>{value}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            <div className={styles.tagsBox}>
                                                <h4 className={styles.sectionTitle}>TAGS</h4>
                                                <div className={styles.tagsList}>
                                                    {selectedEvidence.tags.map((tag) => (
                                                        <span key={tag} className={styles.tag}>
                                                            {tag}
                                                        </span>
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
                                                <div className={styles.placeholderText}>
                                                    Image Placeholder
                                                </div>
                                            </motion.div>

                                            <motion.div variants={contentItem}>
                                                <h4 className={styles.sectionTitle}>MISSION REPORT</h4>
                                                <p className={styles.description}>
                                                    {selectedEvidence.description}
                                                </p>
                                            </motion.div>

                                            <motion.div variants={contentItem}>
                                                <h4 className={styles.sectionTitle}>TECHNICAL ANALYSIS</h4>
                                                <p className={styles.description}>
                                                    {selectedEvidence.technicalAnalysis}
                                                </p>
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
