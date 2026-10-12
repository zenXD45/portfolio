export function initTilt() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
  if (!window.matchMedia("(pointer: fine)").matches) return undefined;

  const reset = (el) => {
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  const onMove = (e) => {
    const el = e.target instanceof Element ? e.target.closest("[data-tilt]") : null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--tilt-y", `${((px - 0.5) * 6).toFixed(2)}deg`);
    el.style.setProperty("--tilt-x", `${((0.5 - py) * 5).toFixed(2)}deg`);
    el.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
  };

  const onOut = (e) => {
    const el = e.target instanceof Element ? e.target.closest("[data-tilt]") : null;
    if (el && !el.contains(e.relatedTarget)) reset(el);
  };

  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerout", onOut, { passive: true });

  return () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
  };
}
