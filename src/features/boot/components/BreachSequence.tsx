"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSystemStore } from "@/store/system-store";
import styles from "./BreachSequence.module.css";

/* ── Terminal script — each line types out sequentially ── */
const TERMINAL_LINES = [
    { prefix: "LOG", type: "log" as const, text: "Attempting handshake with 192.168.1.04..." },
    { prefix: "WARN", type: "warn" as const, text: "Firewall detected. Initializing bypass_protocol.sh" },
    { prefix: "OK", type: "ok" as const, text: "Port 443 bypassed via SSL tunnel" },
    { prefix: "LOG", type: "log" as const, text: "Scanning /root/assets/bio..." },
    { prefix: "WARN", type: "warn" as const, text: "Encrypted payload at /sys/profile/core" },
    { prefix: "SUCCESS", type: "success" as const, text: "Vulnerability found in /root/assets/bio" },
];

/* ── Timing constants ── */
const INITIAL_PAUSE = 400;
const CHAR_SPEED = 10;
const LINE_PAUSE = 60;
const GRANTED_HOLD = 800;
const SPLIT_DURATION = 1300; // vault door split animation time
const PROGRESS_BOOST = 16;

export function BreachSequence() {
    const setSystemStatus = useSystemStore((state) => state.setSystemStatus);
    const setCurrentView = useSystemStore((state) => state.setCurrentView);

    const [phase, setPhase] = useState<"idle" | "typing" | "granted" | "splitting" | "done">("idle");
    const [displayedLines, setDisplayedLines] = useState<Array<{ prefix: string; type: string; text: string; chars: number }>>([]);
    const [showCursor, setShowCursor] = useState(true);
    const [progress, setProgress] = useState(0);

    const terminalRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, []);

    /* ── Main animation orchestrator ── */
    useEffect(() => {
        let cancelled = false;

        const sleep = (ms: number) => new Promise<void>((resolve) => {
            setTimeout(() => { if (!cancelled) resolve(); }, ms);
        });

        const run = async () => {
            setPhase("idle");
            await sleep(INITIAL_PAUSE);
            if (cancelled) return;

            setPhase("typing");

            for (let lineIdx = 0; lineIdx < TERMINAL_LINES.length; lineIdx++) {
                if (cancelled) return;
                const line = TERMINAL_LINES[lineIdx];
                const fullText = `[${line.prefix}] ${line.text}`;

                setDisplayedLines((prev) => [
                    ...prev,
                    { prefix: line.prefix, type: line.type, text: line.text, chars: 0 },
                ]);

                for (let charIdx = 0; charIdx <= fullText.length; charIdx++) {
                    if (cancelled) return;
                    setDisplayedLines((prev) => {
                        const updated = [...prev];
                        updated[updated.length - 1] = { ...updated[updated.length - 1], chars: charIdx };
                        return updated;
                    });
                    scrollToBottom();
                    await sleep(CHAR_SPEED);
                }

                setProgress(Math.min(95, (lineIdx + 1) * PROGRESS_BOOST));
                await sleep(LINE_PAUSE);
            }

            if (cancelled) return;

            // Straight to ACCESS GRANTED
            setPhase("granted");
            setProgress(100);
            setShowCursor(false);
            await sleep(GRANTED_HOLD);
            if (cancelled) return;

            // Vault door split — unlock the system NOW so dashboard mounts behind
            setSystemStatus("unlocked");
            setCurrentView("dashboard");
            setPhase("splitting");
            await sleep(SPLIT_DURATION + 100);
            if (cancelled) return;

            setPhase("done");
        };

        run();
        return () => { cancelled = true; };
    }, [setSystemStatus, setCurrentView, scrollToBottom]);

    /* ── Render a single terminal line ── */
    const renderLine = (line: { prefix: string; type: string; text: string; chars: number }, idx: number) => {
        const fullText = `[${line.prefix}] ${line.text}`;
        const visibleText = fullText.slice(0, line.chars);

        const prefixClass =
            line.type === "warn" ? styles.logPrefixWarn :
            line.type === "ok" ? styles.logPrefixOk :
            line.type === "success" ? styles.logPrefixSuccess :
            line.type === "error" ? styles.logPrefixError :
            styles.logPrefixLog;

        const bracketEnd = visibleText.indexOf("]");
        if (bracketEnd === -1) {
            return (
                <div key={idx} className={styles.terminalLine}>
                    <span className={prefixClass}>{visibleText}</span>
                </div>
            );
        }

        return (
            <div key={idx} className={styles.terminalLine}>
                <span className={`${styles.logPrefix} ${prefixClass}`}>{visibleText.slice(0, bracketEnd + 1)}</span>
                <span className={styles.logText}>{visibleText.slice(bracketEnd + 1)}</span>
            </div>
        );
    };

    // Don't render anything after split completes
    if (phase === "done") return null;

    const isSplitting = phase === "splitting";

    return (
        <div className={styles.shell}>
            {/* ══ TOP PANEL — slides UP during split ══ */}
            <div className={`${styles.splitPanel} ${styles.splitTop} ${isSplitting ? styles.splitActive : ""}`}>
                <div className={styles.splitPanelInner}>
                    {/* Scan lines */}
                    <div className={styles.scanLines} />

                    {/* Terminal text — clipped to top half */}
                    <div className={styles.terminal} ref={phase !== "splitting" ? terminalRef : undefined}>
                        {displayedLines.map((line, idx) => renderLine(line, idx))}
                        {showCursor && phase !== "granted" && (
                            <span className={styles.cursor} />
                        )}
                    </div>

                    {/* ACCESS GRANTED overlay */}
                    <div className={`${styles.accessGranted} ${phase === "granted" || isSplitting ? styles.visible : ""}`}>
                        <span className={styles.accessGrantedText}>ACCESS GRANTED</span>
                        <span className={styles.accessGrantedSub}>WELCOME, OPERATIVE.</span>
                    </div>

                    {/* Pinned UI — seam line label */}
                    <div className={styles.seamLabel}>
                        <span className={styles.seamLabelText}>SYS_UNLOCK</span>
                    </div>
                </div>
            </div>

            {/* ══ BOTTOM PANEL — slides DOWN during split ══ */}
            <div className={`${styles.splitPanel} ${styles.splitBottom} ${isSplitting ? styles.splitActive : ""}`}>
                <div className={styles.splitPanelInner}>
                    <div className={styles.scanLines} />

                    {/* Mirror the granted text in bottom half */}
                    <div className={`${styles.accessGranted} ${phase === "granted" || isSplitting ? styles.visible : ""}`}>
                        <span className={styles.accessGrantedText}>ACCESS GRANTED</span>
                        <span className={styles.accessGrantedSub}>WELCOME, OPERATIVE.</span>
                    </div>

                    {/* Pinned UI — seam line label bottom */}
                    <div className={styles.seamLabelBottom}>
                        <span className={styles.seamLabelText}>VAULT_OPEN</span>
                    </div>
                </div>
            </div>

            {/* ══ CENTER SEAM LINE — the bifurcation point ══ */}
            <div className={`${styles.seamLine} ${isSplitting ? styles.seamLineActive : ""}`} />

            {/* ══ Tracking lock circle ══ */}
            <div className={`${styles.trackingLock} ${isSplitting ? styles.trackingLockActive : ""}`}>
                <span>2BYT</span>
            </div>

            {/* Progress bar */}
            {!isSplitting && (
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            )}
        </div>
    );
}
