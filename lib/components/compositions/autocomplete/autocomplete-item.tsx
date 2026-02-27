import { memo } from 'react';

import { cn } from '../../../lib/utils';
import { CommandItem } from '../../ui/command';
import { AutocompleteActionsContextProps } from './context';
import { ItemsWithIdentifier } from './types/types';

export interface AutocompleteItemProps {
  className?: string;
  item: ItemsWithIdentifier;
  isSelected: boolean;
  onSelectItem: AutocompleteActionsContextProps['onSelectItem'];
  renderGlobal?: (props: { item: ItemsWithIdentifier; isSelected: boolean }) => React.ReactNode;
}

export function AutocompleteItem(props: AutocompleteItemProps) {
  const { item, className, renderGlobal, isSelected, onSelectItem } = props;
  const { identifier, label, disabled, render: itemRender } = item;

  const renderContent = () => {
    const baseContent = renderGlobal ? renderGlobal({ item, isSelected }) : <span>{label}</span>;

    if (itemRender) {
      return itemRender({ item, isSelected, children: baseContent });
    }

    return baseContent;
  };

  return (
    <CommandItem
      value={identifier}
      data-selecteditem={isSelected}
      onMouseDown={(e) => e.preventDefault()}
      onSelect={onSelectItem}
      disabled={disabled}
      className={cn(
        'h-full rounded-sm text-sm',
        'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
        isSelected ? 'bg-muted' : null,
        className || null,
      )}
    >
      {renderContent()}
    </CommandItem>
  );
}

export default memo(AutocompleteItem, (prev, next) => {
  const prevItem = prev.item;
  const nextItem = next.item;

  const itemChange =
    prevItem.label !== nextItem.label ||
    prevItem.disabled !== nextItem.disabled ||
    prevItem.identifier !== nextItem.identifier;

  if (itemChange) return false;

  return prev.className !== next.className || prev.isSelected !== next.isSelected;
});
