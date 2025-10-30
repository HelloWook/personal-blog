'use client';

import React, { useEffect, useRef } from 'react';

const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  const detectTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'synthwave' ? 'github-dark' : 'github-light';
  };

  const updateUtterancesTheme = (theme: string) => {
    const iframe = document.querySelector<HTMLIFrameElement>('.utterances-frame');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'set-theme', theme }, 'https://utteranc.es');
    }
  };

  useEffect(() => {
    const container = commentRef.current;
    if (!container) return;

    if (container.querySelector('.utterances')) {
      return;
    }

    const initialTheme = detectTheme();
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'HelloWook/personal-blog');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'commnets');
    script.setAttribute('theme', initialTheme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);

    return () => {
      const utterances = container.querySelector('.utterances');
      if (utterances) {
        utterances.remove();
      }
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = detectTheme();
      updateUtterancesTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={commentRef} className='w-full mt-10' />;
};

export default Comments;
