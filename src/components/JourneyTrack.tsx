import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

/** Vertical timeline whose line "fills" as you scroll through the journey. */
export default function JourneyTrack({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(9rem+7px)]" />
      <motion.div
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent md:left-[calc(9rem+7px)]"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
      {children}
    </div>
  );
}
