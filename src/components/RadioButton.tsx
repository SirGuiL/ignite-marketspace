import { Radio, IRadioProps } from "native-base";

type Props = IRadioProps & {
  label: string;
};

export function RadioButton({ label, ...rest }: Props) {
  return <Radio {...rest}>{label}</Radio>;
}
