import { HoverCardProps } from '@radix-ui/react-hover-card';
import { TooltipProps, TooltipProviderProps } from '@radix-ui/react-tooltip';
import { forwardRef, ReactNode } from 'react';

import Addon from '../../primitives/addon';
import AutocompleteAddonSeparator from './autocomplete-addon-separator';
import { useAutocompleteStableContext } from './context';
import { AddonSeparatorProps } from './types/types';

export type AutocompleteAddonTextProps = {
  className?: string | undefined;
  classNameHoverContent?: string | undefined;
  classNameTooltipContent?: string | undefined;
  hoverConfig?: Omit<HoverCardProps, 'children'>;
  hoverContent?: ReactNode;
  show?: boolean;
  text: string;
  tooltipConfig?: Omit<TooltipProps, 'children'>;
  tooltipContent?: ReactNode;
  tooltipProviderConfig?: Omit<TooltipProviderProps, 'children'>;
} & AddonSeparatorProps;

export default forwardRef<HTMLSpanElement, AutocompleteAddonTextProps>(function AutocompleteAddonText(props, ref) {
  const {
    classNameSeparator,
    show = true,
    showAddonSeparatorLeft,
    showAddonSeparatorRight,
    text,
    ...moreProps
  } = props;

  const { isInvalid, disabled } = useAutocompleteStableContext();

  if (!show) return null;

  return (
    <>
      {showAddonSeparatorLeft && <AutocompleteAddonSeparator className={classNameSeparator} />}
      <Addon
        as={'span'}
        ref={ref}
        variant={{ isError: isInvalid, type: 'text', isDisabled: disabled }}
        {...moreProps}
        onMouseDown={(e) => e.preventDefault()}
        aria-disabled={disabled}
      >
        {text}
      </Addon>
      {showAddonSeparatorRight && <AutocompleteAddonSeparator className={classNameSeparator} />}
    </>
  );
});
