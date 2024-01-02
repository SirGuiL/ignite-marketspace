import { Box, HStack, useTheme } from "native-base";
import { Input } from "./Input";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function SearchInput() {
  const { colors, fontSizes } = useTheme();

  return (
    <Input
      w="full"
      placeholder="Buscar anúncio"
      mt={4}
      rightElement={
        <HStack pr={4}>
          <TouchableOpacity>
            <MagnifyingGlass
              size={fontSizes["lg"]}
              color={colors.gray["200"]}
            />
          </TouchableOpacity>

          <Box mx={3} bg="gray.400" w="0.5" h="5" bgColor="gray.400" />

          <TouchableOpacity>
            <Sliders size={fontSizes["lg"]} color={colors.gray["200"]} />
          </TouchableOpacity>
        </HStack>
      }
    />
  );
}
