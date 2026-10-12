import { useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useMagnetic } from "../hooks/useMagnetic.js";
import SplitHeading from "./SplitHeading.jsx";
import { profile } from "../data/resume.js";

export default function Contact() {
  const section = useRef();
  const bodyRef = useRef();
  const emailCta = useMagnetic(0.34);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(bodyRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "expo.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: bodyRef.current, start: "top 85%" },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      <section
        ref={section}
        id="contact"
        className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40"
      >
        <div ref={bodyRef} className="relative mx-auto max-w-[1400px]">
          <div data-tilt className="glass mx-auto max-w-3xl rounded-shell px-7 py-14 md:px-14 md:py-20">
            <SplitHeading className="max-w-3xl text-5xl leading-[1.05] font-bold tracking-[-0.03em] text-ink md:text-6xl lg:text-7xl">
              Get in touch.
            </SplitHeading>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Open to internships, freelance work and collaborations. Send a line
              about what you&apos;re building; I&apos;ll reply.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-10 inline-block max-w-full cursor-pointer border-b-2 border-accent/40 pb-1 text-xl font-medium break-all text-ink transition-colors duration-200 hover:border-accent hover:text-accent-deep md:text-3xl"
            >
              {profile.email}
            </a>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                ref={emailCta}
                href={`mailto:${profile.email}`}
                className="btn-primary inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3 text-[15px] font-semibold will-change-transform"
              >
                <EnvelopeSimple size={17} weight="regular" aria-hidden="true" />
                Email me
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-soft inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold"
              >
                <LinkedinLogo size={17} weight="regular" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-soft inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold"
              >
                <GithubLogo size={17} weight="regular" aria-hidden="true" />
                GitHub
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-faint">
            © 2026 {profile.name}
          </p>
          <p className="font-mono text-xs text-faint">
            {profile.location} · 30.3165° N, 78.0322° E
          </p>
          <p className="font-mono text-xs text-faint">
            React · GSAP · Tailwind
          </p>
        </div>
      </footer>
    </>
  );
}
