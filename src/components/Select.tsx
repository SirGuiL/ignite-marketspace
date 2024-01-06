import { ISelectProps, Select as NBSelect, useTheme } from "native-base";
import { CaretDown } from "phosphor-react-native";
import { ReactNode } from "react";

type Props = ISelectProps & {
  children: ReactNode;
};

export function Select({ children, ...rest }: Props) {
  const { colors, fontSizes } = useTheme();

  return (
    <NBSelect
      py={2}
      pl={3}
      rounded="lg"
      fontSize="sm"
      color="gray.100"
      fontFamily="body"
      dropdownIcon={
        <CaretDown
          size={fontSizes["md"]}
          color={colors.gray["300"]}
          style={{ marginRight: 12 }}
        />
      }
      {...rest}
    >
      {children}
    </NBSelect>
  );
}
