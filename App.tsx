import { StatusBar } from "react-native";
import { NativeBaseProvider, Text } from "native-base";
import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { THEME } from "./src/theme";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";
import { Home } from "@screens/Home";

export default function App() {
  const [fontLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!fontLoaded) {
    return <></>;
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <Home />
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </NativeBaseProvider>
  );
}
