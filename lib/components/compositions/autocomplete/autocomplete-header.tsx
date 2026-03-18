import { forwardRef, ReactNode } from 'react';

import { cn } from '../../../lib/utils';
import { Separator } from '../../ui/separator';
import AutocompleteHeaderClearButton from './autocomplete-header-clear-button';

type AutocompleteHeaderClearButtonProps =
  | {
      showClearButton?: false;
      classNameClearButton?: never;
      classNameIconClearButton?: never;
    }
  | {
      showClearButton: true;
      classNameClearButton?: string;
      classNameIconClearButton?: string;
    };

export type AutocompleteHeaderProps = {
  children?: ReactNode;
  className?: string;
  showSeparator?: boolean;
  classNameSeparator?: string;
} & AutocompleteHeaderClearButtonProps;

export default forwardRef<HTMLDivElement, AutocompleteHeaderProps>(function AutocompleteHeader(props, ref) {
  const {
    children,
    className,
    classNameClearButton,
    classNameIconClearButton,
    classNameSeparator,
    showClearButton = true,
    showSeparator = true,
  } = props;

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
        {showClearButton && (
          <AutocompleteHeaderClearButton className={classNameClearButton} classNameIcon={classNameIconClearButton} />
        )}
      </div>
      {showSeparator && <Separator orientation="horizontal" className={cn('bg-border', classNameSeparator || null)} />}
    </>
  );
});
