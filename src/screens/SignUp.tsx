import { useState } from "react";
import {
  Box,
  Center,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";

import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

export function SignUp() {
  const [showingPassword, setShowingPassword] = useState(false);

  const { colors } = useTheme();

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

          <Pressable mt={8}>
            <Avatar size={20} borderWidth={2} borderColor="blue.500" editable />
          </Pressable>

          <Input
            w="full"
            placeholder="Nome"
            keyboardType="email-address"
            autoCapitalize="none"
            mt={4}
          />

          <Input
            w="full"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            mt={4}
          />

          <Input
            w="full"
            placeholder="Telefone"
            keyboardType="email-address"
            autoCapitalize="none"
            mt={4}
          />

          <Input
            w="full"
            placeholder="Senha"
            secureTextEntry={!showingPassword}
            autoCapitalize="none"
            roundedRight="none"
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

          <Input
            w="full"
            placeholder="Confirmar senha"
            secureTextEntry={!showingPassword}
            autoCapitalize="none"
            roundedRight="none"
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

          <Button
            title="Criar"
            mt={8}
            bg="gray.100"
            _pressed={{
              bg: "gray.200",
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
        />
      </Center>
    </ScrollView>
  );
}
