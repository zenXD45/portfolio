export const profile = {
  name: "Parag Manwal",
  role: "Full-Stack Developer",
  location: "Dehradun, Uttarakhand",
  email: "mparag838@gmail.com",
  phone: "+91 82658 55853",
  github: "https://github.com/zenXD45",
  linkedin: "https://linkedin.com/in/parag-manwal",
  summary:
    "BCA student and web developer with hands-on experience building full-stack applications using React and Node.js. Proficient in JavaScript, HTML5, CSS3, MongoDB, AWS, and modern toolchains including Git, GitHub, Postman, and Linux. Skilled in REST APIs, Tailwind CSS, and cross-platform development with Capacitor and Next.js. Committed to clean code, scalable architecture, and continuous learning in web development.",
  heroSub:
    "Full-stack developer building real-time apps with end-to-end encryption.",
};

export const facts = [
  { value: "2023–26", label: "BCA, Computer Science" },
  { value: "2025", label: "Web dev internship" },
  { value: "02", label: "Full-stack products" },
  { value: "20+", label: "Technologies in use" },
];

export const marqueeItems = [
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "WebSockets",
  "REST APIs",
  "AWS",
  "Git",
  "Linux",
  "Capacitor",
  "Postman",
];

export const projects = [
  {
    name: "FlowBoard",
    tagline: "Real-time collaborative Kanban",
    description:
      "A full-stack project management app where teams organize work on shared boards and see updates live.",
    tech: [
      "React 19",
      "Vite",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "Socket.io",
      "dnd-kit",
    ],
    highlights: [
      "Real-time collaboration with HTTP for reads and acknowledged socket commands for mutations.",
      "Board roles for owners, members and viewers, plus comments, assignments, due dates, activity history and live presence.",
      "Optimistic card updates with server-side ordering and version checks: stale edits are rejected and clients reconcile.",
      "Password and Google/GitHub sign-in, profile settings, API security controls and automated backend test coverage.",
    ],
    link: "https://github.com/zenXD45/flowboard",
  },
  {
    name: "Cipher",
    tagline: "End-to-end encrypted chat",
    description:
      "A real-time chat app that encrypts messages in the browser before sending them. The server stores ciphertext and cannot read message contents.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Web Crypto API",
      "IndexedDB",
    ],
    highlights: [
      "AES-256-GCM message encryption with RSA-OAEP content-key wrapping.",
      "Private keys stay local in IndexedDB; decryption happens only on the sender's or recipient's current device.",
      "Socket.io powers live messaging and read receipts, with JWT-based authentication.",
      "Server-side storage holds only ciphertext, so message contents never leave the device in readable form.",
    ],
    link: "https://github.com/zenXD45/cipher",
  },
];

export const experience = [
  {
    kind: "experience",
    date: "15 Oct – 15 Nov 2025",
    title: "Web Developer Intern",
    org: "Him Village E-Prahari NGO (HVEP)",
    points: [
      "Developed and maintained web assets supporting the organization's digital presence and community outreach.",
      "Collaborated with the internal team to troubleshoot technical issues and deliver frontend and backend improvements.",
      "Updated page layouts, visuals and user flows to support the Foundation's sustainability and Waste-to-Wonder initiatives.",
    ],
  },
  {
    kind: "education",
    date: "2023 – 2026",
    title: "Bachelor of Computer Applications (BCA)",
    org: "Swami Rama Himalayan University",
    points: [
      "Computer Science, in progress.",
      "Focus areas: web development, databases and full-stack application design.",
    ],
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Capacitor",
    ],
  },
  {
    label: "Backend & Realtime",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets"],
  },
  {
    label: "Data & Cloud",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "AWS"],
  },
  {
    label: "Tooling",
    items: ["Git", "GitHub", "Postman", "Linux", "VS Code"],
  },
];
