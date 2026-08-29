// Renders the homepage chip floorplan + project index from window.PROJECTS.
// Requires js/plan-lib.js (shared tiling). The index is the accessible,
// crawlable list (real links); the floorplan SVG is pointer-only enhancement
// on top of it (aria-hidden, no duplicate tab stops).

(function () {
  "use strict";

  var lib = window.PlanLib;
  var projects = window.PROJECTS || [];
  var planRoot = document.getElementById("plan-root");
  var legendRoot = document.getElementById("legend-root");
  if (!lib || !planRoot || !legendRoot || !projects.length) return;

  var esc = lib.esc, isLive = lib.isLive, blockCode = lib.blockCode;

  // --- geometry: die outline, pad ring, core ---
  var VB_W = 560, VB_H = 440;
  var DIE = { x: 2, y: 2, w: VB_W - 4, h: VB_H - 4 };
  var CORE = { x: 34, y: 34, w: VB_W - 68, h: VB_H - 68 };
  var CHANNEL = 8; // routing channel between blocks

  var placed = lib.floorplan(projects, CORE);

  var svg = [];
  svg.push(
    '<svg class="plan-svg" viewBox="0 0 ' + VB_W + " " + VB_H + '" aria-hidden="true">',
    // die substrate + edge
    '<rect x="' + DIE.x + '" y="' + DIE.y + '" width="' + DIE.w + '" height="' + DIE.h + '" fill="#dde1d6"/>',
    '<rect x="' + DIE.x + '" y="' + DIE.y + '" width="' + DIE.w + '" height="' + DIE.h + '" fill="none" stroke="#22262a" stroke-width="2"/>'
  );

  // pad ring: I/O pads along all four edges, each run optically centered
  var pads = [];
  var padGap = 24, padA = 14, padB = 7, m = 8;
  function padRun(span) {
    var count = Math.floor((span - 60 - padA) / padGap) + 1;
    return { start: (span - ((count - 1) * padGap + padA)) / 2, count: count };
  }
  var hRun = padRun(VB_W), vRun = padRun(VB_H);
  for (var hi = 0; hi < hRun.count; hi++) {
    var px = hRun.start + hi * padGap;
    pads.push([px, m, padA, padB]);
    pads.push([px, VB_H - m - padB, padA, padB]);
  }
  for (var vi = 0; vi < vRun.count; vi++) {
    var py = vRun.start + vi * padGap;
    pads.push([m, py, padB, padA]);
    pads.push([VB_W - m - padB, py, padB, padA]);
  }
  svg.push('<g class="pads">');
  pads.forEach(function (p) {
    svg.push('<rect x="' + p[0] + '" y="' + p[1] + '" width="' + p[2] + '" height="' + p[3] + '" fill="#555c64" fill-opacity="0.35"/>');
  });
  svg.push("</g>");

  // corner alignment keys: one quiet L-mark in each die corner
  [[14, 26, 14, 14, 26, 14], [VB_W - 14, 26, VB_W - 14, 14, VB_W - 26, 14],
   [14, VB_H - 26, 14, VB_H - 14, 26, VB_H - 14], [VB_W - 14, VB_H - 26, VB_W - 14, VB_H - 14, VB_W - 26, VB_H - 14]
  ].forEach(function (k) {
    svg.push(
      '<path d="M' + k[0] + " " + k[1] + " L" + k[2] + " " + k[3] + " L" + k[4] + " " + k[5] +
      '" fill="none" stroke="#22262a" stroke-opacity="0.8" stroke-width="2"/>'
    );
  });

  // core outline
  svg.push(
    '<rect x="' + (CORE.x - CHANNEL) + '" y="' + (CORE.y - CHANNEL) + '" width="' + (CORE.w + 2 * CHANNEL) +
    '" height="' + (CORE.h + 2 * CHANNEL) + '" fill="none" stroke="#22262a" stroke-width="1" stroke-opacity="0.45"/>'
  );

  // blocks
  placed.forEach(function (b, bi) {
    var x = (b.x + CHANNEL / 2).toFixed(1), y = (b.y + CHANNEL / 2).toFixed(1);
    var w = (b.w - CHANNEL).toFixed(1), h = (b.h - CHANNEL).toFixed(1);
    var p = b.project;
    var i = b.index;
    var bin = lib.BINS[i % lib.BINS.length];

    // Multi-line block label, sized to fit: each word is its own line (never
    // broken), the font shrinks until the longest word fits, and tall narrow
    // blocks rotate their label vertically like a real floorplan.
    var lines = blockCode(p).split(" ");
    var vertical = b.h > b.w * 1.5 && lines.join("").length > 6;
    var maxChars = Math.max.apply(null, lines.map(function (l) { return l.length; }));
    var track = lines.length > 1 || maxChars > 6 ? 1 : 2;
    var along = (vertical ? b.h : b.w) - CHANNEL - 18;   // text direction
    var across = (vertical ? b.w : b.h) - CHANNEL - 12;  // line-stacking direction
    var size = Math.min(17, Math.floor((along - maxChars * track) / (maxChars * 0.85)));
    size = Math.min(size, Math.floor(across / lines.length) - 5);
    if (size < 8) size = 8;
    var lineH = size + 5;
    var cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    var y0 = cy - ((lines.length - 1) * lineH) / 2 + size * 0.35;
    var labelSvg = lines.map(function (l, li) {
      return '<tspan x="' + cx.toFixed(1) + '" y="' + (y0 + li * lineH).toFixed(1) + '">' + esc(l) + "</tspan>";
    }).join("");
    var rotate = vertical ? ' transform="rotate(-90 ' + cx.toFixed(1) + " " + cy.toFixed(1) + ')"' : "";

    svg.push(
      '<a class="block-link" href="projects/' + esc(p.slug) + '.html" tabindex="-1">',
      '<g class="block" data-slug="' + esc(p.slug) + '">',
      '<rect class="block-fill" style="--d:' + (bi * 110) + 'ms" x="' + x + '" y="' + y +
      '" width="' + w + '" height="' + h + '" fill="' + bin + '"/>',
      '<rect class="block-outline" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
      '" fill="none" stroke="#22262a" stroke-width="2"/>',
      '<text class="block-code"' + rotate + ' style="font-size:' + size + 'px;letter-spacing:' + track + 'px" text-anchor="middle" fill="#22262a" stroke="' +
      bin + '" stroke-width="' + Math.max(2.4, size * 0.2).toFixed(1) + '">' + labelSvg + "</text>",
      "</g>",
      "</a>"
    );
  });

  svg.push("</svg>");
  planRoot.innerHTML = svg.join("");
  var caption = document.getElementById("plan-caption");
  if (caption) caption.hidden = false;

  // --- legend: the real index ---
  legendRoot.innerHTML = projects.map(function (p, i) {
    var bin = lib.BINS[i % lib.BINS.length];
    var live = isLive(p);
    return (
      '<li class="legend-row" data-slug="' + esc(p.slug) + '">' +
      '<span class="swatch' + (live ? " swatch-live" : "") + '" style="--bin:' + bin + '" aria-hidden="true"></span>' +
      '<div class="legend-main">' +
      '<div class="legend-top">' +
      '<a class="legend-link" href="projects/' + esc(p.slug) + '.html">' + esc(p.title) + "</a>" +
      '<span class="legend-date">' + esc(p.date).toUpperCase() + "</span>" +
      "</div>" +
      '<p class="legend-tagline">' + esc(p.tagline) + "</p>" +
      (p.metric ? '<p class="legend-metric">' + esc(p.metric) + "</p>" : "") +
      '<div class="legend-actions">' +
      '<a class="legend-src" href="' + esc(p.repo) + '" target="_blank" rel="noopener">Source ↗</a>' +
      "</div>" +
      "</div>" +
      "</li>"
    );
  }).join("");

  // --- hover/click sync between floorplan, legend, readout ---
  var svgEl = planRoot.querySelector(".plan-svg");
  function setActive(slug) {
    svgEl.classList.toggle("has-active", !!slug);
    planRoot.querySelectorAll(".block").forEach(function (g) {
      g.classList.toggle("is-active", g.getAttribute("data-slug") === slug);
    });
    legendRoot.querySelectorAll(".legend-row").forEach(function (row) {
      row.classList.toggle("is-active", row.getAttribute("data-slug") === slug);
    });
  }
  planRoot.addEventListener("mouseover", function (e) {
    var g = e.target.closest(".block");
    if (g) setActive(g.getAttribute("data-slug"));
  });
  planRoot.addEventListener("mouseleave", function () { setActive(null); });
  // Blocks are real SVG links (Ctrl/middle-click, URL preview all work natively).
  legendRoot.addEventListener("mouseover", function (e) {
    var row = e.target.closest(".legend-row");
    if (row) setActive(row.getAttribute("data-slug"));
  });
  legendRoot.addEventListener("mouseleave", function () { setActive(null); });
  // Whole row navigates — the note promises "click a row", so honor it —
  // but never when the reader is selecting text or dragged the pointer.
  var pressAt = null;
  legendRoot.addEventListener("pointerdown", function (e) { pressAt = [e.clientX, e.clientY]; });
  legendRoot.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    var sel = window.getSelection && String(window.getSelection()).trim();
    if (sel) return;
    if (pressAt && Math.hypot(e.clientX - pressAt[0], e.clientY - pressAt[1]) > 4) return;
    var row = e.target.closest(".legend-row");
    if (row) window.location.href = "projects/" + row.getAttribute("data-slug") + ".html";
  });
  legendRoot.addEventListener("focusin", function (e) {
    var row = e.target.closest(".legend-row");
    if (row) setActive(row.getAttribute("data-slug"));
  });
  legendRoot.addEventListener("focusout", function () { setActive(null); });
  // A tap-to-navigate leaves the tapped block active in the page the
  // back/forward cache restores; clear it whenever the page is shown.
  window.addEventListener("pageshow", function () { setActive(null); });
})();
