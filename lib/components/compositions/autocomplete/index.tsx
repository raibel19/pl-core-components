import AutocompleteAddonButton from './autocomplete-addon-button';
import AutocompleteAddonError from './autocomplete-addon-error';
import AutocompleteAddonIcon from './autocomplete-addon-icon';
import AutocompleteAddonSeparator from './autocomplete-addon-separator';
import AutocompleteAddonText from './autocomplete-addon-text';
import AutocompleteErrors from './autocomplete-errors';
import AutocompleteGroup from './autocomplete-group';
import AutocompleteHeader from './autocomplete-header';
import AutocompleteHeaderClearButton from './autocomplete-header-clear-button';
import AutocompleteInput from './autocomplete-input';
import AutocompleteInputWrapper from './autocomplete-input-wrapper';
import AutocompleteLabel from './autocomplete-label';
import AutocompleteLeftAddon from './autocomplete-left-addon';
import AutocompleteList from './autocomplete-list';
import AutocompleteListVirtualize from './autocomplete-list-virtualize';
import AutocompletePopover from './autocomplete-popover';
import AutocompleteRightAddon from './autocomplete-right-addon';
import AutocompleteRoot from './autocomplete-root';

type AutocompleteHeaderComponent = typeof AutocompleteHeader & {
  ClearButton: typeof AutocompleteHeaderClearButton;
};

type AutocompleteAddonsComponent = {
  Button: typeof AutocompleteAddonButton;
  Separator: typeof AutocompleteAddonSeparator;
  Error: typeof AutocompleteAddonError;
  Icon: typeof AutocompleteAddonIcon;
  Text: typeof AutocompleteAddonText;
};

type AutocompleteComponent = typeof AutocompleteRoot & {
  Addons: AutocompleteAddonsComponent;
  Group: typeof AutocompleteGroup;
  Header: AutocompleteHeaderComponent;
  Input: typeof AutocompleteInput;
  InputWrapper: typeof AutocompleteInputWrapper;
  Label: typeof AutocompleteLabel;
  LeftAddons: typeof AutocompleteLeftAddon;
  List: typeof AutocompleteList;
  ListVirtualize: typeof AutocompleteListVirtualize;
  Popover: typeof AutocompletePopover;
  RightAddons: typeof AutocompleteRightAddon;
  Errors: typeof AutocompleteErrors;
};

const Header = AutocompleteHeader as AutocompleteHeaderComponent;
Header.ClearButton = AutocompleteHeaderClearButton;

const Addons = {} as AutocompleteAddonsComponent;
Addons.Button = AutocompleteAddonButton;
Addons.Error = AutocompleteAddonError;
Addons.Separator = AutocompleteAddonSeparator;
Addons.Icon = AutocompleteAddonIcon;
Addons.Text = AutocompleteAddonText;

const Autocomplete = AutocompleteRoot as AutocompleteComponent;
Autocomplete.Addons = Addons;
Autocomplete.Group = AutocompleteGroup;
Autocomplete.Header = Header;
Autocomplete.Input = AutocompleteInput;
Autocomplete.InputWrapper = AutocompleteInputWrapper;
Autocomplete.Label = AutocompleteLabel;
Autocomplete.LeftAddons = AutocompleteLeftAddon;
Autocomplete.List = AutocompleteList;
Autocomplete.ListVirtualize = AutocompleteListVirtualize;
Autocomplete.Popover = AutocompletePopover;
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
} from './types/types';

// eslint-disable-next-line react-refresh/only-export-components
export { ErrorKeys, nonOpeningKeys } from './types/types';

export type { AutocompleteAddonButtonProps } from './autocomplete-addon-button';
export type { AutocompleteAddonErrorProps } from './autocomplete-addon-error';
export type { AutocompleteAddonIconProps } from './autocomplete-addon-icon';
export type { AutocompleteAddonSeparatorProps } from './autocomplete-addon-separator';
export type { AutocompleteAddonTextProps } from './autocomplete-addon-text';
export type { AutocompleteErrorsProps } from './autocomplete-errors';
export type { AutocompleteGroupProps } from './autocomplete-group';
export type { AutocompleteHeaderProps } from './autocomplete-header';
export type { AutocompleteHeaderClearButtonProps } from './autocomplete-header-clear-button';
export type { AutocompleteInputProps, AutocompleteInputRef } from './autocomplete-input';
export type { AutocompleteInputWrapperProps } from './autocomplete-input-wrapper';
export type { InputLabelProps } from './autocomplete-label';
export type { AutocompleteLeftAddonProps } from './autocomplete-left-addon';
export type { AutocompleteListProps } from './autocomplete-list';
export type { AutocompleteListVirtualizeProps } from './autocomplete-list-virtualize';
export type { AutocompletePopoverProps } from './autocomplete-popover';
export type { AutocompleteRightAddonProps } from './autocomplete-right-addon';
export type { AutocompleteRootProps as AutocompleteProps } from './autocomplete-root';
