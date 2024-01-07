import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import MarketSpace from "@assets/marketspace.svg";
import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

interface FormDataProps {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail."),
  password: yup.string().required("Informe a senha."),
});

export function SignIn() {
  const [showingPassword, setShowingPassword] = useState(false);
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
    resolver: yupResolver(signInSchema),
  });

  const handleGoToSignUp = () => {
    navigation.navigate("signUp");
  };

  const handleSignIn = ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true);

      SignIn({
        email,
        password,
      });
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

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.600" roundedBottom="3xl" px={12} py={16}>
        <Center>
          <Logo height={64} />

          <Box mt={5}>
            <MarketSpace />
          </Box>

          <Text fontFamily="thin" color="gray.300" fontSize="sm">
            Seu espaço de compra e venda
          </Text>

          <VStack mt={20}>
            <Center w="full">
              <Text fontFamily="body" color="gray.200" fontSize="sm" mb={4}>
                Acesse sua conta
              </Text>

              <Box bg="white" rounded="md">
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
                    />
                  )}
                />
              </Box>

              <Box bg="white" mt={4} rounded="md">
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
              </Box>
            </Center>
          </VStack>
        </Center>

        <Button
          title="Entrar"
          mt={8}
          bg="blue.500"
          _pressed={{
            bg: "blue.700",
          }}
          onPress={handleSubmit(handleSignIn)}
        />
      </VStack>

      <Center bg="white" h={48} px={12}>
        <Text color="gray.200" fontFamily="body" fontSize="sm">
          Ainda não tem acesso?
        </Text>

        <Button
          title="Criar uma conta"
          textColor="gray.200"
          mt={4}
          bg="gray.500"
          _pressed={{
            bg: "gray.600",
          }}
          onPress={handleGoToSignUp}
        />
      </Center>
    </ScrollView>
  );
}
