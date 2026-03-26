'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';

const NavigationProgress = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(false);
    setProgress(100);
    const timer = setTimeout(() => setProgress(0), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!loading) return;

    setProgress(20);
    const t1 = setTimeout(() => setProgress(50), 150);
    const t2 = setTimeout(() => setProgress(70), 400);
    const t3 = setTimeout(() => setProgress(85), 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [loading]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('/') && href !== pathname) {
        setLoading(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  if (progress === 0) return null;

  return (
    <div className='fixed top-0 left-0 right-0 z-[9999] h-[3px]'>
      <div
        className='h-full bg-primary transition-all ease-out'
        style={{
          width: `${progress}%`,
          transitionDuration: loading ? '800ms' : '200ms',
        }}
      />
    </div>
  );
};

export default NavigationProgress;
