import { useCallback, useState } from "react";
import {
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
  useDisclose,
  useToast,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { HomeHeader } from "@components/HomeHeader";
import { Adverts } from "@components/Adverts";
import { SearchInput } from "@components/SearchInput";
import { ItemCard } from "@components/ItemCard";
import { ActionSheet } from "@components/ActionSheet";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { productDTO } from "@dtos/productDTO";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<productDTO[]>([] as productDTO[]);

  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const handleGoToMyProducts = () => {
    navigation.navigate("myProducts");
  };

  const handleOpenProductDetails = () => {
    navigation.navigate("productDetails");
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} flex={1} bg="gray.600">
      <SafeAreaView>
        <HomeHeader isLoading={isLoading} />

        <VStack px={6} mt={8} pb={10}>
          <Text color="gray.300" fontSize="sm" fontFamily="body">
            Seus produtos anunciados para venda
          </Text>

          <Adverts onPress={handleGoToMyProducts} isLoading={isLoading} />

          <Text fontSize="sm" fontFamily="body" color="gray.300" mt={8}>
            Compre produtos variados
          </Text>

          <SearchInput
            openActionSheet={() => onOpen()}
            isDisabled={isLoading}
          />

          {isLoading ? (
            <Box
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <ItemCard isLoading key={index} />
              ))}
            </Box>
          ) : (
            <></>
          )}
        </VStack>

        <ActionSheet isOpen={isOpen} closeActionSheet={onClose} />
      </SafeAreaView>
    </ScrollView>
  );
}
