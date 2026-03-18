import { ActionDefinition, Code, Search, Settings } from '@carbon/icons-react';

import { Input } from '../../../../lib/components/compositions/input';

export default function InputWithAddons() {
  const hoverContent = (
    <div className="flex justify-between gap-4">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">The React Framework - created and maintained by @vercel.</p>
        <div className="text-xs text-muted-foreground">Joined December 2021</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-4">
      <Input type="text">
        <Input.Control placeholder="Escibe algo...">
          <Input.LeftAddons>
            <Input.Addons.Icon
              className="ps-3"
              tooltipContent={<p>HOLLLLLLA</p>}
              tooltipConfig={{ disableHoverableContent: true }}
              showAddonSeparatorRight
            />
            <Input.Addons.Icon
              hoverContent={hoverContent}
              hoverConfig={{ openDelay: 100, onOpenChange: (open) => console.log('IS OPEN:', open) }}
              icon={<Code />}
              showAddonSeparatorRight
            />
            <Input.Addons.Icon icon={<ActionDefinition />} showAddonSeparatorRight />
            <Input.Addons.Text text="$MXN" showAddonSeparatorRight />
            <Input.Addons.Button icon={<Settings />} hoverContent={hoverContent} showAddonSeparatorRight />
            <Input.Addons.Button
              text="click"
              className="text-xs"
              tooltipContent={<p>Da click</p>}
              onClick={(item) => console.log(item)}
              showAddonSeparatorRight
            />
          </Input.LeftAddons>
          <Input.RightAddons>
            <Input.Addons.Button icon={<Search size={20} />} showAddonSeparatorRight />
            <Input.Addons.Counter />
            <Input.Addons.Error showAddonSeparatorLeft={true} />
            <Input.Addons.Clear showAddonSeparatorLeft={true} tooltipContent={'Reset'} />
          </Input.RightAddons>
        </Input.Control>
        <Input.Label text="Label" />
      </Input>
      <Input type="text" isInvalid={true}>
        <Input.Control placeholder="Escibe algo...">
          <Input.LeftAddons>
            <Input.Addons.Icon
              className="ps-3"
              tooltipContent={<p>HOLLLLLLA</p>}
              tooltipConfig={{ disableHoverableContent: true }}
              showAddonSeparatorRight
            />
            <Input.Addons.Icon
              hoverContent={hoverContent}
              hoverConfig={{ openDelay: 100, onOpenChange: (open) => console.log('IS OPEN:', open) }}
              icon={<Code />}
              showAddonSeparatorRight
            />
            <Input.Addons.Icon icon={<ActionDefinition />} showAddonSeparatorRight />
            <Input.Addons.Text text="$MXN" showAddonSeparatorRight />
            <Input.Addons.Button icon={<Settings />} hoverContent={hoverContent} showAddonSeparatorRight />
            <Input.Addons.Button
              text="click"
              className="text-xs"
              tooltipContent={<p>Da click</p>}
              onClick={(item) => console.log(item)}
              showAddonSeparatorRight
            />
          </Input.LeftAddons>
          <Input.RightAddons>
            <Input.Addons.Counter />
            <Input.Addons.Error showAddonSeparatorLeft={true} />
            <Input.Addons.Clear showAddonSeparatorLeft={true} tooltipContent={'Reset'} />
          </Input.RightAddons>
        </Input.Control>
        <Input.Label text="Label" />
      </Input>
    </div>
  );
}
