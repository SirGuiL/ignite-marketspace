import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import { Home } from "@screens/Home";
import { MyProducts } from "@screens/MyProducts";
import { House, SignOut, Tag } from "phosphor-react-native";
import { ProductDetails } from "@screens/ProductDetails";
import { NewProductAnnouncement } from "@screens/NewProductAnnouncement";

type AppRoutes = {
  home: undefined;
  logout: undefined;
  productDetails: undefined;
  newProduct: undefined;
  myProducts: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          paddingBottom: sizes[8],
          paddingTop: sizes[8],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={iconSize} weight="fill" />
          ),
        }}
      />

      <Screen
        name="myProducts"
        component={MyProducts}
        options={{
          tabBarIcon: ({ color }) => <Tag color={color} size={iconSize} />,
        }}
      />

      <Screen
        name="logout"
        component={MyProducts}
        options={{
          tabBarIcon: () => (
            <SignOut color={colors.red["500"]} size={iconSize} />
          ),
        }}
      />

      <Screen
        name="productDetails"
        component={ProductDetails}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="newProduct"
        component={NewProductAnnouncement}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
