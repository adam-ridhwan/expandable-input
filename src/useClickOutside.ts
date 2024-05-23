import { MutableRefObject, useEffect, useRef } from 'react';

type Handler = () => void;

export const useClickOutside = <T extends HTMLElement>(
  handler: Handler
): MutableRefObject<T> => {
  const node = useRef<T>(null as unknown as T);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current && !node.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return node;
};
