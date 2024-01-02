import {
  Button as NativeBaseButton,
  IButtonProps,
  Text,
  HStack,
} from "native-base";
import { ReactNode } from "react";

type Props = IButtonProps & {
  title: string;
  textColor?: string;
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
};

export function Button({
  title,
  textColor = "white",
  LeftIcon,
  RightIcon,
  ...rest
}: Props) {
  return (
    <NativeBaseButton w="full" h={14} rounded="sm" {...rest}>
      <HStack alignItems="center">
        {LeftIcon}

        <Text
          fontFamily="heading"
          fontSize="sm"
          color={textColor}
          ml={LeftIcon ? 2 : 0}
          mr={RightIcon ? 2 : 0}
        >
          {title}
        </Text>

        {RightIcon}
      </HStack>
    </NativeBaseButton>
  );
}
