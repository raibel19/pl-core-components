import { useEffect, useRef, useState } from 'react';

import { Input, InputControlRef } from '../../../../lib/components/compositions/input';

const defaultValue: string = '12';
export function InputResetInitialValueDefaultValue() {
  const [reset, setReset] = useState<boolean>(false);
  const [resetLog, setResetLog] = useState<boolean[]>([]);
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  const inputRef = useRef<InputControlRef | null>(null);

  useEffect(() => {
    setResetLog((prev) => [...prev, reset]);
  }, [reset]);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <button className="w-fit border border-border p-2" onClick={() => setReset(true)}>
          Reset externo
        </button>
        <Input
          type="number"
          defaultValue={defaultValue}
          resetToInitialValue={true}
          reset={reset}
          setReset={setReset}
          onValueChange={({ value }) => {
            inputRef.current?.focus();
            setShowClearButton(value.toString() !== defaultValue);
          }}
        >
          <Input.Control placeholder="Escibe algo..." ref={inputRef}>
            <Input.RightAddons>
              <Input.Addons.Clear showAddonSeparatorLeft={true} tooltipContent={'Reset'} show={showClearButton} />
            </Input.RightAddons>
          </Input.Control>
          <Input.Label text="Label" />
        </Input>
        <div className="text-sm text-muted-foreground">
          <p>Reset Status: {reset ? 'ON' : 'OFF'}</p>
          <p>Reset History:</p>
          <ul className="h-20 list-disc overflow-auto pl-5">
            {[...resetLog].reverse().map((log, index) => (
              <li key={index}>{`Reset ${resetLog.length - index}: ${log}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export function InputResetInitialValueControlled() {
  const [value, setValue] = useState<string>('15');
  const [reset, setReset] = useState<boolean>(false);
  const [resetLog, setResetLog] = useState<boolean[]>([]);
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  const inputRef = useRef<InputControlRef | null>(null);

  useEffect(() => {
    setResetLog((prev) => [...prev, reset]);
  }, [reset]);

  return (
    <div className="flex flex-col gap-y-4">
      <button className="w-fit border border-border p-2" onClick={() => setReset(true)}>
        Reset externo
      </button>
      <Input
        type="number"
        value={value}
        resetToInitialValue={true}
        reset={reset}
        setReset={setReset}
        onValueChange={({ value: currentValue, initialValue }) => {
          inputRef.current?.focus();
          setValue(currentValue);
          setShowClearButton(currentValue.toString() !== initialValue.toString());
        }}
      >
        <Input.Control placeholder="Escibe algo..." ref={inputRef}>
          <Input.RightAddons>
            <Input.Addons.Clear showAddonSeparatorLeft={true} tooltipContent={'Reset'} show={showClearButton} />
          </Input.RightAddons>
        </Input.Control>
        <Input.Label text="Label" />
      </Input>
      <div className="text-sm text-muted-foreground">
        <p>Reset Status: {reset ? 'ON' : 'OFF'}</p>
        <p>Reset History:</p>
        <ul className="h-20 list-disc overflow-auto pl-5">
          {[...resetLog].reverse().map((log, index) => (
            <li key={index}>{`Reset ${resetLog.length - index}: ${log}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
