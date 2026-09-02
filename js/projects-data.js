/**
 * Muhammad Mujasam — Portfolio Projects Data
 * Detailed data store for featured and academic projects
 */

const PROJECTS_DATA = {
  "pusher-tasks": {
    title: "Pusher Task Management App",
    category: "Mobile Application • Productivity",
    award: null,
    tagline: "A lightweight mobile task management app for daily organization, reminders, and progress tracking.",
    overview: "Pusher is an agile, lightweight mobile task management application engineered using Flutter and Dart. Designed with a clean, distraction-free user interface, it empowers users to seamlessly capture daily to-dos, categorize tasks, schedule timely notifications, and visualize their productivity through dynamic progress analytics.",
    technologies: ["Flutter", "Dart", "Mobile UI", "Local Storage", "State Management", "Responsive Design"],
    features: [
      "Task creation with categorization and priority levels",
      "Intuitive task management with swipe-to-complete actions",
      "Scheduled reminders and local notifications",
      "Visual productivity progress tracking and analytics",
      "Clean mobile interface with high-contrast accessibility",
      "Lightweight, battery-efficient architecture",
      "Fast 60 FPS rendering and smooth micro-interactions"
    ],
    architecture: "Structured using clean MVVM-inspired architecture separating UI widgets, state providers, and persistent repositories for minimal overhead and instant startup times.",
    githubUrl: "https://github.com/muhammadmujasam",
    liveDemo: "#"
  },

  "ride-sharing": {
    title: "Ride Sharing Mobile Application",
    category: "Final Year Project • Cross-Platform",
    award: "Transportation Innovation Award — 2023",
    tagline: "Cross-platform mobile solution for regional transportation, real-time vehicle tracking, and secure payment.",
    overview: "Developed as Muhammad's University Final Year Project (FYP), this cross-platform application bridges transport gaps in regional corridors. The platform provides passengers with accurate real-time GPS tracking of drivers, secure cashless transaction flows, and dynamic route calculations. This project was honored with the prestigious Transportation Innovation Award in 2023 for its focus on modern mobility and regional sustainability.",
    technologies: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Cloud Storage", "Google Maps SDK", "Android Studio", "REST APIs"],
    features: [
      "Role-based secure authentication for drivers and riders",
      "Real-time driver location tracking and live GPS map route rendering",
      "Instant ride dispatch and ride status lifecycle management",
      "Cloud Firestore real-time synchronization backend",
      "Cloud storage for profile pictures, vehicle documents, and receipts",
      "Secure simulated digital payment and fare estimation engine",
      "High performance cross-platform compatibility across Android and iOS"
    ],
    architecture: "Built with Flutter multi-platform codebase, backed by Google Firebase services (Auth, Firestore, Cloud Functions) and integrated with mapping and geocoding REST APIs.",
    githubUrl: "https://github.com/muhammadmujasam",
    liveDemo: "#"
  },

  "cv-digits": {
    title: "Numeric Recognition System",
    category: "Computer Vision • Machine Learning",
    award: null,
    tagline: "Handwritten numeric character recognition system (0–9) using image processing and ML algorithms.",
    overview: "An academic computer vision system designed to recognize and classify handwritten numeric digits (0 through 9). The system incorporates custom pre-processing pipelines (greyscale conversion, thresholding, noise reduction, contour detection) followed by feature extraction and classification.",
    technologies: ["Computer Vision", "Image Processing", "Machine Learning", "Python / OpenCV", "Feature Extraction"],
    features: [
      "Image pre-processing and noise elimination pipeline",
      "Automated digit segmentation and contour bounding box detection",
      "Trained model capable of classifying handwritten numbers 0–9",
      "Robust accuracy across varying handwriting styles and stroke weights"
    ],
    architecture: "Multi-stage CV pipeline: Raw Image Input → Grayscale/Binarization → Morphological Operations → Feature Vector Extraction → Classifier Inference.",
    githubUrl: "https://github.com/muhammadmujasam",
    liveDemo: "#"
  },

  "cisco-network": {
    title: "Cisco Campus Network Architecture",
    category: "Computer Networks • Infrastructure",
    award: null,
    tagline: "Comprehensive university campus network topology with VLANs, subnetting, and dynamic routing.",
    overview: "A full-scale campus network infrastructure designed and simulated using Cisco Packet Tracer. Engineered to handle thousands of concurrent nodes across academic faculties, administrative blocks, and student dormitories with strict security zoning and fault tolerance.",
    technologies: ["Cisco Packet Tracer", "VLANs", "Subnetting (VLSM)", "OSPF / RIP", "Network Security", "ACLs"],
    features: [
      "Hierarchical network topology (Core, Distribution, and Access layers)",
      "Variable Length Subnet Masking (VLSM) for optimized IP address conservation",
      "VLAN segmentation with 802.1Q inter-VLAN routing",
      "Dynamic routing protocol implementation (OSPF) for fault resilience",
      "Access Control Lists (ACLs) and firewall configurations for security isolation"
    ],
    architecture: "Three-tier enterprise architecture ensuring 99.9% uptime, redundant links, and segmented broadcast domains.",
    githubUrl: "https://github.com/muhammadmujasam",
    liveDemo: "#"
  },

  "dbms-library": {
    title: "SQL-Based Library Management System",
    category: "DBMS • Relational Database",
    award: null,
    tagline: "Relational database system managing catalogue inventory, borrower accounts, and transactional history.",
    overview: "A normalized relational database system designed to automate library operations. Contains comprehensive table schemas, referential integrity constraints, automated triggers for overdue books, and optimized indexing for rapid catalog lookup.",
    technologies: ["SQL", "Relational Schema Design", "Database Management Systems", "Query Optimization", "Stored Procedures"],
    features: [
      "Third Normal Form (3NF) relational database schema",
      "Comprehensive entity modeling: Books, Authors, Borrowers, Staff, and Loans",
      "Complex SQL queries for inventory analysis, overdue tracking, and borrower history",
      "ACID transactional guarantees for book issuance and returns",
      "Indexed primary and foreign keys for sub-millisecond query execution"
    ],
    architecture: "Relational DBMS with normalized schemas, stored procedures for automated fee calculations, and transaction isolation.",
    githubUrl: "https://github.com/muhammadmujasam",
    liveDemo: "#"
  }
};
