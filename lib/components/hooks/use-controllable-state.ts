import React, { useCallback, useEffect } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

type ChangeHandler<T> = (value: T) => void;
type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;

interface UseControllableStateProps<T> {
  caller?: string;
  defaultValue: T;
  value?: T;
  onChange?: ChangeHandler<T>;
}

/**
 * Se declara el hook `useInsertionEffect` de esta forma para evitar errores en entornos donde no está disponible, como React 17 o React Native.
 *
 * El hook `useInsertionEffect` se introdujo en React 18 y no existe en versiones anteriores, por lo que esta declaración condicional permite que el código sea compatible con ambos entornos sin causar errores de importación.
 */
const useInsertionEffect: typeof useLayoutEffect =
  ((React as Record<string, unknown>)[' useInsertionEffect '.trim().toString()] as
    | typeof useLayoutEffect
    | undefined) || useLayoutEffect;

function isFunction<T>(value: React.SetStateAction<T>): value is (prevState: T) => T {
  return typeof value === 'function';
}

function useUncontrolledState<T>(props: Omit<UseControllableStateProps<T>, 'value' | 'caller'>) {
  const { defaultValue, onChange } = props;

  const [value, setValue] = useState<T>(defaultValue);

  const prevValueRef = useRef<T>(value);
  const onChangeRef = useRef<ChangeHandler<T> | undefined>(onChange);

  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value]);

  return { uncontrolledValue: value, setUncontrolledValue: setValue, onChangeRef };
}

export default function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { defaultValue, onChange, value } = props;

  const { uncontrolledValue, setUncontrolledValue, onChangeRef } = useUncontrolledState({ defaultValue, onChange });

  const isControlled = value !== undefined;
  const newValue = isControlled ? value : uncontrolledValue;

  const contextRef = useRef({ value });

  const setValueHandler = useCallback<SetStateFn<T>>(
    (nextValue) => {
      const { value: currentValue } = contextRef.current;

      if (currentValue !== undefined) {
        const resolveValue = isFunction(nextValue) ? nextValue(currentValue) : nextValue;

        if (resolveValue !== currentValue) {
          onChangeRef.current?.(resolveValue);
        }
      } else {
        setUncontrolledValue(nextValue);
      }
    },
    [onChangeRef, setUncontrolledValue],
  );

  useInsertionEffect(() => {
    contextRef.current = { value };
  }, [value]);

  return { value: newValue, setValue: setValueHandler, isControlled };
}
