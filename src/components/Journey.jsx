import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import SplitHeading from "./SplitHeading.jsx";
import { experience } from "../data/resume.js";

export default function Journey() {
  const section = useRef();
  const lineRef = useRef();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: section.current.querySelector("[data-track]"),
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        },
      );
      gsap.utils.toArray(section.current.querySelectorAll("[data-entry]")).forEach(
        (el) => {
          gsap.from(el, {
            opacity: 0,
            y: 26,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        },
      );
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={section} id="journey" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SplitHeading className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-[-0.02em] text-ink md:text-5xl">
          Experience &amp; education
        </SplitHeading>

        <div data-track className="relative mt-14 md:mt-20">
          <div
            className="track-press absolute top-2 bottom-2 left-[6px] w-[5px] rounded-full"
            aria-hidden="true"
          />
          <div
            ref={lineRef}
            className="absolute top-2 bottom-2 left-[6px] w-[5px] rounded-full bg-accent"
            aria-hidden="true"
          />

          <div className="space-y-14 pl-10 md:space-y-20 md:pl-14">
            {experience.map((item) => (
              <article
                key={item.title}
                data-entry
                className="relative grid gap-3 md:grid-cols-[220px_1fr] md:gap-10"
              >
                <span
                  className="neu-raise absolute -top-1.5 -left-10 flex h-5 w-5 items-center justify-center rounded-full md:-left-14"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <div className="font-mono text-xs tracking-wider text-faint uppercase md:pt-1.5">
                  {item.date}
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent-deep md:text-base">
                    {item.org}
                  </p>
                  <ul className="mt-4 max-w-[65ch] space-y-2.5">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-sm leading-relaxed text-muted md:text-base"
                      >
                        <span
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-faint"
                          aria-hidden="true"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
