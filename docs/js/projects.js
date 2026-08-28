// Single source of truth for the project list.
// To add a new project: append an entry here, create projects/<slug>.html
// (use any existing project page as a template), and add the same link to
// the <noscript> list in index.html.
//
// Optional fields:
//   code   — label drawn on the project's floorplan block (falls back to initials)
//   metric — real measured result shown in the index/readout; never invent one

window.PROJECTS = [
  {
    slug: "r500",
    title: "R500",
    code: "R500",
    tagline: "A 32-bit pipelined processor on the Xilinx Artix-7 FPGA.",
    metric: "57 MHz · 1.23 CPI · 96.5% branch prediction accuracy",
    date: "Jun 2025 – Present",
    year: 2025,
    thumb: "assets/img/r500.png",
    tags: ["FPGA", "Computer Architecture", "Verilog", "RISC-V"],
    repo: "https://github.com/parkwilliamy/R500"
  },
  {
    slug: "autonomous-navigation-system",
    title: "Autonomous Navigation System",
    code: "ANS",
    tagline: "ROS2 stack integrating perception, planning, and control to navigate a simulated environment.",
    date: "May 2025",
    year: 2025,
    thumb: "assets/img/autonomous-navigation-system.png",
    tags: ["ROS2", "A*", "Pure Pursuit", "LiDAR"],
    repo: "https://github.com/parkwilliamy/wato_asd_training"
  },
  {
    slug: "robot-hand",
    title: "Robot Hand",
    code: "RH",
    tagline: "Servo-driven robotic hand that mirrors user gestures via MediaPipe hand landmarks.",
    date: "Feb 2025 – Apr 2025",
    year: 2025,
    thumb: "assets/img/robot-hand.jpg",
    tags: ["STM32", "Rust", "I²C", "UART", "Computer Vision"],
    repo: "https://github.com/parkwilliamy/Projects"
  },
  {
    slug: "line-follower-robot",
    title: "Line-Follower Robot",
    code: "LFR",
    tagline: "PID-controlled robot that follows lined tracks.",
    date: "Dec 2024 – Jan 2025",
    year: 2024,
    thumb: "assets/img/line-follower-robot.jpg",
    tags: ["STM32", "PID", "PCB Design", "Fusion 360"],
    repo: "https://github.com/parkwilliamy/Projects"
  }
];
