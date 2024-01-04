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

export function Home() {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <ScrollView flex={1} bg="gray.600">
      <SafeAreaView>
        <HomeHeader />

        <VStack px={6} mt={8}>
          <Text color="gray.300" fontSize="sm" fontFamily="body">
            Seus produtos anunciados para venda
          </Text>

          <Adverts />

          <Text fontSize="sm" fontFamily="body" color="gray.300" mt={8}>
            Compre produtos variados
          </Text>

          <SearchInput openActionSheet={() => onOpen()} />

          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <ItemCard />

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
