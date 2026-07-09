// Single source of truth for the project list.
// To add a new project: append an entry here and create projects/<slug>.html
// (use any existing project page as a template).

window.PROJECTS = [
  {
    slug: "r500",
    title: "R500",
    tagline: "A 32-bit pipelined processor on the Xilinx Artix-7 FPGA.",
    date: "Jun 2025 – Dec 2025",
    year: 2025,
    thumb: "assets/img/r500.png",
    tags: ["FPGA", "Computer Architecture", "Verilog", "RISC-V"],
    repo: "https://github.com/parkwilliamy/R500"
  },
  {
    slug: "autonomous-navigation-system",
    title: "Autonomous Navigation System",
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
    tagline: "PID-controlled robot following tracks with up to 90° turns at 30 cm/s.",
    date: "Dec 2024 – Jan 2025",
    year: 2024,
    thumb: "assets/img/line-follower-robot.jpg",
    tags: ["STM32", "PID", "PCB Design", "Fusion 360"],
    repo: "https://github.com/parkwilliamy/Projects"
  }
];

const GITHUB_ICON = `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`;

function renderProjectList(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const byYear = {};
  for (const p of window.PROJECTS) {
    (byYear[p.year] ||= []).push(p);
  }
  const years = Object.keys(byYear).sort((a, b) => b - a);
  el.innerHTML = years.map(y => `
    <section class="year-group">
      <h3 class="year-label">${y}</h3>
      <ul class="project-list">
        ${byYear[y].map(p => `
          <li class="project-item">
            <div class="project-link">
              <div class="project-thumb">
                <img src="${p.thumb}" alt="${p.title}" loading="lazy">
              </div>
              <div class="project-meta">
                <div class="project-row">
                  <h4 class="project-title">
                    <a class="project-title-link" href="projects/${p.slug}.html">${p.title}</a>
                  </h4>
                  <span class="project-date">${p.date}</span>
                </div>
                <p class="project-tagline">${p.tagline}</p>
                <div class="project-actions">
                  <a class="view-code" href="${p.repo}" target="_blank" rel="noopener">
                    ${GITHUB_ICON}
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        `).join("")}
      </ul>
    </section>
  `).join("");
}
