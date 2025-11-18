import { ActionDefinition, Checkbox, CheckboxChecked, Code, Settings } from '@carbon/icons-react';
import { useCallback, useMemo } from 'react';

import { Autocomplete } from '../../../lib/components/compositions/autocomplete';
import { AutocompleteStateChangePayload, Items } from '../../../lib/components/compositions/autocomplete/types/types';
import { demoItems } from './types/types';

export default function AutocompleteStaticExample1() {
  const items = useMemo<Items>(() => ({ data: demoItems, searchValue: '' }), []);

  const onStateChange = useCallback((args: AutocompleteStateChangePayload<number[]>) => {
    console.log('AutocompleteStaticExample1-onStateChange', args);
    // const { inputValue, type } = args;

    // if (type === 'INPUT_CHANGE') {
    //   const filtredItems = demoItems.filter((f) => f.label.toLowerCase().includes(inputValue.toLowerCase()));
    //   setItems({ data: filtredItems, searchValue: inputValue });
    // }
    // if (type === 'RESET') {
    //   setItems({ data: demoItems, searchValue: inputValue });
    // }
  }, []);

  const hoverContent = (
    <div className="flex justify-between gap-4">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
        <div className="text-xs text-muted-foreground">Joined December 2021</div>
      </div>
    </div>
  );

  return (
    <Autocomplete
      items={items}
      mode="static"
      defaultValue="Ruby"
      //   loading={normalSearchLoading}
      onStateChange={onStateChange}
      data={[1, 2, 3]}
      isInvalid={true}
      //   minLengthRequired={4}
      blurAction="restore"
      filterItems={(items, value) => {
        return items.filter((f) => f.label.toLowerCase().includes(value.toLocaleLowerCase()));
      }}
      // minLengthRequired={3}
      resetOnReselect={true}
    >
      <Autocomplete.Label
        text="Autocomplete Modulos"
        isRequired
        textRequired="- Requeido"
        classNameTextRequired="pl-1"
        classNameRequired="pl-1"
      />
      <Autocomplete.Group>
        <Autocomplete.InputWrapper>
          <Autocomplete.Input placeholder="Escribe un lenguaje..." />
          <Autocomplete.LeftAddons>
            <Autocomplete.Addons.Button className="ps-3" icon={<Settings />} hoverContent={hoverContent} />
            <Autocomplete.Addons.Separator />
            <Autocomplete.Addons.Button
              text="click"
              className="text-xs"
              tooltipContent={<p>Da click</p>}
              onClick={(item) => console.log(item)}
            />
            <Autocomplete.Addons.Separator />
            <Autocomplete.Addons.Icon
              tooltipContent={<p>HOLLLLLLA</p>}
              tooltipConfig={{ disableHoverableContent: true }}
              show={true}
            />
            <Autocomplete.Addons.Separator />
            <Autocomplete.Addons.Icon
              hoverContent={hoverContent}
              hoverConfig={{ openDelay: 100, onOpenChange: (open) => console.log('IS OPEN:', open) }}
              icon={<Code />}
            />
            <Autocomplete.Addons.Separator />
            <Autocomplete.Addons.Text text="$MXN" />
          </Autocomplete.LeftAddons>
          <Autocomplete.RightAddons>
            <Autocomplete.Addons.Icon icon={<ActionDefinition />} />
            <Autocomplete.Addons.Error showAddonSeparatorLeft={true} />
          </Autocomplete.RightAddons>
        </Autocomplete.InputWrapper>
        <Autocomplete.Popover>
          <Autocomplete.Header>
            <p>Lenguajes de Programación</p>
            <Autocomplete.Header.ClearButton />
          </Autocomplete.Header>
          {/* DOS TIPOS DE LISTA UNA NORMA Y OTRA VIRTUALIZADA PARA LISTAS GRANDES */}
          {/* <Autocomplete.ListVirtualize>
            {({ item, isSelected }) => (
              <>
                {isSelected ? <CheckboxChecked /> : <Checkbox />}
                <span>{item.label}</span>
              </>
            )}
          </Autocomplete.ListVirtualize> */}
          <Autocomplete.List>
            {({ item, isSelected }) => (
              <>
                {isSelected ? <CheckboxChecked /> : <Checkbox />}
                <span>{item.label}</span>
              </>
            )}
          </Autocomplete.List>
        </Autocomplete.Popover>
      </Autocomplete.Group>
      <Autocomplete.Errors customMessageError="custom message error" />
    </Autocomplete>
  );
}
