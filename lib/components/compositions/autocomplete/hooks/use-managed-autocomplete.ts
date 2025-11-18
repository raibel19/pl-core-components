import { useCallback, useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { djb2Hash } from 'ux-pl/utils/hash';

import {
  IAutocompleteState,
  IItem,
  AutocompleteStateChangePayload,
  ItemsWithIdentifier,
  nonOpeningKeys,
} from '../types/types';
import { autocompleteReduce, errorReducer, findMatchingItem, formatStr } from '../utils/utils';

interface UseManagedAutocompleteProps<Data> {
  blurAction: 'restore' | 'clear' | 'keep';
  data?: Data;
  defaultValue?: string;
  items: { data: IItem[]; searchValue: string | null };
  loading: boolean;
  minLengthRequired: number;
  mode: 'async' | 'static';
  reset?: boolean;
  resetOnReselect?: boolean;
  value?: string;
  filterItems?: (items: IItem[], inputValue: string) => IItem[];
  onStateChange?: (payload: AutocompleteStateChangePayload<Data>) => void;
  setReset?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useManagedAutocomplete<Data>(props: UseManagedAutocompleteProps<Data>) {
  const { defaultValue, items: itemsProps, reset, value: controlledValue, loading, onStateChange, setReset } = props;

  const isControlled = controlledValue !== undefined;

  const propsRef = useRef(props);
  const itemsCache = useRef<Map<string, string>>(new Map());
  const isControlledUpdateRef = useRef(false);
  const keyDownOverrides = useRef<Map<string, (event: React.KeyboardEvent<HTMLInputElement>) => void>>(new Map());

  const processRawItems = useCallback<(source: IItem[]) => Map<string, ItemsWithIdentifier>>((source) => {
    const processedItems = source.map<[string, ItemsWithIdentifier]>((item) => {
      const key = `${item.label.trim()}-${item.value.trim()}`;
      let identifier = itemsCache.current.get(key);

      if (!identifier) {
        identifier = djb2Hash(key);
        itemsCache.current.set(key, identifier);
      }
      return [identifier, { ...item, identifier }];
    });

    return new Map(processedItems);
  }, []);

  const registerKeydownOverride = useCallback(
    (key: string, handler: (event: React.KeyboardEvent<HTMLInputElement>) => void) => {
      keyDownOverrides.current.set(key, handler);

      return () => {
        keyDownOverrides.current.delete(key);
      };
    },
    [],
  );

  const [errors, dispatchError] = useReducer(errorReducer, new Map());
  const [state, dispatch] = useReducer(autocompleteReduce, props, (): IAutocompleteState => {
    const rawValue = isControlled ? controlledValue : (defaultValue ?? '');
    const initialItems = processRawItems(itemsProps.data);
    const matchingItems = findMatchingItem(rawValue, initialItems);

    return {
      inputValue: rawValue,
      selectedValue: matchingItems ?? null,
      isOpen: false,
      isLoading: false,
      filteredItems: initialItems,
      preSelectedValue: matchingItems?.identifier ?? '',
      isSearching: false,
      lastValidSelection: matchingItems ?? null,
    };
  });
  const initialValueRef = useRef<string>(state.inputValue);
  const lastRequestRef = useRef<string>('');
  const stateRef = useRef(state);

  const handleTooglePopover = useCallback(
    (value: boolean) => dispatch({ type: value ? 'OPEN_POPOVER' : 'CLOSE_POPOVER' }),
    [],
  );

  const handleToggleLoading = useCallback((value: boolean) => dispatch({ type: 'SET_IS_LOADING', payload: value }), []);

  const handleToggleSearching = useCallback(
    (value: boolean) => dispatch({ type: 'SET_IS_SEARCHING', payload: value }),
    [],
  );

  const handleSetFilteredItems = useCallback(
    (items: IItem[]) => {
      const processItems = processRawItems(items);
      dispatch({ type: 'SET_FILTERED_ITEMS', payload: processItems });
      return processItems;
    },
    [processRawItems],
  );

  const handleOnPreSelected = useCallback(
    (value: string) => dispatch({ type: 'SET_PRE_SELECTION_VALUE', payload: value }),
    [],
  );

  const handleReset = useCallback(
    (options?: { closePopover?: boolean }) => {
      console.log('log-handleReset');
      const { closePopover = true } = options || {};

      const initialValue = initialValueRef.current;

      if (closePopover) handleTooglePopover(false);

      lastRequestRef.current = formatStr('');
      dispatchError({ type: 'CLEAR_ERRORS' });
      dispatch({ type: 'CLEAR_SELECTION' });

      const { data, onStateChange } = propsRef.current;
      onStateChange?.({ type: 'RESET', data, initialValue, inputValue: '', selectedValue: '' });
    },
    [handleTooglePopover],
  );

  /**
   * Maneja la selección de un item, ya sea por una acción del usuario o por una actualización controlada.
   * @param {string} identifier - El identificador único del item a seleccionar.
   * @param {Map<string, ItemsWithIdentifier>} [itemsToSearchIn] - Opcional. La colección de items sobre la cual buscar. Si no se provee, se usa la lista del estado actual.
   * @param {'selected' | 'controller'} [action='selected'] - El contexto de la selección. 'selected' para interacciones del usuario (clic, Enter), 'controller' para actualizaciones programáticas.
   */
  const handleOnSelect = useCallback(
    (
      identifier: string,
      itemsToSearchIn?: Map<string, ItemsWithIdentifier>,
      action: 'selected' | 'controller' = 'selected',
    ) => {
      console.log('log-handleOnSelect / onStateChange');
      const { selectedValue, filteredItems } = stateRef.current;
      const { resetOnReselect, data, onStateChange } = propsRef.current;
      const selectedIdentifier = selectedValue?.identifier;

      if (identifier === selectedIdentifier) {
        console.log('log-handleOnSelect / if (identifier === selectedIdentifier)');
        // La lógica de 'resetOnReselect' solo debe aplicarse a interacciones directas del usuario.
        if (resetOnReselect && action === 'selected') handleReset();
        // Si la acción fue del usuario ('selected'), es una operación nula (no-op).
        // Se detiene la ejecución para no disparar eventos redundantes.
        if (action === 'selected') return;
        // Si la acción es 'controller', se permite deliberadamente que la función continúe.
        // Esto garantiza que el padre siempre reciba una confirmación 'ITEM_SELECTED'
        // después de una actualización programática, incluso si el valor es el mismo.
      }

      const items = itemsToSearchIn || filteredItems;
      const item = items.get(identifier);
      if (!item) return;

      lastRequestRef.current = formatStr(item.label);
      dispatch({ type: 'SELECT_ITEM', payload: item });
      onStateChange?.({
        type: 'ITEM_SELECTED',
        data,
        initialValue: initialValueRef.current,
        inputValue: item.label,
        selectedValue: item.value,
      });
    },
    [handleReset],
  );

  const applyItemsAndSelect = useCallback(
    (items: IItem[]) => {
      isControlledUpdateRef.current = false;
      const { inputValue } = stateRef.current;
      const processItems = handleSetFilteredItems(items);
      const matchingItems = findMatchingItem(inputValue, processItems);
      if (matchingItems) handleOnSelect(matchingItems.identifier, processItems, 'controller');
    },
    [handleOnSelect, handleSetFilteredItems],
  );

  const handleStaticFilter = useCallback(
    (items: IItem[], inputValue: string) => {
      const { mode, filterItems, minLengthRequired } = propsRef.current;

      if (mode !== 'static') return;

      if (inputValue.length < minLengthRequired) {
        handleSetFilteredItems([]);
        return;
      }

      let newItems: IItem[] = [];

      if (typeof filterItems === 'function') {
        const filtered = filterItems(items, inputValue);
        newItems = filtered;
      } else {
        if (!inputValue) {
          newItems = items;
        } else {
          newItems = items.filter((item) => formatStr(item.label).includes(formatStr(inputValue)));
        }
      }

      const fn = isControlledUpdateRef.current ? applyItemsAndSelect : handleSetFilteredItems;
      fn(newItems);
    },
    [applyItemsAndSelect, handleSetFilteredItems],
  );

  const handleOnStateChange = useDebouncedCallback((value: string) => {
    const { data, value: propsValue } = propsRef.current;
    const { lastValidSelection, inputValue } = stateRef.current;

    lastRequestRef.current = formatStr(value);

    console.log('log-handleOnStateChange', {
      inputValue,
      value,
      propsValue,
      searchValue: itemsProps.searchValue,
      lastRequestRef: lastRequestRef.current,
    });
    onStateChange?.({
      type: 'INPUT_CHANGE',
      data,
      initialValue: initialValueRef.current,
      inputValue: value,
      selectedValue: lastValidSelection?.value ?? '',
    });
  }, 200);

  const handleChange = useCallback(
    (value: string, openPopover: boolean = true) => {
      console.log('handleChange', value);
      // if (value === '' && stateRef.current.lastValidSelection) {
      //   console.log('handleChange - CANCEL', value);
      //   handleOnStateChange.cancel();
      //   handleReset({ closePopover: false });
      //   return;
      // }

      const { minLengthRequired, mode } = propsRef.current;
      let clearItems = false;

      if (mode === 'async') {
        clearItems = true; //value.length < minLengthRequired || (value.length === 0 && minLengthRequired > 0);
        handleToggleSearching(value.length >= minLengthRequired);
      }

      dispatch({ type: 'SET_INPUT_VALUE', payload: { value, openPopover, clearItems } });
      handleOnStateChange(value);
    },
    [handleOnStateChange, handleToggleSearching],
  );

  const handleOpenAndRepopulate = useCallback(() => {
    const { minLengthRequired, mode, items } = propsRef.current;
    const { inputValue, selectedValue } = stateRef.current;

    if (inputValue.length < minLengthRequired) {
      return;
    }

    if (mode === 'static') {
      handleStaticFilter(items.data, inputValue);
    } else {
      const isResponseIrrelevantToInput = formatStr(inputValue) !== formatStr(items.searchValue ?? '');
      handleSetFilteredItems(isResponseIrrelevantToInput ? [] : items.data);
    }

    const currentSelectedValue = selectedValue;
    if (currentSelectedValue) {
      console.log('log-handleOpenAndRepopulate / if (currentSelectedValue)');
      lastRequestRef.current = formatStr(currentSelectedValue.label);
      handleOnPreSelected(currentSelectedValue.identifier);
    }
  }, [handleOnPreSelected, handleSetFilteredItems, handleStaticFilter]);

  const handleOnkeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const key = event.key;

      if (keyDownOverrides.current.has(key)) {
        keyDownOverrides.current.get(key)!(event);
        return;
      }

      if (key !== 'Enter') {
        if (!nonOpeningKeys.includes(key)) handleTooglePopover(true);
        return;
      }

      event.preventDefault();
      handleTooglePopover(false);

      const preselectValue = stateRef.current.preSelectedValue;
      if (preselectValue) handleOnSelect(preselectValue);
    },
    [handleOnSelect, handleTooglePopover],
  );

  const handleOnMouseDown = useCallback(() => handleOpenAndRepopulate(), [handleOpenAndRepopulate]);

  const handleOnFocus = useCallback(() => handleOpenAndRepopulate(), [handleOpenAndRepopulate]);

  const handleOnBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element>) => {
      handleOnStateChange.cancel();
      console.log('log-handleOnBlur / handleOnStateChange.cancel()');
      const { blurAction, data, onStateChange } = propsRef.current;
      const { inputValue, lastValidSelection } = stateRef.current;

      const hasCmdkInput = event.relatedTarget?.hasAttribute('cmdk-input');

      if (!hasCmdkInput && formatStr(inputValue) !== formatStr(lastValidSelection?.label)) {
        switch (blurAction) {
          case 'restore':
            if (lastValidSelection) {
              console.log('log-handleOnBlur / lastValidSelection');
              lastRequestRef.current = formatStr(lastValidSelection.label);
              dispatch({ type: 'SELECT_ITEM', payload: lastValidSelection });

              onStateChange?.({
                type: 'INPUT_CHANGE',
                data,
                initialValue: initialValueRef.current,
                inputValue: lastValidSelection.label,
                selectedValue: lastValidSelection.value,
              });
            } else {
              console.log('log-handleOnBlur / restore / else / handleReset()');
              handleReset();
            }
            break;
          case 'clear':
            console.log('log-handleOnBlur / clear / handleReset()');
            handleReset();
            break;
          case 'keep':
            console.log('log-handleOnBlur / keep');
            break;
        }
      }
    },
    [handleOnStateChange, handleReset],
  );

  useLayoutEffect(() => {
    propsRef.current = props;
  }, [props]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (!isControlled) return;

    const { inputValue } = stateRef.current;

    if (formatStr(controlledValue) !== formatStr(inputValue)) {
      console.log('log-if (formatStr(controlledValue) !== formatStr(inputValue))', { controlledValue, inputValue });
      isControlledUpdateRef.current = true;
      handleChange(controlledValue, false);
    }
  }, [controlledValue, handleChange, isControlled]);

  useEffect(() => {
    const { minLengthRequired, mode } = propsRef.current;

    if (mode !== 'async') return;

    const { inputValue } = stateRef.current;
    const searchValue = itemsProps.searchValue;
    const newItems = itemsProps.data;

    console.log('log-1', { inputValue, searchValue, newItems });
    handleToggleLoading(loading);

    if (loading) {
      console.log('log-2', { inputValue, searchValue, newItems });
      handleToggleSearching(true);
      return;
    }

    const fn = isControlledUpdateRef.current ? applyItemsAndSelect : handleSetFilteredItems;

    if (inputValue.length < minLengthRequired) {
      console.log('log-3', { inputValue, searchValue, newItems });
      fn([]);
      handleToggleSearching(false);
      return;
    }

    if (searchValue === null) {
      console.log('log-4', { inputValue, searchValue, newItems });
      fn(newItems);
      handleToggleSearching(false);
      return;
    }

    const isObsoleteRequest = searchValue !== null && formatStr(searchValue) !== lastRequestRef.current;
    const isResponseIrrelevantToInput = formatStr(inputValue) !== formatStr(searchValue ?? '');

    if (isObsoleteRequest || isResponseIrrelevantToInput) {
      console.log('log-5', { inputValue, searchValue, newItems });
      fn([]);
      return;
    }

    console.log('log-6', { inputValue, searchValue, newItems });
    fn(newItems);
    handleToggleSearching(false);
  }, [
    applyItemsAndSelect,
    handleSetFilteredItems,
    handleToggleLoading,
    handleToggleSearching,
    itemsProps.data,
    itemsProps.searchValue,
    loading,
  ]);

  useEffect(() => {
    const { mode } = propsRef.current;

    if (mode !== 'static') return;

    const inputValue = state.inputValue;
    const items = itemsProps.data;
    handleStaticFilter(items, inputValue);
  }, [handleStaticFilter, itemsProps.data, state.inputValue]);

  useEffect(() => {
    if (reset && setReset) {
      setReset(false);
      handleReset();
    }
  }, [handleReset, reset, setReset]);

  useEffect(() => {
    if (isControlled && defaultValue !== undefined) {
      console.warn(
        `useManagedAutocomplete: Se están proporcionando las props 'value' y 'defaultValue' a un Autocomplete. Un componente no puede ser controlado y no controlado a la vez. Se dará prioridad a 'value'.`,
      );
    }
  }, [isControlled, defaultValue]);

  return {
    errors: Array.from(errors.values()),
    initialValueRef,
    state,
    onBlur: handleOnBlur,
    onChange: handleChange,
    onDispatchError: dispatchError,
    onFocus: handleOnFocus,
    onkeyDown: handleOnkeyDown,
    onMouseDown: handleOnMouseDown,
    onPreSelectItem: handleOnPreSelected,
    onReset: handleReset,
    onSelectItem: handleOnSelect,
    onToogleLoading: handleToggleLoading,
    onTooglePopover: handleTooglePopover,
    registerKeydownOverride,
  };
}
