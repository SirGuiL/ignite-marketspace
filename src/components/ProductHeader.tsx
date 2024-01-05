import { Box, HStack, Heading, Pressable, useTheme } from "native-base";
import { ArrowLeft, Plus } from "phosphor-react-native";
import { ReactNode } from "react";

type Props = {
  rightIcon?: ReactNode;
  title?: string;
  leftIcon?: boolean;
};

export function ProductHeader({
  rightIcon,
  leftIcon = true,
  title = "",
}: Props) {
  const { colors, fontSizes } = useTheme();

  return (
    <HStack
      px={6}
      pt={5}
      pb={3}
      justifyContent="space-between"
      alignItems="center"
    >
      {title && rightIcon && !leftIcon ? <Box w={6}></Box> : <></>}

      {leftIcon && (
        <Pressable>
          <ArrowLeft size={fontSizes.xl} color={colors.gray["100"]} />
        </Pressable>
      )}

      {title && (
        <Heading color="gray.100" fontSize="lg">
          {title}
        </Heading>
      )}

      {rightIcon && <Pressable>{rightIcon}</Pressable>}

      {title && !rightIcon && leftIcon ? <Box w={6}></Box> : <></>}
    </HStack>
  );
}
