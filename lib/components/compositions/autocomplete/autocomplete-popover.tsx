import { ComponentPropsWithoutRef, forwardRef, ReactNode, useEffect, useState } from 'react';

import { cn } from '../../../lib/utils';
import { PopoverContent } from '../../ui/popover';
import { useAutocompleteStableContext } from './context';
interface AutocompletePopoverProps extends ComponentPropsWithoutRef<typeof PopoverContent> {
  children: ReactNode;
  className?: string;
}

export default forwardRef<HTMLDivElement, AutocompletePopoverProps>(function AutocompletePopover(props, ref) {
  const { children, className, ...moreProps } = props;

  const { isOpen } = useAutocompleteStableContext();

  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;

    if (isOpen) setShouldRender(true);
    else {
      timeOut = setTimeout(() => {
        setShouldRender(false);
      }, 150);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [isOpen]);

  return (
    <PopoverContent
      ref={ref}
      {...moreProps}
      onOpenAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={(e) => {
        if (e.target instanceof Element && e.target.hasAttribute('cmdk-input')) {
          e.preventDefault();
        }
      }}
      className={cn('w-[--radix-popover-trigger-width] p-0', className || null)}
    >
      {shouldRender ? children : null}
    </PopoverContent>
  );
});
