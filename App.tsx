import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';

import { CartProvider } from './src/hooks/useCart';

import { Product } from './src/types';

const queryClient = new QueryClient();

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="ProductList"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#2874f0', 
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen 
                name="ProductList" 
                component={ProductListScreen} 
                options={{ title: 'Flipkart' }} 
              />
              <Stack.Screen 
                name="ProductDetail" 
                component={ProductDetailScreen} 
                options={{ title: 'Product Details' }} 
              />
              <Stack.Screen 
                name="Cart" 
                component={CartScreen} 
                options={{ title: 'Shopping Cart' }} 
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </CartProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
