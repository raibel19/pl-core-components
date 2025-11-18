import { Close } from '@carbon/icons-react';
import { forwardRef } from 'react';

import { cn } from '../../../lib/utils';
import { useAutocompleteActionsContext, useAutocompleteContext } from './context';

interface AutocompleteHeaderClearButtonProps {
  className?: string;
  classNameIcon?: string;
}

export default forwardRef<HTMLButtonElement, AutocompleteHeaderClearButtonProps>(
  function AutocompleteHeaderClearButton(props, ref) {
    const { className, classNameIcon } = props;

    const { lastValidSelection, isLoading } = useAutocompleteContext();
    const { onReset } = useAutocompleteActionsContext();

    if (!lastValidSelection || isLoading) return null;

    return (
      <div className={cn('absolute inset-y-0 right-0 flex items-center pe-1.5', className || null)}>
        <button
          ref={ref}
          className={cn(
            'pointer-events-auto text-muted-foreground transition-colors hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
          aria-label="clear input"
          onMouseDown={(e) => e.preventDefault}
          onClick={() => onReset({ closePopover: false })}
        >
          <Close className={classNameIcon} size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    );
  },
);
