import { Plus } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  useTheme,
  Radio,
  ScrollView,
  Checkbox as NBCheckbox,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { Checkbox } from "@components/CheckBox";
import { Input } from "@components/Input";
import { ProductHeader } from "@components/ProductHeader";
import { RadioButton } from "@components/RadioButton";
import { Switch } from "@components/Switch";
import { SelectedProductImage } from "@components/SelectedProductImage";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function NewProductAnnouncement() {
  const [productState, setProductState] = useState("");
  const [tradable, setTradable] = useState(false);
  const [groupValue, setGroupValue] = useState([]);
  const [images, setImages] = useState<string[]>([]);

  const { colors, fontSizes } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleSelectImages = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsMultipleSelection: true,
        selectionLimit: 3,
      });

      if (photoSelected.canceled) {
        return;
      }

      const selectedImages = photoSelected.assets.map((image) => {
        return image.uri;
      });

      setImages(selectedImages);

      console.log(selectedImages);
    } catch (error) {}
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevState) => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  const handleCreateAnnouncement = () => {
    navigation.navigate("productDetails");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProductHeader title="Criar anúncio" />

      <ScrollView flex={1}>
        <VStack px={6} mt={6} alignItems="flex-start" pb={20}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Imagens
          </Heading>

          <Text color="gray.300" fontFamily="body" fontSize="sm">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          {images.length >= 3 ? (
            <HStack mt={4}>
              {images.map((image, index) => (
                <SelectedProductImage
                  source={image}
                  ml={index != 0 ? 2 : 0}
                  removeImage={() => handleRemoveImage(index)}
                />
              ))}
            </HStack>
          ) : (
            <HStack mt={4}>
              <HStack mr={images.length > 0 ? 2 : 0}>
                {images.map((image, index) => (
                  <SelectedProductImage
                    source={image}
                    ml={index != 0 ? 2 : 0}
                    removeImage={() => handleRemoveImage(index)}
                  />
                ))}
              </HStack>
              <TouchableOpacity onPress={handleSelectImages}>
                <Box
                  w={"card"}
                  h={"card"}
                  bg="gray.500"
                  rounded="md"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Plus size={fontSizes["xl"]} color={colors.gray["400"]} />
                </Box>
              </TouchableOpacity>
            </HStack>
          )}

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={8}>
            Sobre o produto
          </Heading>

          <Input placeholder="Título do anúncio" mt={4} />

          <Input
            placeholder="Descrição do produto"
            h={40}
            mt={4}
            textAlignVertical="top"
            multiline
          />

          <Radio.Group
            name="productState"
            accessibilityLabel="Estado do produto"
            value={productState}
            onChange={(newValue) => {
              setProductState(newValue);
            }}
            colorScheme="info"
          >
            <HStack justifyContent="space-between" w="full" mt={4}>
              <RadioButton value="new" label="Produto novo" />
              <RadioButton value="used" label="Produto usado" />
            </HStack>
          </Radio.Group>

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={8}>
            Venda
          </Heading>

          <Input
            placeholder="Valor do produto"
            mt={4}
            InputLeftElement={
              <Text fontSize="md" fontFamily="body" color="gray.100" ml={4}>
                R$
              </Text>
            }
          />

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={8}>
            Aceita troca?
          </Heading>

          <Switch
            mt={3}
            size="lg"
            onTrackColor="blue.500"
            onValueChange={() => setTradable(!tradable)}
          />

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={4}>
            Meios de pagamento aceitos
          </Heading>

          <VStack mt={4}>
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
        </VStack>
      </ScrollView>

      <HStack
        bg="white"
        h={24}
        px={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          title="Cancelar"
          flex={1}
          textColor="gray.200"
          bg="gray.500"
          _pressed={{
            bg: "gray.400",
          }}
          mr={3}
        />

        <Button
          title="Avançar"
          flex={1}
          bg="gray.100"
          _pressed={{
            bg: "gray.200",
          }}
          onPress={handleCreateAnnouncement}
        />
      </HStack>
    </SafeAreaView>
  );
}
