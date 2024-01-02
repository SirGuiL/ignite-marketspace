import { Box, HStack, Heading, Text, VStack, useTheme } from "native-base";
import { Plus } from "phosphor-react-native";

import { Avatar } from "./Avatar";
import { Button } from "./Button";

export function HomeHeader() {
  const { colors, sizes } = useTheme();
  return (
    <HStack px={6} py={5} alignItems="center">
      <Avatar size={12} />

      <VStack ml={2.5} flex={1} justifyContent="center">
        <Text color="gray.100" fontFamily="body" fontSize="md">
          Boas vindas,
        </Text>
        <Heading fontFamily="heading" fontSize="md" color="gray.100">
          Guilherme!
        </Heading>
      </VStack>

      <Box w={35} ml={2.5}>
        <Button
          title="Criar anúncio"
          bg="gray.100"
          LeftIcon={<Plus size={sizes[4]} color={colors.gray["600"]} />}
          _pressed={{
            bg: "gray.200",
          }}
        />
      </Box>
    </HStack>
  );
}
