import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useMagnetic } from "../hooks/useMagnetic.js";
import { profile } from "../data/resume.js";
import { handleNavLink } from "../lib/glaze.js";

const nowRows = [
  { label: "Building", value: "FlowBoard · Cipher" },
  { label: "Focus", value: "Real-time systems" },
  { label: "Based", value: "Dehradun, India" },
];

export default function Hero() {
  const section = useRef();
  const cardRef = useRef();
  const ctaPrimary = useMagnetic(0.34);
  const ctaSecondary = useMagnetic(0.34);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    let floatTween;
    let onMove = null;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray("[data-hero-line]");

      if (!reduced) {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from("[data-hero-meta]", { opacity: 0, y: 12, duration: 0.6 }, 0.15)
          .from(lines, { yPercent: 115, duration: 1, stagger: 0.12 }, 0.1)
          .from("[data-hero-rule]", { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, 0.55)
          .from("[data-hero-sub]", { opacity: 0, y: 16, duration: 0.7 }, 0.65)
          .from(
            "[data-hero-cta] > *",
            { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 },
            0.8,
          )
          .from(
            cardRef.current,
            { opacity: 0, y: 28, scale: 0.96, duration: 0.9, ease: "power3.out" },
            0.45,
          );

        floatTween = gsap.to(cardRef.current, {
          y: -7,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });

        if (window.matchMedia("(pointer: fine)").matches) {
          const rotX = gsap.quickTo(cardRef.current, "rotationX", {
            duration: 0.55,
            ease: "power3.out",
          });
          const rotY = gsap.quickTo(cardRef.current, "rotationY", {
            duration: 0.55,
            ease: "power3.out",
          });
          const el = section.current;
          onMove = (e) => {
            const r = el.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            rotY(nx * 7);
            rotX(-ny * 5.5);
          };
          el.addEventListener("mousemove", onMove);
        }
      }
    }, section);

    return () => {
      if (onMove) section.current?.removeEventListener("mousemove", onMove);
      floatTween?.kill();
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={section}
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 pt-32 pb-24 md:px-10">
        <div className="mx-auto max-w-[1400px] xl:pr-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div>
              <div
                data-hero-meta
                className="flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                <span className="flex items-center gap-2.5">
                  <span className="ping-dot block h-2 w-2 rounded-full bg-accent" />
                  <span className="label text-ink">Open to internships</span>
                </span>
                <span className="label text-faint">
                  {profile.location} · 30.32°N
                </span>
              </div>

              <h1 className="mt-7 text-[clamp(3.6rem,11vw,7.8rem)] leading-[0.94] font-extrabold tracking-[-0.04em] text-ink">
                <span className="line-mask">
                  <span data-hero-line className="block">
                    Parag
                  </span>
                </span>
                <span className="line-mask">
                  <span data-hero-line className="block">
                    Manwal
                  </span>
                </span>
              </h1>

              <div
                data-hero-rule
                className="mt-8 h-[3px] w-16 origin-left rounded-full bg-accent"
                aria-hidden="true"
              />

              <p
                data-hero-sub
                className="mt-7 max-w-xl text-lg leading-relaxed text-balance text-muted md:text-xl"
              >
                {profile.heroSub}
              </p>

              <div
                data-hero-cta
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  ref={ctaPrimary}
                  href="#work"
                  onClick={(e) => handleNavLink(e, "#work")}
                  className="btn-primary inline-flex cursor-pointer items-center rounded-full px-7 py-3 text-[15px] font-semibold will-change-transform"
                >
                  View work
                </a>
                <a
                  ref={ctaSecondary}
                  href="#contact"
                  onClick={(e) => handleNavLink(e, "#contact")}
                  className="glass-btn glass-soft inline-flex cursor-pointer items-center rounded-full px-7 py-3 text-[15px] font-semibold will-change-transform"
                >
                  Get in touch
                </a>
              </div>
            </div>

            <div className="flex lg:justify-end" style={{ perspective: "1000px" }}>
              <div
                ref={cardRef}
                className="glass w-full max-w-[320px] rounded-shell p-7"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center justify-between">
                  <span className="label text-faint">Now</span>
                  <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
                    <span className="ping-dot block h-2 w-2 rounded-full bg-accent" />
                    Available
                  </span>
                </div>
                <div className="mt-5 space-y-4">
                  {nowRows.map((row) => (
                    <div key={row.label}>
                      <div className="label text-faint">{row.label}</div>
                      <div className="mt-1 text-[15px] font-medium text-ink">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="track-press mt-6 h-[5px] rounded-full">
                  <div className="h-full w-3/4 rounded-full bg-accent/85" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-6 flex items-center gap-3 md:left-10"
        aria-hidden="true"
      >
        <span className="label text-faint">Scroll</span>
        <span className="h-[6px] w-16 overflow-hidden rounded-full track-press">
          <span className="scroll-cue block h-[6px] w-6 rounded-full" />
        </span>
      </div>
    </section>
  );
}
