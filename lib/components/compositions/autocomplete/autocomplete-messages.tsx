import { forwardRef } from 'react';

import { cn } from '../../../lib/utils';
import { CommandEmpty } from '../../ui/command';
import { useAutocompleteStableContext, useAutocompleteVolatileContext } from './context';

interface AutocompleteMessagesProps {
  className?: string;
  initialText?: string;
  noResultText?: string;
  minLengthText?: string;
}

export default forwardRef<HTMLDivElement, AutocompleteMessagesProps>(function AutocompleteMessages(props, ref) {
  const {
    className,
    initialText = 'Escriba para mostrar sugerencias',
    minLengthText = 'Escriba almenos {minLength} carácteres',
    noResultText = 'No existen sugerencias',
  } = props;

  const { inputValue, filteredItems } = useAutocompleteVolatileContext();
  const { minLengthRequired } = useAutocompleteStableContext();

  let message: string = '????';

  if (inputValue.length === 0 && filteredItems.size === 0) message = initialText;
  if (inputValue.length > 0 && inputValue.length < minLengthRequired)
    message = minLengthText.replace('{minLength}', String(minLengthRequired));
  if (inputValue.length > 0 && inputValue.length >= minLengthRequired && filteredItems.size === 0)
    message = noResultText;

  return (
    <CommandEmpty
      ref={ref}
      className={cn('py-6 text-center text-sm', className || null)}
      onMouseDown={(e) => e.preventDefault()}
    >
      {message}
    </CommandEmpty>
  );
});
