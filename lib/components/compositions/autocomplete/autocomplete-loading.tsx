import { Command } from 'cmdk';
import { Loader2 } from 'lucide-react';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

export interface AutocompleteLoadingProps extends ComponentPropsWithoutRef<typeof Command.Loading> {
  children?: ReactNode;
  showText?: boolean;
  text?: string;
}

export default forwardRef<HTMLDivElement, AutocompleteLoadingProps>(function AutocompleteLoading(props, ref) {
  const { children, showText = true, text = 'Fetching data…', ...moreProps } = props;

  return (
    <Command.Loading ref={ref} {...moreProps}>
      {children ?? (
        <div className="flex max-h-44 flex-col items-center justify-center py-6">
          <Loader2 size={20} className="animate-spin" />
          {showText && <p className="text-center text-sm">{text}</p>}
        </div>
      )}
    </Command.Loading>
  );
});
