import { useState } from 'react';

import { Input } from '../../../../lib/components/compositions/input';

export const REGIONS = [
  { value: 'es-AR', label: 'Argentina' },
  { value: 'es-BO', label: 'Bolivia' },
  { value: 'pt-BR', label: 'Brasil' },
  { value: 'es-CL', label: 'Chile' },
  { value: 'es-CO', label: 'Colombia' },
  { value: 'es-CR', label: 'Costa Rica' },
  { value: 'es-CU', label: 'Cuba' },
  { value: 'es-DO', label: 'República Dominicana' },
  { value: 'es-EC', label: 'Ecuador' },
  { value: 'es-SV', label: 'El Salvador' },
  { value: 'es-GT', label: 'Guatemala' },
  { value: 'es-HN', label: 'Honduras' },
  { value: 'es-MX', label: 'México' },
  { value: 'es-NI', label: 'Nicaragua' },
  { value: 'es-PA', label: 'Panamá' },
  { value: 'es-PY', label: 'Paraguay' },
  { value: 'es-PE', label: 'Perú' },
  { value: 'es-PR', label: 'Puerto Rico' },
  { value: 'es-UY', label: 'Uruguay' },
  { value: 'es-VE', label: 'Venezuela' },
  { value: 'en-US', label: 'Estados Unidos' },
  { value: 'en-GB', label: 'Reino Unido' },
  { value: 'de-DE', label: 'Alemania' },
  { value: 'ja-JP', label: 'Japón' },
  { value: 'es-ES', label: 'España' },
] as const;

export const CURRENCIES = [
  { value: 'ARS', label: 'Peso argentino' },
  { value: 'BOB', label: 'Boliviano' },
  { value: 'BRL', label: 'Real brasileño' },
  { value: 'CLP', label: 'Peso chileno' },
  { value: 'COP', label: 'Peso colombiano' },
  { value: 'CRC', label: 'Colón costarricense' },
  { value: 'CUP', label: 'Peso cubano' },
  { value: 'DOP', label: 'Peso dominicano' },
  { value: 'USD', label: 'Dólar estadounidense' },
  { value: 'GTQ', label: 'Quetzal guatemalteco' },
  { value: 'HNL', label: 'Lempira hondureña' },
  { value: 'MXN', label: 'Peso mexicano' },
  { value: 'NIO', label: 'Córdoba nicaragüense' },
  { value: 'PAB', label: 'Balboa panameño' },
  { value: 'PYG', label: 'Guaraní paraguayo' },
  { value: 'PEN', label: 'Sol peruano' },
  { value: 'UYU', label: 'Peso uruguayo' },
  { value: 'VES', label: 'Bolívar venezolano' },
  { value: 'GBP', label: 'Libra esterlina' },
  { value: 'EUR', label: 'Euro' },
  { value: 'JPY', label: 'Yen japonés' },
] as const;

export default function InputNumericFormatter() {
  const [paisRegion, setPaisRegion] = useState<string>('es-MX');
  const [moneda, setMoneda] = useState<string>('MXN');
  const [minFractionDigit, setMinFractionDigit] = useState<number | undefined>(2);
  const [maxFractionDigit, setMaxFractionDigit] = useState<number | undefined>(3);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-row flex-wrap gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <label>País/Región:</label>
          <select
            className="h-9 max-w-36 border"
            value={paisRegion}
            onChange={(event) => setPaisRegion(event.target.value)}
          >
            {REGIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Moneda:</label>
          <select className="h-9 max-w-36 border" value={moneda} onChange={(event) => setMoneda(event.target.value)}>
            {CURRENCIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <Input
          type="number"
          value={minFractionDigit?.toString() ?? ''}
          className="max-w-36"
          onValueChange={({ floatValue, initialValue, isComplete, value }) => {
            console.log('minValue', { floatValue, initialValue, isComplete, value });
            setMinFractionDigit(floatValue);
          }}
        >
          <Input.Control />
          <Input.Label text="# Fracción Mínima" />
        </Input>
        <Input
          type="number"
          value={maxFractionDigit?.toString() ?? ''}
          className="max-w-36"
          onValueChange={({ floatValue }) => setMaxFractionDigit(floatValue)}
        >
          <Input.Control />
          <Input.Label text="# Fracción Máxima" />
        </Input>
      </div>
      <Input
        type="number"
        textProcessor={{
          formatter: {
            locale: paisRegion,
            options: {
              currency: moneda,
              style: 'currency',
              minimumFractionDigits: minFractionDigit,
              maximumFractionDigits: maxFractionDigit,
            },
            active: true,
          },
          sanitize: {
            decimalSeparator: '.',
            maxDecimalDigits: maxFractionDigit,
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
