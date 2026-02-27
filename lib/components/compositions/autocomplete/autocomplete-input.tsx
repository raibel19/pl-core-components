import { Command } from 'cmdk';
import { ComponentPropsWithoutRef, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '../../../lib/utils';
import { Input } from '../../ui/input';
import { PopoverTrigger } from '../../ui/popover';
import { inputVariants } from './autocomplete-input.variants';
import {
  useAutocompleteActionsContext,
  useAutocompleteLayoutContext,
  useAutocompleteStableContext,
  useAutocompleteVolatileContext,
} from './context';

export type AutocompleteInputRef = HTMLInputElement & {};

export type AutocompleteInputProps = ComponentPropsWithoutRef<'input'>;

export default forwardRef<AutocompleteInputRef, AutocompleteInputProps>(function AutocompleteInput(props, ref) {
  const {
    className,
    onKeyDown: onKeyDownNative,
    onMouseDown: onMouseDownNative,
    onFocus: onFocusNative,
    onBlur: onBlurNative,
    ...moreProps
  } = props;

  const { isInvalid, id } = useAutocompleteStableContext();
  const { inputValue } = useAutocompleteVolatileContext();
  const { onChange, onkeyDown, onMouseDown, onFocus, onBlur } = useAutocompleteActionsContext();
  const { leftAddonWidth, rightAddonWidth } = useAutocompleteLayoutContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    const node = inputRef.current;

    if (!node) return null as unknown as AutocompleteInputRef;

    // const extendedNode = node as AutocompleteInputRef;
    // extendedNode.extraFn = () => {
    //   console.log('Extra function called');
    // };

    // return extendedNode;
    return node as AutocompleteInputRef;
  });

  const handleOnkeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      onkeyDown(event);
      onKeyDownNative?.(event);
    },
    [onKeyDownNative, onkeyDown],
  );

  const handleOnMouseDown = useCallback(
    (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      onMouseDown(event);
      onMouseDownNative?.(event);
    },
    [onMouseDown, onMouseDownNative],
  );

  const handleOnFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element>) => {
      onFocus();
      onFocusNative?.(event);
    },
    [onFocus, onFocusNative],
  );

  const handleOnBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element>) => {
      onBlur(event);
      onBlurNative?.(event);
    },
    [onBlur, onBlurNative],
  );

  return (
    <PopoverTrigger asChild>
      <Command.Input
        asChild
        ref={inputRef}
        {...moreProps}
        id={id}
        value={inputValue}
        onValueChange={onChange}
        onKeyDown={handleOnkeyDown}
        onMouseDown={handleOnMouseDown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        <Input
          className={cn(
            inputVariants({ isError: isInvalid }),
            leftAddonWidth && 'ps-[--leftWidth]',
            rightAddonWidth && 'pe-[--rightWidth]',
            className || null,
          )}
          style={{ '--leftWidth': `${leftAddonWidth}`, '--rightWidth': `${rightAddonWidth}` } as React.CSSProperties}
        />
      </Command.Input>
    </PopoverTrigger>
  );
});
