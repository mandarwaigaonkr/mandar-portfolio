# 🖥️ MANDAR PORTFOLIO // SYSTEM MANIFEST

> **STRICTLY CONFIDENTIAL // LEVEL 4 CLEARANCE REQUIRED**
> 
> *Automated documentation for the Mandar Portfolio System (MPS). This document outlines the architectural subsystems and aesthetic protocols governing the immersive user experience.*

---

## 🛰️ MISSION CORE
The **Mandar Portfolio** is not a standard web interface—it is a mission control dashboard designed to showcase high-end engineering and design capabilities. It utilizes a "Cyber Command" aesthetic, blending high-stakes terminal sequences with sophisticated, flashlight-enabled UI layers.

---

## 🛠️ ARCHITECTURAL LAYERS

### 1. `BOOT_SEQUENCE` (Preloader)
*   **Module**: `src/features/boot`
*   **Description**: A superhuman-speed terminal typing sequence triggered upon entry.
*   **Core Logic**: Implements a "Breach" simulation, concluding with a CRT monitor wipe transition into the main system.
*   **Tech Stack**: Framer Motion for high-frequency text animations and layout shifts.

### 2. `COMMAND_DASHBOARD` (Main UI)
*   **Module**: `src/features/dashboard`
*   **Description**: The primary navigational hub.
*   **Features**: 
    *   **Dynamic HUD**: Live system data and floating code snippets.
    *   **Custom Cursor**: A theme-matched cyan cursor with radial glow and interaction states (hover, click).
    *   **Vignette Spotlight**: A flashlight effect that reveals high-resolution UI details as the user moves their mouse.

### 3. `INTEL_MATRIX` (Profile & Skills)
*   **Module**: `src/features/dashboard/components/ProfileMatrix.tsx`
*   **Description**: A detailed, grid-based dashboard for professional identification.
*   **Content**: Narrative history, core engineering skills, and professional status indicators.

### 4. `PROJECT_MODULE_INDEX` (Works)
*   **Module**: `src/features/modules`
*   **Description**: A high-impact project gallery inspired by "Evidence Boards."
*   **Interaction**: Flat, horizontal-scrolling slider with background-image-filled rows and dark overlays.

---

## ⚡ INTERNAL PROTOCOLS (Tech Stack)

| Subsystem | Technology | Purpose |
| :--- | :--- | :--- |
| **Foundation** | `Next.js 14` | Server-side rendering and routing |
| **Logic Engine** | `React 18` | Component-based UI architecture |
| **State Sync** | `Zustand` | Global system state management |
| **Animation Flux** | `Framer Motion` | Micro-interactions and layout transitions |
| **Spatial Matrix** | `GSAP` | Complex timeline-based animations |
| **Type Safety** | `TypeScript` | Full-stack type integrity |

---

## 🎨 VISUAL TOKENS

### Color Palette (Signal Codes)
- **Primary Signal**: `#00F5FF` (Electric Cyan)
- **Secondary Signal**: `#BF00FF` (Deep Purple)
- **Root Background**: `#0a0f13` (Obsidian)
- **Status Warnings**: `#ADFF2F` (Lime)

### Visual Effects
- **CRT Filter**: Digital scanlines and subtle chromatic aberration.
- **Glassmorphism**: High-blur panels with low-alpha borders (`rgba(0, 245, 255, 0.12)`).
- **Grain Overlay**: Film grain noise for analog texture.

---

## 📋 SYSTEM OPERATIONS
To initialize the local development environment:

```bash
npm run dev
```

To compile for production deployment:

```bash
npm run build
```

---

*End of Manifest // [CONNECTION ESTABLISHED]*
