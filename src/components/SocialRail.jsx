import { useEffect, useState } from "react";
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { profile } from "../data/resume.js";

const links = [
  { label: "GitHub", href: profile.github, Icon: GithubLogo, external: true },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinLogo, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: EnvelopeSimple, external: false },
];

export default function SocialRail() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const work = document.getElementById("work");
    if (!work || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => setPinned(entry.isIntersecting), {
      threshold: 0.04,
    });
    io.observe(work);
    return () => io.disconnect();
  }, []);

  return (
    <aside
      aria-label="Social links"
      className={`fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col gap-3 transition-opacity duration-300 ease-out-quint xl:flex motion-reduce:transition-none ${
        pinned ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {links.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={label}
          className="glass-soft glass-btn flex h-11 w-11 items-center justify-center rounded-full text-ink"
        >
          <Icon size={19} weight="regular" aria-hidden="true" />
        </a>
      ))}
    </aside>
  );
}
