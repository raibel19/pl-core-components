import { forwardRef, ReactNode } from 'react';

import { cn } from '../../../lib/utils';
import { Separator } from '../../ui/separator';

interface AutocompleteHeaderProps {
  children?: ReactNode;
  className?: string;
  showSeparator?: boolean;
  classNameSeparator?: string;
}

export default forwardRef<HTMLDivElement, AutocompleteHeaderProps>(function AutocompleteHeader(props, ref) {
  const { children, className, showSeparator = true, classNameSeparator } = props;

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'sticky top-0 z-10 min-h-8 content-center rounded-t-sm bg-background px-9 py-1.5 text-xs font-medium text-foreground',
          className || null,
        )}
        onMouseDown={(e) => e.preventDefault()}
      >
        {children}
      </div>
      {showSeparator && <Separator orientation="horizontal" className={cn('bg-border', classNameSeparator || null)} />}
    </>
  );
});
