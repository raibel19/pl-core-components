import { Input } from '../../../../lib/components/compositions/input';

export default function InputDisabled() {
  return (
    <Input type="text" disabled>
      <Input.Control placeholder="Escibe algo..." />
      <Input.Label text="Label" />
    </Input>
  );
}
