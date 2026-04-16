import AutocompleteAddonButton from './autocomplete-addon-button';
import AutocompleteAddonError from './autocomplete-addon-error';
import AutocompleteAddonIcon from './autocomplete-addon-icon';
import AutocompleteAddonSeparator from './autocomplete-addon-separator';
import AutocompleteAddonText from './autocomplete-addon-text';
import AutocompleteContent from './autocomplete-content';
import AutocompleteErrors from './autocomplete-errors';
import AutocompleteHeader from './autocomplete-header';
import AutocompleteInput from './autocomplete-input';
import AutocompleteLabel from './autocomplete-label';
import AutocompleteLeftAddon from './autocomplete-left-addon';
import AutocompleteList from './autocomplete-list';
import AutocompleteListVirtualize from './autocomplete-list-virtualize';
import AutocompleteRightAddon from './autocomplete-right-addon';
import AutocompleteRoot from './autocomplete-root';

type AutocompleteAddonsComponent = {
  Button: typeof AutocompleteAddonButton;
  Separator: typeof AutocompleteAddonSeparator;
  Error: typeof AutocompleteAddonError;
  Icon: typeof AutocompleteAddonIcon;
  Text: typeof AutocompleteAddonText;
};

type AutocompleteComponent = typeof AutocompleteRoot & {
  Addons: AutocompleteAddonsComponent;
  Header: typeof AutocompleteHeader;
  Input: typeof AutocompleteInput;
  Label: typeof AutocompleteLabel;
  LeftAddons: typeof AutocompleteLeftAddon;
  List: typeof AutocompleteList;
  ListVirtualize: typeof AutocompleteListVirtualize;
  Content: typeof AutocompleteContent;
  RightAddons: typeof AutocompleteRightAddon;
  Errors: typeof AutocompleteErrors;
};

const Addons = {} as AutocompleteAddonsComponent;
Addons.Button = AutocompleteAddonButton;
Addons.Error = AutocompleteAddonError;
Addons.Separator = AutocompleteAddonSeparator;
Addons.Icon = AutocompleteAddonIcon;
Addons.Text = AutocompleteAddonText;

const Autocomplete = AutocompleteRoot as AutocompleteComponent;
Autocomplete.Addons = Addons;
Autocomplete.Header = AutocompleteHeader;
Autocomplete.Input = AutocompleteInput;
Autocomplete.Label = AutocompleteLabel;
Autocomplete.LeftAddons = AutocompleteLeftAddon;
Autocomplete.List = AutocompleteList;
Autocomplete.ListVirtualize = AutocompleteListVirtualize;
Autocomplete.Content = AutocompleteContent;
Autocomplete.RightAddons = AutocompleteRightAddon;
Autocomplete.Errors = AutocompleteErrors;

export { Autocomplete };

export type {
  Actions,
  AutocompleteAction,
  AutocompleteStateChangePayload,
  ErrorAction,
  ErrorState,
  IAutocompleteState,
  IItem,
  Items,
  ItemsWithIdentifier,
  Timeout,
} from './types/types';

// eslint-disable-next-line react-refresh/only-export-components
export { ErrorKeys, nonOpeningKeys } from './types/types';

export type { AutocompleteAddonButtonProps } from './autocomplete-addon-button';
export type { AutocompleteAddonErrorProps } from './autocomplete-addon-error';
export type { AutocompleteAddonIconProps } from './autocomplete-addon-icon';
export type { AutocompleteAddonSeparatorProps } from './autocomplete-addon-separator';
export type { AutocompleteAddonTextProps } from './autocomplete-addon-text';
export type { AutocompleteErrorsProps } from './autocomplete-errors';
export type { AutocompleteHeaderProps } from './autocomplete-header';
export type { AutocompleteInputProps, AutocompleteInputRef } from './autocomplete-input';
export type { InputLabelProps } from './autocomplete-label';
export type { AutocompleteLeftAddonProps } from './autocomplete-left-addon';
export type { AutocompleteListProps } from './autocomplete-list';
export type { AutocompleteListVirtualizeProps } from './autocomplete-list-virtualize';
export type { AutocompleteContentProps } from './autocomplete-content';
export type { AutocompleteRightAddonProps } from './autocomplete-right-addon';
export type { AutocompleteRootProps as AutocompleteProps } from './autocomplete-root';
