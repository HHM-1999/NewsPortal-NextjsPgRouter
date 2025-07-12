'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    // Clean up listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="button"
      onClick={scrollToTop}
      className={`btn btn-primary back-to-top-button ${show ? 'show' : ''}`}
      aria-label="Back to Top"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        display: show ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        zIndex: 1000,
        cursor: 'pointer',
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
}
