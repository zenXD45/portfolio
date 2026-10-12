import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import SplitHeading from "./SplitHeading.jsx";
import { skillGroups } from "../data/resume.js";

export default function Skills() {
  const section = useRef();
  const gridRef = useRef();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "expo.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={section} id="skills" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px] xl:pr-20">
        <SplitHeading className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-[-0.02em] text-ink md:text-5xl">
          The tools I build with every day.
        </SplitHeading>

        <div
          ref={gridRef}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {skillGroups.map((group) => (
            <div key={group.label} data-tilt className="slab rounded-card p-6">
              <h3 className="flex items-center gap-2 font-mono text-xs tracking-wider text-faint uppercase">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {group.label}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="chip cursor-default rounded-full px-3 py-1.5 text-sm text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
