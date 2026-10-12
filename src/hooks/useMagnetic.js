import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

export function useMagnetic(strength = 0.32) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * strength,
        y: (e.clientY - (r.top + r.height / 2)) * strength,
        scale: 1.03,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "elastic.out(1, 0.35)",
        overwrite: "auto",
      });
    };
    const onDown = () => {
      gsap.to(el, {
        scale: 0.96,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const onUp = () => {
      gsap.to(el, {
        scale: 1.03,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [reduced, strength]);

  return ref;
}
