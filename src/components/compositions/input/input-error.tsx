import { Input } from '../../../../lib/components/compositions/input';

export default function InputError() {
  return (
    <Input type="text" isInvalid>
      <Input.Control placeholder="Escibe algo..." />
      <Input.Label text="Label" />
    </Input>
  );
}
