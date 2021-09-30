import { useRef } from 'react';

type Debounce = (ms: number, cb: () => void) => void;

const useDebouncing = (): Debounce => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce: Debounce = (ms, cb) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const timeout = setTimeout(() => {
      cb();
      timeoutRef.current = null;
    }, ms);

    timeoutRef.current = timeout;
  };

  return debounce;
};

export default useDebouncing;
