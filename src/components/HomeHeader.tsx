import {
  Box,
  HStack,
  Heading,
  Skeleton,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { Plus } from "phosphor-react-native";

import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = {
  isLoading?: boolean;
};

export function HomeHeader({ isLoading = false }: Props) {
  const { colors, sizes } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToCreateNewProduct = () => {
    navigation.navigate("newProduct");
  };

  return (
    <HStack px={6} py={5} alignItems="center">
      {!isLoading ? (
        <Avatar size={12} />
      ) : (
        <Skeleton
          w={12}
          h={12}
          startColor="gray.500"
          endColor="gray.400"
          rounded="full"
        />
      )}

      <VStack ml={2.5} flex={1} justifyContent="center">
        <Text color="gray.100" fontFamily="body" fontSize="md">
          Boas vindas,
        </Text>
        {!isLoading ? (
          <Heading fontFamily="heading" fontSize="md" color="gray.100">
            Guilherme!
          </Heading>
        ) : (
          <Skeleton
            w={20}
            h={3}
            startColor="gray.500"
            endColor="gray.400"
            mt={1.5}
          />
        )}
      </VStack>

      <Box w={35} ml={2.5}>
        <Button
          title="Criar anúncio"
          bg="gray.100"
          LeftIcon={<Plus size={sizes[4]} color={colors.gray["600"]} />}
          _pressed={{
            bg: "gray.200",
          }}
          onPress={handleNavigateToCreateNewProduct}
          _disabled={{
            opacity: 0.75,
          }}
          isDisabled={isLoading}
        />
      </Box>
    </HStack>
  );
}
