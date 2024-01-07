import {
  Badge,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { Avatar } from "./Avatar";

import Example from "@assets/example.png";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  isLoading?: boolean;
};

export function ItemCard({ isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity disabled={isLoading} {...rest}>
      <VStack mt={6}>
        <HStack
          h="card"
          w={40}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {!isLoading ? (
            <Image
              source={Example}
              alt="Produto"
              h="full"
              w="full"
              position="absolute"
              borderTopRadius="lg"
            />
          ) : (
            <Skeleton
              w="full"
              h="full"
              position="absolute"
              borderTopRadius="lg"
              startColor="gray.500"
              endColor="gray.400"
            />
          )}

          {!isLoading ? (
            <Avatar size={6} mt={1} ml={1} marginRight="auto" />
          ) : (
            <></>
          )}

          {!isLoading ? (
            <Badge px={2} py={0.5} mt={1} mr={1} bg="gray.200" rounded="full">
              <Text color="white" textTransform="uppercase" fontSize="xxs">
                Usado
              </Text>
            </Badge>
          ) : (
            <></>
          )}
        </HStack>

        <VStack>
          {!isLoading ? (
            <Text fontSize="sm" fontFamily="body" color="gray.200">
              Tênis vermelho
            </Text>
          ) : (
            <Skeleton
              w={24}
              h={3}
              rounded="md"
              startColor="gray.500"
              endColor="gray.400"
              mt={1.5}
            />
          )}

          {!isLoading ? (
            <Heading fontSize="md" fontFamily="heading" color="gray.100">
              R$ 59,90
            </Heading>
          ) : (
            <Skeleton
              w={10}
              h={4}
              rounded="md"
              startColor="gray.500"
              endColor="gray.400"
              mt={1}
            />
          )}
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
