import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Select as NBSelect, useTheme, HStack, Text, Box } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";

import { ItemCard } from "@components/ItemCard";
import { ProductHeader } from "@components/ProductHeader";
import { Select } from "@components/Select";

export function MyProducts() {
  const [selected, setSelected] = useState("all");

  const { colors, fontSizes } = useTheme();

  return (
    <SafeAreaView>
      <ProductHeader
        title="Meus anúncios"
        rightIcon={<Plus size={fontSizes.xl} color={colors.gray["100"]} />}
        leftIcon={false}
      />

      <HStack mt={8} alignItems="center" justifyContent="space-between" px={6}>
        <Text>9 anúncios</Text>

        <Select
          selectedValue={selected}
          onValueChange={(item) => setSelected(item)}
          w={32}
          rounded="lg"
          fontSize="sm"
          color="gray.100"
          fontFamily="body"
          dropdownIcon={
            <CaretDown
              size={fontSizes["md"]}
              color={colors.gray["300"]}
              style={{ marginRight: 12 }}
            />
          }
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
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Box>
    </SafeAreaView>
  );
}
