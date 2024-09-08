import { useRef, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const timeoutHandler = useRef<ReturnType<typeof setTimeout> | null>(null);

    if (timeoutHandler.current) {
        clearTimeout(timeoutHandler.current);
    }

    timeoutHandler.current = setTimeout(() => {
        setDebouncedValue(value);
    }, delay);

  return debouncedValue;
};