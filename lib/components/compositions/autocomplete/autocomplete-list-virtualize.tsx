import { useVirtualizer } from '@tanstack/react-virtual';
import { memo, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { cn } from '../../../lib/utils';
import { CommandGroup, CommandList } from '../../ui/command';
import AutocompleteItem from './autocomplete-item';
import AutocompleteLoading from './autocomplete-loading';
import AutocompleteMessages from './autocomplete-messages';
import styles from './autocomplete.module.css';
import { useAutocompleteActionsContext, useAutocompleteStableContext, useAutocompleteVolatileContext } from './context';
import { ItemsWithIdentifier } from './types/types';
import { findNextEnabledIndex } from './utils/utils';

export interface AutocompleteListVirtualizeProps {
  className?: string;
  classNameGroup?: string;
  classNameItem?: string;
  loadingConfig?: {
    showText?: boolean;
    text?: string;
    content?: ReactNode;
  };
  messagesConfig?: {
    className?: string;
    initialText?: string;
    noResultText?: string;
    minLengthText?: string;
  };
  children?: (props: { item: ItemsWithIdentifier; isSelected: boolean }) => React.ReactNode;
}

function AutocompleteListVirtualize(props: AutocompleteListVirtualizeProps) {
  const { children, className, classNameGroup, classNameItem, loadingConfig, messagesConfig } = props;

  const { selectedValue, isOpen, minLengthRequired, lastValidSelection } = useAutocompleteStableContext();
  const { filteredItems, preSelectedValue, inputValue, isLoading, isSearching } = useAutocompleteVolatileContext();
  const { registerKeydownOverride, onPreSelectItem, onSelectItem } = useAutocompleteActionsContext();

  const parentRef = useRef<HTMLDivElement | null>(null);
  const preSelectedValueRef = useRef(preSelectedValue);

  const items = useMemo(() => Array.from(filteredItems.values()), [filteredItems]);

  const itemsIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item, idx) => map.set(item.identifier, idx));
    return map;
  }, [items]);

  const showLoading = (isLoading || isSearching) && inputValue.length >= minLengthRequired;
  const showMessages =
    !showLoading &&
    ((inputValue.length === 0 && filteredItems.size === 0) ||
      (inputValue.length > 0 && inputValue.length < minLengthRequired) ||
      (inputValue.length > 0 && inputValue.length >= minLengthRequired && filteredItems.size === 0));
  const showList = !showLoading && !showMessages && items.length > 0;

  const virtualizer = useVirtualizer({
    count: filteredItems.size,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    measureElement: (element) => element.scrollHeight,
  });
  const virtualizerRef = useRef(virtualizer);

  const virtualOptions = virtualizer.getVirtualItems();

  const scrollToIndex = useCallback((index: number) => {
    virtualizerRef.current.scrollToIndex(index, { align: 'auto' });
  }, []);

  const handleArrowNavigation = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();

      if (!items.length) return;

      const currentIdentifier = preSelectedValueRef.current;
      const currentIndex = currentIdentifier ? (itemsIndexMap.get(currentIdentifier) ?? -1) : -1;
      const nextEnabledIndex = findNextEnabledIndex(currentIndex, items, event.key);

      if (nextEnabledIndex !== currentIndex) {
        const nextItem = items[nextEnabledIndex];
        if (nextItem) onPreSelectItem(nextItem.identifier);
        scrollToIndex(nextEnabledIndex);
      }
    },
    [items, itemsIndexMap, onPreSelectItem, scrollToIndex],
  );

  useLayoutEffect(() => {
    virtualizerRef.current = virtualizer;
    preSelectedValueRef.current = preSelectedValue;
  }, [preSelectedValue, virtualizer]);

  useEffect(() => {
    const unregisterUp = registerKeydownOverride('ArrowUp', handleArrowNavigation);
    const unregisterDown = registerKeydownOverride('ArrowDown', handleArrowNavigation);

    return () => {
      unregisterUp();
      unregisterDown();
    };
  }, [handleArrowNavigation, registerKeydownOverride]);

  useEffect(() => {
    if (selectedValue) {
      const idx = items.findIndex((item) => item.identifier === selectedValue.identifier);
      if (idx >= 0) {
        virtualizerRef.current.scrollToIndex(idx, { align: 'center' });
      }
    }
  }, [items, selectedValue]);

  if (!isOpen) return null;

  return (
    <CommandList
      ref={parentRef}
      className={cn('my-1 max-h-44 w-full overflow-auto rounded-none', showLoading && 'min-h-20', className || null)}
    >
      {showLoading && (
        <AutocompleteLoading showText={loadingConfig?.showText} text={loadingConfig?.text}>
          {loadingConfig?.content}
        </AutocompleteLoading>
      )}
      {showList && (
        <CommandGroup className={cn('py-0', styles.suggestionScrollArea, classNameGroup || null)}>
          <div className="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
            {virtualOptions.map((virtualOption) => {
              const item = items[virtualOption.index];
              const isSelected = lastValidSelection?.identifier === item.identifier;

              return (
                <div
                  key={item.identifier}
                  ref={virtualizer.measureElement}
                  data-index={virtualOption.index}
                  className={cn('absolute left-0 top-0 w-full pb-0.5')}
                  style={{ height: `${virtualOption.size}px`, transform: `translateY(${virtualOption.start}px)` }}
                >
                  <AutocompleteItem
                    item={item}
                    className={classNameItem}
                    isSelected={isSelected}
                    onSelectItem={onSelectItem}
                    renderGlobal={children}
                  />
                </div>
              );
            })}
          </div>
        </CommandGroup>
      )}
      {showMessages && (
        <AutocompleteMessages
          initialText={messagesConfig?.initialText}
          minLengthText={messagesConfig?.minLengthText}
          noResultText={messagesConfig?.noResultText}
        />
      )}
    </CommandList>
  );
}

export default memo(AutocompleteListVirtualize, (prev, next) => {
  const prevLoading = prev.loadingConfig;
  const nextLoading = next.loadingConfig;

  const loadingChange =
    prevLoading?.content !== nextLoading?.content ||
    prevLoading?.showText !== nextLoading?.showText ||
    prevLoading?.text !== nextLoading?.text;

  if (loadingChange) return false;

  const prevMessages = prev.messagesConfig;
  const nextMessages = next.messagesConfig;

  const messagesChange =
    prevMessages?.className !== nextMessages?.className ||
    prevMessages?.initialText !== nextMessages?.initialText ||
    prevMessages?.minLengthText !== nextMessages?.minLengthText ||
    prevMessages?.noResultText !== nextMessages?.noResultText;

  if (messagesChange) return false;

  return (
    prev.className === next.className &&
    prev.classNameGroup === next.classNameGroup &&
    prev.classNameItem === next.classNameItem
  );
});
