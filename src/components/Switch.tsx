import { ISwitchProps, Switch as NBSwitch } from "native-base";

export function Switch({ ...rest }: ISwitchProps) {
  return <NBSwitch {...rest} />;
}
