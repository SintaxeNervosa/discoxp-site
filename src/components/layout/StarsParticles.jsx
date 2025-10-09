import { useEffect, useRef } from 'react';

export function StarsParticles({ count, color }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // limpaa estrelas que existentes
    container.innerHTML = '';

    // cria estrelas
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // tamanhos aleatorios das estrelas
      const sizes = ['small', 'medium', 'large'];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      star.classList.add(size);
      
      // todas estrelas se movem
        star.classList.add('moving');
      
      // Posion aleatoria
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // opacidade e duracao aleatorias
      const opacity = Math.random() * 0.7 + 0.3;
      const duration = Math.random() * 5 + 3 + 's';
      
      star.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        background: ${color};
        --opacity: ${opacity};
        --duration: ${duration};
        animation-delay: ${Math.random() * 5}s;
      `;
      
      container.appendChild(star);
    }

    // Cleanup
    return () => {
      container.innerHTML = '';
    };
  }, [count, color]);

  return <div ref={containerRef} className="stars-container" />;
}