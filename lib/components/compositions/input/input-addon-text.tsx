import { HoverCardProps } from '@radix-ui/react-hover-card';
import { TooltipProps, TooltipProviderProps } from '@radix-ui/react-tooltip';
import { forwardRef, ReactNode } from 'react';

import Addon from '../../primitives/addon';
import { useInputStableContext } from './context';
import InputAddonSeparator from './input-addon-separator';
import { AddonSeparatorProps } from './types/types';

export type InputAddonTextProps = {
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

export default forwardRef<HTMLSpanElement, InputAddonTextProps>(function InputAddonText(props, ref) {
  const {
    classNameSeparator,
    show = true,
    showAddonSeparatorLeft,
    showAddonSeparatorRight,
    text,
    ...moreProps
  } = props;

  const { isInvalid, disabled } = useInputStableContext();

  if (!show) return null;

  return (
    <>
      {showAddonSeparatorLeft && <InputAddonSeparator className={classNameSeparator} />}
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
      {showAddonSeparatorRight && <InputAddonSeparator className={classNameSeparator} />}
    </>
  );
});
