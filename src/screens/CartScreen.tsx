import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Platform, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCart } from '../hooks/useCart';
import { RootStackParamList } from '../../App';
import { CartItem as CartItemType } from '../types';
import { Button, CartItem, Header } from '../components';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Add some products to your cart before checkout.');
      return;
    }
    
    Alert.alert(
      'Checkout',
      'This would proceed to payment in a real app. For this demo, we\'ll just clear the cart.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: () => {
            clearCart();
            Alert.alert('Success', 'Order placed successfully!');
            navigation.navigate('ProductList');
          }
        },
      ]
    );
  };
  
  const handleContinueShopping = () => {
    navigation.navigate('ProductList');
  };
  
  const renderCartItem = ({ item }: { item: CartItemType }) => (
    <CartItem
      item={item}
      onRemove={removeFromCart}
      onUpdateQuantity={updateQuantity}
    />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Your Cart"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          cartItems.length > 0 ? (
            <Pressable onPress={clearCart}>
              <Text style={styles.clearCartText}>Clear All</Text>
            </Pressable>
          ) : undefined
        }
      />
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Button
            title="Continue Shopping"
            onPress={handleContinueShopping}
            variant="primary"
            style={styles.continueShopping}
            textStyle={styles.continueShoppingText}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.cartSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>${getCartTotal().toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping:</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${getCartTotal().toFixed(2)}</Text>
            </View>
            
            <Button
              title="Checkout"
              onPress={handleCheckout}
              variant="secondary"
              size="large"
              style={styles.checkoutButton}
              textStyle={styles.checkoutButtonText}
            />
            
            <Button
              title="Continue Shopping"
              onPress={handleContinueShopping}
              variant="outline"
              style={styles.continueShoppingButton}
              textStyle={styles.continueShoppingButtonText}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2874f0', 
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
  },
  clearCartText: {
    color: 'white',
    fontWeight: '500',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  continueShopping: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2874f0', 
    borderRadius: 2, 
  },
  continueShoppingText: {
    color: 'white',
    fontWeight: '500',
  },
  cartList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 2, 
    marginBottom: 16,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  itemImage: {
    width: 80,
    height: 500,
    borderRadius: 0,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#212121',
  },
  itemPrice: {
    fontSize: 14,
    color: '#212121',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2874f0',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
    color: '#212121',
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2874f0',
  },
  removeButton: {
    width: 28,
    height: 28,
    backgroundColor: '#f1f3f6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  removeButtonText: {
    color: '#212121',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartSummary: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#212121',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121', 
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2874f0',
  },
  checkoutButton: {
    backgroundColor: '#fb641b', 
    paddingVertical: 14,
    borderRadius: 2, 
    alignItems: 'center',
    marginBottom: 12,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueShoppingButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 2, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  continueShoppingButtonText: {
    color: '#2874f0',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CartScreen;