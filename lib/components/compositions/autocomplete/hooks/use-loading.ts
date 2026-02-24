import { useEffect, useState } from 'react';

interface UseLoadingProps {
  isLoading: boolean;
  delay: number;
}

export default function useLoading(props: UseLoadingProps) {
  const { delay, isLoading } = props;

  const [loading, setLoading] = useState<boolean>(isLoading);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      return;
    }

    const id = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay, isLoading]);

  return loading;
}
