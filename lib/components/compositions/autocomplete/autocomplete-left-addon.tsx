import { forwardRef, ReactNode, useLayoutEffect, useRef } from 'react';

import mergeRefs from '../../../lib/merge-refs';
import { cn } from '../../../lib/utils';
import { useAutocompleteLayoutContext } from './context';
import useResizeObserver from './hooks/use-resize-observer';

interface AutocompleteLeftAddonProps {
  children: ReactNode;
  className?: string;
}

export default forwardRef<HTMLDivElement, AutocompleteLeftAddonProps>(function AutocompleteLeftAddon(props, ref) {
  const { children, className } = props;

  const addonRef = useRef<HTMLDivElement>(null);
  const { setLeftAddonWidth } = useAutocompleteLayoutContext();

  useResizeObserver(addonRef, (entry) => {
    const divWidth = entry.contentRect.width;
    const width = divWidth ? `${divWidth + 7}px` : '0.75rem';
    setLeftAddonWidth(width);
  });

  useLayoutEffect(() => {
    if (addonRef.current) {
      const divWidth = addonRef.current.getBoundingClientRect().width;
      const width = divWidth ? `${divWidth + 7}px` : '0.75rem';
      setLeftAddonWidth(width);
    }
  }, [setLeftAddonWidth]);

  const mergeRef = mergeRefs(ref, addonRef);

  return (
    <div ref={mergeRef} className={cn('pointer-events-none absolute inset-y-0 start-0 flex items-center', className)}>
      {children}
    </div>
  );
});
