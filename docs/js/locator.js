// Draws the mini "you are here" die on a project page: the same floorplan
// tiling as the homepage, with the current project's block filled and the
// rest ghosted. Requires js/projects.js and js/plan-lib.js.

(function () {
  "use strict";

  var lib = window.PlanLib;
  var projects = window.PROJECTS || [];
  var root = document.getElementById("plan-locator");
  if (!lib || !root || !projects.length) return;

  var slug = (window.location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  var current = projects.filter(function (p) { return p.slug === slug; })[0];
  if (!current) return;

  var VB_W = 560, VB_H = 440;
  var CORE = { x: 34, y: 34, w: VB_W - 68, h: VB_H - 68 };
  var CHANNEL = 8;

  var placed = lib.floorplan(projects, CORE);

  var svg = [
    '<svg class="locator-svg" viewBox="0 0 ' + VB_W + " " + VB_H + '" aria-hidden="true">',
    '<rect x="2" y="2" width="' + (VB_W - 4) + '" height="' + (VB_H - 4) + '" fill="#dde1d6" stroke="#22262a" stroke-width="4"/>'
  ];

  placed.forEach(function (b) {
    var x = (b.x + CHANNEL / 2).toFixed(1), y = (b.y + CHANNEL / 2).toFixed(1);
    var w = (b.w - CHANNEL).toFixed(1), h = (b.h - CHANNEL).toFixed(1);
    var p = b.project;
    if (p.slug === slug) {
      var bin = lib.BINS[b.index % lib.BINS.length];
      svg.push(
        '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + bin +
        '" stroke="#22262a" stroke-width="4"/>'
      );
    } else {
      svg.push('<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#cfd4c6"/>');
    }
  });

  svg.push("</svg>");
  root.innerHTML = svg.join("");
})();
