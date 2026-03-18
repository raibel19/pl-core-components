import { InfinitySymbol } from '@carbon/icons-react';
import { forwardRef } from 'react';

import { cn } from '../../../lib/utils';
import { useInputStableContext, useInputVolatileContext } from './context';
import InputAddonSeparator from './input-addon-separator';
import { AddonSeparatorProps } from './types/types';

export type InputAddonCounterProps = {
  className?: string;
  classNameInfinitySymbol?: string;
  show?: boolean;
} & AddonSeparatorProps;

export default forwardRef<HTMLDivElement, InputAddonCounterProps>(function InputAddonCounter(props, ref) {
  const {
    className,
    classNameInfinitySymbol,
    classNameSeparator,
    show = true,
    showAddonSeparatorLeft,
    showAddonSeparatorRight,
  } = props;

  const { value } = useInputVolatileContext();
  const { isInvalid, maxLength } = useInputStableContext();

  if (!show) return null;

  const currentLnegth = value?.length || 0;

  return (
    <>
      {showAddonSeparatorLeft && <InputAddonSeparator className={classNameSeparator} />}
      <div
        ref={ref}
        className={cn(
          'pointer-events-none inset-y-0 flex h-full items-center justify-center border-t border-transparent text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50',
          isInvalid && 'text-destructive',
          className || null,
        )}
        aria-live="polite"
        role="status"
      >
        {currentLnegth}/
        {maxLength === 0 || maxLength === undefined ? (
          <InfinitySymbol size={18} strokeWidth={2} aria-hidden={true} className={classNameInfinitySymbol} />
        ) : (
          maxLength
        )}
      </div>
      {showAddonSeparatorRight && <InputAddonSeparator className={classNameSeparator} />}
    </>
  );
});
