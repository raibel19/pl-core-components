import { Input } from '../../../../lib/components/compositions/input';

export default function InputNumeric() {
  return (
    <Input type="number">
      <Input.Control placeholder="Escibe algo..." />
      <Input.Label text="Label" />
    </Input>
  );
}
