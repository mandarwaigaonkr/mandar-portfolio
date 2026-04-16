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
    statusCode: string;
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
        color: "#00F5FF",
        statusCode: "VTX-0091",
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
        color: "#BF00FF",
        statusCode: "VTX-0147",
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
        color: "#00F5FF",
        statusCode: "VTX-0203",
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
        color: "#BF00FF",
        statusCode: "VTX-0312",
    },
    {
        id: "5",
        type: "project",
        title: "H.A.N.D.S.",
        subtitle: "Motion Tracking",
        label: "MODULE #05",
        category: "AI / ML",
        year: "2025",
        client: "Research Lab",
        duration: "5 months",
        tags: ["AI", "Computer Vision", "Python"],
        metadata: {
            TYPE: "Research Project",
            APPROACH: "Machine Learning",
            CLIENT: "Research Lab",
            TIMELINE: "Feb - Jun 2025",
            STATUS: "In Progress",
        },
        description:
            "Hand gesture recognition system using deep learning and computer vision. Real-time tracking pipeline with sub-10ms latency for interactive applications.",
        technicalAnalysis:
            "MediaPipe + custom TensorFlow model. WebSocket streaming for real-time inference. Optimized ONNX runtime for edge deployment.",
        color: "#d873ff",
        statusCode: "VTX-0408",
    },
    {
        id: "6",
        type: "project",
        title: "Noctis",
        subtitle: "Dark Interface",
        label: "MODULE #06",
        category: "UI/UX DESIGN",
        year: "2024",
        client: "Fintech Startup",
        duration: "2 months",
        tags: ["UI/UX", "Dark Mode", "Fintech"],
        metadata: {
            TYPE: "Interface Design",
            APPROACH: "Dark-first Design",
            CLIENT: "Fintech Partner",
            TIMELINE: "Aug - Sep 2024",
            STATUS: "Completed",
        },
        description:
            "A dark-first interface design system for a fintech analytics dashboard. Focuses on data density, accessibility, and visual hierarchy in low-light environments.",
        technicalAnalysis:
            "Figma design system with 200+ components. CSS custom property theming. WCAG AA contrast ratios across all dark palettes.",
        color: "#ADFF2F",
        statusCode: "VTX-0519",
    },
    {
        id: "7",
        type: "report",
        title: "Parallax Engine",
        subtitle: "Scroll Framework",
        label: "MODULE #07",
        category: "OPEN SOURCE",
        year: "2025",
        client: "Community",
        duration: "Ongoing",
        tags: ["TypeScript", "Animation", "Open Source"],
        metadata: {
            TYPE: "Library",
            APPROACH: "Performance-first",
            CLIENT: "Open Source",
            TIMELINE: "2025 - Present",
            STATUS: "Active",
        },
        description:
            "A lightweight, GPU-accelerated parallax scrolling engine. Zero dependencies, ~3KB gzipped, with support for intersection-based lazy activation.",
        technicalAnalysis:
            "requestAnimationFrame loop with IntersectionObserver gating. CSS transform-only animations for compositor-friendly rendering. Ships as ESM + CJS.",
        color: "#00F5FF",
        statusCode: "VTX-0627",
    },
];

/* ─── Animation presets ─── */

const contentStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.12 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
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
        transition: { duration: 0.12 },
    },
};

/* ─── Component ─── */
export function EvidenceBoard() {
    const [viewMode, setViewMode] = useState<ViewMode>("slider");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [originRect, setOriginRect] = useState<DOMRect | null>(null);
    const savedScrollY = useRef(0);
    const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const selectedEvidence = selectedId
        ? EVIDENCE_DATA.find((e) => e.id === selectedId)
        : null;

    /* ── Handle click — capture bounding rect for morph ── */
    const handleItemClick = useCallback((id: string) => {
        const el = elementRefs.current.get(id);
        if (el) {
            setOriginRect(el.getBoundingClientRect());
        }
        setSelectedId(id);
    }, []);

    /* ── Scroll lock ── */
    useEffect(() => {
        if (selectedId) {
            savedScrollY.current = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${savedScrollY.current}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";
        } else {
            const y = savedScrollY.current;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflow = "";
            window.scrollTo(0, y);
        }
    }, [selectedId]);

    /* ── Escape to close ── */
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
            </div>

            {/* ── View content ── */}
            <AnimatePresence mode="wait">
                {viewMode === "slider" ? (
                    /* ════════ ACCORDION SLIDER VIEW ════════ */
                    <motion.div
                        key="slider"
                        className={styles.accordionViewport}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {EVIDENCE_DATA.map((item, idx) => {
                            const isActive = hoveredId === item.id;
                            const isCompressed = hoveredId !== null && hoveredId !== item.id;

                            return (
                                <motion.div
                                    key={item.id}
                                    ref={(el: HTMLDivElement | null) => {
                                        if (el) elementRefs.current.set(item.id, el);
                                    }}
                                    className={`${styles.accordionColumn} ${isActive ? styles.accordionActive : ""} ${isCompressed ? styles.accordionCompressed : ""}`}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onClick={() => handleItemClick(item.id)}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: idx * 0.05,
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    {/* Background color fill */}
                                    <div
                                        className={styles.colBg}
                                        style={{ background: item.color }}
                                    />
                                    <div className={styles.colOverlay} />

                                    {/* Scan line FUI effect */}
                                    <div className={styles.scanLine} />

                                    {/* Corner framing brackets — visible on active */}
                                    <div className={styles.cornerBrackets}>
                                        <span className={`${styles.bracket} ${styles.bracketTL}`} />
                                        <span className={`${styles.bracket} ${styles.bracketTR}`} />
                                        <span className={`${styles.bracket} ${styles.bracketBL}`} />
                                        <span className={`${styles.bracket} ${styles.bracketBR}`} />
                                    </div>

                                    {/* Red dot accent */}
                                    <div className={styles.colDots}>
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    {/* Status code tracker */}
                                    <span className={styles.colStatusCode}>{item.statusCode}</span>

                                    {/* Vertical category — always visible, rotated */}
                                    <span className={styles.colCategoryVertical}>
                                        {item.category}
                                    </span>

                                    {/* Compressed: just label + title vertically */}
                                    <div className={styles.colCompressedContent}>
                                        <span className={styles.colLabel}>{item.label}</span>
                                        <h3 className={styles.colTitle}>{item.title}</h3>
                                    </div>

                                    {/* Expanded: full reveal content */}
                                    <div className={styles.colExpandedContent}>
                                        <div className={styles.colExpandedTop}>
                                            <span className={styles.colLabel}>{item.label}</span>
                                            <h3 className={styles.colExpandedTitle}>{item.title}</h3>
                                            <p className={styles.colSubtitle}>{item.subtitle}</p>
                                        </div>

                                        <div className={styles.colExpandedMid}>
                                            <div className={styles.colDiagnostic}>
                                                <div className={styles.diagLine}>
                                                    <span className={styles.diagKey}>TYPE</span>
                                                    <span className={styles.diagVal}>{item.metadata.TYPE || item.subtitle}</span>
                                                </div>
                                                <div className={styles.diagLine}>
                                                    <span className={styles.diagKey}>STATUS</span>
                                                    <span className={styles.diagVal}>{item.metadata.STATUS || "ACTIVE"}</span>
                                                </div>
                                                <div className={styles.diagLine}>
                                                    <span className={styles.diagKey}>YEAR</span>
                                                    <span className={styles.diagVal}>{item.year}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.colExpandedBottom}>
                                            <span className={styles.colCta}>CLICK TO DECRYPT →</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    /* ════════ LIST VIEW ════════ */
                    <motion.div
                        key="list"
                        className={styles.listView}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {EVIDENCE_DATA.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                ref={(el: HTMLDivElement | null) => {
                                    if (el) elementRefs.current.set(item.id, el);
                                }}
                                className={`${styles.listRow} ${selectedId && selectedId !== item.id ? styles.listRowHidden : ""}`}
                                onClick={() => handleItemClick(item.id)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: idx * 0.06,
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {/* Background image placeholder */}
                                <div
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
                                        <span className={styles.listLabel}>
                                            {item.label}
                                        </span>
                                        <h4 className={styles.listTitle}>
                                            {item.title}
                                        </h4>
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

            {/* ── Morphing Detail View ── */}
            <AnimatePresence>
                {selectedEvidence && originRect && (
                    <motion.div
                        key={`morph-${selectedEvidence.id}`}
                        className={styles.morphContainer}
                        initial={{
                            position: "fixed",
                            top: originRect.top,
                            left: originRect.left,
                            width: originRect.width,
                            height: originRect.height,
                            borderRadius: 0,
                        }}
                        animate={{
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            borderRadius: 0,
                        }}
                        exit={{
                            top: originRect.top,
                            left: originRect.left,
                            width: originRect.width,
                            height: originRect.height,
                            borderRadius: 0,
                        }}
                        transition={{
                            type: "spring",
                            damping: 32,
                            stiffness: 220,
                            mass: 1,
                        }}
                        style={{ zIndex: 9999 }}
                    >
                        {/* Background color that persists from the source element */}
                        <div
                            className={styles.morphBg}
                            style={{ background: selectedEvidence.color }}
                        />
                        <div className={styles.morphOverlay} />

                        {/* Close button */}
                        <motion.button
                            className={styles.morphCloseBtn}
                            onClick={handleClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3, duration: 0.2 }}
                        >
                            ← FERMER
                        </motion.button>

                        {/* Inner content — stagger-reveals like a terminal */}
                        <motion.div
                            className={styles.morphInner}
                            variants={contentStagger}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Header: label + title */}
                            <motion.div className={styles.morphHeader} variants={contentItem}>
                                <span className={styles.morphLabel}>{selectedEvidence.label}</span>
                                <h2 className={styles.morphTitle}>{selectedEvidence.title}</h2>
                                <p className={styles.morphSubtitle}>{selectedEvidence.subtitle}</p>
                            </motion.div>

                            {/* Content grid */}
                            <div className={styles.morphGrid}>
                                {/* Left column: metadata + tags */}
                                <motion.div className={styles.morphLeft} variants={contentItem}>
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

                                {/* Right column: image + reports */}
                                <motion.div className={styles.morphRight} variants={contentItem}>
                                    <div
                                        className={styles.imagePlaceholder}
                                        style={{ background: `linear-gradient(135deg, ${selectedEvidence.color}22 0%, ${selectedEvidence.color}11 100%)` }}
                                    >
                                        <div className={styles.placeholderText}>
                                            Image Placeholder
                                        </div>
                                    </div>

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
                )}
            </AnimatePresence>
        </div>
    );
}

