import { cn } from '../../../lib/utils';
import { CommandItem } from '../../ui/command';
import { useAutocompleteActionsContext, useAutocompleteContext } from './context';
import { ItemsWithIdentifier } from './types/types';

interface AutocompleteItemProps {
  item: ItemsWithIdentifier;
  className?: string;
  renderGlobal?: (props: { item: ItemsWithIdentifier; isSelected: boolean }) => React.ReactNode;
}

export default function AutocompleteItem(props: AutocompleteItemProps) {
  const { item, className, renderGlobal } = props;
  const { identifier, label, disabled, render: itemRender } = item;

  const { lastValidSelection } = useAutocompleteContext();
  const { onSelectItem } = useAutocompleteActionsContext();

  const isSelected = lastValidSelection?.identifier === identifier;

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
