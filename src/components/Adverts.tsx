import {
  HStack,
  Heading,
  IBoxProps,
  Skeleton,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  isLoading?: boolean;
};

export function Adverts({ isLoading = false, ...rest }: Props) {
  const { colors, fontSizes } = useTheme();

  return (
    <TouchableOpacity
      style={{ marginTop: 12, opacity: isLoading ? 0.75 : 1 }}
      disabled={isLoading}
      {...rest}
    >
      <HStack
        pl={4}
        pr={5}
        py={3}
        bg="blue.100"
        alignItems="center"
        rounded="md"
      >
        <Tag size={22} color={colors.blue["700"]} />

        <VStack ml={4} flex={1}>
          {!isLoading ? (
            <Heading color="gray.200" fontFamily="heading" fontSize="lg">
              4
            </Heading>
          ) : (
            <Skeleton
              w={8}
              h={5}
              startColor="gray.500"
              endColor="gray.400"
              mt={1.5}
            />
          )}

          <Text color="gray.200" fontFamily="body" fontSize="xs">
            anúncios ativos
          </Text>
        </VStack>

        <HStack ml={2.5} alignItems="center">
          <Heading color="blue.700" fontFamily="heading" fontSize="xs" mr={2}>
            Meus anúncios
          </Heading>

          <ArrowRight size={fontSizes["md"]} color={colors.blue["700"]} />
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}
