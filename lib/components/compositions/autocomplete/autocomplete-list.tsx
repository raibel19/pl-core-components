import { memo, ReactNode, useMemo } from 'react';

import { cn } from '../../../lib/utils';
import { CommandGroup, CommandList } from '../../ui/command';
import { ScrollArea } from '../../ui/scroll-area';
import AutocompleteItem from './autocomplete-item';
import AutocompleteLoading from './autocomplete-loading';
import AutocompleteMessages from './autocomplete-messages';
import styles from './autocomplete.module.css';
import { useAutocompleteActionsContext, useAutocompleteStableContext, useAutocompleteVolatileContext } from './context';
import { ItemsWithIdentifier } from './types/types';

export interface AutocompleteListProps {
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

function AutocompleteList(props: AutocompleteListProps) {
  const { children, className, classNameGroup, classNameItem, loadingConfig, messagesConfig } = props;

  const { isOpen, minLengthRequired, lastValidSelection } = useAutocompleteStableContext();
  const { filteredItems, inputValue, isLoading, isSearching } = useAutocompleteVolatileContext();
  const { onSelectItem } = useAutocompleteActionsContext();

  const items = useMemo(() => Array.from(filteredItems.values()), [filteredItems]);

  if (!isOpen) return null;

  const showLoading = (isLoading || isSearching) && inputValue.length >= minLengthRequired;
  const showMessages =
    !showLoading &&
    ((inputValue.length === 0 && filteredItems.size === 0) ||
      (inputValue.length > 0 && inputValue.length < minLengthRequired) ||
      (inputValue.length > 0 && inputValue.length >= minLengthRequired && filteredItems.size === 0));
  const showList = !showLoading && !showMessages && items.length > 0;

  return (
    <CommandList
      className={cn('max-h-44 w-full overflow-auto rounded-none', showLoading && 'min-h-20', className || null)}
    >
      {showLoading && (
        <AutocompleteLoading showText={loadingConfig?.showText} text={loadingConfig?.text}>
          {loadingConfig?.content}
        </AutocompleteLoading>
      )}
      {showList && (
        <CommandGroup className={cn(classNameGroup || null, 'CommandGroup')}>
          <ScrollArea
            type="always"
            className={cn(styles.suggestionScrollArea, className || null)}
            onMouseDown={(e) => e.preventDefault()} // Evitar que el scroll capture el evento y tome el foco
            tabIndex={-1} // Evita que el elemento reciba foco mediante tabulación
          >
            {items.map((item) => {
              const isSelected = lastValidSelection?.identifier === item.identifier;
              return (
                <AutocompleteItem
                  key={item.identifier}
                  item={item}
                  className={classNameItem}
                  isSelected={isSelected}
                  onSelectItem={onSelectItem}
                  renderGlobal={children}
                />
              );
            })}
          </ScrollArea>
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

export default memo(AutocompleteList, (prev, next) => {
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
