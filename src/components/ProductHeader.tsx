import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Box, HStack, Heading, Pressable, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { ReactNode } from "react";

type Props = {
  rightIcon?: ReactNode;
  title?: string;
  leftIcon?: boolean;
  isLoading?: boolean;
  rightIconAction?: () => void;
};

export function ProductHeader({
  rightIcon,
  leftIcon = true,
  title = "",
  isLoading = false,
  rightIconAction,
}: Props) {
  const { colors, fontSizes } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.goBack();
  };

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
        <Pressable onPress={handleGoBack}>
          <ArrowLeft size={fontSizes.xl} color={colors.gray["100"]} />
        </Pressable>
      )}

      {title && (
        <Heading color="gray.100" fontSize="lg">
          {title}
        </Heading>
      )}

      {rightIcon && (
        <Pressable onPress={rightIconAction} isDisabled={isLoading}>
          {rightIcon}
        </Pressable>
      )}

      {title && !rightIcon && leftIcon ? <Box w={6}></Box> : <></>}
    </HStack>
  );
}
