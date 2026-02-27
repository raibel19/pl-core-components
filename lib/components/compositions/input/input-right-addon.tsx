import { forwardRef, ReactNode, useLayoutEffect, useRef } from 'react';

import mergeRefs from '../../../lib/merge-refs';
import { cn } from '../../../lib/utils';
import { useInputLayoutContext } from './context';
import useResizeObserver from './hooks/use-resize-observer';

export interface InputRightAddonProps {
  children: ReactNode;
  className?: string;
}

export default forwardRef<HTMLDivElement, InputRightAddonProps>(function InputRightAddon(props, ref) {
  const { children, className } = props;

  const addonRef = useRef<HTMLDivElement>(null);
  const { setRightAddonWidth } = useInputLayoutContext();

  useResizeObserver(addonRef, (entry) => {
    const divWidth = entry.contentRect.width;
    const width = divWidth ? `${divWidth + 16}px` : '0.75rem';
    setRightAddonWidth(width);
  });

  useLayoutEffect(() => {
    if (addonRef.current) {
      const divWidth = addonRef.current.getBoundingClientRect().width;
      const width = divWidth ? `${divWidth + 16}px` : '0.75rem';
      setRightAddonWidth(width);
    }
  }, [setRightAddonWidth]);

  const mergeRef = mergeRefs(ref, addonRef);

  return (
    <div
      ref={mergeRef}
      className={cn('pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3', className)}
    >
      {children}
    </div>
  );
});
