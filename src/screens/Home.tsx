import {
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
  useDisclose,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeHeader } from "@components/HomeHeader";
import { Adverts } from "@components/Adverts";
import { SearchInput } from "@components/SearchInput";
import { ItemCard } from "@components/ItemCard";
import { ActionSheet } from "@components/ActionSheet";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoToMyProducts = () => {
    navigation.navigate("myProducts");
  };

  const handleOpenProductDetails = () => {
    navigation.navigate("productDetails");
  };

  return (
    <ScrollView flex={1} bg="gray.600">
      <SafeAreaView>
        <HomeHeader />

        <VStack px={6} mt={8} pb={10}>
          <Text color="gray.300" fontSize="sm" fontFamily="body">
            Seus produtos anunciados para venda
          </Text>

          <Adverts onPress={handleGoToMyProducts} />

          <Text fontSize="sm" fontFamily="body" color="gray.300" mt={8}>
            Compre produtos variados
          </Text>

          <SearchInput openActionSheet={() => onOpen()} />

          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <ItemCard onPress={handleOpenProductDetails} />

            <ItemCard />

            <ItemCard />

            <ItemCard />

            <ItemCard />

            <ItemCard />

            <ItemCard />

            <ItemCard />

            <ItemCard />

            <ItemCard />
          </Box>
        </VStack>

        <ActionSheet isOpen={isOpen} closeActionSheet={onClose} />
      </SafeAreaView>
    </ScrollView>
  );
}
