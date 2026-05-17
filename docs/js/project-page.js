// Shared behavior for every projects/*.html page:
//   1. Wrap each <h2> + following content in a frosted .panel
//   2. Add scrolled state to the sticky top nav
//   3. Auto-build an in-page TOC from each panel's <h2>
//   4. Make figure images click-to-zoom (open full-res in a new tab)

(function () {
  const section = document.querySelector(".project-page main > section");
  if (!section) return;

  // 1. Group h2 + siblings into .panel blocks.
  const kids = Array.from(section.children);
  const out = [];
  let panel = null;
  kids.forEach((el) => {
    if (el.tagName === "H2") {
      panel = document.createElement("div");
      panel.className = "panel";
      out.push(panel);
      panel.appendChild(el);
    } else if (panel) {
      panel.appendChild(el);
    } else {
      out.push(el);
    }
  });
  section.replaceChildren.apply(section, out);

  // 2. Build TOC. Slug each h2, set an id, link to it.
  const panels = section.querySelectorAll(".panel");
  if (panels.length >= 2) {
    const toc = document.createElement("nav");
    toc.className = "page-toc";
    toc.setAttribute("aria-label", "On this page");
    const list = document.createElement("ul");
    panels.forEach((p) => {
      const h2 = p.querySelector("h2");
      if (!h2) return;
      // Strip the injected "NN" prefix when generating slug + TOC label.
      const label = (h2.querySelector(".h2-num")
        ? Array.from(h2.childNodes)
            .filter((n) => !(n.nodeType === 1 && n.classList.contains("h2-num")))
            .map((n) => n.textContent)
            .join("")
        : h2.textContent
      ).trim();
      const slug = label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      h2.id = slug;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + slug;
      a.textContent = label;
      li.appendChild(a);
      list.appendChild(li);
    });
    toc.appendChild(list);
    document.body.appendChild(toc);

    // Active-link tracking: pick the last <h2> whose top has scrolled past
    // a threshold just below the sticky nav. Works for the first section too
    // (an IntersectionObserver band misses h2s sitting above the viewport).
    const headings = Array.from(section.querySelectorAll(".panel > h2[id]"));
    const links = new Map();
    toc.querySelectorAll("a").forEach((a) => links.set(a.getAttribute("href").slice(1), a));
    const setActive = (id) => {
      toc.querySelectorAll("a.active").forEach((x) => x.classList.remove("active"));
      const link = links.get(id);
      if (link) link.classList.add("active");
    };
    const onScroll = () => {
      const threshold = 120; // px from top of viewport (clears the sticky nav)
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top - threshold <= 0) current = h;
        else break;
      }
      if (current) setActive(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  // 3. Click-to-zoom: wrap every figure <img> in a link to its full-res source.
  document.querySelectorAll(".project-page figure img").forEach((img) => {
    if (img.parentElement && img.parentElement.tagName === "A") return;
    const a = document.createElement("a");
    a.href = img.getAttribute("src");
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "img-zoom";
    img.parentNode.insertBefore(a, img);
    a.appendChild(img);
  });
})();

// Sticky nav (frosted bg when scrolled).
(function () {
  const nav = document.querySelector(".top-nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// Footer year.
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
