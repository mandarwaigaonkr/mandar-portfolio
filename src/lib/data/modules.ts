import type { ModuleRecord } from "@/types/system";

export const modules: ModuleRecord[] = [
  {
    id: "inventory-control",
    index: "01",
    title: "Inventory Control Interface",
    subtitle: "Siemens Goa | First-Year Internship",
    summary:
      "Internal inventory and warehouse material management software for a relay manufacturing facility.",
    status: "stable",
    stack: ["Enterprise UI", "Operational Workflows", "Asset Tracking"],
    metrics: [
      { label: "Environment", value: "Smart Warehouse" },
      { label: "Role", value: "Software Intern" },
      { label: "Focus", value: "Material Visibility" }
    ],
    bullets: [
      "Reduced dependence on warehouse-bound system terminals.",
      "Reframed inventory lookup as an operational software problem.",
      "Worked within a factory context with real material movement constraints."
    ],
    imagePlaceholder: "MODULE_THUMB_PLACEHOLDER_01",
    detail: {
      context:
        "The relay manufacturing facility had a large smart warehouse, but material visibility was still tied to systems physically located inside the warehouse environment.",
      objective:
        "Design an internal interface that made inventory and warehouse material checks easier for operators without forcing them to depend on fixed warehouse terminals.",
      execution:
        "Worked inside a Siemens internship team to frame warehouse access as a software systems problem. The module focused on inventory lookup flows, asset visibility, and smoother access to operational data in a real factory context.",
      impact:
        "This project established a practical engineering baseline: understand the operational bottleneck, build around real users, and keep the interface aligned with enterprise constraints rather than demo assumptions.",
      systemLayers: [
        {
          title: "Operational Context Layer",
          description:
            "Mapped physical warehouse dependency into a software access problem that could be abstracted through a cleaner interface."
        },
        {
          title: "Inventory Visibility Layer",
          description:
            "Focused on material lookup, stock awareness, and internal asset tracking rather than surface-level UI polish."
        },
        {
          title: "Enterprise Constraint Layer",
          description:
            "Designed around real facility processes and practical employee usage patterns."
        }
      ],
      outcomes: [
        "Converted a physical workflow bottleneck into an application design problem.",
        "Built early experience with internal software used in an industrial environment.",
        "Developed comfort with enterprise-oriented problem framing."
      ],
      visualNodes: [
        "WAREHOUSE_INTERFACE_PLACEHOLDER",
        "INVENTORY_TERMINAL_PLACEHOLDER",
        "ASSET_MAP_PLACEHOLDER"
      ],
      relatedLogIds: ["siemens-goa", "edu-christ"]
    }
  },
  {
    id: "automation-pipeline",
    index: "02",
    title: "Enterprise Automation Pipeline",
    subtitle: "Siemens Bengaluru | Current Internship",
    summary:
      "Automation-focused enterprise software for transforming JSON input into standardized Siemens-compatible documents.",
    status: "active",
    stack: ["Automation", "Enterprise Systems", "Data Transformation"],
    metrics: [
      { label: "Role", value: "SDE Intern" },
      { label: "Output", value: "Standard Documents" },
      { label: "Scope", value: "Global Operations" }
    ],
    bullets: [
      "Built internal tooling for enterprise document standardization.",
      "Worked inside global business systems rather than isolated demos.",
      "Focused on operational reliability and structured data flow."
    ],
    imagePlaceholder: "MODULE_THUMB_PLACEHOLDER_02",
    detail: {
      context:
        "Inside Siemens GBS Digital Solutions, the work sits closer to operational software and automation pipelines than to isolated student projects.",
      objective:
        "Build enterprise automation that transforms JSON data produced by software systems into standardized Siemens documents usable across broader enterprise workflows.",
      execution:
        "Implemented a transformation-oriented software layer with attention to structured data, repeatable output, and internal system interoperability. The emphasis is on usefulness, not visual novelty.",
      impact:
        "This module reflects current production-minded growth: handling enterprise data shapes, building within organizational standards, and contributing to systems that support larger business operations.",
      systemLayers: [
        {
          title: "Input Normalization Layer",
          description:
            "Accepts JSON payloads from upstream software systems and prepares them for controlled downstream processing."
        },
        {
          title: "Transformation Layer",
          description:
            "Converts incoming data into a standardized Siemens document structure with predictable output rules."
        },
        {
          title: "Enterprise Integration Layer",
          description:
            "Ensures the resulting artifacts can be consumed across internal operational flows."
        }
      ],
      outcomes: [
        "Built a practical automation module inside an enterprise setting.",
        "Worked directly with structured data transformation and standardization.",
        "Strengthened reliability-focused engineering habits."
      ],
      visualNodes: [
        "JSON_PIPELINE_PLACEHOLDER",
        "STANDARD_DOCUMENT_PLACEHOLDER",
        "ENTERPRISE_FLOW_PLACEHOLDER"
      ],
      relatedLogIds: ["siemens-blr", "edu-christ"]
    }
  },
  {
    id: "workforce-system",
    index: "03",
    title: "Workforce Management System",
    subtitle: "MEAN Stack Practice Build",
    summary:
      "Employee management system built to strengthen full-stack application architecture and CRUD workflow design.",
    status: "stable",
    stack: ["MongoDB", "Express", "Angular", "Node.js"],
    metrics: [
      { label: "Stack", value: "MEAN" },
      { label: "Type", value: "Full Stack" },
      { label: "Goal", value: "System Practice" }
    ],
    bullets: [
      "Built as a structured practice system rather than a tutorial clone.",
      "Covered core employee data, application flows, and database operations.",
      "Used to deepen full-stack implementation discipline."
    ],
    imagePlaceholder: "MODULE_THUMB_PLACEHOLDER_03",
    detail: {
      context:
        "This system was built deliberately to improve MEAN stack fluency through a more realistic business-style workflow.",
      objective:
        "Create an employee management application that exercises CRUD flows, role-oriented data handling, and end-to-end application structure using the MEAN stack.",
      execution:
        "Designed the system as a full-stack practice environment, covering database interactions, application structure, and front-to-back workflow implementation rather than isolated feature experiments.",
      impact:
        "The project sharpened applied full-stack execution and prepared the ground for more structured frontend work and later React-based interfaces.",
      systemLayers: [
        {
          title: "Data Layer",
          description:
            "Stored and managed employee-related records with database-driven CRUD operations."
        },
        {
          title: "Application Logic Layer",
          description:
            "Handled business-style flows around employee records, updates, and system interactions."
        },
        {
          title: "Interface Layer",
          description:
            "Presented management-oriented operations through a practical full-stack frontend."
        }
      ],
      outcomes: [
        "Strengthened confidence in the MEAN stack as a working system, not just a set of tools.",
        "Practiced application architecture with realistic entity flows.",
        "Built a stronger bridge from backend logic to frontend structure."
      ],
      visualNodes: [
        "EMPLOYEE_DASHBOARD_PLACEHOLDER",
        "DATABASE_SCHEMA_PLACEHOLDER",
        "WORKFLOW_SCREEN_PLACEHOLDER"
      ],
      relatedLogIds: ["mean-system", "edu-christ"]
    }
  },
  {
    id: "robotic-arm",
    index: "04",
    title: "Robotic Arm Control System",
    subtitle: "Hardware + Mobile Control Project",
    summary:
      "Designed and programmed a mobile-controlled robotic arm from scratch, including mechanical modeling and mobile app control.",
    status: "stable",
    stack: ["Fusion/AutoCAD", "Android Studio", "Control Logic"],
    metrics: [
      { label: "Mode", value: "Mobile Controlled" },
      { label: "Domain", value: "Hardware + Software" },
      { label: "Build", value: "From Scratch" }
    ],
    bullets: [
      "Combined physical design, programming, and control interaction.",
      "Built the companion mobile application in Android Studio.",
      "Shows comfort beyond pure web development."
    ],
    imagePlaceholder: "LAB_IMAGE_PLACEHOLDER",
    detail: {
      context:
        "This project moved beyond web software and into coordinated mechanical design, control systems thinking, and mobile interaction.",
      objective:
        "Design and build a robotic arm from scratch, then create a mobile application capable of controlling it in a usable way.",
      execution:
        "Modeled the arm using design tools, programmed the control behavior, and built the mobile-side interface in Android Studio to operate the system as a connected device.",
      impact:
        "The result is evidence of systems thinking across hardware, software, and interaction design, rather than comfort inside a single stack.",
      systemLayers: [
        {
          title: "Mechanical Design Layer",
          description:
            "Created the structural design and motion assumptions of the robotic arm."
        },
        {
          title: "Control Layer",
          description:
            "Defined the control logic that translated operator intent into system motion."
        },
        {
          title: "Mobile Interface Layer",
          description:
            "Built the Android application that exposed the arm as a controllable interface."
        }
      ],
      outcomes: [
        "Demonstrated comfort with hardware-software integration.",
        "Worked across mechanical design, programming, and mobile UX.",
        "Built an end-to-end control system from concept through execution."
      ],
      visualNodes: [
        "ROBOTIC_ARM_RENDER_PLACEHOLDER",
        "MOBILE_CONTROL_APP_PLACEHOLDER",
        "LAB_BUILD_PLACEHOLDER"
      ],
      relatedLogIds: ["robotic-arm", "edu-christ"]
    }
  },
  {
    id: "technical-leadership",
    index: "05",
    title: "Technical Leadership Interface",
    subtitle: "IEEE CS | ASCII Club | InC4",
    summary:
      "Community and leadership work across technical events, member engagement, and conference execution.",
    status: "active",
    stack: ["Event Operations", "Leadership", "Technical Community"],
    metrics: [
      { label: "IEEE", value: "Execom" },
      { label: "ASCII", value: "Volunteer" },
      { label: "InC4", value: "MC + Host" }
    ],
    bullets: [
      "Hosted and managed IEEE InC4 2025 as MC.",
      "Coordinated speakers and maintained event flow.",
      "Contributed to technical sessions and member engagement initiatives."
    ],
    imagePlaceholder: "EVENT_IMAGE_PLACEHOLDER",
    detail: {
      context:
        "Technical growth also included visible community and execution roles across IEEE CS, ASCII Club, and major event environments.",
      objective:
        "Contribute to technical communities by helping organize sessions, improve engagement, and lead visible event execution when needed.",
      execution:
        "Served in Execom and volunteer roles, coordinated with teams, and took responsibility for MC and hosting duties during IEEE InC4, keeping the event flow coherent and professional.",
      impact:
        "This module shows communication, execution discipline, and the ability to represent technical communities in public operational settings.",
      systemLayers: [
        {
          title: "Community Coordination Layer",
          description:
            "Supported technical sessions, member engagement, and collaborative event operations."
        },
        {
          title: "Conference Execution Layer",
          description:
            "Handled stage flow, speaker transitions, and event continuity during IEEE InC4."
        },
        {
          title: "Representation Layer",
          description:
            "Acted as a visible technical communicator in front of participants, guests, and experts."
        }
      ],
      outcomes: [
        "Built confidence in live technical communication environments.",
        "Contributed to community-building and event execution.",
        "Added leadership and coordination evidence alongside engineering work."
      ],
      visualNodes: [
        "INC4_STAGE_PLACEHOLDER",
        "IEEE_EVENT_PLACEHOLDER",
        "COMMUNITY_SESSION_PLACEHOLDER"
      ],
      relatedLogIds: ["ieee-ascii", "inc4"]
    }
  }
];

export function getModuleById(moduleId: string) {
  return modules.find((module) => module.id === moduleId);
}
