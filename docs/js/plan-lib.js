// Shared geometry for the homepage chip-floorplan drawing (js/floorplan.js).

window.PlanLib = (function () {
  "use strict";

  var BINS = ["#2f9e44", "#1971c2", "#f5c518", "#e03131", "#7048e8", "#0c8599"];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function isLive(p) { return /present/i.test(p.date); }
  function blockCode(p) {
    if (p.code) return p.code;
    var words = p.title.split(/[\s-]+/).filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 4).toUpperCase();
    return words.map(function (w) { return w[0]; }).join("").toUpperCase();
  }

  // Core-and-periphery floorplan, gapless: the first project is the big
  // central block (the die's CPU); the rest surround it like memory/IO
  // blocks — distributed round-robin into the left column, right column,
  // and top band, each zone splitting evenly among its occupants so the
  // whole core stays covered no matter how many projects exist.
  function floorplan(projects, core) {
    var out = [];
    if (!projects.length) return out;
    if (projects.length === 1) {
      out.push({ project: projects[0], index: 0, x: core.x, y: core.y, w: core.w, h: core.h });
      return out;
    }

    var bandW = Math.round(core.w * 0.24);   // left/right column width
    var bandH = Math.round(core.h * 0.25);   // top band height
    var zones = { left: [], right: [], top: [] };
    var order = ["left", "right", "top"];
    projects.slice(1).forEach(function (p, k) {
      zones[order[k % 3]].push({ project: p, index: k + 1 });
    });

    // Zones without occupants collapse so the core block absorbs their space.
    var x0 = zones.left.length ? core.x + bandW : core.x;
    var x1 = zones.right.length ? core.x + core.w - bandW : core.x + core.w;
    var y0 = zones.top.length ? core.y + bandH : core.y;

    out.push({ project: projects[0], index: 0, x: x0, y: y0, w: x1 - x0, h: core.y + core.h - y0 });

    zones.left.forEach(function (o, k) {
      var h = core.h / zones.left.length;
      out.push({ project: o.project, index: o.index, x: core.x, y: core.y + k * h, w: bandW, h: h });
    });
    zones.right.forEach(function (o, k) {
      var h = core.h / zones.right.length;
      out.push({ project: o.project, index: o.index, x: x1, y: core.y + k * h, w: bandW, h: h });
    });
    zones.top.forEach(function (o, k) {
      var w = (x1 - x0) / zones.top.length;
      out.push({ project: o.project, index: o.index, x: x0 + k * w, y: core.y, w: w, h: bandH });
    });
    return out;
  }

  return {
    BINS: BINS,
    esc: esc,
    isLive: isLive,
    blockCode: blockCode,
    floorplan: floorplan
  };
})();
