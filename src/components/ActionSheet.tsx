import {
  Actionsheet,
  HStack,
  Heading,
  IActionsheetProps,
  VStack,
  useTheme,
  Checkbox as NBCheckbox,
} from "native-base";
import { X, XCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { ActionSheetBadge } from "./ActionSheetBadge";
import { useState } from "react";
import { Switch } from "./Switch";
import { Checkbox } from "./CheckBox";
import { Button } from "./Button";

type Props = IActionsheetProps & {
  closeActionSheet: () => void;
};

type conditionType = "novo" | "usado";

export function ActionSheet({ closeActionSheet, ...rest }: Props) {
  const [conditions, setConditions] = useState<conditionType[]>(["novo"]);
  const [tradable, setTradable] = useState(true);
  const [groupValue, setGroupValue] = useState(["bank-slip"]);

  const { colors, fontSizes } = useTheme();

  const handleAddNewConditionInFilter = (selectedCondition: conditionType) => {
    if (conditions.includes(selectedCondition)) {
      const newConditions = conditions.filter(
        (condition) => condition !== selectedCondition
      );
      setConditions(newConditions);
      return;
    }

    setConditions([...conditions, selectedCondition]);
  };

  return (
    <Actionsheet {...rest}>
      <Actionsheet.Content>
        <VStack w="full" px={6} py={8}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading color="gray.100" fontFamily="heading" fontSize="lg">
              Filtrar anúncios
            </Heading>

            <TouchableOpacity onPress={closeActionSheet}>
              <X size={fontSizes["xl"]} color={colors.gray["400"]} />
            </TouchableOpacity>
          </HStack>

          <VStack>
            <Heading fontFamily="heading" fontSize="sm" color="gray.200" mt={6}>
              Condição
            </Heading>

            <HStack mt={3}>
              <ActionSheetBadge
                text="Novo"
                rightIcon={
                  conditions.includes("novo") && (
                    <XCircle
                      size={fontSizes["md"]}
                      color={colors["white"]}
                      weight="fill"
                      style={{ marginRight: -10 }}
                    />
                  )
                }
                textColor={conditions.includes("novo") ? "white" : "gray.300"}
                bgColor={conditions.includes("novo") ? "blue.500" : "gray.500"}
                onPress={() => handleAddNewConditionInFilter("novo")}
              />

              <ActionSheetBadge
                text="Usado"
                ml={2}
                rightIcon={
                  conditions.includes("usado") && (
                    <XCircle
                      size={fontSizes["md"]}
                      color={colors["white"]}
                      weight="fill"
                      style={{ marginRight: -10 }}
                    />
                  )
                }
                textColor={conditions.includes("usado") ? "white" : "gray.300"}
                bgColor={conditions.includes("usado") ? "blue.500" : "gray.500"}
                onPress={() => handleAddNewConditionInFilter("usado")}
              />
            </HStack>

            <Heading fontFamily="heading" fontSize="sm" color="gray.200" mt={6}>
              Aceita troca?
            </Heading>

            <HStack mt={1}>
              <Switch
                size="lg"
                onTrackColor="blue.500"
                onValueChange={() => setTradable(!tradable)}
              />
            </HStack>

            <Heading fontFamily="heading" fontSize="sm" color="gray.200" mt={6}>
              Meios de pagamento aceitos
            </Heading>

            <VStack mt={3}>
              <NBCheckbox.Group
                accessibilityLabel="choose values"
                defaultValue={groupValue}
              >
                <Checkbox value="bank-slip" text="Boleto" colorScheme="info" />
                <Checkbox value="pix" text="Pix" colorScheme="info" />
                <Checkbox value="money" text="Dinheiro" colorScheme="info" />
                <Checkbox
                  value="credit-card"
                  text="Cartão de Crédito"
                  colorScheme="info"
                />
                <Checkbox
                  value="debit-card"
                  text="Cartão de Débito"
                  colorScheme="info"
                />
                <Checkbox
                  value="deposit-bank"
                  text="Depósito Bancário"
                  colorScheme="info"
                />
              </NBCheckbox.Group>
            </VStack>

            <HStack w="full" mt={16}>
              <Button
                title="Resetar filtros"
                bg="gray.500"
                textColor="gray.200"
                flex={1}
              />

              <Button
                title="Aplicar filtros"
                bg="gray.100"
                textColor="gray.700"
                flex={1}
                ml={3}
              />
            </HStack>
          </VStack>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
