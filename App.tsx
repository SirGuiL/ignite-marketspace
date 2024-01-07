import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { THEME } from "./src/theme";

import { Routes } from "./src/routes";
import { AuthContextProvider } from "@contexts/AuthContext";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        {!fontLoaded ? <Loading /> : <Routes />}
      </AuthContextProvider>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </NativeBaseProvider>
  );
}
