import { useEffect, useRef } from "react";

const DoodleBackground = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".doodle-path");
    
    paths?.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.setProperty('--path-length', length);
      path.style.strokeDasharray = length;
      
      // Draw -> Erase -> Repeat loop
      // 7s duration + staggered delay based on index
      path.style.animation = `draw-erase ${6 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`;
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        ref={svgRef}
        className="w-full h-full opacity-[0.1]" // Increased opacity for better visibility
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* --- YOUR ORIGINAL DOODLES --- */}
        <path className="doodle-path" d="M200 350 C200 300 220 270 260 270 C300 270 320 300 320 350" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" />
        <rect className="doodle-path" x="185" y="345" width="150" height="110" rx="8" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle className="doodle-path" cx="260" cy="390" r="12" stroke="hsl(var(--primary))" strokeWidth="2" />
        <line className="doodle-path" x1="260" y1="402" x2="260" y2="425" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />

        <path className="doodle-path" d="M850 200 C850 180 870 165 890 165 C910 165 930 180 930 200 C930 220 910 235 890 235 C870 235 850 220 850 200Z" stroke="hsl(var(--primary))" strokeWidth="2" />
        <path className="doodle-path" d="M930 200 L1020 200 L1020 220 L1000 220 L1000 210 L980 210 L980 220 L960 220 L960 200" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path className="doodle-path" d="M600 100 L650 120 L650 170 C650 200 630 220 600 235 C570 220 550 200 550 170 L550 120 Z" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
        <path className="doodle-path" d="M580 165 L595 180 L625 150" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path className="doodle-path" d="M100 600 L200 600 L200 550 L350 550 L350 600 L450 600" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="100" cy="600" r="4" fill="hsl(var(--primary))" className="animate-pulse" />
        <circle cx="450" cy="600" r="4" fill="hsl(var(--primary))" className="animate-pulse" />

        <path className="doodle-path" d="M700 500 L700 580 L780 580 L780 520 L760 500 L700 500Z" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
        <line className="doodle-path" x1="715" y1="540" x2="765" y2="540" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <line className="doodle-path" x1="715" y1="555" x2="750" y2="555" stroke="hsl(var(--primary))" strokeWidth="1.5" />

        <path className="doodle-path" d="M950 450 C980 420 1030 420 1060 450 C1030 480 980 480 950 450Z" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle className="doodle-path" cx="1005" cy="450" r="10" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* --- NEW DOODLES TO FILL SPACE --- */}

        {/* Code Brackets (Top Left Corner) */}
        <path className="doodle-path" d="M80 80 L50 110 L80 140" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
        <path className="doodle-path" d="M110 80 L140 110 L110 140" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />

        {/* Database Icon (Bottom Center) */}
        <ellipse className="doodle-path" cx="600" cy="650" rx="40" ry="15" stroke="hsl(var(--primary))" strokeWidth="2" />
        <path className="doodle-path" d="M560 650 L560 710 C560 725 640 725 640 710 L640 650" stroke="hsl(var(--primary))" strokeWidth="2" />
        <path className="doodle-path" d="M560 680 C560 695 640 695 640 680" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Lightning Bolt (Mid Top Right) */}
        <path className="doodle-path" d="M1050 50 L1020 100 L1060 100 L1030 160" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Hand-drawn Cursor (Center Screen) */}
        <path className="doodle-path" d="M580 400 L580 435 L592 425 L605 445 L615 440 L602 420 L620 420 Z" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />

        {/* Server Rack (Bottom Left) */}
        <rect className="doodle-path" x="80" y="700" width="80" height="40" rx="4" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <circle className="doodle-path" cx="100" cy="720" r="2" stroke="hsl(var(--primary))" strokeWidth="1" />
        <line className="doodle-path" x1="115" y1="720" x2="145" y2="720" stroke="hsl(var(--primary))" strokeWidth="1" />

        {/* Floating Geometric Squiggles (Filling gaps) */}
        <path className="doodle-path" d="M400 100 Q430 70 460 100 T520 100" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <path className="doodle-path" d="M1000 650 Q1050 630 1100 650" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <circle className="doodle-path" cx="800" cy="100" r="15" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" />

        {/* --- SCATTERED DOTS & WAVY LINES --- */}
        {[
          [150, 150], [400, 200], [500, 700], [900, 650], [1100, 300],
          [300, 400], [750, 350], [1050, 550], [180, 700], [620, 450],
          [50, 450], [1150, 750], [800, 750], [350, 50], [600, 300] // Added 5 more dots
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="hsl(var(--primary))"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        <path className="doodle-path" d="M50 250 Q150 230 250 250 Q350 270 450 250" stroke="hsl(var(--primary))" strokeWidth="1" />
        <path className="doodle-path" d="M700 700 Q800 680 900 700 Q1000 720 1100 700" stroke="hsl(var(--primary))" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default DoodleBackground;