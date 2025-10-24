'use client';

import React, { useEffect, useRef, useState } from 'react';

const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('github-light');

  useEffect(() => {
    // 현재 테마 감지
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

    // 초기 테마 설정
    const initialTheme = detectTheme();
    setCurrentTheme(initialTheme);

    // utterances 스크립트 로드
    if (commentRef.current && !commentRef.current.querySelector('.utterances')) {
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.setAttribute('repo', 'HelloWook/personal-blog');
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('label', 'commnets');
      script.setAttribute('theme', initialTheme);
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;

      commentRef.current.appendChild(script);
    }

    // 테마 변경 감지 (MutationObserver 사용)
    const observer = new MutationObserver(() => {
      const newTheme = detectTheme();
      if (newTheme !== currentTheme) {
        setCurrentTheme(newTheme);
        updateUtterancesTheme(newTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
    };
  }, [currentTheme]);

  return <div ref={commentRef} className='mt-10 w-full' />;
};

export default Comments;
