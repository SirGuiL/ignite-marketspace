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
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";

import MarketSpace from "@assets/marketspace.svg";
import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const [showingPassword, setShowingPassword] = useState(false);

  const { colors } = useTheme();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleGoToSignUp = () => {
    navigation.navigate("signUp");
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
                <Input
                  w="full"
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Box>

              <Box bg="white" mt={4} rounded="md">
                <Input
                  w="full"
                  placeholder="Senha"
                  secureTextEntry={!showingPassword}
                  autoCapitalize="none"
                  roundedRight="none"
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
