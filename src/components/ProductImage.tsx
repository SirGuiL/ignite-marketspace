import { Box, HStack, Image } from "native-base";

import Bike from "@assets/bike.png";

export function ProductImage() {
  return (
    <Box justifyContent="flex-end" w="full" h={72}>
      <Image
        source={Bike}
        w="full"
        h="full"
        resizeMode="cover"
        position="absolute"
        alt="Bike image"
      />

      <HStack w="full">
        <Box bg="gray.700" flex={1} h={1} mb={0.5}></Box>
        <Box bg="gray.700" flex={1} h={1} mb={0.5} mx={1} opacity={0.5}></Box>
        <Box bg="gray.700" flex={1} h={1} mb={0.5} opacity={0.5}></Box>
      </HStack>
    </Box>
  );
}
