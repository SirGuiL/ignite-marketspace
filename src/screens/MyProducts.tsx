import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Select as NBSelect, useTheme, HStack, Text, Box } from "native-base";
import { Plus } from "phosphor-react-native";

import { ItemCard } from "@components/ItemCard";
import { ProductHeader } from "@components/ProductHeader";
import { Select } from "@components/Select";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function MyProducts() {
  const [selected, setSelected] = useState("all");

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
        rightIcon={<Plus size={fontSizes.xl} color={colors.gray["100"]} />}
        leftIcon={false}
        rightIconAction={handleCreateNewAnnouncement}
      />

      <HStack mt={8} alignItems="center" justifyContent="space-between" px={6}>
        <Text>9 anúncios</Text>

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
    </SafeAreaView>
  );
}
