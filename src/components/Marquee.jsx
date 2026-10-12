import { useLayoutEffect, useRef } from "react";
import { Asterisk } from "@phosphor-icons/react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { marqueeItems } from "../data/resume.js";

function Row({ hidden }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden ? "true" : undefined}
    >
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-10 pr-10">
          <span className="label whitespace-nowrap text-faint">{item}</span>
          <Asterisk
            size={13}
            className="text-accent-deep"
            weight="bold"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const section = useRef();
  const track = useRef();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    let tween;
    let hovered = false;
    let timeScale = 1;
    let lastY = window.scrollY;
    let listeners = null;
    const ctx = gsap.context(() => {
      tween = gsap.to(track.current, {
        xPercent: -50,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      const el = section.current;
      const onEnter = () => {
        hovered = true;
      };
      const onLeave = () => {
        hovered = false;
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      listeners = { el, onEnter, onLeave };

      const tick = () => {
        const y = window.scrollY;
        const dy = y - lastY;
        lastY = y;
        const target = hovered
          ? 0
          : gsap.utils.clamp(-2, 5, 1 + dy * 0.05);
        timeScale += (target - timeScale) * 0.07;
        tween.timeScale(timeScale);
      };
      gsap.ticker.add(tick);
      listeners.tick = tick;
    }, section);
    return () => {
      if (listeners) {
        listeners.el.removeEventListener("mouseenter", listeners.onEnter);
        listeners.el.removeEventListener("mouseleave", listeners.onLeave);
        if (listeners.tick) gsap.ticker.remove(listeners.tick);
      }
      tween?.kill();
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={section}
      aria-label="Technology stack"
      className="overflow-hidden border-y border-line py-5"
    >
      <div
        ref={track}
        className={reduced ? "flex flex-wrap gap-x-10 gap-y-3 px-6" : "flex w-max"}
      >
        <Row />
        {!reduced && <Row hidden />}
      </div>
    </section>
  );
}
