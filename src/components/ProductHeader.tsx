import { Box, HStack, Heading, Pressable, useTheme } from "native-base";
import { ArrowLeft, Plus } from "phosphor-react-native";

type Props = {
  addIcon?: boolean;
  title?: string;
};

export function ProductHeader({ addIcon = false, title = "" }: Props) {
  const { colors, fontSizes } = useTheme();

  return (
    <HStack
      px={6}
      pt={5}
      pb={3}
      justifyContent="space-between"
      alignItems="center"
    >
      <Pressable>
        <ArrowLeft size={fontSizes.xl} color={colors.gray["100"]} />
      </Pressable>

      {title && (
        <Heading color="gray.100" fontSize="lg">
          {title}
        </Heading>
      )}

      {addIcon && (
        <Pressable>
          <Plus size={fontSizes.xl} color={colors.gray["100"]} />
        </Pressable>
      )}

      {title && !addIcon && <Box w={6}></Box>}
    </HStack>
  );
}
