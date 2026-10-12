import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { List, X, DownloadSimple } from "@phosphor-icons/react";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
import { handleNavLink } from "../lib/glaze.js";

const links = [
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
];

function Monogram() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-8 w-8 shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 48V16h13.2c6.4 0 10.7 3.9 10.7 9.8s-4.3 9.8-10.7 9.8H19.4V48H12Zm7.4-15.2h5.4c2.7 0 4.5-1.5 4.5-4.1s-1.8-4.1-4.5-4.1h-5.4v8.2Z"
        fill="#17191e"
      />
      <path
        d="M39.5 48V16h6.8l4.1 13.4L54.7 16h6.7v32h-6.6V29.8l-4.3 12.7h-3.2l-4.2-12.7V48h-3.6Z"
        fill="#17191e"
      />
    </svg>
  );
}

export default function Nav() {
  const barRef = useRef();
  const navRef = useRef();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.from("header", {
          y: -40,
          opacity: 0,
          duration: 1,
          delay: 0.08,
          ease: "power4.out",
          clearProps: "transform,opacity",
        });
      }
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.3,
          },
        },
      );
      let last = window.scrollY;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          const goingDown = y > last && y > 140;
          if (!open) {
            navRef.current.style.transform = goingDown
              ? "translateY(calc(-100% - 1.5rem))"
              : "translateY(0)";
          }
          last = y;
        },
      });
    });
    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    const sections = ["#work", "#journey", "#skills", "#contact"]
      .map((h) => document.querySelector(h))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const onNavClick = (e, href) => {
    setOpen(false);
    handleNavLink(e, href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div ref={navRef} className="mx-auto max-w-[1080px] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <div className="glass relative rounded-full">
          <div className="flex h-16 items-center justify-between px-5 md:h-[68px] md:px-7">
            <a
              href="#top"
              onClick={(e) => onNavClick(e, "#top")}
              className="flex cursor-pointer items-center gap-3"
              aria-label="Parag Manwal home"
            >
              <Monogram />
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                Parag Manwal
              </span>
            </a>

            <nav
              className="hidden items-center gap-1.5 md:flex"
              aria-label="Primary"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href)}
                  aria-current={active === l.href ? "true" : undefined}
                  className={`cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    active === l.href
                      ? "bg-white/85 text-ink shadow-[0_1px_2px_rgba(23,25,30,0.06),0_4px_12px_rgba(174,186,205,0.35)]"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
              >
                <DownloadSimple aria-hidden="true" size={16} weight="regular" />
                Résumé
              </a>
              <a
                href="#contact"
                onClick={(e) => onNavClick(e, "#contact")}
                className="btn-primary ml-1 inline-flex cursor-pointer items-center rounded-full px-5 py-2 text-sm font-semibold"
              >
                Contact
              </a>
            </nav>

            <button
              type="button"
              className="glass-btn cursor-pointer rounded-full p-2 text-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
          <div
            className="track-press absolute right-6 bottom-[6px] left-6 h-[4px] overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <div
              ref={barRef}
              className="h-full w-full origin-left rounded-full bg-accent/80"
            />
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="glass mt-3 rounded-[24px] md:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className="cursor-pointer py-2.5 font-medium text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex cursor-pointer items-center gap-2 py-2.5 font-medium text-ink"
            >
              <DownloadSimple aria-hidden="true" size={16} weight="regular" />
              Résumé
            </a>
            <a
              href="#contact"
              onClick={(e) => onNavClick(e, "#contact")}
              className="btn-primary mt-2 inline-flex w-fit cursor-pointer items-center rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
