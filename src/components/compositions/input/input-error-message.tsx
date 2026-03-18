import { Input } from '../../../../lib/components/compositions/input';

export default function InputErrorMessage() {
  return (
    <Input type="text" isInvalid>
      <Input.Control placeholder="Escibe algo..." />
      <Input.Label text="Label" />
      <Input.Errors customMessageError="Mensaje de error personalizado" />
    </Input>
  );
}
