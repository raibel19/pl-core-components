import { useEffect, useState } from 'react';

import { Input } from '../../../../lib/components/compositions/input';
import { ISanitize } from '../../../../lib/components/compositions/input/types/types';

type DecimalSeparator = ISanitize['decimalSeparator'];

export default function InputNumericDecimals() {
  const [separator, setSeparator] = useState<DecimalSeparator>('.');
  const [decimales, setDecimales] = useState<string>('');
  const [negativo, setNegativo] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue('');
  }, [decimales, negativo, separator]);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-row flex-wrap items-center gap-5 text-sm">
        <div className="flex flex-col gap-1">
          <label>Separador decimal:</label>
          <select
            className="h-9 border"
            value={separator}
            onChange={(event) => setSeparator(event.target.value as DecimalSeparator)}
          >
            <option value=".">. (punto)</option>
            <option value=",">, (coma)</option>
          </select>
        </div>
        <Input
          type="number"
          className="max-w-32"
          value={decimales}
          onValueChange={({ value }) => {
            setDecimales(value);
          }}
        >
          <Input.Control placeholder="" />
          <Input.Label text="# decimales" />
        </Input>
        <div className="flex flex-row items-center gap-1">
          <input
            id="negative"
            type="checkbox"
            checked={negativo}
            onChange={(event) => setNegativo(event.target.checked)}
          />
          <label htmlFor="negative">Permitir Negativo</label>
        </div>
      </div>
      <Input
        type="number"
        textProcessor={{
          sanitize: {
            decimalSeparator: separator,
            allowNegative: negativo,
            maxDecimalDigits: decimales ? parseInt(decimales) : undefined,
          },
        }}
        value={value}
        onValueChange={({ value }) => setValue(value)}
      >
        <Input.Control placeholder="Escibe algo..." />
        <Input.Label text="Label" />
        <Input.Errors />
      </Input>
    </div>
  );
}
