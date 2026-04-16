import { CloseOutline } from '@carbon/icons-react';
import { HoverCardProps } from '@radix-ui/react-hover-card';
import { TooltipProps, TooltipProviderProps } from '@radix-ui/react-tooltip';
import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import { ReactNode } from 'react';

import { cn } from '../../../lib/utils';
import Addon from '../../primitives/addon';
import { useInputActionsContext, useInputStableContext, useInputVolatileContext } from './context';
import InputAddonSeparator from './input-addon-separator';
import { AddonSeparatorProps, InputChangePayload } from './types/types';

export type InputAddonClearProps<Data = undefined> = {
  className?: string | undefined;
  classNameHoverContent?: string | undefined;
  classNameIcon?: string | undefined;
  classNameTooltipContent?: string | undefined;
  hoverConfig?: Omit<HoverCardProps, 'children'>;
  hoverContent?: ReactNode;
  icon?: React.ReactElement | undefined;
  show?: boolean;
  tooltipConfig?: Omit<TooltipProps, 'children'>;
  tooltipContent?: ReactNode;
  tooltipProviderConfig?: Omit<TooltipProviderProps, 'children'>;
  onClick?: (payload: InputChangePayload<Data>) => void;
} & AddonSeparatorProps;

export default forwardRef(function InputAddonClear<Data = undefined>(
  props: InputAddonClearProps<Data>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    classNameIcon,
    classNameSeparator,
    icon,
    show = true,
    showAddonSeparatorLeft,
    showAddonSeparatorRight,
    onClick,
    ...moreProps
  } = props;

  const { value } = useInputVolatileContext();
  const { data, isInvalid, disabled, type, initialValueRef } = useInputStableContext();
  const { onReset, isPartialNumber } = useInputActionsContext();

  const onClickHandler = useCallback(() => {
    if (type === 'number') {
      const normalizeValue = value.replace(',', '.');
      const floatValue = parseFloat(normalizeValue);

      onClick?.({
        inputType: 'number',
        data: data as Data,
        initialValue: initialValueRef.current,
        value,
        isComplete: !isPartialNumber(value),
        floatValue: isNaN(floatValue) ? undefined : floatValue,
      });
    } else {
      onClick?.({
        inputType: 'text',
        data: data as Data,
        initialValue: initialValueRef.current,
        value,
      });
    }
    onReset();
  }, [data, initialValueRef, isPartialNumber, onClick, onReset, type, value]);

  if (!show || value.length === 0) return null;

  let iconElement: React.ReactElement;

  if (icon) {
    const existingClassName = icon.props.className || '';
    iconElement = React.cloneElement(icon, {
      className: cn('aspect-square h-[clamp(1.13rem,55%,2rem)]', existingClassName, classNameIcon),
    });
  } else {
    iconElement = (
      <CloseOutline
        size={18}
        strokeWidth={2}
        aria-hidden="true"
        className={cn('aspect-square h-[clamp(1.13rem,55%,2rem)]', classNameIcon)}
      />
    );
  }

  return (
    <>
      {showAddonSeparatorLeft && <InputAddonSeparator className={classNameSeparator} />}
      <Addon
        as={'button'}
        ref={ref}
        variant={{ isError: isInvalid, type: 'clear', isDisabled: disabled }}
        {...moreProps}
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClickHandler}
        aria-disabled={disabled}
      >
        {iconElement}
      </Addon>
      {showAddonSeparatorRight && <InputAddonSeparator className={classNameSeparator} />}
    </>
  );
}) as <Data = undefined>(
  props: InputAddonClearProps<Data> & { ref?: ForwardedRef<HTMLButtonElement> },
) => React.JSX.Element;
