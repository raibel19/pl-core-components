import { useState } from 'react';

import { Input } from '../../../../lib/components/compositions/input';

export default function InputLimits() {
  const [minValue, setMinValue] = useState<number>(5);
  const [maxValue, setMaxValue] = useState<number>(10);

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-row gap-4 text-sm">
        <p>Valor Mínimo: {minValue}</p>
        <p>Valor Máximo: {maxValue}</p>
      </section>
      <div className="flex gap-4">
        <Input
          type="number"
          value={minValue.toString()}
          onValueChange={({ floatValue }) => setMinValue(floatValue ?? 0)}
        >
          <Input.Control />
          <Input.Label text="# Mínimo" />
        </Input>
        <Input
          type="number"
          value={maxValue.toString()}
          onValueChange={({ floatValue }) => setMaxValue(floatValue ?? 0)}
        >
          <Input.Control />
          <Input.Label text="# Máximo" />
        </Input>
      </div>
      <Input
        type="number"
        textProcessor={{
          limits: {
            min: minValue,
            max: maxValue,
            maxMessageError: `El valor máximo es ${maxValue}`,
            minMessageError: `El valor mínimo es ${minValue}`,
          },
        }}
      >
        <Input.Control placeholder="Escibe algo..." />
        <Input.Label text="Label" />
        <Input.Errors />
      </Input>
    </div>
  );
}
