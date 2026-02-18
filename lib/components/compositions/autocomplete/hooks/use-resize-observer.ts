import { RefObject, useLayoutEffect, useRef } from 'react';

type ResizeObserverCallback = (entry: ResizeObserverEntry) => void;

export default function useResizeObserver<T extends HTMLElement>(
  elementRef: RefObject<T>,
  callback: ResizeObserverCallback,
) {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        callbackRef.current(entries[0]);
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);
}
