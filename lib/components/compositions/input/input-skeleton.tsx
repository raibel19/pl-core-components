import { forwardRef } from 'react';

import { cn } from '../../../lib/utils';
import { Skeleton } from '../../ui/skeleton';

export interface InputSkeletonProps {
  className?: string | undefined;
  classNameContainer?: string | undefined;
  show?: boolean;
}
export default forwardRef<HTMLDivElement, InputSkeletonProps>(function InputSkeleton(props, ref) {
  const { className, classNameContainer, show = true } = props;

  if (!show) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex w-full content-center items-center justify-items-center gap-1 text-center',
        classNameContainer || null,
      )}
    >
      <Skeleton className={cn('h-8 w-full rounded-sm bg-input', className || null)} />
    </div>
  );
});
