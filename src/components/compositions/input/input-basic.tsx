import { Input } from '../../../../lib/components/compositions/input';

const flag: boolean = true;
export default function InputBasic() {
  const dta: number[] | undefined = flag ? [1, 2, 3, 4] : undefined;
  // const dta: number[] | undefined = [1, 2, 3, 4];
  return (
    <Input
      type="number"
      data={dta}
      onValueChange={(event) => {
        const { data, floatValue, initialValue, isComplete, value, inputType } = event;
        console.log({ data, floatValue, initialValue, isComplete, value, inputType });
      }}
      textProcessor={{
        sanitize: {
          maxDecimalDigits: 10,
          decimalSeparator: '.',
        },
      }}
    >
      <Input.Label text="Label" />
      <Input.Control placeholder="Escibe algo...">
        <Input.RightAddons>
          <Input.Addons.Counter />
          <Input.Addons.Error showAddonSeparatorLeft={true} />
          <Input.Addons.Clear showAddonSeparatorLeft={true} tooltipContent={'Reset'} />
          <Input.Addons.Button<typeof dta>
            showAddonSeparatorLeft={true}
            onClick={(event) => {
              if (event.inputType === 'number') {
                const { data, initialValue, value, floatValue, isComplete, inputType } = event;
                console.log({ data, initialValue, value, floatValue, isComplete, inputType });
              } else {
                const { data, initialValue, value, inputType } = event;
                console.log({ data, initialValue, value, inputType });
              }
            }}
          />
        </Input.RightAddons>
      </Input.Control>
    </Input>
  );
}
