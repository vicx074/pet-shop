import React, { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);
  const requestRef = useRef(null);
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      targetScroll.current = window.scrollY;
    };

    const smoothScroll = () => {
      // Lerp (interpolação suave) - quanto menor o valor, mais suave
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.08;

      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateY(-${currentScroll.current}px)`;
      }

      requestRef.current = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener('scroll', handleScroll);
    requestRef.current = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      document.body.style.height = `${scrollRef.current.offsetHeight}px`;
    }
  }, [children]);

  return (
    <div className="fixed top-0 left-0 w-full overflow-hidden">
      <div ref={scrollRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}