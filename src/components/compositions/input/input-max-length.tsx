import { Input } from '../../../../lib/components/compositions/input';

export default function InputMaxLength() {
  return (
    <Input type="text" textProcessor={{ maxLength: 10 }}>
      <Input.Control placeholder="Escibe algo..." />
      <Input.Label text="Label" />
      <Input.Errors />
    </Input>
  );
}
