import { Input } from '../../../../lib/components/compositions/input';

export default function InputDefaultValue() {
  return (
    <Input type="text" defaultValue="Valor por defecto">
      <Input.Control placeholder="Escibe algo..." />
      <Input.Label text="Label" />
    </Input>
  );
}
