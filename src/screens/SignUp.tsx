import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  phone: string;
}

type avatarData = {
  uri: string;
  type?: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve conter ao menos 6 caracteres."),
  password_confirm: yup
    .string()
    .required("Informe a senha.")
    .oneOf(
      [yup.ref("password"), ""],
      "A confirmação da senha deve ser igual a senha."
    ),
  phone: yup
    .string()
    .required("Informe a senha.")
    .min(10, "Informe um número válido"),
});

export function SignUp() {
  const [showingPassword, setShowingPassword] = useState(false);
  const [showingConfirmPassword, setShowingConfirmPassword] = useState(false);
  const [userAvatar, setUserAvatar] = useState<avatarData>({} as avatarData);
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { SignIn } = useAuth();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const handleGoToSignIn = () => {
    navigation.navigate("signIn");
  };

  const handleChoosePhoto = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      setUserAvatar({
        uri: photoSelected.assets[0].uri,
        type: photoSelected.assets[0].type,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (props: FormDataProps) => {
    try {
      setIsLoading(true);

      const userForm = new FormData();

      if (userAvatar.uri) {
        const fileExtension = userAvatar.uri.split(".").pop();

        const photoFile = {
          name: `${props.name}.${fileExtension}`.toLowerCase(),
          uri: userAvatar.uri,
          type: `${userAvatar.type}/${fileExtension}`,
        } as any;

        userForm.append("avatar", photoFile);
      }

      userForm.append("name", props.name);
      userForm.append("email", props.email);
      userForm.append("tel", props.phone);
      userForm.append("password", props.password);

      const response = await api.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      SignIn({
        email: props.email,
        password: props.password,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });

      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="gray.600"
      pb={16}
      px={12}
    >
      <VStack flex={1} pt={16}>
        <Center>
          <Logo height={40} />

          <Box mt={3}>
            <Heading fontFamily="heading" fontSize="lg" color="gray.100">
              Boas vindas!
            </Heading>
          </Box>

          <Text
            fontFamily="thin"
            color="gray.300"
            fontSize="sm"
            textAlign="center"
          >
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>

          <Pressable mt={8} onPress={handleChoosePhoto}>
            <Avatar
              size={20}
              borderWidth={2}
              borderColor="blue.500"
              editable
              uri={userAvatar.uri}
            />
          </Pressable>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                w="full"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                mt={4}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                w="full"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                mt={4}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                w="full"
                placeholder="Telefone"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                mt={4}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                w="full"
                placeholder="Senha"
                secureTextEntry={!showingPassword}
                autoCapitalize="none"
                roundedRight="none"
                onChangeText={onChange}
                value={value}
                mt={4}
                rightElement={
                  <Pressable
                    pr={4}
                    onPress={() => setShowingPassword(!showingPassword)}
                  >
                    {showingPassword ? (
                      <EyeSlash size={20} color={colors.gray["300"]} />
                    ) : (
                      <Eye size={20} color={colors.gray["300"]} />
                    )}
                  </Pressable>
                }
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                w="full"
                placeholder="Confirmar senha"
                secureTextEntry={!showingConfirmPassword}
                autoCapitalize="none"
                roundedRight="none"
                onChangeText={onChange}
                value={value}
                mt={4}
                rightElement={
                  <Pressable
                    pr={4}
                    onPress={() =>
                      setShowingConfirmPassword(!showingConfirmPassword)
                    }
                  >
                    {showingConfirmPassword ? (
                      <EyeSlash size={20} color={colors.gray["300"]} />
                    ) : (
                      <Eye size={20} color={colors.gray["300"]} />
                    )}
                  </Pressable>
                }
              />
            )}
          />

          <Button
            title="Criar"
            mt={8}
            bg="gray.100"
            _pressed={{
              bg: "gray.200",
            }}
            onPress={handleSubmit(handleSignUp)}
            isDisabled={isLoading}
            _disabled={{
              opacity: 0.75,
            }}
          />
        </Center>
      </VStack>

      <Center>
        <Text color="gray.200" fontFamily="body" fontSize="sm">
          Já tem uma conta?
        </Text>

        <Button
          title="Ir para o login"
          textColor="gray.200"
          mt={4}
          bg="gray.500"
          _pressed={{
            bg: "gray.600",
          }}
          onPress={handleGoToSignIn}
        />
      </Center>
    </ScrollView>
  );
}
