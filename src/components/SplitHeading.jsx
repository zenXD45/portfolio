import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

export default function SplitHeading({
  children,
  className,
  splitBy = "words",
  start = "top 85%",
  ...rest
}) {
  const el = useRef();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    let split;
    const ctx = gsap.context(() => {
      split = new SplitText(el.current, { type: splitBy });
      const parts = splitBy === "chars" ? split.chars : split.words;
      gsap.from(parts, {
        opacity: 0,
        y: splitBy === "chars" ? 24 : 18,
        duration: 0.75,
        stagger: 0.03,
        ease: "expo.out",
        scrollTrigger: { trigger: el.current, start },
      });
    }, el);
    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [reduced, splitBy, start]);

  return (
    <h2 ref={el} className={className} {...rest}>
      {children}
    </h2>
  );
}
