import {
  HStack,
  Heading,
  IBoxProps,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type Props = {};

export function Adverts({}: Props) {
  const { colors, fontSizes } = useTheme();

  return (
    <TouchableOpacity style={{ marginTop: 12 }}>
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
          <Heading color="gray.200" fontFamily="heading" fontSize="lg">
            4
          </Heading>

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
