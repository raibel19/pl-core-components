import { Input } from '../../../../lib/components/compositions/input';

export default function InputMaxLengthCounter() {
  return (
    <Input type="text" textProcessor={{ maxLength: 10 }}>
      <Input.Control placeholder="Escibe algo...">
        <Input.RightAddons>
          <Input.Addons.Counter />
        </Input.RightAddons>
        <Input.LeftAddons>
          <Input.Addons.Counter className="ps-3" />
        </Input.LeftAddons>
      </Input.Control>
      <Input.Label text="Label" />
      <Input.Errors />
    </Input>
  );
}
