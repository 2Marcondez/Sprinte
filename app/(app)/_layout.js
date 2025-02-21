import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import HomeHeader from "../../components/HomeHeader"
import { UserLocationProvider } from "../../context/UserLocationContext"
import HomeScreen from "./home"
import SearchScreen from "./search"
import FavoritesScreen from "./favorites"
import ProfileScreen from "./profile"
import SearchBar from "../../components/SearchBar"
import { View } from "react-native"

const Tab = createBottomTabNavigator()


export default function Layout() {
  return (
    <UserLocationProvider>
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00000",
        tabBarInactiveTintColor: "#696969",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingBottom: 5,
          paddingTop: 0,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          header: () => <HomeHeader />,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
        }}
      />

        <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          header: () => <HomeHeader />,
          title: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="favorites"
        component={FavoritesScreen}
        options={{
          header: () => <HomeHeader />,
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="heart" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          header: () => <HomeHeader />,
          title: "Perfil",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
    </UserLocationProvider>
  )
}

