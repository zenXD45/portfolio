import { gsap } from "./gsap.js";

let busy = false;

export function runGlaze(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.scrollIntoView();
    window.history.replaceState(null, "", hash);
    return;
  }

  if (busy) return;
  const sheet = document.getElementById("glaze-sheet");
  if (!sheet) {
    target.scrollIntoView();
    window.history.replaceState(null, "", hash);
    return;
  }

  busy = true;
  sheet.style.translate = "none";
  const top = target.getBoundingClientRect().top + window.scrollY;

  gsap
    .timeline({
      onComplete: () => {
        busy = false;
      },
    })
    .fromTo(
      sheet,
      { x: 0, xPercent: 105 },
      { x: 0, xPercent: 0, duration: 0.45, ease: "power3.inOut" },
    )
    .add(() => {
      window.scrollTo({ top, behavior: "instant" });
      window.history.replaceState(null, "", hash);
    })
    .to(sheet, { x: 0, xPercent: -105, duration: 0.55, ease: "power3.inOut" }, "+=0.05");
}

export function handleNavLink(e, hash) {
  if (
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    e.button !== 0
  ) {
    return;
  }
  e.preventDefault();
  runGlaze(hash);
}
