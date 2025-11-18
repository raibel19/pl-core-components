import { ForwardedRef, forwardRef, ReactNode, useEffect, useId, useMemo, useState } from 'react';

import { cn } from '../../../lib/utils';
import {
  AutocompleteActionsContext,
  AutocompleteActionsContextProps,
  AutocompleteContext,
  AutocompleteContextProps,
  AutocompleteLayoutContext,
  AutocompleteLayoutContextProps,
} from './context';
import useManagedAutocomplete from './hooks/use-managed-autocomplete';
import { AutocompleteStateChangePayload, IItem, Items } from './types/types';

interface BaseAutocompleteRootProps<Data> {
  blurAction?: 'restore' | 'clear'; // | 'keep';
  children: ReactNode;
  className?: string;
  data?: Data;
  defaultValue?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  items: Items;
  minLengthRequired?: number;
  reset?: boolean;
  resetOnReselect?: boolean;
  value?: string;
  onStateChange?: (payload: AutocompleteStateChangePayload<Data>) => void;
  setReset?: React.Dispatch<React.SetStateAction<boolean>>;
  subscribeIsInvalid?: (isInvalid: boolean) => void;
}

type AutocompleteRootProps<Data> = BaseAutocompleteRootProps<Data> &
  (
    | {
        mode: 'async';
        loading?: boolean;
      }
    | {
        mode: 'static';
        filterItems?: (items: IItem[], inputValue: string) => IItem[];
      }
  );

export default forwardRef(function AutocompleteRoot<Data>(
  props: AutocompleteRootProps<Data>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    blurAction = 'restore',
    children,
    className,
    data,
    defaultValue,
    disabled,
    isInvalid,
    items,
    minLengthRequired = 0,
    mode = 'async',
    reset,
    resetOnReselect,
    value,
    onStateChange,
    setReset,
    subscribeIsInvalid,
  } = props;

  const id = useId();

  const [leftAddonWidth, setLeftAddonWidth] = useState<string | number>(0);
  const [rightAddonWidth, setRightAddonWidth] = useState<string | number>(0);

  const resolvedVariantsProps = useMemo(() => {
    if (props.mode === 'async') {
      return { filterItems: undefined, loading: props.loading ?? false };
    }
    return { filterItems: props.filterItems, loading: false };
  }, [props]);

  const {
    errors,
    initialValueRef,
    state,
    onBlur,
    onChange,
    onFocus,
    onkeyDown,
    onMouseDown,
    onPreSelectItem,
    onReset,
    onSelectItem,
    onToogleLoading,
    onTooglePopover,
    registerKeydownOverride,
  } = useManagedAutocomplete<Data>({
    blurAction,
    data,
    defaultValue,
    items,
    loading: resolvedVariantsProps.loading,
    minLengthRequired,
    mode,
    reset,
    resetOnReselect,
    value,
    onStateChange,
    setReset,
    filterItems: resolvedVariantsProps.filterItems,
  });

  const isInvalidMemo = useMemo(() => isInvalid || Boolean(errors.length), [errors.length, isInvalid]);

  const contextValue = useMemo<AutocompleteContextProps>(
    () => ({
      filteredItems: state.filteredItems,
      initialValueRef,
      inputValue: state.inputValue,
      isInvalid: isInvalidMemo,
      isLoading: state.isLoading,
      isOpen: state.isOpen,
      isSearching: state.isSearching,
      lastValidSelection: state.lastValidSelection,
      preSelectedValue: state.preSelectedValue,
      selectedValue: state.selectedValue,
    }),
    [
      initialValueRef,
      isInvalidMemo,
      state.filteredItems,
      state.inputValue,
      state.isLoading,
      state.isOpen,
      state.isSearching,
      state.lastValidSelection,
      state.preSelectedValue,
      state.selectedValue,
    ],
  );

  const contextActionsValue = useMemo<AutocompleteActionsContextProps<Data>>(
    () => ({
      data,
      disabled,
      errors,
      id,
      minLengthRequired,
      onBlur,
      onChange,
      onFocus,
      onkeyDown,
      onMouseDown,
      onPreSelectItem,
      onReset,
      onSelectItem,
      onToogleLoading,
      onTooglePopover,
      registerKeydownOverride,
    }),
    [
      data,
      disabled,
      errors,
      id,
      minLengthRequired,
      onBlur,
      onChange,
      onFocus,
      onkeyDown,
      onMouseDown,
      onPreSelectItem,
      onReset,
      onSelectItem,
      onToogleLoading,
      onTooglePopover,
      registerKeydownOverride,
    ],
  );

  const constextLayoutValue = useMemo<AutocompleteLayoutContextProps>(
    () => ({ leftAddonWidth, rightAddonWidth, setLeftAddonWidth, setRightAddonWidth }),
    [leftAddonWidth, rightAddonWidth],
  );

  useEffect(() => {
    const id = setTimeout(() => {
      subscribeIsInvalid?.(isInvalidMemo);
    }, 200);

    return () => {
      clearTimeout(id);
    };
  }, [isInvalidMemo, subscribeIsInvalid]);

  return (
    <div ref={ref} className={cn('w-full space-y-1', className || null)}>
      <div className="relative w-full">
        <AutocompleteLayoutContext.Provider value={constextLayoutValue}>
          <AutocompleteContext.Provider value={contextValue}>
            <AutocompleteActionsContext.Provider value={contextActionsValue}>
              {children}
            </AutocompleteActionsContext.Provider>
          </AutocompleteContext.Provider>
        </AutocompleteLayoutContext.Provider>
      </div>
    </div>
  );
}) as <Data>(props: AutocompleteRootProps<Data> & { ref?: ForwardedRef<HTMLDivElement> }) => React.JSX.Element;
