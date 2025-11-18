"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export default function SerpentineWaveWithStars() {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Generate static paths with consistent precision
  const generateStaticPath = (
    baseY: number,
    amplitude: number,
    frequency: number,
    phase: number
  ): string => {
    let path = `M-200,${baseY} `;
    for (let x = -200; x <= 3080; x += 20) {
      const y = baseY + amplitude * Math.sin(frequency * x + phase);
      path += `L${x},${y.toFixed(6)} `;
    }
    return path;
  };

  // Generate truly random but consistent star data using seeded random
  const stars = useMemo(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Calculate responsive star count
    const getStarCount = () => {
      if (typeof window === 'undefined') return 80;
      const area = window.innerWidth * window.innerHeight;
      return Math.floor(area / 15000);
    };

    const starCount = getStarCount();

    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      size: 1 + seededRandom(i * 1000) * 2.5,
      left: seededRandom(i * 100) * 100,
      top: 30 + seededRandom(i * 200) * 70,
      opacity: 0.15 + seededRandom(i * 300) * 0.35,
      xRange: (seededRandom(i * 400) - 0.5) * 40,
      yRange: -10 - seededRandom(i * 500) * 40,
      duration: 7 + seededRandom(i * 600) * 8,
      delay: seededRandom(i * 700) * 5,
      color: seededRandom(i * 800) > 0.7 ? '#C084FC' : '#A855F7',
    }));
  }, []);

  // Static render for SSR
  if (!isHydrated) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050329]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050329] to-[#0B0636] opacity-90" />
        
        {/* Static SVG waves */}
        <div className="absolute left-0 right-0 top-[65%] h-[35%] w-full opacity-0">
          <svg
            className="absolute h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 2880 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            {Array.from({ length: 15 }).map((_, i) => {
              const baseY = 500 + i * 4;
              const amplitude = 40 - i * 0.5;
              const frequency = 0.003;
              const phase = i * 0.2;
              const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

              return (
                <path
                  key={`blue-wave-static-${i}`}
                  d={staticPath}
                  fill="none"
                  stroke={`url(#blueGradient${i})`}
                  strokeWidth="0.7"
                  strokeOpacity={0.85 - i * 0.02}
                  opacity="0"
                />
              );
            })}

            {Array.from({ length: 25 }).map((_, i) => {
              const baseY = 550 + i * 2.5;
              const amplitude = 40 - i * 0.8;
              const frequency = 0.0008;
              const phase = i * 0.2 + Math.PI;
              const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

              return (
                <path
                  key={`purple-wave-static-${i}`}
                  d={staticPath}
                  fill="none"
                  stroke={`url(#purpleGradient${i})`}
                  strokeWidth="0.7"
                  strokeOpacity={0.85 - i * 0.02}
                  opacity="0"
                />
              );
            })}

            {Array.from({ length: 15 }).map((_, i) => {
              const baseY = 600 + i * 4;
              const amplitude = 40 - i * 0.5;
              const frequency = 0.00125;
              const phase = i * 0.15 + Math.PI * 0.5;
              const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

              return (
                <path
                  key={`lower-wave-static-${i}`}
                  d={staticPath}
                  fill="none"
                  stroke={`url(#lowerGradient${i})`}
                  strokeWidth="1.2"
                  strokeOpacity={0.9 - i * 0.015} 
                  opacity="0"
                />
              );
            })}

            <defs>
              {Array.from({ length: 15 }).map((_, i) => {
                const blueColor = `rgb(${40 + i * 2}, ${10 + i * 0.5}, ${220 - i * 2})`;
                const purpleColor = `rgb(${170 - i * 1}, ${30 + i * 0.8}, ${210 - i * 1})`;

                return (
                  <linearGradient
                    key={`blueGradient${i}`}
                    id={`blueGradient${i}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={blueColor} />
                    <stop offset="100%" stopColor={purpleColor} />
                  </linearGradient>
                );
              })}

              {Array.from({ length: 15 }).map((_, i) => {
                const purpleColor = `rgb(${140 + i * 1.5}, ${40 + i * 0.8}, ${200 - i * 1})`;
                const cyanColor = `rgb(${20 + i * 1}, ${150 + i * 1.5}, ${210 - i * 0.5})`;

                return (
                  <linearGradient
                    key={`purpleGradient${i}`}
                    id={`purpleGradient${i}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={purpleColor} />
                    <stop offset="100%" stopColor={cyanColor} />
                  </linearGradient>
                );
              })}

              {Array.from({ length: 15 }).map((_, i) => {
                const tealColor = `rgb(${20 + i * 1}, ${140 + i * 1.5}, ${180 - i * 1})`;
                const deepBlueColor = `rgb(${10 + i * 0.5}, ${50 + i * 1}, ${160 - i * 0.8})`;

                return (
                  <linearGradient
                    key={`lowerGradient${i}`}
                    id={`lowerGradient${i}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={tealColor} />
                    <stop offset="100%" stopColor={deepBlueColor} />
                  </linearGradient>
                );
              })}
            </defs>
          </svg>
        </div>

        {/* Static stars preview - only show if we have stars data */}
{/* Static stars preview - only show if we have stars data */}
{stars.length > 0 && (
  <div className="absolute inset-0 opacity-0">
    {stars.slice(0, 20).map((star) => (
      <div
        key={`star-static-${star.id}`}
        className="absolute"
        style={{
          width: star.size * 3,
          height: star.size * 3,
          left: `${star.left}%`,
          top: `${star.top}%`,
          opacity: star.opacity,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={star.color}
          />
        </svg>
      </div>
    ))}
  </div>
)}
      </div>
    );
  }

  // Client-side hydrated render with all animations
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050329]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050329] to-[#0B0636] opacity-90" />

      {/* Animated waves */}
      <motion.div
        className="absolute left-0 right-0 top-[65%] h-[35%] w-full"
        
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg
          className="absolute h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 2880 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue waves */}
          {Array.from({ length: 15 }).map((_, i) => {
            const baseY = 500 + i * 4;
            const amplitude = 40 - i * 0.5;
            const frequency = 0.003;
            const phase = i * 0.2;
            const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

            return (
              <motion.path
                key={`blue-wave-${i}`}
                d={staticPath}
                fill="none"
                stroke={`url(#blueGradient${i})`}
                strokeWidth="0.7"
                strokeOpacity={0.85 - i * 0.02}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 1, delay: i * 0.03 },
                }}
              >
                <animateMotion
                  dur={`${10 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path="M0,0 Q40,5 80,0 T160,0"
                />
                <animate
                  attributeName="d"
                  dur="0.1s"
                  repeatCount="indefinite"
                  values={staticPath}
                />
              </motion.path>
            );
          })}

          {/* Purple waves */}
          {Array.from({ length: 15 }).map((_, i) => {
            const baseY = 550 + i * 4;
            const amplitude = 40 - i * 0.5;
            const frequency = 0.0015;
            const phase = i * 0.2 + Math.PI;
            const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

            return (
              <motion.path
                key={`purple-wave-${i}`}
                d={staticPath}
                fill="none"
                stroke={`url(#purpleGradient${i})`}
                strokeWidth="0.7"
                strokeOpacity={0.85 - i * 0.02}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 1, delay: 0.5 + i * 0.03 },
                }}
              >
                <animateMotion
                  dur={`${12 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path="M0,0 Q40,5 80,0 T160,0"
                />
                <animate
                  attributeName="d"
                  dur={`${8 + i * 0.3}s`}
                  repeatCount="indefinite"
                  values={staticPath}
                />
              </motion.path>
            );
          })}

          {/* Lower waves */}
          {Array.from({ length: 15 }).map((_, i) => {
            const baseY = 600 + i * 4;
            const amplitude = 40 - i * 0.5;
            const frequency = 0.00125;
            const phase = i * 0.15 + Math.PI * 0.5;
            const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

            return (
              <motion.path
                key={`lower-wave-${i}`}
                d={staticPath}
                fill="none"
                stroke={`url(#lowerGradient${i})`}
                strokeWidth="0.7"
                strokeOpacity={0.85 - i * 0.02}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 1, delay: 0.7 + i * 0.03 },
                }}
              >
                <animateMotion
                  dur={`${14 + i * 0.4}s`}
                  repeatCount="indefinite"
                  path="M0,0 Q60,6 120,0 T240,0"
                />
                <animate
                  attributeName="d"
                  dur={`${9 + i * 0.35}s`}
                  repeatCount="indefinite"
                  values={staticPath}
                />
              </motion.path>
            );
          })}

          <defs>
            {Array.from({ length: 15 }).map((_, i) => {
              const blueColor = `rgb(${40 + i * 2}, ${10 + i * 0.5}, ${220 - i * 2})`;
              const purpleColor = `rgb(${170 - i * 1}, ${30 + i * 0.8}, ${210 - i * 1})`;

              return (
                <linearGradient
                  key={`blueGradient${i}`}
                  id={`blueGradient${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={blueColor} />
                  <stop offset="100%" stopColor={purpleColor} />
                </linearGradient>
              );
            })}

            {Array.from({ length: 15 }).map((_, i) => {
              const purpleColor = `rgb(${140 + i * 1.5}, ${40 + i * 0.8}, ${200 - i * 1})`;
              const cyanColor = `rgb(${20 + i * 1}, ${150 + i * 1.5}, ${210 - i * 0.5})`;

              return (
                <linearGradient
                  key={`purpleGradient${i}`}
                  id={`purpleGradient${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={purpleColor} />
                  <stop offset="100%" stopColor={cyanColor} />
                </linearGradient>
              );
            })}

            {Array.from({ length: 15 }).map((_, i) => {
              const tealColor = `rgb(${20 + i * 1}, ${140 + i * 1.5}, ${180 - i * 1})`;
              const deepBlueColor = `rgb(${10 + i * 0.5}, ${50 + i * 1}, ${160 - i * 0.8})`;

              return (
                <linearGradient
                  key={`lowerGradient${i}`}
                  id={`lowerGradient${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={tealColor} />
                  <stop offset="100%" stopColor={deepBlueColor} />
                </linearGradient>
              );
            })}
          </defs>
        </svg>
      </motion.div>

      {/* Improved star particles */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute"
            style={{
              width: star.size * 3,
              height: star.size * 3,
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, star.xRange, 0],
              y: [0, star.yRange, 0],
              opacity: [star.opacity, star.opacity + 0.2, star.opacity],
              scale: [1, 1.1, 1],
            }}
            transition={{
              x: {
                duration: star.duration * 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: star.delay,
              },
              y: {
                duration: star.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: star.delay * 0.7,
              },
              opacity: {
                duration: star.duration * 0.9,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: star.delay * 0.5,
              },
              scale: {
                duration: star.duration * 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: star.delay * 0.3,
              },
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill={star.color}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}