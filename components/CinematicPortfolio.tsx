"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Blog from "@/components/Blog";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Goals from "@/components/Goals";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

const SCENES = [
  { id: "scene-hero", anchorId: "hero", node: <Hero /> },
  { id: "scene-about", anchorId: "about", node: <About /> },
  { id: "scene-skills", anchorId: "skills", node: <Skills /> },
  { id: "scene-projects", anchorId: "projects", node: <Projects /> },
  { id: "scene-blog", anchorId: "blog", node: <Blog /> },
  { id: "scene-experience", anchorId: "experience", node: <Experience /> },
  {
    id: "scene-achievements",
    anchorId: "achievements",
    node: <Achievements />,
  },
  { id: "scene-goals", anchorId: "goals", node: <Goals /> },
  {
    id: "scene-certifications",
    anchorId: "certifications",
    node: <Certifications />,
  },
  { id: "scene-contact", anchorId: "contact", node: <Contact /> },
];

// One-step maze route for smoother directional transitions.
const MAZE_COORDS: Array<{ x: number; y: number }> = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: 0, y: -2 },
  { x: 1, y: -2 },
  { x: 2, y: -2 },
  { x: 2, y: -1 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
];

export default function CinematicPortfolio() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLElement | null>(null);
  const [isMobilePerf, setIsMobilePerf] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const onChange = () => setIsMobilePerf(mq.matches);

    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const lowPerfMode = isMobilePerf;

  const totalScenes = SCENES.length;
  const totalScrollVh = totalScenes * (lowPerfMode ? 185 : 240);
  const gridStep = lowPerfMode ? 150 : 165;

  const minX = Math.min(...MAZE_COORDS.map((p) => p.x));
  const maxX = Math.max(...MAZE_COORDS.map((p) => p.x));
  const minY = Math.min(...MAZE_COORDS.map((p) => p.y));
  const maxY = Math.max(...MAZE_COORDS.map((p) => p.y));

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Route completes early, then hard-locks final frame for stable centering.
  const routedProgress = useTransform(
    scrollYProgress,
    [0, 0.88, 1],
    [0, 1, 1],
  );

  const cameraXStops = MAZE_COORDS.map((p) => -(p.x - minX) * gridStep);
  const cameraYStops = MAZE_COORDS.map((p) => -(p.y - minY) * gridStep);

  // Hold at each scene center before transitioning to next scene.
  const totalSegments = SCENES.length - 1;
  const segmentSize = 1 / totalSegments;
  const holdRatio = 0.5;

  const timelineInput: number[] = [0];
  const timelineX: number[] = [cameraXStops[0]];
  const timelineY: number[] = [cameraYStops[0]];

  for (let i = 0; i < totalSegments; i++) {
    const start = i * segmentSize;
    const holdEnd = start + segmentSize * holdRatio;
    const next = (i + 1) * segmentSize;

    timelineInput.push(holdEnd, next);
    timelineX.push(cameraXStops[i], cameraXStops[i + 1]);
    timelineY.push(cameraYStops[i], cameraYStops[i + 1]);
  }

  timelineInput[timelineInput.length - 1] = 1;
  timelineX[timelineX.length - 1] = cameraXStops[cameraXStops.length - 1];
  timelineY[timelineY.length - 1] = cameraYStops[cameraYStops.length - 1];

  const rawCameraX = useTransform(routedProgress, timelineInput, timelineX);
  const rawCameraY = useTransform(routedProgress, timelineInput, timelineY);

  // Build per-segment direction vectors so decorative layers can flow with scene movement.
  const directionInput: number[] = [0];
  const directionXValues: number[] = [];
  const directionYValues: number[] = [];
  const directionAngleValues: number[] = [];

  for (let i = 0; i < totalSegments; i++) {
    const start = i * segmentSize;
    const holdEnd = start + segmentSize * holdRatio;
    const next = (i + 1) * segmentSize;

    const dx = MAZE_COORDS[i + 1].x - MAZE_COORDS[i].x;
    const dy = MAZE_COORDS[i + 1].y - MAZE_COORDS[i].y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    if (i === 0) {
      directionXValues.push(dx);
      directionYValues.push(dy);
      directionAngleValues.push(angle);
      directionInput.push(holdEnd, next);
      directionXValues.push(dx, dx);
      directionYValues.push(dy, dy);
      directionAngleValues.push(angle, angle);
      continue;
    }

    directionInput.push(start, holdEnd, next);
    directionXValues.push(dx, dx, dx);
    directionYValues.push(dy, dy, dy);
    directionAngleValues.push(angle, angle, angle);
  }

  directionInput[directionInput.length - 1] = 1;

  const directionX = useTransform(routedProgress, directionInput, directionXValues);
  const directionY = useTransform(routedProgress, directionInput, directionYValues);
  const directionAngle = useTransform(
    routedProgress,
    directionInput,
    directionAngleValues,
  );

  // Add a pulse around each segment boundary to animate turns.
  const turnPulseInput: number[] = [0];
  const turnPulseOutput: number[] = [0];

  for (let i = 1; i < totalSegments; i++) {
    const center = i * segmentSize;
    const lead = Math.max(0, center - segmentSize * 0.16);
    const trail = Math.min(1, center + segmentSize * 0.16);

    turnPulseInput.push(lead, center, trail);
    turnPulseOutput.push(0, 1, 0);
  }

  if (turnPulseInput[turnPulseInput.length - 1] !== 1) {
    turnPulseInput.push(1);
    turnPulseOutput.push(0);
  }

  const turnPulse = useTransform(routedProgress, turnPulseInput, turnPulseOutput);
  const smoothDirectionAngle = useSpring(directionAngle, {
    stiffness: 290,
    damping: 28,
    mass: 0.45,
  });

  const smoothTurnPulse = useSpring(turnPulse, {
    stiffness: 220,
    damping: 24,
    mass: 0.42,
  });

  const smoothCameraX = useSpring(rawCameraX, {
    stiffness: 54,
    damping: 34,
    mass: 0.92,
  });

  const smoothCameraY = useSpring(rawCameraY, {
    stiffness: 54,
    damping: 34,
    mass: 0.92,
  });

  const trackX = useMotionTemplate`${smoothCameraX}vw`;
  const trackY = useMotionTemplate`${smoothCameraY}vh`;

  const trackScale = useTransform(
    routedProgress,
    [0, 0.08, 1],
    lowPerfMode ? [0.995, 1, 1] : [0.985, 1, 1],
  );

  const smoothScale = useSpring(trackScale, {
    stiffness: 90,
    damping: 30,
    mass: 0.55,
  });

  const layer1XValue = useTransform(smoothCameraX, (v) => v * 0.18);
  const layer2XValue = useTransform(smoothCameraX, (v) => v * 0.34);
  const layer3XValue = useTransform(smoothCameraX, (v) => v * 0.55);

  const layer1YValue = useTransform(smoothCameraY, (v) => v * 0.12);
  const layer2YValue = useTransform(smoothCameraY, (v) => v * 0.18);
  const layer3YValue = useTransform(smoothCameraY, (v) => v * 0.24);

  const bgLayer1X = useMotionTemplate`${layer1XValue}vw`;
  const bgLayer2X = useMotionTemplate`${layer2XValue}vw`;
  const bgLayer3X = useMotionTemplate`${layer3XValue}vw`;

  const bgLayer1Y = useMotionTemplate`${layer1YValue}vh`;
  const bgLayer2Y = useMotionTemplate`${layer2YValue}vh`;
  const bgLayer3Y = useMotionTemplate`${layer3YValue}vh`;

  const minCameraX = Math.min(...cameraXStops);
  const maxCameraX = Math.max(...cameraXStops);
  const minCameraY = Math.min(...cameraYStops);
  const maxCameraY = Math.max(...cameraYStops);

  const wormXValue = useTransform(smoothCameraX, (v) => {
    if (maxCameraX === minCameraX) {
      return 50;
    }

    const t = (v - minCameraX) / (maxCameraX - minCameraX);
    return 14 + t * 68;
  });

  const wormYValue = useTransform(smoothCameraY, (v) => {
    if (maxCameraY === minCameraY) {
      return 50;
    }

    const t = (v - minCameraY) / (maxCameraY - minCameraY);
    return 16 + t * 62;
  });

  const wormX = useMotionTemplate`${wormXValue}vw`;
  const wormY = useMotionTemplate`${wormYValue}vh`;
  const wormRotate = useMotionTemplate`${smoothDirectionAngle}deg`;

  const wormLength = useTransform(
    routedProgress,
    [0, 0.16, 0.42, 0.7, 1],
    lowPerfMode ? [88, 150, 220, 300, 380] : [120, 220, 360, 520, 700],
  );
  const wormLengthPx = useMotionTemplate`${wormLength}px`;
  const wormHalfLengthPx = useMotionTemplate`${useTransform(wormLength, (v) => -v / 2)}px`;
  const wormBodyWidthPx = useMotionTemplate`${useTransform(wormLength, (v) => Math.max(64, v - 92))}px`;
  const wormHeadLeftPx = useMotionTemplate`${useTransform(wormLength, (v) => Math.max(40, v - 112))}px`;
  const wormTailPrimaryWidthPx = useMotionTemplate`${useTransform(wormLength, (v) => Math.max(34, v * 0.18))}px`;
  const wormTailSecondaryWidthPx = useMotionTemplate`${useTransform(wormLength, (v) => Math.max(22, v * 0.13))}px`;
  const wormTailTertiaryWidthPx = useMotionTemplate`${useTransform(wormLength, (v) => Math.max(14, v * 0.09))}px`;
  const wormTailOffset1Px = useMotionTemplate`${useTransform(wormLength, (v) => -(Math.max(34, v * 0.18) * 0.9))}px`;
  const wormTailOffset2Px = useMotionTemplate`${useTransform(wormLength, (v) => -(Math.max(34, v * 0.18) * 1.72))}px`;
  const wormTailOffset3Px = useMotionTemplate`${useTransform(wormLength, (v) => -(Math.max(34, v * 0.18) * 2.4))}px`;

  const wormStretchX = useTransform(directionX, (v) => 1 + Math.abs(v) * 0.16);
  const wormStretchY = useTransform(directionY, (v) => 1 + Math.abs(v) * 0.16);
  const wormBreath = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.04, 0.98]);
  const wormTurnScale = useTransform(
    smoothTurnPulse,
    [0, 1],
    lowPerfMode ? [1, 1.08] : [1, 1.16],
  );
  const wormTurnGlow = useTransform(
    smoothTurnPulse,
    [0, 1],
    lowPerfMode ? [1, 1.2] : [1, 1.65],
  );
  const wormTurnHeadScale = useTransform(
    smoothTurnPulse,
    [0, 1],
    lowPerfMode ? [1, 1.06] : [1, 1.12],
  );
  const wormTurnTailFade = useTransform(
    smoothTurnPulse,
    [0, 1],
    lowPerfMode ? [1, 0.82] : [1, 0.72],
  );

  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.08, 0.2, 0.1],
  );

  const horizontalTrack = (
    <section
      ref={trackRef}
      className="relative"
      style={{ height: `${totalScrollVh}vh` }}
    >
      {SCENES.map((scene, index) => (
        <div
          key={`${scene.anchorId}-anchor`}
          id={scene.anchorId}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 w-px"
          style={{ top: `${index * 100}vh`, height: "1px" }}
        />
      ))}

      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            x: bgLayer1X,
            y: bgLayer1Y,
            width: `${totalScenes * 150}vw`,
            height: `${(maxY - minY + 2) * 100}vh`,
            left: "-40vw",
            top: "-40vh",
            background:
              "linear-gradient(90deg, #02131e 0%, #03283a 18%, #053b58 34%, #02111f 52%, #003b4f 70%, #06192a 86%, #03263a 100%)",
          }}
        />

        {!lowPerfMode && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0"
            style={{
              x: bgLayer2X,
              y: bgLayer2Y,
              width: `${totalScenes * 140}vw`,
              height: `${(maxY - minY + 2) * 100}vh`,
              left: "-45vw",
              top: "-45vh",
              opacity: 0.72,
              background:
                "radial-gradient(circle at 16% 25%, rgba(0,191,255,0.24), transparent 24%), radial-gradient(circle at 38% 68%, rgba(0,145,255,0.18), transparent 28%), radial-gradient(circle at 67% 34%, rgba(0,191,255,0.2), transparent 26%), radial-gradient(circle at 89% 70%, rgba(0,136,255,0.16), transparent 32%)",
            }}
          />
        )}

        {!lowPerfMode && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0"
            style={{
              x: bgLayer3X,
              y: bgLayer3Y,
              width: `${totalScenes * 160}vw`,
              height: `${(maxY - minY + 2) * 100}vh`,
              left: "-50vw",
              top: "-50vh",
              opacity: 0.34,
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "90px 90px",
            }}
          />
        )}

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: vignetteOpacity,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.24) 0%, transparent 28%, transparent 74%, rgba(0,0,0,0.28) 100%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            x: wormX,
            y: wormY,
            rotate: wormRotate,
            scale: wormTurnScale,
            width: wormLengthPx,
            height: "70px",
            marginLeft: wormHalfLengthPx,
            marginTop: "-35px",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ scale: wormBreath, scaleX: wormStretchX, scaleY: wormStretchY }}
          >
            <motion.div
              className="absolute left-0 top-1/2 h-9 -translate-y-1/2 rounded-full"
              style={{
                width: wormBodyWidthPx,
                scaleY: wormTurnGlow,
                background:
                  "linear-gradient(90deg, rgba(24,98,244,0.96) 0%, rgba(0,191,255,0.98) 44%, rgba(98,231,255,1) 74%, rgba(186,246,255,0.94) 100%)",
                boxShadow:
                  lowPerfMode
                    ? "0 0 0 1px rgba(150,238,255,0.24), 0 0 18px rgba(0,170,255,0.34)"
                    : "0 0 0 1px rgba(150,238,255,0.32), 0 0 34px rgba(0,170,255,0.52)",
              }}
            />

            {!lowPerfMode && (
              <motion.div
                className="absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full"
                style={{
                  width: wormBodyWidthPx,
                  opacity: 0.58,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(186,242,255,0.66) 52%, rgba(255,255,255,0.08) 100%)",
                  filter: "blur(0.6px)",
                }}
              />
            )}

            <motion.div
              className="absolute top-1/2 h-0 w-0 -translate-y-1/2"
              style={{
                left: wormHeadLeftPx,
                scale: wormTurnHeadScale,
                borderTop: "22px solid transparent",
                borderBottom: "22px solid transparent",
                borderLeft: "62px solid rgba(150, 243, 255, 0.98)",
                filter: lowPerfMode
                  ? "drop-shadow(0 0 8px rgba(55, 200, 255, 0.55))"
                  : "drop-shadow(0 0 18px rgba(55, 200, 255, 0.8))",
              }}
            />

            <motion.div
              className="absolute top-1/2 h-6 -translate-y-1/2 rounded-full"
              style={{
                left: wormTailOffset1Px,
                width: wormTailPrimaryWidthPx,
                opacity: wormTurnTailFade,
                background: "rgba(40, 156, 255, 0.48)",
                filter: "blur(0.6px)",
              }}
            />

            <motion.div
              className="absolute top-1/2 h-4 -translate-y-1/2 rounded-full"
              style={{
                left: wormTailOffset2Px,
                width: wormTailSecondaryWidthPx,
                opacity: wormTurnTailFade,
                background: "rgba(65, 183, 255, 0.34)",
                filter: "blur(0.8px)",
              }}
            />

            <motion.div
              className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full"
              style={{
                left: wormTailOffset3Px,
                width: wormTailTertiaryWidthPx,
                opacity: wormTurnTailFade,
                background: "rgba(88, 202, 255, 0.24)",
                filter: "blur(1px)",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          style={{
            width: `${(maxX - minX + 1) * gridStep}vw`,
            height: `${(maxY - minY + 1) * gridStep}vh`,
            x: trackX,
            y: trackY,
            scale: smoothScale,
            transformOrigin: "left top",
            willChange: "transform",
          }}
        >
          {SCENES.map((scene, index) => (
            <section
              key={scene.id}
              id={scene.id}
              className={`absolute flex h-screen w-screen items-center justify-center overflow-hidden scene-${scene.anchorId}`}
              style={{
                left: `${(MAZE_COORDS[index].x - minX) * gridStep}vw`,
                top: `${(MAZE_COORDS[index].y - minY) * gridStep}vh`,
              }}
            >
              <div className="relative h-full w-full">{scene.node}</div>
            </section>
          ))}
        </motion.div>
      </div>
    </section>
  );

  return (
    <main className="horizontal-maze overflow-x-clip">
      {reduceMotion ? (
        <div>
          {SCENES.map((scene) => (
            <section key={`stack-${scene.id}`} id={scene.anchorId}>
              {scene.node}
            </section>
          ))}
        </div>
      ) : (
        horizontalTrack
      )}
    </main>
  );
}
