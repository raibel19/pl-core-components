import { forwardRef } from 'react';

import { cn } from '../../../lib/utils';
import { Separator } from '../../ui/separator';
import { separatorVariants } from './autocomplete-addon-separator.variants';
import { useAutocompleteStableContext } from './context';

export interface AutocompleteAddonSeparatorProps {
  show?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, AutocompleteAddonSeparatorProps>(
  function AutocompleteAddonSeparator(props, ref) {
    const { show = true, className } = props;
    const { isInvalid, disabled } = useAutocompleteStableContext();

    if (!show) return null;

    return (
      <Separator
        ref={ref}
        className={cn(separatorVariants({ isInvalid, disabled }), className || null)}
        orientation="vertical"
      />
    );
  },
);
