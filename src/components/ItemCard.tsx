import { Badge, HStack, Heading, Image, Text, VStack } from "native-base";
import { Avatar } from "./Avatar";

import Example from "@assets/example.png";

export function ItemCard() {
  return (
    <VStack mt={6}>
      <HStack
        h="card"
        w={40}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Image
          source={Example}
          alt="Produto"
          h="full"
          w="full"
          position="absolute"
          borderTopRadius="lg"
        />

        <Avatar size={6} mt={1} ml={1} marginRight="auto" />

        <Badge px={2} py={0.5} mt={1} mr={1} bg="gray.200" rounded="full">
          <Text color="white" textTransform="uppercase" fontSize="xxs">
            Usado
          </Text>
        </Badge>
      </HStack>

      <VStack>
        <Text fontSize="sm" fontFamily="body" color="gray.200">
          Tênis vermelho
        </Text>

        <Heading fontSize="md" fontFamily="heading" color="gray.100">
          R$ 59,90
        </Heading>
      </VStack>
    </VStack>
  );
}
