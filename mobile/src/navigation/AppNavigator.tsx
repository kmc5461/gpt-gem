// mobile/src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ShoppingBag, Search, User } from 'lucide-react-native';

// Ekranlar
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

// Tipler
export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { productId: string };
  Checkout: undefined;
};

export type TabParamList = {
  Home: undefined;
  Shop: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Alt Tab Menü (Ana Navigasyon)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9ca3af', // zinc-400
        tabBarStyle: {
          borderTopColor: '#f4f4f5', // zinc-100
          backgroundColor: '#ffffff',
          height: 85, // Biraz daha yüksek modern tab bar
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tab.Screen 
        name="Shop" 
        component={ProductsScreen} 
        options={{
          tabBarIcon: ({ color }) => <Search color={color} size={24} />,
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarIcon: ({ color }) => <ShoppingBag color={color} size={24} />,
          tabBarBadgeStyle: { backgroundColor: '#000', color: '#fff' }
        }}
      />
      {/* Profil ekranı şimdilik placeholder olarak Home'u kullanıyor */}
      <Tab.Screen 
        name="Profile" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Ana Stack Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{ headerShown: true, headerTitle: '', headerBackTitleVisible: false, headerTintColor: '#000' }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen}
          options={{ headerShown: true, headerTitle: 'CHECKOUT', headerTintColor: '#000' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
