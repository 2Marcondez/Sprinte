import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeHeader from '../../components/HomeHeader';
import { UserLocationProvider } from '../../context/UserLocationContext';
import HomeScreen from './home';
import SearchScreen from './search';
import FavoritesScreen from './favorites';
import ProfileScreen from './profile';
import EditProfileScreen from './edit-profile'; // Nova tela que você vai criar
import SearchBar from '../../components/SearchBar';
import { View } from 'react-native';
import 'react-native-get-random-values';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Componente que contém as abas
function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#D8FAB8',
        tabBarInactiveTintColor: '#000000', // Corrigido o typo
        tabBarStyle: {
          backgroundColor: '#9AD264',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
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
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home-filled" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          header: () => (
            <View>
              <HomeHeader />
              <SearchBar />
            </View>
          ),
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="search" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="favorites"
        component={FavoritesScreen}
        options={{
          header: () => <HomeHeader />,
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="heart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          header: () => <HomeHeader />,
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Layout principal com Stack Navigator
export default function Layout() {
  return (
    <UserLocationProvider>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabLayout} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </UserLocationProvider>
  );
}