"use client";

import { useEffect, useRef, type RefObject } from "react";

import styles from "./ConnectionTrace.module.css";

type ConnectionTraceProps = {
  containerRef: RefObject<HTMLElement>;
  anchorRef: RefObject<HTMLElement>;
  targetElement: HTMLElement | null;
};

export function ConnectionTrace({
  anchorRef,
  containerRef,
  targetElement
}: ConnectionTraceProps) {
  const layerRef = useRef<SVGSVGElement | null>(null);
  const glowPathRef = useRef<SVGPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const anchorDotRef = useRef<SVGCircleElement | null>(null);
  const targetDotRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    let frameId = 0;

    const updateTrace = () => {
      const layer = layerRef.current;
      const container = containerRef.current;
      const anchor = anchorRef.current;
      const target = targetElement;

      if (!layer || !container || !anchor || !target) {
        if (layerRef.current) {
          layerRef.current.style.opacity = "0";
        }
        frameId = window.requestAnimationFrame(updateTrace);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const startX = anchorRect.left - containerRect.left + anchorRect.width / 2;
      const startY = anchorRect.top - containerRect.top + anchorRect.height / 2;
      const endX = targetRect.left - containerRect.left + Math.min(targetRect.width * 0.18, 84);
      const endY = targetRect.top - containerRect.top + targetRect.height / 2;

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const curveStrength = Math.min(Math.abs(deltaX) * 0.34, 220);
      const verticalDrift = deltaY * 0.12;

      const controlPoint1X = startX + curveStrength;
      const controlPoint1Y = startY + verticalDrift;
      const controlPoint2X = endX - curveStrength * 0.82;
      const controlPoint2Y = endY - verticalDrift;

      const path = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;

      layer.style.opacity = "1";
      layer.setAttribute("viewBox", `0 0 ${containerRect.width} ${containerRect.height}`);

      pathRef.current?.setAttribute("d", path);
      glowPathRef.current?.setAttribute("d", path);

      anchorDotRef.current?.setAttribute("cx", `${startX}`);
      anchorDotRef.current?.setAttribute("cy", `${startY}`);
      targetDotRef.current?.setAttribute("cx", `${endX}`);
      targetDotRef.current?.setAttribute("cy", `${endY}`);

      frameId = window.requestAnimationFrame(updateTrace);
    };

    frameId = window.requestAnimationFrame(updateTrace);
    return () => window.cancelAnimationFrame(frameId);
  }, [anchorRef, containerRef, targetElement]);

  return (
    <svg aria-hidden className={styles.layer} ref={layerRef}>
      <path className={styles.glowPath} ref={glowPathRef} />
      <path className={styles.path} ref={pathRef} />
      <circle className={styles.anchorDot} r="5" ref={anchorDotRef} />
      <circle className={styles.targetDot} r="4.5" ref={targetDotRef} />
    </svg>
  );
}
