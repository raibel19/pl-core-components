import { equals } from '@pl-core/utils/object';

import { AutocompleteAction, ErrorAction, ErrorState, IAutocompleteState, ItemsWithIdentifier } from '../types/types';

export function autocompleteReduce(state: IAutocompleteState, action: AutocompleteAction): IAutocompleteState {
  switch (action.type) {
    case 'SET_INPUT_VALUE': {
      const { openPopover, value, clearItems } = action.payload;

      if (value === state.inputValue) return state;

      return {
        ...state,
        inputValue: value,
        selectedValue: null,
        isOpen: openPopover,
        preSelectedValue: '',
        filteredItems: clearItems ? new Map() : state.filteredItems,
      };
    }
    case 'SELECT_ITEM': {
      const { items, openPopover } = action.payload;

      if (state.selectedValue && equals(items, state.selectedValue)) {
        return state;
      }

      return {
        ...state,
        inputValue: items.label,
        selectedValue: items,
        isOpen: openPopover,
        preSelectedValue: items.identifier,
        lastValidSelection: items,
      };
    }
    case 'CLEAR_SELECTION': {
      if (
        state.inputValue === '' &&
        state.selectedValue === null &&
        state.preSelectedValue === '' &&
        state.isSearching === false &&
        state.lastValidSelection === null &&
        state.filteredItems.size === 0 &&
        !state.isOpen
      )
        return state;

      return {
        ...state,
        inputValue: '',
        selectedValue: null,
        // isOpen: false,
        preSelectedValue: '',
        isSearching: false,
        lastValidSelection: null,
        filteredItems: new Map(),
      };
    }
    case 'OPEN_POPOVER': {
      if (state.isOpen) return state;

      return {
        ...state,
        isOpen: true,
      };
    }
    case 'CLOSE_POPOVER': {
      if (!state.isOpen) return state;

      return {
        ...state,
        isOpen: false,
      };
    }
    case 'SET_IS_LOADING': {
      if (action.payload === state.isLoading) return state;

      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case 'SET_FILTERED_ITEMS': {
      if (state.filteredItems.size === 0 && action.payload.size === 0) return state;
      const isEquals = equals(state.filteredItems, action.payload);

      if (isEquals) return state;

      return {
        ...state,
        filteredItems: action.payload,
      };
    }
    case 'SET_PRE_SELECTION_VALUE': {
      if (action.payload === state.preSelectedValue) return state;

      return {
        ...state,
        preSelectedValue: action.payload,
      };
    }
    case 'SET_IS_SEARCHING': {
      if (action.payload === state.isSearching) return state;

      return {
        ...state,
        isSearching: action.payload,
      };
    }
  }
}

export function errorReducer(state: ErrorState, action: ErrorAction): ErrorState {
  switch (action.type) {
    case 'ADD_ERROR': {
      const { key, message } = action.payload;

      if (state.get(key) === message || message === '') return state;

      const newState = new Map(state);
      newState.set(key, message);
      return newState;
    }
    case 'REMOVE_ERROR': {
      const { key } = action.payload;

      if (!state.has(key)) return state;

      const newState = new Map(state);
      newState.delete(key);
      return newState;
    }
    case 'CLEAR_ERRORS': {
      if (!state.size) return state;
      return new Map();
    }
    default:
      return state;
  }
}

export function formatStr(value: string | undefined | null, caseSensitive: boolean = false): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  return caseSensitive ? trimmed : trimmed.toLowerCase();
}

export function findMatchingItem(
  value: string,
  items: Map<string, ItemsWithIdentifier>,
  caseSensitive: boolean = false,
): ItemsWithIdentifier | undefined {
  if (!value || !items.size) return undefined;

  return Array.from(items.values()).find(
    (item) => formatStr(item.label, caseSensitive) === formatStr(value, caseSensitive),
  );
}

export function findNextEnabledIndex(currentIndex: number, items: ItemsWithIdentifier[], direction: string) {
  const len = items.length;
  const directionValue = direction === 'ArrowDown' ? 1 : -1;

  let nextIndex = currentIndex;
  let tries = 0; //evitar bucles infinitos si todos los items estuvieran deshabilitados.

  do {
    nextIndex = (nextIndex + directionValue + len) % len;
    tries++;
  } while (items[nextIndex]?.disabled && tries < len);
  return nextIndex;
}
