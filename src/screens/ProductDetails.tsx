import { SafeAreaView } from "react-native-safe-area-context";
import {
  Badge,
  Box,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";

import { ProductHeader } from "@components/ProductHeader";
import { ProductImage } from "@components/ProductImage";
import { Avatar } from "@components/Avatar";
import { ActionSheetBadge } from "@components/ActionSheetBadge";
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  PencilSimpleLine,
  Power,
  QrCode,
  Trash,
  WhatsappLogo,
} from "phosphor-react-native";
import { PaymentMethod } from "@components/PaymentMethod";
import { Button } from "@components/Button";
import { useState } from "react";

export function ProductDetails() {
  const [author, setAuthor] = useState("me");
  const { colors, fontSizes } = useTheme();

  return (
    <SafeAreaView style={{ paddingHorizontal: 0, flex: 1 }}>
      <ProductHeader
        leftIcon
        rightIcon={
          author == "me" ? (
            <PencilSimpleLine size={fontSizes.xl} color={colors.gray["100"]} />
          ) : null
        }
      />

      <ScrollView bg="gray.600">
        <ProductImage />

        <HStack px={6} py={5} mb={1} alignItems="center">
          <Avatar size={6} />

          <Text ml={2} color="gray.100" fontSize="sm" fontFamily="body">
            Makenna Baptista
          </Text>
        </HStack>

        <VStack alignItems="flex-start" px={6} flex={1} pb={6}>
          <ActionSheetBadge text="Novo" />

          <HStack mt={2} justifyContent="space-between" alignItems="center">
            <Heading color="gray.100" fontSize="lg" fontFamily="heading">
              Bicicleta
            </Heading>

            <HStack flex={1} justifyContent="flex-end" alignItems="flex-end">
              <Heading
                color="blue.500"
                fontFamily="heading"
                fontSize="sm"
                mb={0.5}
                mr={0.5}
              >
                R$
              </Heading>
              <Heading color="blue.500" fontFamily="heading" fontSize="lg">
                120,00
              </Heading>
            </HStack>
          </HStack>

          <Text fontFamily="body" fontSize="sm" color="gray.200" mt={2}>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
            nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
            in aliquam.
          </Text>

          <HStack alignItems="center" mt={6}>
            <Heading fontFamily="heading" fontSize="sm" color="gray.200">
              Aceita troca?
            </Heading>
            <Text fontFamily="body" fontSize="sm" color="gray.200" ml={2}>
              Sim
            </Text>
          </HStack>

          <VStack mt={6}>
            <Heading fontFamily="heading" fontSize="sm" color="gray.200" mb={1}>
              Meios de pagamento:
            </Heading>

            <PaymentMethod
              icon={
                <Barcode size={fontSizes["md2"]} color={colors.gray["100"]} />
              }
              method="Boleto"
            />
            <PaymentMethod
              icon={
                <QrCode size={fontSizes["md2"]} color={colors.gray["100"]} />
              }
              method="Pix"
            />
            <PaymentMethod
              icon={
                <Money size={fontSizes["md2"]} color={colors.gray["100"]} />
              }
              method="Dinheiro"
            />
            <PaymentMethod
              icon={
                <CreditCard
                  size={fontSizes["md2"]}
                  color={colors.gray["100"]}
                />
              }
              method="Cartão de Crédito"
            />
            <PaymentMethod
              icon={<Bank size={fontSizes["md2"]} color={colors.gray["100"]} />}
              method="Depósito Bancário"
            />
          </VStack>
        </VStack>
      </ScrollView>

      {author === "me" ? (
        <VStack justifyContent="center" bg="white" h={35} px={6} py={2}>
          <Button
            title="Reativar anúncio"
            bg="blue.500"
            _pressed={{
              bg: "blue.700",
            }}
            LeftIcon={
              <Power
                size={fontSizes["md"]}
                color={colors.gray["600"]}
                weight="regular"
              />
            }
            flex={1}
          />

          <Button
            title="Excluir anúncio"
            textColor="gray.200"
            bg="gray.500"
            _pressed={{
              bg: "gray.400",
            }}
            LeftIcon={
              <Trash
                size={fontSizes["md"]}
                color={colors.gray["200"]}
                weight="regular"
              />
            }
            flex={1}
            mt={2}
          />
        </VStack>
      ) : (
        <HStack
          alignItems="center"
          justifyContent="space-between"
          bg="white"
          px={6}
          py={5}
        >
          <HStack alignItems="flex-end">
            <Heading
              color="blue.500"
              fontFamily="heading"
              fontSize="sm"
              mb={0.5}
              mr={0.5}
            >
              R$
            </Heading>
            <Heading color="blue.500" fontFamily="heading" fontSize="xl">
              120,00
            </Heading>
          </HStack>

          <Button
            title="Entrar em contato"
            bg="blue.500"
            _pressed={{
              bg: "blue.700",
            }}
            LeftIcon={
              <WhatsappLogo
                size={fontSizes["md"]}
                color={colors.gray["600"]}
                weight="fill"
              />
            }
            w={48}
          />
        </HStack>
      )}
    </SafeAreaView>
  );
}
