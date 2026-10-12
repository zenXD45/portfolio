import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import SplitHeading from "./SplitHeading.jsx";
import { facts } from "../data/resume.js";

export default function About() {
  const section = useRef();
  const bodyRef = useRef();
  const factsRef = useRef();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(bodyRef.current, {
        opacity: 0,
        y: 22,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: bodyRef.current, start: "top 85%" },
      });
      gsap.from(factsRef.current.children, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: factsRef.current, start: "top 88%" },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={section} id="about" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SplitHeading className="max-w-3xl text-4xl leading-[1.1] font-bold tracking-[-0.02em] text-balance text-ink md:text-5xl">
          Clean code, real-time systems, continuous learning.
        </SplitHeading>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p
            ref={bodyRef}
            className="max-w-[36rem] text-lg leading-relaxed text-muted lg:col-span-8"
          >
            I&apos;m a BCA student and web developer who builds full-stack
            applications with React and Node.js. My work so far is a real-time
            Kanban board and an end-to-end encrypted chat app: both built around
            WebSockets, server-side logic and getting the details right. I care
            about clean code and scalable architecture, and I spend most of my
            time in JavaScript, Tailwind, MongoDB, AWS and a Linux terminal.
          </p>
        </div>

        <div ref={factsRef} className="mt-16 border-t border-line pt-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {facts.map((f) => (
              <div key={f.label} data-tilt className="neu-raise rounded-card px-5 py-5">
                <div className="font-mono text-2xl font-medium whitespace-nowrap text-ink md:text-4xl">
                  {f.value}
                </div>
                <div className="mt-2 text-sm text-muted">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
