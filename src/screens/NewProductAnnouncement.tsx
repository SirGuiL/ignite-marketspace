import { useState } from "react";
import { Plus } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
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
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Checkbox } from "@components/CheckBox";
import { Input } from "@components/Input";
import { ProductHeader } from "@components/ProductHeader";
import { RadioButton } from "@components/RadioButton";
import { Switch } from "@components/Switch";
import { SelectedProductImage } from "@components/SelectedProductImage";
import { Button } from "@components/Button";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

interface FormDataProps {
  name: string;
  description: string;
  value: string;
}

const newProductSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  description: yup.string().required("Informe a descrição."),
  value: yup.string().required("Informe o valor"),
});

export function NewProductAnnouncement() {
  const [productState, setProductState] = useState("");
  const [tradable, setTradable] = useState(false);
  const [methods, setMethods] = useState([]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { colors, fontSizes } = useTheme();
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(newProductSchema),
  });

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
    } catch (error) {}
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevState) => {
      return prevState.filter((_, i) => i !== index);
    });
  };

  const handleCreateAnnouncement = async (data: FormDataProps) => {
    if (!productState) {
      toast.show({
        title: "Informe o estado do produto.",
        placement: "top",
        bgColor: "red.500",
      });
      return;
    }

    if (methods.length <= 0) {
      toast.show({
        title: "Informe os métodos de pagamento.",
        placement: "top",
        bgColor: "red.500",
      });
      return;
    }

    try {
      setIsLoading(true);

      await api.post("/products", {
        name: data.name,
        description: data.description,
        is_new: productState === "new",
        price: data.value,
        accept_trade: tradable,
        payment_methods: [methods],
      });

      navigation.navigate("productDetails");
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

      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProductHeader title="Criar anúncio" />

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título do anúncio"
                mt={4}
                onChangeText={onChange}
                value={value}
                isDisabled={isLoading}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Descrição do produto"
                h={40}
                mt={4}
                textAlignVertical="top"
                multiline
                onChangeText={onChange}
                value={value}
                isDisabled={isLoading}
              />
            )}
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
              <RadioButton
                value="new"
                label="Produto novo"
                isDisabled={isLoading}
              />
              <RadioButton
                value="used"
                label="Produto usado"
                isDisabled={isLoading}
              />
            </HStack>
          </Radio.Group>

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={8}>
            Venda
          </Heading>

          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Valor do produto"
                mt={4}
                onChangeText={onChange}
                value={value}
                InputLeftElement={
                  <Text fontSize="md" fontFamily="body" color="gray.100" ml={4}>
                    R$
                  </Text>
                }
                isDisabled={isLoading}
              />
            )}
          />

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={8}>
            Aceita troca?
          </Heading>

          <Switch
            mt={3}
            size="lg"
            onTrackColor="blue.500"
            onValueChange={() => setTradable(!tradable)}
            isDisabled={isLoading}
          />

          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={4}>
            Meios de pagamento aceitos
          </Heading>

          <VStack mt={4}>
            <NBCheckbox.Group
              accessibilityLabel="choose values"
              defaultValue={methods}
              onChange={setMethods}
            >
              <Checkbox
                value="boleto"
                text="Boleto"
                colorScheme="info"
                isDisabled={isLoading}
              />
              <Checkbox
                value="pix"
                text="Pix"
                colorScheme="info"
                isDisabled={isLoading}
              />
              <Checkbox
                value="cash"
                text="Dinheiro"
                colorScheme="info"
                isDisabled={isLoading}
              />
              <Checkbox
                value="card"
                text="Cartão de Crédito"
                colorScheme="info"
                isDisabled={isLoading}
              />
              <Checkbox
                value="deposit"
                text="Depósito Bancário"
                colorScheme="info"
                isDisabled={isLoading}
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
          isDisabled={isLoading}
          _disabled={{
            opacity: 0.75,
          }}
          onPress={handleCancel}
        />

        <Button
          title="Avançar"
          flex={1}
          bg="gray.100"
          _pressed={{
            bg: "gray.200",
          }}
          isDisabled={isLoading}
          _disabled={{
            opacity: 0.75,
          }}
          onPress={handleSubmit(handleCreateAnnouncement)}
        />
      </HStack>
    </SafeAreaView>
  );
}
