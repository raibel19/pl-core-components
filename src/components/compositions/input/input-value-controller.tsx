import { useEffect, useState } from 'react';

import { Input } from '../../../../lib/components/compositions/input';

export const InputValueController = () => {
  const [value, setValue] = useState<string>('');
  const [valueHistory, setValueHistory] = useState<string[]>([]);

  useEffect(() => {
    setValueHistory((prevHistory) => [...prevHistory, value]);
  }, [value]);

  return (
    <div className="flex flex-col gap-y-4">
      <Input
        type="number"
        value={value}
        resetToInitialValue={true}
        onValueChange={({ value }) => {
          setValue(value);
        }}
      >
        <Input.Control placeholder="Escibe algo...">
          <Input.RightAddons>
            <Input.Addons.Clear showAddonSeparatorLeft={true} tooltipContent={'Reset'} />
          </Input.RightAddons>
        </Input.Control>
        <Input.Label text="Label" />
      </Input>
      <div className="text-sm text-muted-foreground">
        <p>Value History:</p>
        <ul className="h-20 list-disc overflow-auto pl-5">
          {[...valueHistory].reverse().map((log, index) => (
            <li key={index}>{`Value ${valueHistory.length - index}: ${log}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
