function initializeHeader() {
  const header = document.querySelector(".site-header");
  const menu = header.querySelector(".mobile-menu");
  const trigger = header.querySelector(".menu-toggle");
  const close = menu.querySelector("[data-close-menu]");
  const updateBorder = () =>
    header.toggleAttribute("data-scrolled", window.scrollY > 8);

  updateBorder();
  window.addEventListener("scroll", updateBorder, { passive: true });

  if (typeof menu.showModal === "function") {
    trigger.addEventListener("click", () => {
      menu.showModal();
      trigger.setAttribute("aria-expanded", "true");
      close.focus();
    });
    close.addEventListener("click", () => menu.close());
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a[href]")) menu.close();
    });
    menu.addEventListener("close", () => {
      trigger.setAttribute("aria-expanded", "false");
      if (trigger.getClientRects().length) trigger.focus();
    });
    matchMedia("(min-width: 768px)").addEventListener(
      "change",
      ({ matches }) => {
        if (matches) menu.close();
      },
    );
    menu.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const items = menu.querySelectorAll("button, a[href]");
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  const sections = [...document.querySelectorAll(".editorial-section[id]")];
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const links = header.querySelectorAll("[data-section]");
  const visible = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      const current = sections.findLast((section) => visible.has(section.id));
      for (const link of links) {
        if (link.dataset.section === current?.id)
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    },
    { rootMargin: "-15% 0px -48% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

function initializeContact() {
  const button = document.querySelector("[data-copy-email]");
  if (!button) return;
  const email = document.querySelector(".email-link");
  const feedback = document.querySelector(".copy-feedback");

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email.textContent);
      feedback.textContent = button.dataset.copied;
    } catch {
      const range = document.createRange();
      range.selectNodeContents(email);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      feedback.textContent = button.dataset.copyFallback;
    }
  });
}

function initializeVideos(motion) {
  for (const container of document.querySelectorAll("[data-video-webm]")) {
    let visible = false;
    let paused = false;
    let player;
    let toggle;

    function sync() {
      if (motion.matches) {
        player?.pause();
        player?.remove();
        toggle?.remove();
        player = undefined;
        return;
      }

      if (!player && visible) {
        player = document.createElement("video");
        player.muted = true;
        player.playsInline = true;
        player.loop = true;
        player.preload = "none";
        player.poster =
          container.previousElementSibling.currentSrc ||
          container.dataset.videoPoster;
        player.setAttribute("aria-hidden", "true");
        for (const [format, url] of [
          ["webm", container.dataset.videoWebm],
          ["mp4", container.dataset.videoMp4],
        ]) {
          const source = document.createElement("source");
          source.src = url;
          source.type = `video/${format}`;
          player.append(source);
        }
        player.addEventListener("playing", () =>
          player?.setAttribute("data-playing", "true"),
        );
        player.addEventListener("pause", () =>
          player?.removeAttribute("data-playing"),
        );
        toggle = document.createElement("button");
        toggle.className = "video-toggle";
        toggle.type = "button";
        container.append(player, toggle);
        toggle.addEventListener("click", () => {
          paused = !paused;
          sync();
        });
      }

      if (!player) return;
      toggle.textContent = paused
        ? container.dataset.videoPlay
        : container.dataset.videoPause;
      if (visible && !paused && !document.hidden)
        void player.play().catch(() => {});
      else player.pause();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(container);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
  }
}

function initializeReveal(motion) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!motion.matches && !entry.target.matches(":focus-within")) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 500, easing: "cubic-bezier(.2,.7,.2,1)" },
        );
      }
      observer.unobserve(entry.target);
    }
  });

  for (const element of document.querySelectorAll("[data-reveal]")) {
    if (element.getBoundingClientRect().top >= window.innerHeight)
      observer.observe(element);
  }
}

initializeHeader();
initializeContact();

if ("IntersectionObserver" in window) {
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  initializeVideos(motion);
  initializeReveal(motion);
}

function initializeProjectMap() {
  const map = document.querySelector("[data-project-map]");
  if (!map) return;
  const buttons = [...map.querySelectorAll("[data-map-tech]")];
  const projects = [...map.querySelectorAll("[data-map-project]")];
  const edges = [...map.querySelectorAll("[data-map-edge]")];
  const status = map.querySelector("[data-map-status]");
  const supports = (element, tech) =>
    element.dataset.technologies.split("|").includes(tech);
  let selectedTech = "";
  let hoveredProject = "";
  let focusedProject = "";

  function update() {
    const activeProject = focusedProject || hoveredProject;
    for (const button of buttons) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.mapTech === selectedTech),
      );
    }
    for (const project of projects) {
      const matches = !selectedTech || supports(project, selectedTech);
      project.toggleAttribute(
        "data-muted",
        !matches && project.dataset.mapProject !== activeProject,
      );
      project.toggleAttribute("data-match", Boolean(selectedTech && matches));
    }
    for (const edge of edges) {
      const matches = selectedTech
        ? supports(edge, selectedTech)
        : activeProject &&
          [edge.dataset.from, edge.dataset.to].includes(activeProject);
      edge.toggleAttribute("data-lit", Boolean(matches));
    }
  }

  for (const button of buttons) {
    button.addEventListener("click", () => {
      selectedTech =
        selectedTech === button.dataset.mapTech ? "" : button.dataset.mapTech;
      update();
      const names = projects
        .filter((project) => supports(project, selectedTech))
        .map(
          (project) =>
            project.querySelector(".map-project-name > span").textContent,
        );
      status.textContent = selectedTech
        ? `${status.dataset.matches} ${selectedTech}: ${names.join(", ")}`
        : "";
    });
  }

  for (const project of projects) {
    project.addEventListener("pointerenter", () => {
      hoveredProject = project.dataset.mapProject;
      update();
    });
    project.addEventListener("pointerleave", () => {
      hoveredProject = "";
      update();
    });
    project.addEventListener("focus", () => {
      focusedProject = project.dataset.mapProject;
      update();
    });
    project.addEventListener("blur", () => {
      focusedProject = "";
      update();
    });
  }
}

initializeProjectMap();

for (const link of document.querySelectorAll("[data-language-switch]")) {
  const url = new URL(link.href);
  function syncHash() {
    url.hash = document.getElementById(location.hash.slice(1))
      ? location.hash
      : "";
    link.href = url.href;
  }
  syncHash();
  window.addEventListener("hashchange", syncHash);
}
