import { ICheckboxProps, Checkbox as NBCheckbox } from "native-base";

type Props = ICheckboxProps & {
  text: string;
};

export function Checkbox({ text, ...rest }: Props) {
  return (
    <NBCheckbox mb={2} {...rest}>
      {text}
    </NBCheckbox>
  );
}
