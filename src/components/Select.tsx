import { ISelectProps, Select as NBSelect } from "native-base";
import { ReactNode } from "react";

type Props = ISelectProps & {
  children: ReactNode;
};

export function Select({ children, ...rest }: Props) {
  return (
    <NBSelect py={2} pl={3} {...rest}>
      {children}
    </NBSelect>
  );
}
