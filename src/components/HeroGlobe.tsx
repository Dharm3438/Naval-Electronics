"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/** Seconds of footage scrubbed per pixel dragged. */
const SCRUB_RATE = 0.018;

/**
 * The rotating solar-panel Earth from the hero poster.
 *
 * The spin is a short, seamlessly looping clip (`site.heroGlobe.video`)
 * masked to a circle so it melts into the hero background. On top of that:
 *  - the globe tilts towards the pointer (parallax),
 *  - it can be grabbed and dragged sideways to spin it by hand,
 *  - playback pauses while the hero is off-screen or the tab is hidden,
 *  - with `prefers-reduced-motion` it stays a still image.
 */
export default function HeroGlobe() {
  const { video: videoSrc, poster, alt } = site.heroGlobe;
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const drag = useRef<{ x: number; t: number } | null>(null);
  const visible = useRef(false);
  const [ready, setReady] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [touched, setTouched] = useState(false);

  // Play only while on screen; respect reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    const stage = stageRef.current;
    if (!v || !stage) return;
    v.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      if (visible.current && !document.hidden && !reduce.matches && !drag.current) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      sync();
    });
    io.observe(stage);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  const setTilt = (x: number, y: number) => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 14).toFixed(2)}deg`);
    el.style.setProperty("--shift-x", `${(x * 10).toFixed(1)}px`);
    el.style.setProperty("--shift-y", `${(y * 10).toFixed(1)}px`);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    if (e.pointerType === "mouse") setTilt(x, y);

    const v = videoRef.current;
    if (drag.current && v && Number.isFinite(v.duration)) {
      const d = v.duration;
      const t = drag.current.t + (e.clientX - drag.current.x) * SCRUB_RATE;
      v.currentTime = ((t % d) + d) % d;
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, t: v.currentTime };
    v.pause();
    setGrabbing(true);
    setTouched(true);
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setGrabbing(false);
    const v = videoRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (v && visible.current && !reduce) v.play().catch(() => {});
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => setTilt(0, 0)}
      className={`group relative mx-auto aspect-square w-full max-w-[12.5rem] select-none touch-pan-y [perspective:1200px] sm:max-w-[26rem] lg:max-w-[36rem] ${
        grabbing ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Concentric halo rings */}
      <span aria-hidden className="pointer-events-none absolute -inset-[9%] rounded-full border border-leaf/10" />
      <span aria-hidden className="pointer-events-none absolute -inset-[2%] rounded-full border border-leaf/15" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(11,143,91,0.18)_0%,rgba(11,143,91,0.06)_55%,transparent_72%)] blur-2xl"
      />

      <div
        ref={tiltRef}
        className="animate-float relative h-full w-full [--shift-x:0px] [--shift-y:0px] [--tilt-x:0deg] [--tilt-y:0deg]"
      >
        <div
          role="img"
          aria-label={alt}
          className="relative h-full w-full transition-transform duration-500 ease-out [transform:translate3d(var(--shift-x),var(--shift-y),0)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))] [transform-style:preserve-3d]"
        >
          {/* Still poster: shows instantly, and stays for reduced motion. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            fetchPriority="high"
            draggable={false}
            className={`globe-mask absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-0" : "opacity-100"
            }`}
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
            onPlaying={() => setReady(true)}
            className={`globe-mask absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Soft specular highlight that follows the tilt */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.28),transparent_45%)] mix-blend-screen"
          />
        </div>

        {/* Orbit ring with a travelling light streak */}
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          className="pointer-events-none absolute inset-[-6%] h-[112%] w-[112%] overflow-visible"
        >
          <defs>
            <linearGradient id="orbit-glow" x1="0" x2="1">
              <stop offset="0" stopColor="#0b8f5b" stopOpacity="0" />
              <stop offset="0.5" stopColor="#7ee2a8" stopOpacity="1" />
              <stop offset="1" stopColor="#fde68a" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <g transform="rotate(-14 200 200)">
            <ellipse cx="200" cy="200" rx="196" ry="46" fill="none" stroke="#0b8f5b" strokeOpacity="0.18" strokeWidth="1" />
            <ellipse
              cx="200"
              cy="200"
              rx="196"
              ry="46"
              fill="none"
              stroke="url(#orbit-glow)"
              strokeWidth="2.25"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="18 82"
              className="animate-orbit"
            />
          </g>
        </svg>
      </div>

      {/* Interaction hint */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-[4%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-forest/70 shadow-sm ring-1 ring-leaf/15 backdrop-blur transition-opacity duration-500 ${
          touched ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        Drag to spin the Earth
      </span>
    </div>
  );
}
