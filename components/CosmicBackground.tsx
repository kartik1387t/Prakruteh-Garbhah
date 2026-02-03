import React, { useEffect, useState } from 'react';

const CosmicBackground: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [stars, setStars] = useState<{top: number, left: number, size: number, delay: number}[]>([]);

  // Generate random stars on mount
  useEffect(() => {
    const starArray = Array.from({ length: 100 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5
    }));
    setStars(starArray);
  }, []);

  // Listen for scroll/wheel to move the cosmos
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      setOffsetY(prev => prev + e.deltaY * 0.5);
    };
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-black overflow-hidden">
      
      {/* 1. Deep Cosmos Background (Moving) */}
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050A15] to-black transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${-offsetY * 0.05}px)` }}
      ></div>

      {/* 2. Stars (Moving Parallax) */}
      <div className="absolute inset-0 w-full h-full" style={{ transform: `translateY(${-offsetY * 0.1}px)` }}>
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`
            }}
          ></div>
        ))}
      </div>

      {/* 3. Black Hole / Galaxy Spiral (Rotating) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 animate-spin-ultra-slow mix-blend-screen">
         <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_30%,#4338ca_60%,transparent_70%)] rounded-full blur-3xl"></div>
         <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.1),transparent)] rounded-full"></div>
      </div>

      {/* 4. The Rotating Swastik (Behind Shiva) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[10%] w-[600px] h-[600px] flex items-center justify-center opacity-40 mix-blend-plus-lighter z-10">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-red-600 animate-spin-slow drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]"
          style={{ transformOrigin: 'center' }}
        >
           {/* Stylized Swastika */}
           <path 
             fill="currentColor" 
             d="M45,55 L45,90 L55,90 L55,55 L90,55 L90,45 L55,45 L55,10 L45,10 L45,45 L10,45 L10,55 Z"
           />
           {/* Decorative Dots */}
           <circle cx="30" cy="30" r="3" fill="currentColor" />
           <circle cx="70" cy="30" r="3" fill="currentColor" />
           <circle cx="70" cy="70" r="3" fill="currentColor" />
           <circle cx="30" cy="70" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* 5. Lord Shiva Silhouette (Fixed, Foreground) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[600px] h-[700px] flex items-end justify-center">
         {/* Simple SVG Silhouette representation for Shiva in Meditation */}
         <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_-10px_40px_rgba(255,153,51,0.2)]">
            <defs>
              <linearGradient id="shivaGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#000" />
                <stop offset="80%" stopColor="#111" />
                <stop offset="100%" stopColor="#222" />
              </linearGradient>
            </defs>
            {/* Body */}
            <path 
              d="M100,500 L300,500 L350,400 Q360,350 320,300 Q350,250 320,200 L250,150 Q200,100 150,150 L80,200 Q50,250 80,300 Q40,350 50,400 Z" 
              fill="url(#shivaGradient)" 
            />
            {/* Head/Hair (Jata) */}
            <path d="M170,150 Q200,120 230,150 L230,130 Q200,80 170,130 Z" fill="black" />
            <circle cx="200" cy="150" r="35" fill="black" />
            
            {/* Trident (Trishul) - Standing on Right Side */}
            <g transform="translate(320, 100) scale(0.8)">
               <path d="M10,0 L10,400" stroke="#9ca3af" strokeWidth="4" />
               <path d="M10,20 Q-20,-10 -30,50" fill="none" stroke="#d1d5db" strokeWidth="4" />
               <path d="M10,20 Q40,-10 50,50" fill="none" stroke="#d1d5db" strokeWidth="4" />
               <path d="M10,0 L10,60" stroke="#d1d5db" strokeWidth="4" />
               {/* Damru tied to Trishul */}
               <path d="M10,120 L-10,110 L-10,130 Z" fill="#78350f" />
               <path d="M10,120 L30,110 L30,130 Z" fill="#78350f" />
            </g>
         </svg>
      </div>

    </div>
  );
};

export default CosmicBackground;