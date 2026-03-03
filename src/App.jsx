import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Terminal, 
  Code2, 
  Shield, 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail, 
  Layers,
  Zap,
  Bot,
  FolderLock,
  ExternalLink,
  Archive
} from 'lucide-react';

// --- DATA ---

const RESUME = {
  header: {
    name: "Krishna Vishwakarma",
    title: "Senior Frontend Engineer | AI Orchestration Specialist",
    tagline: "Building scalable systems in the shadows.",
    contact: {
      phone: "+91-8009620708",
      email: "krishna23712@gmail.com",
      github: "thinkswell",
      linkedin: "-krishnavishwakarma"
    }
  },
  summary: "Software Engineer with +4 years of experience specializing in Angular/React and building scalable, high-performance products. Expert in migrating legacy systems and orchestrating multi-agent AI architectures.",
  skills: [
    { category: "Core Arsenal", items: ["Angular", "React", "TypeScript", "JavaScript", "HTML/CSS/SCSS"] },
    { category: "AI & Backend", items: ["Multi-Agent Systems", "Claude 4.6", "NodeJS", "Express", "Python"] },
    { category: "Cloud & Ops", items: ["Firebase/Firestore", "AWS Lambda", "Cloud Functions", "CI/CD", "Git"] },
    { category: "Architecture", items: ["Microfrontends", "RxJs", "Data Structures", "System Design"] }
  ],
  projects: {
    active: [
      { title: "Enigma Grid", subtitle: "Sudoku Engine", url: "https://in-sudoku.netlify.app/", desc: "Logic matrix stabilization algorithm. A fully functional Sudoku grid system.", tags: ["Logic", "Algorithm", "Game"] },
      { title: "Market Oracle", subtitle: "Trader Log", url: "https://trader-log.netlify.app/dashboard", desc: "Financial tracking and predictive logging dashboard for monitoring volatile assets.", tags: ["Dashboard", "Data Viz", "Finance"] },
      { title: "Aerial Evasion", subtitle: "3D Flappy Simulator", url: "https://3d-flappybird.netlify.app/", desc: "3D flight simulation and collision avoidance training program.", tags: ["3D", "WebGL", "Simulation"] }
    ],
    legacy: [
      { title: "Genesis Identity", subtitle: "V1 Portfolio", url: "https://krishnav.netlify.app/", desc: "Legacy personal identity broadcast system. Developed during the Pre-AI era.", tags: ["Legacy", "Portfolio"] },
      { title: "Kinetic DropSlide", subtitle: "Motion UI", url: "https://dropslide.netlify.app/", desc: "Fluid motion and element transition framework prototype.", tags: ["UI/UX", "Animation"] },
      { title: "Construct", subtitle: "Ng-DnD Form", url: "https://ng-dndform.netlify.app/", desc: "Drag-and-drop form schematic builder engineered with Angular.", tags: ["Angular", "Drag & Drop"] }
    ]
  },
  experience: [
    {
      company: "Algebrik AI & InCred Financial Services",
      role: "Senior Software Engineer",
      period: "June 2024 - Present",
      location: "Bangalore",
      highlights: [
        "Built a multi-agent orchestration system (leader-worker architecture using Claude 4.6) automating ticket resolution, reducing TAT by 80%.",
        "Developed a JSON-driven questionnaire architecture for scalable reactive forms with dynamic workflows.",
        "Architected centralized auth system using Keycloak for multi-tenant identity management.",
        "Setup CI/CD pipelines reducing deployment time by 30%."
      ]
    },
    {
      company: "Josh Technology Group",
      role: "Senior Frontend Developer",
      period: "Oct 2023 - May 2024",
      location: "Gurgaon",
      highlights: [
        "Streamlined CI/CD pipelines with yarn offline mirroring, cutting build time by 50%.",
        "Built microfrontend video application using React and Amazon Chime SDK.",
        "Upgraded Firebase v7 to v9, boosting performance and reducing load times by 25%.",
        "Contributed to platform success with 1M+ active users."
      ]
    },
    {
      company: "Josh Technology Group",
      role: "Frontend Software Developer",
      period: "Oct 2021 - Sep 2023",
      location: "Gurgaon",
      highlights: [
        "Led multi-phase Angular migration (v7 to v17), reducing bug reports by 30%.",
        "Implemented real-time code sharing using Firepad for 50,000+ interviews.",
        "Optimized Firestore cleanup functions achieving $0 deletion cost.",
        "Improved app performance by 40% via ES6 modules and lazy loading."
      ]
    }
  ]
};

// --- IMAGES ---
// Setup for local PNGs with SVG Base64 fallbacks for the Canvas preview

const VILLAIN_ASSETS = [
  {
    // Joker
    src: 'villain1.png', // Assume this is hosted locally in the public folder
    fallback: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="translate(0, 10)"><path d="M25,50 C25,25 75,25 75,50 C75,75 25,75 25,50" fill="#f8f9fa"/><path d="M15,40 C15,15 85,15 85,40 C85,60 65,35 50,35 C35,35 15,60 15,40 Z" fill="#22c55e"/><circle cx="35" cy="45" r="5" fill="#1e1b4b"/><circle cx="65" cy="45" r="5" fill="#1e1b4b"/><path d="M35,65 Q50,80 65,65" stroke="#ef4444" stroke-width="5" stroke-linecap="round" fill="none"/></g></svg>`)}`
  },
  {
    // Harley Quinn
    src: 'villain2.png', // Assume this is hosted locally in the public folder
    fallback: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="translate(0, 10)"><path d="M25,50 C25,25 75,25 75,50 C75,75 25,75 25,50" fill="#f8f9fa"/><path d="M25,50 C25,20 50,20 50,50 Z" fill="#ef4444"/><path d="M75,50 C75,20 50,20 50,50 Z" fill="#111"/><path d="M25,45 Q50,45 75,45" stroke="#111" stroke-width="12" stroke-linecap="round"/><circle cx="35" cy="45" r="3" fill="#fff"/><circle cx="65" cy="45" r="3" fill="#fff"/><path d="M40,65 Q50,75 60,65" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="20" cy="20" r="5" fill="#fff"/><circle cx="80" cy="20" r="5" fill="#fff"/></g></svg>`)}`
  },
  {
    // Penguin
    src: 'villain3.png', // Assume this is hosted locally in the public folder
    fallback: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="translate(0, 10)"><path d="M20,60 C20,30 80,30 80,60 C80,90 20,90 20,60" fill="#fcd34d"/><rect x="30" y="5" width="40" height="30" fill="#1f2937"/><rect x="20" y="30" width="60" height="5" fill="#1f2937"/><circle cx="35" cy="50" r="5" fill="#000"/><circle cx="65" cy="50" r="10" fill="none" stroke="#fff" stroke-width="3"/><circle cx="65" cy="50" r="4" fill="#000"/><path d="M50,55 L45,70 L55,70 Z" fill="#f97316"/></g></svg>`)}`
  },
  {
    // Two-Face
    src: 'villain4.png', // Assume this is hosted locally in the public folder
    fallback: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="translate(0, 10)"><path d="M25,50 C25,25 50,25 50,50 C50,75 25,75 25,50" fill="#f8f9fa"/><path d="M75,50 C75,25 50,25 50,50 C50,75 75,75 75,50" fill="#3b82f6"/><circle cx="35" cy="45" r="5" fill="#000"/><circle cx="65" cy="45" r="5" fill="#facc15"/><path d="M35,65 Q50,75 65,65" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M50,65 Q60,60 65,65" stroke="#ef4444" stroke-width="4" stroke-linecap="round" fill="none"/></g></svg>`)}`
  },
  {
    // Riddler
    src: 'villain5.png', // Assume this is hosted locally in the public folder
    fallback: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="translate(0, 10)"><path d="M25,50 C25,25 75,25 75,50 C75,75 25,75 25,50" fill="#fca5a5"/><path d="M20,35 C20,10 80,10 80,35 Z" fill="#22c55e"/><rect x="15" y="30" width="70" height="5" fill="#166534"/><circle cx="35" cy="55" r="5" fill="#000"/><circle cx="65" cy="55" r="5" fill="#000"/><text x="50" y="28" font-family="monospace" font-weight="bold" font-size="22" fill="#000" text-anchor="middle">?</text><path d="M40,70 Q50,80 60,70" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none"/></g></svg>`)}`
  }
];

// --- AUDIO & EFFECTS COMPONENTS ---

// Synthesize a retro victory chime natively without needing external assets
const playVictorySound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const playNote = (freq, startTime, duration, type = 'triangle') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration);
    };

    // Heroic fanfare sequence (C Major Arpeggio)
    playNote(261.63, 0, 0.15);    // C4
    playNote(329.63, 0.15, 0.15); // E4
    playNote(392.00, 0.3, 0.15);  // G4
    playNote(523.25, 0.45, 0.8);  // C5 (Held longer for triumph)
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

const Confetti = () => {
  const colors = ['#ef4444', '#facc15', '#3b82f6', '#22c55e', '#a855f7', '#ffffff'];
  // Generate 75 pieces of colorful paper
  const pieces = Array.from({ length: 75 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, 
    delay: Math.random() * 2, 
    duration: 2 + Math.random() * 3, 
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 8, 
    rotate: Math.random() * 360
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden flex items-center justify-center"
    >
      {/* Falling Paper Particles */}
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: '-60vh', x: `${p.x}vw`, rotate: p.rotate }}
          animate={{ y: '60vh', x: `${p.x - 5 + Math.random() * 10}vw`, rotate: p.rotate + 360 + Math.random() * 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear", repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '50%', // use center origin for seamless screen-crossing
            left: 0,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}
      
      {/* Central Success Banner */}
      <motion.div 
         initial={{ scale: 0.5, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ type: "spring", stiffness: 200, damping: 15 }}
         className="relative z-10 text-center bg-black/80 px-8 py-10 md:px-12 md:py-8 border-2 border-yellow-500/50 rounded-xl backdrop-blur-md shadow-[0_0_50px_rgba(234,179,8,0.2)]"
      >
         <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_0_20px_rgba(234,179,8,0.8)] font-mono tracking-widest uppercase mb-4">
           GOTHAM SECURED
         </h1>
         <p className="text-slate-300 font-mono text-sm tracking-widest uppercase border-t border-slate-700 pt-4">
           All rogues neutralized.<br/>Scanning for new threats...
         </p>
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENTS ---

const Batarang = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 100 60" className={className} fill={color} style={{ filter: `drop-shadow(0 0 10px ${color})` }}>
    <path d="M50 45 C 65 55, 90 50, 100 20 C 85 25, 70 20, 60 10 L 50 0 L 40 10 C 30 20, 15 25, 0 20 C 10 50, 35 55, 50 45 Z" />
  </svg>
);

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full text-yellow-400 opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full text-blue-500 opacity-0 group-hover:opacity-70 animate-pulse -translate-x-[2px]">
        {text}
      </span>
    </div>
  );
};

const TechSection = ({ title, children, id, icon: Icon }) => {
  return (
    <div id={id} className="relative py-16 md:py-24 px-4 max-w-6xl mx-auto z-10">
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/50" />
      
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
          {Icon && <Icon className="text-yellow-400 w-6 h-6" />}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-mono text-white tracking-wider uppercase">
          <GlitchText text={title} />
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-yellow-500/50 to-transparent" />
      </div>
      
      {children}
    </div>
  );
};

const InteractiveChar = ({ char, isGradient }) => {
  const [hitInfo, setHitInfo] = useState({ hit: false, angle: 0 });

  const handleHover = () => {
    if (hitInfo.hit) return; 
    setHitInfo({ hit: true, angle: Math.random() * Math.PI * 2 });
    setTimeout(() => setHitInfo({ hit: false, angle: 0 }), 800);
  };

  const knockX = hitInfo.hit ? Math.cos(hitInfo.angle) * 15 : 0;
  const knockY = hitInfo.hit ? Math.sin(hitInfo.angle) * 15 : 0;
  const rot = hitInfo.hit ? (Math.random() > 0.5 ? 20 : -20) : 0;

  return (
    <span className="relative inline-block cursor-crosshair hover:z-50" onMouseEnter={handleHover}>
      {hitInfo.hit && (
        <motion.div
          initial={{ x: Math.cos(hitInfo.angle) * 200, y: Math.sin(hitInfo.angle) * 200, opacity: 0, scale: 2, rotate: 0 }}
          animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0], scale: 1, rotate: 720 }}
          transition={{ duration: 0.15, ease: "easeIn" }}
          className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 text-slate-300"
        >
          <Batarang color="currentColor" />
        </motion.div>
      )}

      {hitInfo.hit && (
         <div className="absolute top-1/2 left-1/2 pointer-events-none z-0">
           {Array.from({length: 12}).map((_, i) => {
             const pAngle = Math.random() * Math.PI * 2;
             const pDist = 40 + Math.random() * 80;
             const isBlood = Math.random() > 0.4;
             return (
               <motion.div
                 key={i}
                 initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                 animate={{ x: Math.cos(pAngle)*pDist, y: Math.sin(pAngle)*pDist, opacity: 0, scale: 1 }}
                 transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                 className={`absolute rounded-full ${isBlood ? 'bg-red-500 shadow-[0_0_15px_#ef4444] w-2 h-2' : 'bg-yellow-400 shadow-[0_0_12px_#facc15] w-1.5 h-1.5'}`}
                 style={{ marginLeft: '-4px', marginTop: '-4px' }}
               />
             )
           })}
         </div>
      )}

      <motion.span
        animate={{ 
          x: knockX, y: knockY, rotate: rot, scale: hitInfo.hit ? 0.8 : 1,
          filter: hitInfo.hit ? "brightness(2) drop-shadow(0 0 15px rgba(239, 68, 68, 0.9))" : "brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 12, delay: hitInfo.hit ? 0.15 : 0 }} 
        className={`relative z-10 inline-block transition-colors duration-200 ${
          hitInfo.hit ? 'text-red-400 bg-none drop-shadow-[0_0_10px_#ef4444]' : isGradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'text-white'
        }`}
      >
        {char}
      </motion.span>
    </span>
  );
};

// Interactive Villain Component
const Villain = ({ imageObj, initialPos, onDestroy }) => {
  const [hitInfo, setHitInfo] = useState({ hit: false, angle: 0 });
  const [destroyed, setDestroyed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleClick = () => {
    if (hitInfo.hit || destroyed) return; 
    
    // Attack angle
    const angle = Math.random() * Math.PI * 2;
    setHitInfo({ hit: true, angle });
    
    // Sequence: Hit -> Pause -> Explode/Destroy
    setTimeout(() => {
        setDestroyed(true);
        setTimeout(() => {
           onDestroy(); // Notify parent to remove from DOM completely
        }, 500); // Wait for explosion animation to finish
    }, 400);
  };

  if (destroyed) {
    // Show explosion instead of character
    return (
       <div className="absolute pointer-events-none z-0" style={{ top: initialPos.top, left: initialPos.left }}>
         {Array.from({length: 20}).map((_, i) => {
           const pAngle = Math.random() * Math.PI * 2;
           const pDist = 60 + Math.random() * 100;
           const isBlood = Math.random() > 0.3;
           return (
             <motion.div
               key={i}
               initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
               animate={{ x: Math.cos(pAngle)*pDist, y: Math.sin(pAngle)*pDist, opacity: 0, scale: Math.random() * 2 + 1 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className={`absolute rounded-full ${isBlood ? 'bg-red-500 shadow-[0_0_20px_#ef4444]' : 'bg-yellow-400 shadow-[0_0_15px_#facc15]'}`}
               style={{ width: '6px', height: '6px', marginLeft: '-3px', marginTop: '-3px' }}
             />
           )
         })}
         <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-10 -left-10 text-red-500 font-mono font-black text-4xl italic"
            style={{ textShadow: '0 0 10px red' }}
         >
            POW!
         </motion.div>
       </div>
    );
  }

  const knockX = hitInfo.hit ? Math.cos(hitInfo.angle) * 30 : 0;
  const knockY = hitInfo.hit ? Math.sin(hitInfo.angle) * 30 : 0;
  const rot = hitInfo.hit ? (Math.random() > 0.5 ? 45 : -45) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
          opacity: isHovered ? 1 : 0.3, // Brighten on hover
          scale: isHovered ? 1.1 : 1,
          filter: isHovered ? 'brightness(1.5) drop-shadow(0 0 20px rgba(234, 179, 8, 0.4))' : 'brightness(0.5) blur(2px)', // Remove blur and shadow on hover
      }}
      transition={{ duration: 0.3 }}
      className="absolute cursor-crosshair z-30 transition-all duration-300"
      style={{ top: initialPos.top, left: initialPos.left }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Incoming Batarang */}
      {hitInfo.hit && (
        <motion.div
          initial={{ x: Math.cos(hitInfo.angle) * 300, y: Math.sin(hitInfo.angle) * 300, opacity: 0, scale: 3, rotate: 0 }}
          animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0], scale: 1, rotate: 1080 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 text-slate-300"
        >
          <Batarang color="currentColor" />
        </motion.div>
      )}

      {/* Villain Image (Uses fallback SVG if the PNG isn't hosted locally) */}
      <motion.img 
        src={imageObj.src} 
        onError={(e) => { e.currentTarget.src = imageObj.fallback; }}
        alt="Villain"
        animate={{ 
            x: knockX, y: knockY, rotate: rot, 
            scale: hitInfo.hit ? 0.8 : 1,
            filter: hitInfo.hit ? 'brightness(3) sepia(1) hue-rotate(-50deg) saturate(5)' : '' // Flash red on hit
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: hitInfo.hit ? 0.2 : 0 }} 
        className="w-24 h-24 object-contain"
      />
    </motion.div>
  );
};


// --- MAIN APPLICATION ---

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  const [villainImages, setVillainImages] = useState([]);
  const [villains, setVillains] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Load Villain Images on Mount
  useEffect(() => {
    setVillainImages(VILLAIN_ASSETS);
  }, []);

  // Spawn Villains as a "Wave" across the page once loading is done
  useEffect(() => {
      if (!loading && villainImages.length > 0 && villains.length === 0 && !hasWon) {
          const spawnVillains = villainImages.map((imgObj, i) => {
              const randomTop = Math.floor(Math.random() * 80) + 10; 
              const randomLeft = Math.floor(Math.random() * 80) + 10; 
              const topOffset = `calc(${i * 100}vh + ${randomTop}vh)`; 

              return {
                  id: i + Date.now(), // Generate fresh unique ID
                  imageObj: imgObj,
                  top: topOffset,
                  left: `${randomLeft}%`
              };
          });
          setVillains(spawnVillains);
          setGameStarted(true); // Game/Wave is actively running
      }
  }, [loading, villainImages, villains.length, hasWon]);

  // Check Win Condition (All villains defeated)
  useEffect(() => {
      if (gameStarted && villains.length === 0 && !hasWon) {
          setHasWon(true);
          playVictorySound();
          
          // Celebrate for 8 seconds, then reset and spawn a new wave
          setTimeout(() => {
              setHasWon(false);
              setGameStarted(false); // Triggers the spawn effect to run again
          }, 8000);
      }
  }, [villains.length, gameStarted, hasWon]);

  // Loading Sequence
  useEffect(() => {
    const spinTimer = setTimeout(() => setZoomed(true), 2500);
    const revealTimer = setTimeout(() => setLoading(false), 3200);
    return () => { clearTimeout(spinTimer); clearTimeout(revealTimer); };
  }, []);

  // Remove the villain specifically clicked/hit
  const handleDestroyVillain = (idToRemove) => {
      setVillains(prev => prev.filter(v => v.id !== idToRemove));
  };

  return (
    <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-yellow-500/30 selection:text-yellow-200 overflow-x-hidden relative">
      
      {/* --- SUCCESS STATE CONFETTI --- */}
      <AnimatePresence>
        {hasWon && <Confetti />}
      </AnimatePresence>

      {/* --- ANIMATED LOADING SCREEN --- */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: 0 }}
              animate={zoomed ? { scale: 60, rotate: 720, opacity: 0 } : { scale: 1, rotate: 360 }}
              transition={zoomed ? { duration: 0.8, ease: "circIn" } : { duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Batarang className="w-32 h-32 text-yellow-500" />
              <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-30 animate-pulse" />
            </motion.div>
            
            {!zoomed && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute bottom-20 text-yellow-500/60 font-mono text-sm tracking-[0.3em] uppercase"
              >
                Initializing Systems...
                {villainImages.length > 0 && <span className="block text-xs mt-2 text-red-500">Warning: Rogue Activity Detected.</span>}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN INTERFACE --- */}
      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="relative w-full h-full"
        >
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-900/10 blur-[120px]" />
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-slate-800/20 to-transparent blur-3xl" />
          </div>

          {/* Render Villains */}
          {villains.map(v => (
             <Villain 
                key={v.id} 
                imageObj={v.imageObj} 
                initialPos={{ top: v.top, left: v.left }} 
                onDestroy={() => handleDestroyVillain(v.id)} 
             />
          ))}

          {/* Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-yellow-500 origin-left z-50 shadow-[0_0_10px_#eab308]"
            style={{ scaleX }}
          />

          {/* Navbar */}
          <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Batarang className="w-8 h-8 text-yellow-500" />
                <span className="font-mono font-bold text-white tracking-widest hidden sm:block">WAYNE_DEV_TERMINAL</span>
              </div>
              <div className="flex gap-6 font-mono text-sm text-yellow-500/80">
                <a href="#about" className="hover:text-white transition-colors">./IDENT</a>
                <a href="#experience" className="hover:text-white transition-colors">./MISSIONS</a>
                <a href="#projects" className="hover:text-white transition-colors hidden md:block">./PROTOTYPES</a>
                <a href="#arsenal" className="hover:text-white transition-colors">./ARSENAL</a>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative pt-20 z-10">
            <div className="text-center z-10 px-4 w-full">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-8 px-4 py-1 border border-yellow-500/30 rounded-full bg-yellow-500/5 text-yellow-400 font-mono text-xs tracking-widest"
              >
                SYSTEM ONLINE // AUTHENTICATED
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter cursor-crosshair"
              >
                <div className="flex justify-center flex-wrap px-4">
                  {"KRISHNA".split('').map((char, index) => (
                    <InteractiveChar key={`k-${index}`} char={char} isGradient={false} />
                  ))}
                </div>
                <div className="flex justify-center flex-wrap px-4 mt-2 md:mt-4">
                  {"VISHWAKARMA".split('').map((char, index) => (
                    <InteractiveChar key={`v-${index}`} char={char} isGradient={true} />
                  ))}
                </div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light mt-6"
              >
                Frontend Engineer. <span className="text-blue-400 font-semibold">AI Architect.</span>
                <br/>Building high-performance systems from the shadows.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mt-10"
              >
                {[
                  { icon: Github, href: `https://github.com/${RESUME.header.contact.github}`, label: "GITHUB" },
                  { icon: Linkedin, href: `https://linkedin.com/in/${RESUME.header.contact.linkedin}`, label: "LINKEDIN" },
                  { icon: Mail, href: `mailto:${RESUME.header.contact.email}`, label: "ENCRYPTED_MAIL" }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500 transition-all duration-300 group"
                  >
                    <item.icon className="w-4 h-4 text-slate-400 group-hover:text-yellow-400" />
                    <span className="font-mono text-xs tracking-widest">{item.label}</span>
                  </a>
                ))}
              </motion.div>
            </div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </section>

          {/* About Section */}
          <TechSection id="about" title="Identity_Log" icon={Terminal}>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  <span className="text-yellow-500 font-mono text-xl mr-2">&gt;</span>
                  {RESUME.summary}
                </p>
                <div className="p-6 bg-slate-900/50 border border-blue-500/20 rounded-lg backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-2 opacity-50">
                    <Bot className="w-12 h-12 text-blue-500/20" />
                  </div>
                  <h3 className="text-blue-400 font-mono mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> CURRENT OBJECTIVE
                  </h3>
                  <p className="text-sm text-slate-400">
                    Architecting multi-agent AI orchestration systems using Claude 4.6. Specializing in sub-agent workflows that automate complex enterprise logic and PR generation.
                  </p>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded font-mono text-xs text-green-400/80 shadow-[0_0_20px_rgba(0,0,0,0.5)] h-fit">
                <div className="flex justify-between border-b border-slate-800 pb-2 mb-4 text-slate-500">
                  <span>SYS_STATS</span>
                  <span>ONLINE</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>EXP_LEVEL</span>
                    <span className="text-white">LEVEL 4+</span>
                  </li>
                  <li className="flex justify-between">
                    <span>MAIN_WEAPON</span>
                    <span className="text-white">ANGULAR / REACT</span>
                  </li>
                  <li className="flex justify-between">
                    <span>SEC_WEAPON</span>
                    <span className="text-white">AGENTIC AI</span>
                  </li>
                  <li className="flex justify-between">
                    <span>LOC</span>
                    <span className="text-white">INDIA</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="w-full bg-slate-800 h-1 mt-1">
                    <div className="bg-green-500 h-1 w-[92%] shadow-[0_0_5px_#22c55e]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                    <span>POWER</span>
                    <span>92%</span>
                  </div>
                </div>
              </div>
            </div>
          </TechSection>

          {/* Experience Section */}
          <TechSection id="experience" title="Mission_Archives" icon={Layers}>
            <div className="space-y-12">
              {RESUME.experience.map((job, index) => (
                <motion.div 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 md:pl-0"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-800 md:left-[180px]" />
                  <div className="absolute left-[-5px] top-6 w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308] md:left-[176px]" />

                  <div className="md:flex gap-12 group">
                    <div className="md:w-[180px] shrink-0 mb-2 md:mb-0">
                      <div className="font-mono text-sm text-yellow-500/80 py-1 px-2 border border-yellow-500/20 bg-yellow-500/5 inline-block rounded">
                        {job.period}
                      </div>
                    </div>

                    <div className="flex-grow p-6 bg-slate-900/40 border border-white/5 hover:border-yellow-500/30 transition-all duration-300 rounded-lg hover:bg-slate-800/40 z-10">
                      <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                      <div className="text-blue-400 font-mono text-sm mb-4 flex items-center gap-2">
                         @{job.company} <span className="text-slate-600">|</span> {job.location}
                      </div>
                      <ul className="space-y-3">
                        {job.highlights.map((point, i) => (
                          <li key={i} className="flex gap-3 text-slate-400 text-sm md:text-base">
                            <span className="text-yellow-500 mt-1.5 text-xs">⬢</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TechSection>

          {/* R&D Projects Section */}
          <TechSection id="projects" title="R&D_Prototypes" icon={FolderLock}>
            
            <div className="mb-12">
              <h3 className="text-yellow-500 font-mono mb-6 flex items-center gap-2 border-b border-yellow-500/20 pb-2">
                <Zap className="w-4 h-4" /> ACTIVE_CLASSIFIED_FILES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RESUME.projects.active.map((proj, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="group bg-black border border-slate-800 p-1 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden z-10"
                  >
                    <div className="h-32 bg-slate-900 flex items-center justify-center relative overflow-hidden border-b border-slate-800">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                      
                      <div className="relative z-20 text-center">
                        <div className="text-yellow-500/30 group-hover:text-yellow-500 transition-colors font-mono text-4xl font-black tracking-tighter mix-blend-screen">
                          {proj.title.substring(0,2).toUpperCase()}
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-2 flex gap-1 z-20">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950">
                      <div className="text-[10px] text-slate-500 font-mono mb-1">{proj.subtitle}</div>
                      <h4 className="text-yellow-400 font-mono text-sm font-bold mb-2 tracking-wider">{proj.title}</h4>
                      <p className="text-slate-400 text-xs mb-4 line-clamp-2 h-8">{proj.desc}</p>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-slate-800/50">
                        <div className="flex gap-1">
                          {proj.tags.slice(0,2).map(t => (
                            <span key={t} className="text-[8px] px-1.5 py-0.5 bg-slate-900 border border-slate-700 text-slate-400 font-mono uppercase rounded-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                        <a 
                          href={proj.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-white transition-colors font-mono bg-blue-500/10 px-2 py-1 rounded-sm border border-blue-500/20 hover:border-white/50 hover:bg-white/10"
                        >
                          DECRYPT <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-slate-500 font-mono mb-6 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Archive className="w-4 h-4" /> ARCHIVED_SUBROUTINES [PRE-CRISIS]
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                {RESUME.projects.legacy.map((proj, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-slate-950 border border-slate-800 p-4 rounded-sm hover:border-slate-600 transition-colors z-10"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-[10px] text-slate-600 font-mono mb-1">{proj.subtitle}</div>
                        <h4 className="text-slate-300 font-mono text-sm font-bold group-hover:text-blue-400 transition-colors">{proj.title}</h4>
                      </div>
                      <a 
                        href={proj.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 bg-slate-900 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-slate-500 text-xs mb-3">{proj.desc}</p>
                    <div className="flex gap-1">
                      {proj.tags.map(t => (
                        <span key={t} className="text-[8px] px-1 py-0.5 text-slate-500 font-mono uppercase border border-slate-800 rounded-sm group-hover:border-slate-600 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </TechSection>

          {/* Skills Section */}
          <TechSection id="arsenal" title="Tactical_Arsenal" icon={Shield}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {RESUME.skills.map((skillGroup, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black border border-slate-800 p-6 rounded hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] transition-all group z-10"
                >
                  <h3 className="font-mono text-blue-400 mb-4 text-sm tracking-wider border-b border-blue-500/20 pb-2">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2 py-1 bg-slate-900 text-slate-300 text-xs font-mono border border-slate-700 rounded group-hover:border-slate-500 group-hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 p-6 border border-dashed border-slate-700 rounded bg-slate-900/30 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-mono z-10">
              <div className="flex items-center gap-4">
                 <div className="p-2 bg-white/5 rounded">
                   <Code2 className="w-5 h-5 text-yellow-500" />
                 </div>
                 <div>
                   <div className="text-white">Pranveer Singh Institute of Technology</div>
                   <div>B.Tech in Computer Science</div>
                 </div>
              </div>
              <div className="mt-4 md:mt-0 px-3 py-1 bg-slate-800 rounded">
                2018 - 2022
              </div>
            </div>
          </TechSection>

          {/* Footer */}
          <footer className="py-8 text-center border-t border-slate-900 bg-black relative z-10">
             <div className="flex justify-center items-center gap-2 mb-4">
                <Batarang className="w-6 h-6 text-slate-700" />
             </div>
             <p className="text-slate-600 font-mono text-xs">
               DESIGNED IN GOTHAM // DEPLOYED BY KRISHNA VISHWAKARMA
             </p>
             <p className="text-slate-700 font-mono text-[10px] mt-2">
               SYSTEM INTEGRITY: 100%
             </p>
          </footer>

        </motion.div>
      )}
    </div>
  );
}