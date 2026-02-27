import InputAddonButton from './input-addon-button';
import InputAddonClear from './input-addon-clear';
import InputAddonCounter from './input-addon-counter';
import InputAddonError from './input-addon-error';
import InputAddonIcon from './input-addon-icon';
import InputAddonSeparator from './input-addon-separator';
import InputAddonText from './input-addon-text';
import InputContent from './input-content';
import InputControl from './input-control';
import InputErrors from './input-errors';
import InputLabel from './input-label';
import InputLeftAddon from './input-left-addon';
import InputRightAddon from './input-right-addon';
import InputRoot from './input-root';
import InputSkeleton from './input-skeleton';

type InputAddonsComponent = {
  Button: typeof InputAddonButton;
  Clear: typeof InputAddonClear;
  Counter: typeof InputAddonCounter;
  Error: typeof InputAddonError;
  Icon: typeof InputAddonIcon;
  Separator: typeof InputAddonSeparator;
  Text: typeof InputAddonText;
};

type InputComponent = typeof InputRoot & {
  Addons: InputAddonsComponent;
  Content: typeof InputContent;
  Control: typeof InputControl;
  Errors: typeof InputErrors;
  Label: typeof InputLabel;
  LeftAddons: typeof InputLeftAddon;
  RightAddons: typeof InputRightAddon;
  Skeleton: typeof InputSkeleton;
};

const Addons = {} as InputAddonsComponent;
Addons.Button = InputAddonButton;
Addons.Clear = InputAddonClear;
Addons.Counter = InputAddonCounter;
Addons.Error = InputAddonError;
Addons.Icon = InputAddonIcon;
Addons.Separator = InputAddonSeparator;
Addons.Text = InputAddonText;

const Input = InputRoot as InputComponent;
Input.Addons = Addons;
Input.Content = InputContent;
Input.Control = InputControl;
Input.Errors = InputErrors;
Input.Label = InputLabel;
Input.LeftAddons = InputLeftAddon;
Input.RightAddons = InputRightAddon;
Input.Skeleton = InputSkeleton;

export { Input };

export type {
  ErrorAction,
  ErrorState,
  IFormatter,
  ISanitize,
  ISubscribeBetween,
  IValidationBetween,
  IValidationLimits,
  InputChangePayload,
  InputType,
  NumericPayload,
  TextPayload,
  Timeout,
} from './types/types';

export { ErrorKeys } from './types/types';

export type { InputAddonButtonProps } from './input-addon-button';
export type { InputAddonClearProps } from './input-addon-clear';
export type { InputAddonCounterProps } from './input-addon-counter';
export type { InputAddonErrorProps } from './input-addon-error';
export type { InputAddonIconProps } from './input-addon-icon';
export type { InputAddonSeparatorProps } from './input-addon-separator';
export type { InputAddonTextProps } from './input-addon-text';
export type { InputContentProps } from './input-content';
export type { InputControlProps, InputControlRef } from './input-control';
export type { InputErrorsProps } from './input-errors';
export type { InputLabelProps } from './input-label';
export type { InputLeftAddonProps } from './input-left-addon';
export type { InputRightAddonProps } from './input-right-addon';
export type { InputRootProps as InputProps } from './input-root';
export type { InputSkeletonProps } from './input-skeleton';
