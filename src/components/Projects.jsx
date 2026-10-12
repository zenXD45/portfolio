import { useLayoutEffect, useRef } from "react";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useMagnetic } from "../hooks/useMagnetic.js";
import SplitHeading from "./SplitHeading.jsx";
import { projects, profile } from "../data/resume.js";

function ProjectCard({ project, vertical }) {
  return (
    <article
      data-tilt
      className={
        vertical
          ? "slab mx-auto w-full max-w-3xl rounded-shell p-7"
          : "slab w-full shrink-0 rounded-shell p-7 md:max-h-[82vh] md:w-[76vw] md:overflow-y-auto md:p-10 lg:w-[70vw]"
      }
    >
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col">
          <h3 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 text-base text-muted">{project.tagline}</p>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((t) => (
              <li
                key={t}
                className="chip rounded-full px-3 py-1 font-mono text-xs text-ink"
              >
                {t}
              </li>
            ))}
          </ul>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent-deep"
          >
            <GithubLogo size={17} weight="regular" aria-hidden="true" />
            View source
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="border-t border-line pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-12">
          <p className="label text-faint">Highlights</p>
          <ul className="mt-4 space-y-4">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const wrap = useRef();
  const track = useRef();
  const progress = useRef();
  const githubCta = useMagnetic(0.38);
  const reduced = usePrefersReducedMotion();
  const vertical = reduced;

  useLayoutEffect(() => {
    if (vertical) return undefined;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const distance = () =>
        Math.max(0, track.current.scrollWidth - window.innerWidth);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track.current, { x: () => -distance(), ease: "none" }, 0).fromTo(
        progress.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none" },
        0,
      );
    });
    return () => mm.revert();
  }, [vertical]);

  return (
    <section ref={wrap} id="work" className="relative overflow-hidden">
      <div
        ref={track}
        className={`relative z-10 flex flex-col gap-8 px-6 py-24 md:px-10 ${
          vertical
            ? ""
            : "md:h-[100dvh] md:flex-row md:items-center md:gap-10 md:py-0"
        }`}
      >
        <div
          className={
            vertical
              ? "mx-auto w-full max-w-3xl"
              : "w-full shrink-0 md:w-[42vw] md:max-w-md"
          }
        >
          <SplitHeading className="text-4xl leading-[1.08] font-bold tracking-[-0.02em] text-ink md:text-5xl">
            Two products, built end to end.
          </SplitHeading>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Full-stack products with real-time cores: built for daily use, not
            for demos.
          </p>
          <p
            className={`label mt-8 items-center gap-2 text-faint ${
              vertical ? "hidden" : "hidden md:flex"
            }`}
          >
            Keep scrolling
            <ArrowRight size={14} aria-hidden="true" />
          </p>
        </div>

        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} vertical={vertical} />
        ))}

        <div
          data-tilt
          className={
            vertical
              ? "slab mx-auto flex w-full max-w-3xl flex-col justify-center rounded-shell p-7"
              : "slab flex w-full shrink-0 flex-col justify-center rounded-shell p-7 md:w-[46vw] md:max-w-lg md:p-10"
          }
        >
          <span className="inline-flex w-fit rounded-2xl bg-accent/[0.08] p-3">
            <GithubLogo size={28} className="text-accent-deep" weight="regular" aria-hidden="true" />
          </span>
          <p className="mt-5 text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Side projects and open-source work live on GitHub.
          </p>
          <a
            ref={githubCta}
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold will-change-transform"
          >
            View GitHub
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {!vertical && (
        <div
          className="track-press absolute right-10 bottom-10 left-10 z-20 hidden h-[6px] overflow-hidden rounded-full md:block"
          aria-hidden="true"
        >
          <div
            ref={progress}
            className="h-full w-full origin-left rounded-full bg-accent"
          />
        </div>
      )}
    </section>
  );
}
