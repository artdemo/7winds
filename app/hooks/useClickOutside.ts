import { useRef, useEffect } from 'react';

export const useClickOutside = (callback: () => void) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !(ref.current as Node).contains(e.target as Node)) callback();
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};
