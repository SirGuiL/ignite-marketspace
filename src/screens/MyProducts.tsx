import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Select as NBSelect,
  useTheme,
  HStack,
  Text,
  Box,
  Skeleton,
  ScrollView,
} from "native-base";
import { Plus } from "phosphor-react-native";

import { ItemCard } from "@components/ItemCard";
import { ProductHeader } from "@components/ProductHeader";
import { Select } from "@components/Select";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function MyProducts() {
  const [selected, setSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const { colors, fontSizes } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleCreateNewAnnouncement = () => {
    navigation.navigate("newProduct");
  };

  const handleOpenProductDetail = () => {
    navigation.navigate("productDetails");
  };

  return (
    <SafeAreaView>
      <ProductHeader
        title="Meus anúncios"
        rightIcon={
          <Plus
            size={fontSizes.xl}
            color={isLoading ? colors.gray["400"] : colors.gray["100"]}
          />
        }
        leftIcon={false}
        rightIconAction={handleCreateNewAnnouncement}
        isLoading={isLoading}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack
          mt={8}
          alignItems="center"
          justifyContent="space-between"
          px={6}
        >
          {!isLoading ? (
            <Text fontFamily="body" fontSize="sm" color="gray.200">
              9 anúncios
            </Text>
          ) : (
            <Skeleton
              w={20}
              h={4}
              startColor="gray.500"
              endColor="gray.400"
              mt={0.5}
            />
          )}

          <Select
            selectedValue={selected}
            onValueChange={(item) => setSelected(item)}
            w={32}
          >
            <NBSelect.Item label="Todos" value="all" />
            <NBSelect.Item label="Ativos" value="active" />
            <NBSelect.Item label="Inativos" value="inactive" />
          </Select>
        </HStack>

        {!isLoading ? (
          <Box
            mt={5}
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            px={6}
          >
            <ItemCard onPress={handleOpenProductDetail} />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </Box>
        ) : (
          <Box
            mt={5}
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            px={6}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <ItemCard isLoading key={index} />
            ))}
          </Box>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
