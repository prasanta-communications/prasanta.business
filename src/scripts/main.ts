function initNav() {
  const nav = document.querySelector<HTMLElement>(".nav");
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

function initReveals() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll<HTMLElement>(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  /* Hero content is above the fold — show it immediately on load */
  document.querySelectorAll(".hero .reveal, .page-hero .reveal").forEach((el) => {
    requestAnimationFrame(() => el.classList.add("is-visible"));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );

  reveals.forEach((el) => {
    if (el.classList.contains("is-visible")) return;
    if (el.closest(".hero") || el.closest(".page-hero")) return;
    observer.observe(el);
  });
}

function initReadingProgress() {
  const bar = document.querySelector<HTMLElement>(".reading-progress");
  const article = document.querySelector<HTMLElement>(".post-body");
  if (!bar || !article) return;

  let ticking = false;
  const update = () => {
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 1;
    bar.style.transform = `scaleX(${progress})`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", update);
  update();
}

initNav();
initReveals();
initReadingProgress();
