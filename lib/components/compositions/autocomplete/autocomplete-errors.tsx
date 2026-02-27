import { forwardRef, useMemo } from 'react';

import { cn } from '../../../lib/utils';
import FieldMessage from '../../primitives/field-message';
import { useAutocompleteStableContext } from './context';

export interface AutocompleteErrorsProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  customMessageError?: string;
}

export default forwardRef<HTMLUListElement, AutocompleteErrorsProps>(function AutocompleteErrors(props, ref) {
  const { className, customMessageError, ...moreProps } = props;
  const { isInvalid, errors: internalErrors } = useAutocompleteStableContext();

  const combineErrors = useMemo(() => {
    const externalErrors = customMessageError ? [customMessageError] : [];

    return [...externalErrors, ...internalErrors];
  }, [customMessageError, internalErrors]);

  if (!isInvalid || !combineErrors.length) return null;

  return (
    <FieldMessage
      ref={ref}
      {...moreProps}
      variant={{ type: 'error', size: 'sm' }}
      messages={combineErrors}
      className={cn('mt-2 min-w-full max-w-min [text-wrap-style:pretty]', className || null)}
    />
  );
});
