'use client';

import { useEffect, useState } from 'react';
import { Heading } from '@/utils/extractHeadings';

interface TOCProps {
  headings: Heading[];
}

const TOC = ({ headings }: TOCProps) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className='hidden 2xl:block fixed top-32 w-52 left-[calc(50%+480px)]'>
      <p className='mb-2 text-sm font-semibold text-gray-500'>목차</p>
      <ul className='space-y-2 border-l-2 border-gray-300 dark:border-gray-600 pl-4 max-h-[70vh] overflow-y-auto'>
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-3' : ''}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm leading-relaxed transition-colors ${
                activeId === heading.id
                  ? 'text-blue-500 font-semibold'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
