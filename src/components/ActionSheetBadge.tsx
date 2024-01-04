import {
  Badge,
  HStack,
  Heading,
  IPressableProps,
  Pressable,
} from "native-base";
import { ReactNode } from "react";

type Props = IPressableProps & {
  text: string;
  rightIcon?: ReactNode;
  bgColor?: string;
  textColor?: string;
};

export function ActionSheetBadge({
  text,
  rightIcon,
  bgColor = "gray.500",
  textColor = "gray.300",
  ...rest
}: Props) {
  return (
    <Pressable {...rest}>
      <Badge
        bg={bgColor}
        rounded="full"
        px={4}
        py={1.5}
        alignItems="center"
        flexDirection="row"
      >
        <HStack alignItems="center">
          <Heading
            textTransform="uppercase"
            color={textColor}
            fontFamily="heading"
            fontSize="xs"
            mr={rightIcon ? 1.5 : 0}
          >
            {text}
          </Heading>

          {rightIcon}
        </HStack>
      </Badge>
    </Pressable>
  );
}
