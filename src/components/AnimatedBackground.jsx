import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const starsRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Generate stars
    const starCount = 100;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
      const star = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        size
      };
      stars.push(star);
    }

    // Generate particles
    const particleCount = 20;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const particle = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      };
      particles.push(particle);
    }

    // Render stars
    if (starsRef.current) {
      starsRef.current.innerHTML = stars.map((star, i) => `
        <div 
          class="absolute rounded-full animate-twinkle ${
            star.size === 'large' ? 'w-[3px] h-[3px] shadow-[0_0_6px_rgba(255,255,255,0.5)]' :
            star.size === 'medium' ? 'w-[2px] h-[2px]' :
            'w-[1px] h-[1px]'
          } bg-white"
          style="left: ${star.left}; top: ${star.top}; animation-delay: ${star.animationDelay};"
        ></div>
      `).join('');
    }

    // Render particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = particles.map((particle, i) => `
        <div 
          class="fixed w-1 h-1 bg-primary/30 rounded-full pointer-events-none animate-float-particle"
          style="left: ${particle.left}; animation-delay: ${particle.animationDelay}; animation-duration: ${particle.animationDuration};"
        ></div>
      `).join('');
    }
  }, []);

  return (
    <>
      {/* Animated gradient background */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-dark-900 via-purple-950/20 to-dark-900 bg-[length:400%_400%] animate-gradient-flow -z-10" />
      
      {/* Starfield */}
      <div ref={starsRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
    </>
  );
};

export default AnimatedBackground;
